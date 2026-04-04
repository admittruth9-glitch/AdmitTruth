import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Compass, Shield, Building2, ShieldAlert, MessageCircle, BarChart, FileText, CheckCircle, Search } from 'lucide-react';
import { CareerPathEngine } from '@/components/CareerPathEngine';
import { ClaimAnalyzer } from '@/components/ClaimAnalyzer';
import { CollegeReality } from '@/components/CollegeReality';
import { ScamDetector } from '@/components/ScamDetector';
import { CounsellingPath } from '@/components/CounsellingPath';
import { Input } from '@/components/ui/input';

type Section = 'home' | 'career' | 'claim' | 'reality' | 'scam' | 'counselling';

const navItems: { key: Section; label: string; icon: React.ElementType }[] = [
  { key: 'counselling', label: 'Counselling', icon: MessageCircle },
  { key: 'career', label: 'Career Path', icon: Compass },
  { key: 'claim', label: 'Claim Analyzer', icon: Shield },
  { key: 'reality', label: 'Reality Mode', icon: Building2 },
  { key: 'scam', label: 'Scam Alerts', icon: ShieldAlert },
];

export default function Index() {
  const [section, setSection] = useState<Section>('home');

  return (
    <div className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-blue-500/30 selection:text-blue-200">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Header Left / Logo */}
          <button onClick={() => setSection('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
             <Brain className="w-6 h-6 text-blue-500" />
             <span className="font-bold tracking-tight hidden sm:block">AdmitTruth AI</span>
          </button>
          
          {/* Header Center / Navigation Links */}
          <nav className="flex flex-wrap lg:flex-nowrap items-center gap-2 lg:gap-6 text-sm font-medium">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`flex items-center gap-1.5 transition-colors ${section === item.key ? 'text-blue-400' : 'text-gray-400 hover:text-white'}`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>
          
          {/* Header Right / Search */}
          <div className="flex-1 max-w-sm lg:flex-none lg:w-64 relative">
             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
             <Input 
               placeholder="Search colleges..." 
               className="pl-9 bg-white/5 border-white/10 h-9 rounded-full text-sm focus-visible:ring-blue-500 focus-visible:border-blue-500 text-gray-200 placeholder:text-gray-500" 
             />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
          >
            {section === 'home' && <HomePage onNavigate={setSection} />}
            {section === 'counselling' && <CounsellingPath />}
            {section === 'career' && <CareerPathEngine />}
            {section === 'claim' && <ClaimAnalyzer />}
            {section === 'reality' && <CollegeReality />}
            {section === 'scam' && <ScamDetector />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

function HomePage({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const features = [
    { key: 'career' as Section, icon: Compass, title: 'Career Path Engine', desc: 'AI-powered step-by-step analysis to find your ideal B.Tech path and colleges.', glowColor: 'hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]', iconColor: 'text-blue-500', bgGlow: 'bg-blue-500/10' },
    { key: 'claim' as Section, icon: Shield, title: 'TruthLens Claim Analyzer', desc: 'Verify any college claim with truth scores, verdicts, and red flag detection.', glowColor: 'hover:border-teal-500/50 hover:shadow-[0_0_30px_-5px_rgba(20,184,166,0.3)]', iconColor: 'text-teal-500', bgGlow: 'bg-teal-500/10' },
    { key: 'reality' as Section, icon: Building2, title: 'College Reality Mode', desc: 'See Brochure vs Reality ratings, sentiment analysis, and honest assessments.', glowColor: 'hover:border-green-500/50 hover:shadow-[0_0_30px_-5px_rgba(34,197,94,0.3)]', iconColor: 'text-green-500', bgGlow: 'bg-green-500/10' },
    { key: 'scam' as Section, icon: ShieldAlert, title: 'Scam Detector', desc: 'Detect admission scams with keyword analysis and risk probability scoring.', glowColor: 'hover:border-orange-500/50 hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)]', iconColor: 'text-orange-500', bgGlow: 'bg-orange-500/10' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-24">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-8 mt-10">
        <div className="flex justify-center mb-8 relative">
           <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full w-40 h-40 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none" />
           <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-black to-zinc-900 border border-blue-500/30 flex items-center justify-center animate-float shadow-[0_0_40px_rgba(59,130,246,0.4)] relative z-10">
             <Brain className="w-12 h-12 text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
           </div>
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">AdmitTruth AI</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-medium">
          Your AI decision system that helps you choose the right future, verify truth, and avoid scams.
        </p>
      </motion.div>

      {/* Feature Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {features.map((item, i) => (
          <motion.button
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            onClick={() => onNavigate(item.key)}
            className={`group text-left p-8 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/5 transition-all duration-300 ${item.glowColor}`}
          >
            <div className="flex items-start gap-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/5 shadow-lg group-hover:scale-110 transition-transform ${item.bgGlow}`}>
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2 text-gray-100 group-hover:text-white transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.desc}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Stats Bar */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Colleges Analyzed', value: '50+', icon: Building2 },
          { label: 'Data Points', value: '500+', icon: BarChart },
          { label: 'Scam Patterns', value: '20+', icon: FileText },
          { label: 'Accuracy', value: '94%', icon: CheckCircle },
        ].map(stat => (
          <div key={stat.label} className="p-6 rounded-xl bg-white/[0.02] backdrop-blur-md border border-white/5 flex flex-col items-center justify-center text-center group hover:bg-white/[0.04] transition-colors">
            <stat.icon className="w-5 h-5 text-gray-600 mb-3 group-hover:text-gray-500 transition-colors" />
            <p className="text-3xl font-extrabold text-blue-500 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all">{stat.value}</p>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-2 group-hover:text-gray-400 transition-colors">{stat.label}</p>
          </div>
        ))}
      </motion.div>
      
    </div>
  );
}
