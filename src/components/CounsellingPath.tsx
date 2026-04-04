import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight, ChevronLeft, Sparkles, MessageCircle, Route, Map,
  GraduationCap, TrendingUp, AlertTriangle, CheckCircle2, Clock,
  Award, Building2, ArrowRight, RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AILoadingAnimation } from '@/components/AILoadingAnimation';
import { TypingEffect } from '@/components/TypingEffect';
import { counsellingQuestions, getRecommendedPaths, CareerPath } from '@/data/CounsellingPaths';
import { colleges } from '@/data/colleges';

type Stage = 'questions' | 'loading' | 'paths' | 'detail' | 'roadmap';

export function CounsellingPath() {
  const [stage, setStage] = useState<Stage>('questions');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [selectedPath, setSelectedPath] = useState<CareerPath | null>(null);
  const [showRoadmap, setShowRoadmap] = useState(false);

  const q = counsellingQuestions[currentQ];

  const handleAnswer = (value: string) => {
    const updated = { ...answers, [q.id]: value };
    setAnswers(updated);

    if (currentQ < counsellingQuestions.length - 1) {
      setCurrentQ(c => c + 1);
    } else {
      setStage('loading');
      setTimeout(() => {
        setPaths(getRecommendedPaths(updated));
        setStage('paths');
      }, 2500);
    }
  };

  const handleSelectPath = (path: CareerPath) => {
    setSelectedPath(path);
    setShowRoadmap(false);
    setStage('detail');
  };

  const handleShowRoadmap = () => {
    setShowRoadmap(true);
    setStage('roadmap');
  };

  const handleReset = () => {
    setStage('questions');
    setCurrentQ(0);
    setAnswers({});
    setPaths([]);
    setSelectedPath(null);
    setShowRoadmap(false);
  };

  const getMatchingColleges = (path: CareerPath) => {
    return colleges
      .filter(c =>
        path.matchingCollegeTypes.includes(c.type) &&
        c.branches.some(b => path.suggestedBranches.some(sb => b.toLowerCase().includes(sb.toLowerCase())))
      )
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 8);
  };

  if (stage === 'loading') {
    return <AILoadingAnimation text="TruthLens AI analyzing your profile and mapping career paths..." />;
  }

  // QUESTIONS STAGE
  if (stage === 'questions') {
    return (
      <div className="max-w-2xl mx-auto">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {counsellingQuestions.map((_, i) => (
            <div key={i} className="flex items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                i === currentQ ? 'bg-gradient-primary text-primary-foreground' : i < currentQ ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                {i < currentQ ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
              </div>
              {i < counsellingQuestions.length - 1 && <div className={`flex-1 h-px ${i < currentQ ? 'bg-accent' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            className="glass-panel p-6"
          >
            <div className="flex items-center gap-2 mb-2 text-primary">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Question {currentQ + 1} of {counsellingQuestions.length}</span>
            </div>
            <h2 className="text-xl font-display font-bold mb-6">{q.question}</h2>
            <div className="space-y-3">
              {q.options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={`w-full p-4 rounded-lg border text-left transition-all text-sm hover:border-primary/50 hover:bg-primary/5 ${
                    answers[q.id] === opt.value
                      ? 'border-primary bg-primary/10 text-foreground shadow-glow'
                      : 'border-border bg-muted/30 text-muted-foreground'
                  }`}
                >
                  <span className="font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
            {currentQ > 0 && (
              <Button variant="ghost" className="mt-4 text-muted-foreground" onClick={() => setCurrentQ(c => c - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // PATHS SELECTION
  if (stage === 'paths') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-display font-bold flex items-center gap-2">
              <Route className="w-6 h-6 text-primary" /> Your Recommended Paths
            </h2>
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground">
              <RotateCcw className="w-4 h-4 mr-1" /> Retake
            </Button>
          </div>
          <p className="text-muted-foreground text-sm mb-6">Based on your answers, TruthLens AI has identified these career paths ranked by match strength. Select one for detailed analysis.</p>
        </motion.div>

        <div className="space-y-4">
          {paths.map((path, i) => (
            <motion.button
              key={path.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelectPath(path)}
              className="w-full glass-panel p-5 text-left hover:shadow-glow hover:border-primary/30 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0">{path.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display font-bold text-lg">{path.title}</h3>
                    {i === 0 && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/30">
                        Best Match
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{path.tagline}</p>
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span className="flex items-center gap-1 text-accent">
                      <TrendingUp className="w-3 h-3" /> Demand: {path.demandLevel}
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      💰 {path.avgSalary}
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      📈 Growth: {path.growthRate}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-2" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  // DETAILED ANALYSIS
  if (stage === 'detail' && selectedPath) {
    const analysis = selectedPath.detailedAnalysis;
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setStage('paths')} className="text-muted-foreground">
              <ChevronLeft className="w-4 h-4 mr-1" /> All Paths
            </Button>
          </div>

          <div className="glass-panel p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{selectedPath.icon}</span>
              <div>
                <h2 className="text-2xl font-display font-bold">{selectedPath.title}</h2>
                <p className="text-muted-foreground text-sm">{selectedPath.tagline}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <span className="px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20">Demand: {selectedPath.demandLevel}</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">Avg: {selectedPath.avgSalary}</span>
              <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground">Growth: {selectedPath.growthRate}</span>
            </div>
            <p className="text-sm text-foreground/80">{selectedPath.description}</p>
          </div>
        </motion.div>

        {/* Overview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> Overview
          </h3>
          <TypingEffect text={analysis.overview} speed={8} />
        </motion.div>

        {/* Industry Demand */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" /> Industry Demand
          </h3>
          <p className="text-sm text-foreground/80">{analysis.industryDemand}</p>
        </motion.div>

        {/* Salary Progression */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            💰 Salary Progression
          </h3>
          <div className="space-y-3">
            {analysis.salaryProgression.map((sp, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <span className="font-medium text-sm">{sp.role}</span>
                    <span className="text-xs text-muted-foreground ml-2">({sp.experience})</span>
                  </div>
                  <span className="text-sm font-bold text-accent">{sp.salary}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Pros & Cons */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="grid sm:grid-cols-2 gap-4">
          <div className="glass-panel p-5">
            <h3 className="font-display font-bold text-sm mb-3 text-accent flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Pros
            </h3>
            <ul className="space-y-2">
              {analysis.prosAndCons.pros.map((p, i) => (
                <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="text-accent mt-0.5">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-5">
            <h3 className="font-display font-bold text-sm mb-3 text-destructive flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Cons
            </h3>
            <ul className="space-y-2">
              {analysis.prosAndCons.cons.map((c, i) => (
                <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="text-destructive mt-0.5">✗</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Top Companies */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" /> Top Hiring Companies
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.topCompanies.map(company => (
              <span key={company} className="px-3 py-1.5 rounded-lg bg-muted/50 border border-border text-sm text-foreground/80">
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bitter Truth */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="glass-panel p-5 border-destructive/30">
          <h3 className="font-display font-bold text-lg mb-3 text-destructive flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Bitter Truth
          </h3>
          <p className="text-sm text-foreground/80 leading-relaxed">{analysis.bitterTruth}</p>
        </motion.div>

        {/* Future Outlook */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            🔮 Future Outlook
          </h3>
          <p className="text-sm text-foreground/80">{analysis.futureOutlook}</p>
        </motion.div>

        {/* Suggested Branches */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-sm mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" /> Best Branches for This Path
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedPath.suggestedBranches.map(b => (
              <span key={b} className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm">{b}</span>
            ))}
          </div>
        </motion.div>

        {/* CTA: View Roadmap */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button onClick={handleShowRoadmap} className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 py-6 text-lg gap-2">
            <Map className="w-5 h-5" /> View Complete Roadmap & College Suggestions
            <ArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    );
  }

  // ROADMAP & COLLEGES
  if (stage === 'roadmap' && selectedPath) {
    const roadmap = selectedPath.roadmap;
    const matchedColleges = getMatchingColleges(selectedPath);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={() => setStage('detail')} className="text-muted-foreground">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Analysis
            </Button>
          </div>
          <h2 className="text-2xl font-display font-bold flex items-center gap-2 mb-1">
            <Map className="w-6 h-6 text-primary" /> {selectedPath.title} — Complete Roadmap
          </h2>
          <p className="text-muted-foreground text-sm mb-6">Step-by-step plan to become job-ready in this field.</p>
        </motion.div>

        {/* Phases */}
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
          {roadmap.phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative pl-10 pb-8"
            >
              <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold z-10">
                {i + 1}
              </div>
              <div className="glass-panel p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-display font-bold text-lg">{phase.title}</h3>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    <Clock className="w-3 h-3" /> {phase.duration}
                  </span>
                </div>
                <ul className="space-y-2 mb-3">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="text-sm text-foreground/80 flex items-start gap-2">
                      <span className="text-primary mt-0.5">▸</span> {task}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Award className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">{phase.milestone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-accent" /> Recommended Certifications
          </h3>
          <div className="space-y-2">
            {roadmap.certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0" /> {cert}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
            🛠️ Must-Build Projects
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {roadmap.projects.map((project, i) => (
              <div key={i} className="p-3 rounded-lg bg-muted/30 border border-border text-sm text-foreground/80 flex items-center gap-2">
                <span className="text-primary font-bold">{i + 1}.</span> {project}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Matching Colleges */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="glass-panel p-5">
          <h3 className="font-display font-bold text-lg mb-1 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" /> Best Colleges for {selectedPath.title}
          </h3>
          <p className="text-muted-foreground text-xs mb-4">Colleges strong in {selectedPath.suggestedBranches.join(', ')}</p>
          <div className="space-y-3">
            {matchedColleges.map((college, i) => (
              <div key={i} className="p-4 rounded-lg bg-muted/20 border border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm">{college.name}</h4>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">{college.type}</span>
                    {college.code && <span className="text-xs text-muted-foreground">({college.code})</span>}
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>📍 {college.location}, {college.district}</span>
                    <span>💰 ₹{college.fees}L/yr</span>
                    <span>📊 Placement: {college.placementRate}%</span>
                    <span>💵 Avg: ₹{college.avgPackage} LPA</span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {'⭐'.repeat(Math.round(college.rating))}
                  <span className="text-xs text-muted-foreground ml-1">{college.rating}/5</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="flex gap-3">
          <Button variant="outline" onClick={() => setStage('paths')} className="flex-1">
            <Route className="w-4 h-4 mr-2" /> Explore Other Paths
          </Button>
          <Button onClick={handleReset} className="flex-1 bg-gradient-primary text-primary-foreground hover:opacity-90">
            <RotateCcw className="w-4 h-4 mr-2" /> Start Over
          </Button>
        </motion.div>
      </div>
    );
  }

  return null;
}
