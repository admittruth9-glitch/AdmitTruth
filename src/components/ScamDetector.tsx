import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Search, AlertOctagon, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScoreGauge } from '@/components/ScoreGauge';
import { AILoadingAnimation } from '@/components/AILoadingAnimation';
import { TypingEffect } from '@/components/TypingEffect';
import { detectScam } from '@/lib/analysis-engine';

export function ScamDetector() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof detectScam> | null>(null);

  const handleDetect = () => {
    if (!text.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(detectScam(text));
      setLoading(false);
    }, 2500);
  };

  const riskConfig = {
    Low: { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10 border-accent/30' },
    Medium: { icon: Info, color: 'text-primary', bg: 'bg-primary/10 border-primary/30' },
    High: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10 border-warning/30' },
    Critical: { icon: AlertOctagon, color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30' },
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-destructive" /> Scam Detector
        </h2>
        <p className="text-sm text-muted-foreground">Paste any suspicious message, SMS, or advertisement about college admissions.</p>
        <Textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder='e.g., "Direct admission available in top college. Pay now to secure seat. Limited seats. Call this number. Guaranteed placement. No entrance exam needed."'
          className="bg-muted/30 border-border min-h-[100px] resize-none"
        />
        <Button onClick={handleDetect} disabled={!text.trim() || loading} className="bg-gradient-danger text-foreground hover:opacity-90 gap-2 w-full">
          <Search className="w-4 h-4" /> Detect Scam
        </Button>
      </div>

      {loading && <AILoadingAnimation text="Scanning for scam patterns..." />}

      {result && !loading && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="flex items-center justify-center">
            <ScoreGauge
              score={result.scamProbability}
              label="Scam Probability"
              color={result.scamProbability >= 50 ? 'destructive' : result.scamProbability >= 25 ? 'warning' : 'accent'}
            />
          </div>

          <div className={`border rounded-lg p-4 ${riskConfig[result.riskLevel].bg}`}>
            <div className="flex items-center gap-2 mb-2">
              {(() => { const Icon = riskConfig[result.riskLevel].icon; return <Icon className={`w-5 h-5 ${riskConfig[result.riskLevel].color}`} />; })()}
              <span className={`font-display font-bold text-lg ${riskConfig[result.riskLevel].color}`}>Risk Level: {result.riskLevel}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              <TypingEffect text={result.explanation} speed={12} />
            </p>
          </div>

          {result.highlightedKeywords.length > 0 && (
            <div className="glass-panel p-4">
              <h4 className="text-sm font-semibold text-destructive mb-3">Flagged Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {result.highlightedKeywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-medium border border-destructive/30">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
