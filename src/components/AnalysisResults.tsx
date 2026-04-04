import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Trophy, Shield, ArrowRight, BookOpen, AlertTriangle, TrendingUp, RotateCcw, Building2, IndianRupee, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TypingEffect } from '@/components/TypingEffect';
import { ScoreGauge } from '@/components/ScoreGauge';
import { AnalysisResult } from '@/lib/analysis-engine';
import { College } from '@/data/colleges';

interface Props {
  result: AnalysisResult;
  colleges: { dream: College[]; bestFit: College[]; safe: College[] };
  onReset: () => void;
}

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

function CollegeCard({ college }: { college: College }) {
  const [showTruth, setShowTruth] = useState(false);
  return (
    <div className="glass-panel p-4 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-display font-semibold text-sm">{college.name}</h4>
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-mono">[{college.code}]</span> • {college.location}, {college.district} • {college.type}
            {college.naacGrade && <> • NAAC {college.naacGrade}</>}
          </p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < college.realityRating ? 'text-warning fill-warning' : 'text-muted'}`} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <IndianRupee className="w-3 h-3" /> {college.fees}L/yr
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Briefcase className="w-3 h-3" /> {college.avgPackage} LPA avg
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Users className="w-3 h-3" /> {college.placementRate}% placed
        </div>
      </div>
      <button onClick={() => setShowTruth(!showTruth)} className="text-xs text-destructive hover:underline flex items-center gap-1">
        <AlertTriangle className="w-3 h-3" /> {showTruth ? 'Hide' : 'Show'} Bitter Truth
      </button>
      {showTruth && (
        <div className="p-2 rounded bg-destructive/10 border border-destructive/20 text-xs text-destructive">
          {college.bitterTruth}
        </div>
      )}
    </div>
  );
}

export function AnalysisResults({ result, colleges, onReset }: Props) {
  const [showAll, setShowAll] = useState(false);

  return (
    <motion.div className="space-y-6 max-w-3xl mx-auto" initial="initial" animate="animate" variants={{ animate: { transition: { staggerChildren: 0.15 } } }}>
      {/* Best Path */}
      <motion.div variants={fadeUp} className="stat-card">
        <div className="flex items-center gap-2 mb-3">
          <ArrowRight className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-lg">Best Path for You</h3>
        </div>
        <p className="text-sm leading-relaxed">
          <TypingEffect text={result.bestPath} speed={15} />
        </p>
      </motion.div>

      {/* College Recommendations */}
      <motion.div variants={fadeUp} className="space-y-4">
        <h3 className="font-display font-bold text-lg flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" /> College Recommendations
        </h3>
        {colleges.dream.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-warning" />
              <span className="text-sm font-semibold text-warning">Dream Colleges</span>
            </div>
            <div className="grid gap-2">
              {colleges.dream.map(c => <CollegeCard key={c.name} college={c} />)}
            </div>
          </div>
        )}
        {colleges.bestFit.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Best Fit Colleges</span>
            </div>
            <div className="grid gap-2">
              {colleges.bestFit.map(c => <CollegeCard key={c.name} college={c} />)}
            </div>
          </div>
        )}
        {colleges.safe.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Safe Colleges</span>
            </div>
            <div className="grid gap-2">
              {colleges.safe.map(c => <CollegeCard key={c.name} college={c} />)}
            </div>
          </div>
        )}
      </motion.div>

      {/* Profile Analysis */}
      <motion.div variants={fadeUp} className="stat-card space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          <h3 className="font-display font-bold text-lg">Profile Analysis</h3>
          <span className={`ml-auto text-xs px-2 py-1 rounded-full font-semibold ${
            result.profileAnalysis.overallRating === 'Strong' ? 'bg-accent/20 text-accent' :
            result.profileAnalysis.overallRating === 'Average' ? 'bg-warning/20 text-warning' :
            'bg-destructive/20 text-destructive'
          }`}>{result.profileAnalysis.overallRating}</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="glass-panel p-3"><strong className="text-primary text-xs">Academic Strength:</strong><p className="text-muted-foreground mt-1">{result.profileAnalysis.academicStrength}</p></div>
          <div className="glass-panel p-3"><strong className="text-primary text-xs">Board Evaluation:</strong><p className="text-muted-foreground mt-1">{result.profileAnalysis.boardEvaluation}</p></div>
          <div className="glass-panel p-3"><strong className="text-primary text-xs">Exam Performance:</strong><p className="text-muted-foreground mt-1">{result.profileAnalysis.examPerformance}</p></div>
        </div>
      </motion.div>

      {/* Risk Analysis */}
      <motion.div variants={fadeUp} className="stat-card">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-warning" />
          <h3 className="font-display font-bold text-lg">Risk Analysis</h3>
        </div>
        <div className="flex justify-around">
          <ScoreGauge score={result.riskAnalysis.admissionDifficulty} label="Admission Difficulty" color={result.riskAnalysis.admissionDifficulty > 70 ? 'destructive' : 'warning'} size="sm" />
          <ScoreGauge score={result.riskAnalysis.academicPressure} label="Academic Pressure" color={result.riskAnalysis.academicPressure > 70 ? 'destructive' : 'warning'} size="sm" />
          <ScoreGauge score={result.riskAnalysis.financialRisk} label="Financial Risk" color={result.riskAnalysis.financialRisk > 60 ? 'destructive' : 'accent'} size="sm" />
        </div>
      </motion.div>

      {/* Future Risk Prediction */}
      <motion.div variants={fadeUp} className="stat-card">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h3 className="font-display font-bold text-lg">Future Prediction</h3>
        </div>
        <div className="flex justify-around">
          <ScoreGauge score={result.futureRisk.stressLevel} label="Stress Level" color={result.futureRisk.stressLevel > 70 ? 'destructive' : 'warning'} size="sm" />
          <ScoreGauge score={result.futureRisk.placementChances} label="Placement Chances" color="accent" size="sm" />
          <ScoreGauge score={result.futureRisk.campusLifeBalance} label="Campus Life" color="primary" size="sm" />
          <ScoreGauge score={result.futureRisk.internshipOpportunities} label="Internships" color="primary" size="sm" />
        </div>
      </motion.div>

      {/* Personalized Advice */}
      <motion.div variants={fadeUp} className="stat-card">
        <div className="flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-accent" />
          <h3 className="font-display font-bold text-lg">Personalized Advice</h3>
        </div>
        <ul className="space-y-2">
          {result.personalizedAdvice.map((a, i) => (
            <li key={i} className="flex gap-2 text-sm text-muted-foreground">
              <span className="text-accent font-bold mt-0.5">→</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div variants={fadeUp} className="flex justify-center pt-2">
        <Button onClick={onReset} variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10">
          <RotateCcw className="w-4 h-4" /> Analyze Another Profile
        </Button>
      </motion.div>
    </motion.div>
  );
}
