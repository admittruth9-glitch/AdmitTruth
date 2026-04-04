 import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, MapPin, Wallet, Target, BookOpen, GraduationCap, Lightbulb, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AILoadingAnimation } from '@/components/AILoadingAnimation';
import { AnalysisResults } from '@/components/AnalysisResults';
import { StudentProfile, analyzeProfile, AnalysisResult } from '@/lib/analysis-engine';
import { getCollegeRecommendations, College } from '@/data/colleges';

const steps = [
  { title: 'Personal Details', icon: MapPin, desc: 'Location, budget & goals' },
  { title: 'Academic Details', icon: BookOpen, desc: '10th & 12th scores' },
  { title: 'Entrance Exams', icon: GraduationCap, desc: 'EAMCET, JEE scores' },
  { title: 'Interest Area', icon: Lightbulb, desc: 'Your preferred branch' },
];

// Explicit icon color classes — Tailwind requires full class names at build time
const iconColorClasses = {
  primary: 'text-blue-500',
  secondary: 'text-purple-500',
  accent: 'text-green-500',
};

const activeButtonClasses = {
  primary: 'border-blue-500 bg-blue-500/20 text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]',
  secondary: 'border-purple-500 bg-purple-500/20 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]',
  accent: 'border-green-500 bg-green-500/20 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]',
};

