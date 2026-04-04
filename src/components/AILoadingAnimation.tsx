import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

export function AILoadingAnimation({ text = 'Analyzing...' }: { text?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 gap-6"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-20 h-20 rounded-full border-2 border-primary/30 border-t-primary"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Brain className="w-8 h-8 text-primary animate-pulse" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-primary font-display text-lg"
        >
          {text}
        </motion.span>
      </div>
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map(i => (
          <motion.div
            key={i}
            animate={{ scaleY: [1, 2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            className="w-1 h-4 bg-primary/60 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
