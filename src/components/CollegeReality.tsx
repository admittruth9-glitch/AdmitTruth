import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Star, TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { colleges, College } from '@/data/colleges';
import { AILoadingAnimation } from '@/components/AILoadingAnimation';

export function CollegeReality() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    setTimeout(() => {
      const q = query.toLowerCase();
      const found = colleges.filter(c =>
        c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.type.toLowerCase().includes(q)
      );
      setResults(found);
      setLoading(false);
    }, 1500);
  };

  const SentimentBar = ({ positive, negative, neutral }: { positive: number; negative: number; neutral: number }) => (
    <div className="w-full h-2 rounded-full overflow-hidden flex">
      <div className="bg-accent h-full" style={{ width: `${positive}%` }} />
      <div className="bg-muted-foreground/40 h-full" style={{ width: `${neutral}%` }} />
      <div className="bg-destructive h-full" style={{ width: `${negative}%` }} />
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="glass-panel p-6 space-y-4">
        <h2 className="text-xl font-display font-bold flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" /> College Reality Mode
        </h2>
        <p className="text-sm text-muted-foreground">Search any college to see Brochure vs Reality ratings, sentiment analysis, and honest assessments.</p>
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search college name, city, or type (IIT, NIT, Private)..."
            className="bg-muted/30 border-border flex-1"
          />
          <Button onClick={handleSearch} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {loading && <AILoadingAnimation text="Fetching college reality data..." />}

      {!loading && searched && results.length === 0 && (
        <div className="glass-panel p-8 text-center">
          <p className="text-muted-foreground">No colleges found. Try searching for "IIT", "NIT", "Hyderabad", etc.</p>
        </div>
      )}

      {!loading && results.map((college, i) => (
        <motion.div key={college.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="stat-card space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-display font-bold">{college.name}</h3>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary font-mono">[{college.code}]</span> • {college.location}, {college.district} • {college.type}
                {college.naacGrade && <> • NAAC {college.naacGrade}</>}
                {college.nirfRank && <> • NIRF #{college.nirfRank}</>}
              </p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/30">
              {college.avgPackage} LPA avg
            </span>
          </div>

          {/* Brochure vs Reality */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-panel p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Brochure Rating</p>
              <div className="flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < college.brochureRating ? 'text-warning fill-warning' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-lg font-bold">{college.brochureRating}/5</span>
            </div>
            <div className="glass-panel p-3 text-center">
              <p className="text-xs text-muted-foreground mb-1">Reality Rating</p>
              <div className="flex justify-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={`w-4 h-4 ${j < college.realityRating ? 'text-accent fill-accent' : 'text-muted'}`} />
                ))}
              </div>
              <span className="text-lg font-bold">{college.realityRating}/5</span>
            </div>
          </div>

          <div className="glass-panel p-3">
            <p className="text-xs text-primary font-semibold mb-1">Reality Assessment</p>
            <p className="text-sm text-muted-foreground">{college.realityReason}</p>
          </div>

          {/* Bitter Truth - The raw unfiltered reality */}
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-xs text-destructive font-semibold mb-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" /> Bitter Truth (100% Reality)
            </p>
            <p className="text-sm text-destructive/90">{college.bitterTruth}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="glass-panel p-2">
              <p className="text-muted-foreground">Avg Pkg</p>
              <p className="font-bold text-foreground">{college.avgPackage} LPA</p>
            </div>
            <div className="glass-panel p-2">
              <p className="text-muted-foreground">Highest</p>
              <p className="font-bold text-foreground">{college.highestPackage} LPA</p>
            </div>
            <div className="glass-panel p-2">
              <p className="text-muted-foreground">Placed</p>
              <p className="font-bold text-foreground">{college.placementRate}%</p>
            </div>
            <div className="glass-panel p-2">
              <p className="text-muted-foreground">Fees</p>
              <p className="font-bold text-foreground">₹{college.fees}L/yr</p>
            </div>
          </div>

          {/* Sentiment */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Student Sentiment</p>
            <SentimentBar {...college.sentiment} />
            <div className="flex justify-between mt-1 text-xs">
              <span className="flex items-center gap-1 text-accent"><TrendingUp className="w-3 h-3" /> {college.sentiment.positive}% Positive</span>
              <span className="flex items-center gap-1 text-muted-foreground"><Minus className="w-3 h-3" /> {college.sentiment.neutral}% Neutral</span>
              <span className="flex items-center gap-1 text-destructive"><TrendingDown className="w-3 h-3" /> {college.sentiment.negative}% Negative</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
