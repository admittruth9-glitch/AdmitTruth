import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScoreGauge } from '@/components/ScoreGauge';
import { AILoadingAnimation } from '@/components/AILoadingAnimation';
import { TypingEffect } from '@/components/TypingEffect';
import { analyzeClaim } from '@/lib/analysis-engine';

export function ClaimAnalyzer() {
  const [claim, setClaim] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof analyzeClaim> | null>(null);

  const handleAnalyze = () => {
    if (!claim.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(analyzeClaim(claim));
      setLoading(false);
    }, 2000);
  };

  const verdictConfig = {
    True: { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10 border-accent/30' },
    Misleading: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
    Suspicious: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30' },
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" /> TruthLens Claim Analyzer
        </h2>
        <p className="text-sm text-muted-foreground">Paste any college claim, advertisement, or promise. TruthLens will analyze its credibility.</p>
        <Textarea
          value={claim}
          onChange={e => setClaim(e.target.value)}
          placeholder='e.g., "100% placements in XYZ College with guaranteed ₹10 LPA package"'
          className="bg-muted/30 border-border min-h-[100px] resize-none"
        />
        <Button onClick={handleAnalyze} disabled={!claim.trim() || loading} className="bg-gradient-primary text-primary-foreground hover:opacity-90 gap-2 w-full">
          <Search className="w-4 h-4" /> Analyze Claim
        </Button>
      </div>

      {loading && <AILoadingAnimation text="TruthLens scanning claim..." />}

      {result && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center justify-center gap-8">
            <ScoreGauge
              score={result.truthScore}
              label="Truth Score"
              color={result.truthScore >= 65 ? 'accent' : result.truthScore >= 35 ? 'warning' : 'destructive'}
            />
          </div>

          <div className={`border rounded-lg p-4 ${verdictConfig[result.verdict].bg}`}>
            <div className="flex items-center gap-2 mb-2">
              {(() => { const Icon = verdictConfig[result.verdict].icon; return <Icon className={`w-5 h-5 ${verdictConfig[result.verdict].color}`} />; })()}
              <span className={`font-display font-bold text-lg ${verdictConfig[result.verdict].color}`}>Verdict: {result.verdict}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <TypingEffect text={result.explanation} speed={12} />
            </p>
          </div>

          {result.redFlags.length > 0 && (
            <div className="glass-panel p-4">
              <h4 className="text-sm font-semibold text-warning mb-2 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Red Flags Detected
              </h4>
              <ul className="space-y-1">
                {result.redFlags.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-destructive">•</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