function OptionButton({
  selected, onClick, children, icon: Icon, color = 'primary',
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ElementType;
  color?: 'primary' | 'secondary' | 'accent';
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-xl text-left transition-all duration-300 text-sm font-medium border-2 ${
        selected
          ? activeButtonClasses[color]
          : 'border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10 hover:border-white/30'
      }`}
    >
      <div className="flex items-center gap-3">
        {Icon && <Icon className={`w-5 h-5 ${selected ? iconColorClasses[color] : ''}`} />}
        {children}
      </div>
    </button>
  );
}

export function CareerPathEngine() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [colleges, setColleges] = useState<{ dream: College[]; bestFit: College[]; safe: College[] } | null>(null);

  const [form, setForm] = useState({
    location: '', budget: '' as 'low' | 'medium' | 'high' | '',
    careerGoal: '' as 'job' | 'startup' | 'higher-studies' | '',
    tenthBoard: '', tenthPct: '',
    twelfthBoard: '', twelfthPct: '',
    eamcetRank: '', jeePercentile: '', jeeAdvancedRank: '',
    interest: '',
  });

  const update = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));

  const canProceed = () => {
    if (step === 0) return form.location && form.budget && form.careerGoal;
    if (step === 1) return form.tenthBoard && form.tenthPct && form.twelfthBoard && form.twelfthPct;
    if (step === 2) return form.eamcetRank || form.jeePercentile;
    if (step === 3) return form.interest;
    return false;
  };

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      const profile: StudentProfile = {
        location: form.location,
        budget: form.budget as 'low' | 'medium' | 'high',
        careerGoal: form.careerGoal as 'job' | 'startup' | 'higher-studies',
        tenth: { board: form.tenthBoard, percentage: parseFloat(form.tenthPct) },
        twelfth: { board: form.twelfthBoard, percentage: parseFloat(form.twelfthPct) },
        eamcetRank: form.eamcetRank ? parseInt(form.eamcetRank) : undefined,
        jeePercentile: form.jeePercentile ? parseFloat(form.jeePercentile) : undefined,
        jeeAdvancedRank: form.jeeAdvancedRank ? parseInt(form.jeeAdvancedRank) : undefined,
        interest: form.interest,
      };
      const analysis = analyzeProfile(profile);
      const recs = getCollegeRecommendations({
        eamcetRank: profile.eamcetRank,
        jeePercentile: profile.jeePercentile,
        jeeAdvancedRank: profile.jeeAdvancedRank,
        budget: profile.budget,
        interest: profile.interest,
        location: profile.location,
      });
      setResult(analysis);
      setColleges(recs);
      setLoading(false);
    }, 3000);
  };

  if (loading) return <AILoadingAnimation text="TruthLens Engine analyzing your profile..." />;
  if (result && colleges) return (
    <AnalysisResults
      result={result}
      colleges={colleges}
      onReset={() => { setResult(null); setColleges(null); setStep(0); }}
    />
  );

  return (
    <div className="max-w-3xl mx-auto py-10">
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-12">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-3 flex-1">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 transition-colors ${
              i === step ? 'bg-gradient-primary text-white shadow-glow' : i < step ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-white/5 text-muted-foreground border border-white/10'
            }`}>
              {i + 1}
            </div>
            <span className={`text-sm hidden sm:block font-semibold tracking-wide ${i === step ? 'text-white' : 'text-muted-foreground'}`}>{s.title}</span>
            {i < steps.length - 1 && <div className={`flex-1 h-1 rounded-full mx-2 ${i < step ? 'bg-green-500/50' : 'bg-white/5'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden"
          style={{ backgroundColor: 'rgba(15, 20, 30, 0.6)' }}
        >
          {/* Step 0: Personal */}
          {step === 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-primary">
                <MapPin className="w-8 h-8 text-blue-500" /> Personal Details
              </h2>

              <div className="space-y-8 mt-8">
                <div>
                  <Label className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-3 block">Preferred Location</Label>
                  <Input value={form.location} onChange={e => update('location', e.target.value)} placeholder="e.g., Hyderabad, Bangalore, Delhi..." className="bg-white/5 border-white/10 h-14 text-lg focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50 transition-all rounded-xl" />
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-3 block">Budget</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {(['low', 'medium', 'high'] as const).map(b => (
                      <OptionButton key={b} selected={form.budget === b} onClick={() => update('budget', b)} icon={Wallet} color="accent">
                        {b === 'low' ? '< ₹2L/yr' : b === 'medium' ? '₹2-4L/yr' : '₹4L+/yr'}
                      </OptionButton>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-muted-foreground text-sm font-bold uppercase tracking-wider mb-3 block">Career Goal</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {([['job', 'Job/Placement', Target], ['startup', 'Startup', Sparkles], ['higher-studies', 'Higher Studies', GraduationCap]] as const).map(([val, label, Icon]) => (
                      <OptionButton key={val} selected={form.careerGoal === val} onClick={() => update('careerGoal', val)} icon={Icon} color="secondary">
                        {label}
                      </OptionButton>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Academics */}
          {step === 1 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
                <BookOpen className="w-8 h-8 text-blue-400" /> Academic Details
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6 shadow-lg">
                  <h3 className="font-bold text-lg text-blue-400 border-b border-white/10 pb-3">10th Standard</h3>
                  <div>
                    <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-3 block">Board</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {['SSC', 'CBSE', 'ICSE'].map(b => (
                        <button key={b} onClick={() => update('tenthBoard', b)} className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${form.tenthBoard === b ? 'border-blue-500 bg-blue-500/20 text-white shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'border-transparent bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-3 block">Percentage</Label>
                    <Input type="number" value={form.tenthPct} onChange={e => update('tenthPct', e.target.value)} placeholder="e.g., 85" className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-blue-500/50 focus-visible:border-blue-500/50" max={100} min={0} />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6 shadow-lg">
                  <h3 className="font-bold text-lg text-green-400 border-b border-white/10 pb-3">12th Standard</h3>
                  <div>
                    <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-3 block">Board</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {['IPE', 'CBSE', 'ICSE'].map(b => (
                        <button key={b} onClick={() => update('twelfthBoard', b)} className={`py-3 rounded-xl text-xs font-bold transition-all border-2 ${form.twelfthBoard === b ? 'border-green-500 bg-green-500/20 text-white shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border-transparent bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-white'}`}>{b}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground text-xs font-bold uppercase tracking-wider mb-3 block">Percentage</Label>
                    <Input type="number" value={form.twelfthPct} onChange={e => update('twelfthPct', e.target.value)} placeholder="e.g., 78" className="bg-white/5 border-white/10 h-12 rounded-xl focus-visible:ring-green-500/50 focus-visible:border-green-500/50" max={100} min={0} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Exams */}
          {step === 2 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                <GraduationCap className="w-8 h-8 text-purple-400" /> Entrance Exams
              </h2>
              <p className="text-purple-300/80 text-sm bg-purple-500/10 p-4 rounded-xl border border-purple-500/20 font-medium tracking-wide">Fill at least one exam score. Leave others blank if not applicable.</p>

              <div className="space-y-6 mt-8">
                <div className="p-2 border border-white/5 rounded-2xl bg-white/5 focus-within:border-purple-500/50 transition-colors">
                  <Label className="text-white text-sm font-bold px-3 pt-2 block">EAMCET Rank</Label>
                  <Input type="number" value={form.eamcetRank} onChange={e => update('eamcetRank', e.target.value)} placeholder="e.g., 15000" className="bg-transparent border-none shadow-none h-12 text-lg focus-visible:ring-0" />
                </div>
                <div className="p-2 border border-white/5 rounded-2xl bg-white/5 focus-within:border-purple-500/50 transition-colors">
                  <Label className="text-white text-sm font-bold px-3 pt-2 block">JEE Mains Percentile</Label>
                  <Input type="number" value={form.jeePercentile} onChange={e => update('jeePercentile', e.target.value)} placeholder="e.g., 92.5" className="bg-transparent border-none shadow-none h-12 text-lg focus-visible:ring-0" step="0.1" />
                </div>
                <div className="p-2 border border-white/5 rounded-2xl bg-white/5 focus-within:border-purple-500/50 transition-colors">
                  <Label className="text-white text-sm font-bold px-3 pt-2 block">JEE Advanced Rank <span className="text-muted-foreground/50 font-normal">(optional)</span></Label>
                  <Input type="number" value={form.jeeAdvancedRank} onChange={e => update('jeeAdvancedRank', e.target.value)} placeholder="e.g., 3500" className="bg-transparent border-none shadow-none h-12 text-lg focus-visible:ring-0" />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Interest */}
          {step === 3 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                <Lightbulb className="w-8 h-8 text-yellow-500" /> Interest Area
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {['CSE / AI / Data Science', 'Core (Mechanical / Civil / Electrical)', 'Management / Finance', 'Undecided'].map(opt => (
                  <OptionButton key={opt} selected={form.interest === opt} onClick={() => update('interest', opt)} color="primary">
                    {opt}
                  </OptionButton>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
            <Button variant="ghost" onClick={() => setStep(s => s - 1)} disabled={step === 0} className="text-muted-foreground hover:text-white hover:bg-white/10 px-6 h-12 rounded-xl font-bold">
              <ChevronLeft className="w-5 h-5 mr-2" /> Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="bg-white text-black hover:bg-gray-200 px-8 h-12 rounded-xl font-bold font-display tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Next Step <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleAnalyze} disabled={!canProceed()} className="bg-gradient-primary text-white hover:opacity-90 px-8 h-12 rounded-xl font-bold font-display tracking-wide shadow-glow gap-2 overflow-hidden relative group">
                <div className="absolute inset-0 bg-white/20 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                <Sparkles className="w-5 h-5" /> Analyze with TruthLens AI
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
