import { motion } from 'framer-motion';

interface ScoreGaugeProps {
  score: number;
  label: string;
  color?: 'primary' | 'accent' | 'destructive' | 'warning';
  size?: 'sm' | 'md';
}

export function ScoreGauge({ score, label, color = 'primary', size = 'md' }: ScoreGaugeProps) {
  const dim = size === 'sm' ? 80 : 120;
  const stroke = size === 'sm' ? 6 : 8;
  const r = (dim - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const colorMap = {
    primary: 'hsl(199, 89%, 48%)',
    accent: 'hsl(160, 84%, 39%)',
    destructive: 'hsl(0, 72%, 51%)',
    warning: 'hsl(38, 92%, 50%)',
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} className="-rotate-90">
          <circle cx={dim / 2} cy={dim / 2} r={r} fill="none" stroke="hsl(222, 20%, 18%)" strokeWidth={stroke} />
          <motion.circle
            cx={dim / 2} cy={dim / 2} r={r} fill="none"
            stroke={colorMap[color]}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-display font-bold ${size === 'sm' ? 'text-lg' : 'text-2xl'} text-foreground`}>{score}%</span>
        </div>
      </div>
      <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} text-muted-foreground text-center`}>{label}</span>
    </div>
  );
}
