import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { colleges } from '@/data/colleges';

export function GlobalSearch() {
  const [query, setQuery] = useState('');

  const results = query.trim().length >= 2
    ? colleges.filter(c => {
        const q = query.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.type.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.district.toLowerCase().includes(q);
      }).slice(0, 8)
    : [];

  return (
    <div className="relative max-w-md w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search colleges..."
          className="pl-10 bg-muted/30 border-border h-9 text-sm"
        />
      </div>
      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-1 left-0 right-0 glass-panel p-2 z-50 max-h-64 overflow-auto"
        >
          {results.map(c => (
            <div key={c.name} className="px-3 py-2 hover:bg-muted/50 rounded-md cursor-pointer">
              <p className="text-sm font-medium">{c.name} <span className="text-primary font-mono text-xs">[{c.code}]</span></p>
              <p className="text-xs text-muted-foreground">{c.location}, {c.district} • {c.type} • {c.avgPackage} LPA avg</p>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
