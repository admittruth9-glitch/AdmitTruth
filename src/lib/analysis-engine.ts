export interface StudentProfile {
  location: string;
  budget: 'low' | 'medium' | 'high';
  careerGoal: 'job' | 'startup' | 'higher-studies';
  tenth: { board: string; percentage: number };
  twelfth: { board: string; percentage: number };
  eamcetRank?: number;
  jeePercentile?: number;
  jeeAdvancedRank?: number;
  interest: string;
}

export interface AnalysisResult {
  bestPath: string;
  profileAnalysis: {
    academicStrength: string;
    boardEvaluation: string;
    examPerformance: string;
    overallRating: 'Strong' | 'Average' | 'Needs Improvement';
  };
  riskAnalysis: {
    admissionDifficulty: number; // 0-100
    academicPressure: number;
    financialRisk: number;
  };
  personalizedAdvice: string[];
  futureRisk: {
    stressLevel: number;
    placementChances: number;
    campusLifeBalance: number;
    internshipOpportunities: number;
  };
}

function getBoardWeight(board: string): number {
  return ['CBSE', 'ICSE'].includes(board) ? 1.1 : 1.0;
}

function classifyPercentage(pct: number): string {
  if (pct > 85) return 'Strong';
  if (pct >= 65) return 'Average';
  return 'Needs Improvement';
}

export function analyzeProfile(profile: StudentProfile): AnalysisResult {
  const tenthWeight = getBoardWeight(profile.tenth.board);
  const twelfthWeight = getBoardWeight(profile.twelfth.board);
  const weightedTenth = profile.tenth.percentage * tenthWeight;
  const weightedTwelfth = profile.twelfth.percentage * twelfthWeight;
  const avgAcademic = (weightedTenth + weightedTwelfth) / 2;

  const tenthClass = classifyPercentage(profile.tenth.percentage);
  const twelfthClass = classifyPercentage(profile.twelfth.percentage);

  // Determine best path
  let bestPath = '';
  const hasJeeAdv = profile.jeeAdvancedRank && profile.jeeAdvancedRank <= 5000;
  const hasJee = profile.jeePercentile && profile.jeePercentile >= 90;
  const hasEamcet = profile.eamcetRank && profile.eamcetRank <= 50000;

  if (hasJeeAdv) {
    bestPath = `With JEE Advanced Rank ${profile.jeeAdvancedRank}, IITs are your strongest option. Your academic profile (${tenthClass} 10th, ${twelfthClass} 12th) supports this path. Focus on top IITs for ${profile.interest}.`;
  } else if (hasJee && hasEamcet) {
    if (profile.jeePercentile! >= 95) {
      bestPath = `Your JEE Mains percentile of ${profile.jeePercentile} opens doors to NITs and top IIITs. Combined with EAMCET Rank ${profile.eamcetRank}, you have excellent options in both national and state-level institutions for ${profile.interest}.`;
    } else {
      bestPath = `Based on your EAMCET Rank ${profile.eamcetRank} and JEE percentile ${profile.jeePercentile}, EAMCET-based admissions offer the most realistic path. Focus on top state and private colleges for ${profile.interest}.`;
    }
  } else if (hasJee) {
    bestPath = `Your JEE Mains percentile of ${profile.jeePercentile} makes NITs and IIITs achievable targets. Consider ${profile.interest} programs at these institutions.`;
  } else if (hasEamcet) {
    bestPath = `With EAMCET Rank ${profile.eamcetRank}, state-level colleges and select private institutions are your strongest options for ${profile.interest}. Focus on colleges with strong placement records.`;
  } else {
    bestPath = `Based on your academic profile, management quota or private university admissions may be the most practical path. Focus on colleges with genuine placement records for ${profile.interest}.`;
  }

  // Board evaluation
  const boardEval = `${profile.tenth.board} (10th) and ${profile.twelfth.board} (12th) — ${
    tenthWeight > 1 || twelfthWeight > 1
      ? 'CBSE/ICSE background provides stronger conceptual foundation, weighted positively in analysis.'
      : 'State board background is solid; focus on competitive exam preparation for maximum advantage.'
  }`;

  // Exam performance
  let examPerf = '';
  if (hasJeeAdv) examPerf = `JEE Advanced Rank ${profile.jeeAdvancedRank} places you in the top echelon nationally. Outstanding performance.`;
  else if (hasJee) examPerf = `JEE Mains ${profile.jeePercentile} percentile shows strong competitive aptitude. ${profile.jeePercentile! >= 95 ? 'NIT-level performance.' : 'Good foundation, consider NITs and IIITs.'}`;
  else if (hasEamcet) examPerf = `EAMCET Rank ${profile.eamcetRank} ${profile.eamcetRank! <= 10000 ? 'is competitive for top state colleges.' : profile.eamcetRank! <= 30000 ? 'opens good options in state and private colleges.' : 'provides safe admission options.'}`;
  else examPerf = 'No competitive exam scores available. Consider management quota or direct admission options.';

  // Risk analysis
  const admissionDifficulty = hasJeeAdv ? 85 : hasJee && profile.jeePercentile! >= 95 ? 70 : hasEamcet && profile.eamcetRank! <= 10000 ? 60 : 40;
  const academicPressure = avgAcademic > 85 ? 55 : avgAcademic > 70 ? 65 : 75;
  const financialRisk = profile.budget === 'low' ? 70 : profile.budget === 'medium' ? 45 : 20;

  // Future risk
  const placementChances = hasJeeAdv ? 90 : hasJee && profile.jeePercentile! >= 95 ? 80 : hasEamcet && profile.eamcetRank! <= 10000 ? 70 : 50;
  const stressLevel = hasJeeAdv ? 75 : academicPressure;
  const campusLife = hasJeeAdv ? 80 : hasJee ? 70 : 60;
  const internship = hasJeeAdv ? 90 : hasJee && profile.jeePercentile! >= 90 ? 75 : 55;

  // Personalized advice
  const advice: string[] = [];
  if (profile.careerGoal === 'job') {
    advice.push('Focus on colleges with strong industry connections and placement cells. Prioritize internships from 2nd year.');
  } else if (profile.careerGoal === 'startup') {
    advice.push('Look for colleges with incubation centers and entrepreneurship cells. Bangalore and Hyderabad offer the best startup ecosystems.');
  } else {
    advice.push('Target colleges with strong research output and faculty with international connections. Consider IITs and IISc for future MS/PhD paths.');
  }

  if (financialRisk > 60) {
    advice.push('Given budget constraints, prioritize government colleges. Apply for merit scholarships and fee waivers early.');
  }
  if (academicPressure > 65) {
    advice.push('Consider balanced colleges where you can maintain good CGPA without excessive pressure. This helps in placements and higher studies.');
  }
  if (profile.interest === 'CSE / AI / Data Science') {
    advice.push('CSE/AI is highly competitive. Supplement college learning with online certifications, open-source contributions, and competitive programming.');
  }
  if (profile.interest === 'Core (Mechanical / Civil / Electrical)') {
    advice.push('Core branches have limited but growing opportunities. Target colleges with strong lab infrastructure and industry MOUs for practical exposure.');
  }
  advice.push('Build a strong LinkedIn profile and start networking with alumni from target colleges for real insights.');

  return {
    bestPath,
    profileAnalysis: {
      academicStrength: `10th: ${profile.tenth.percentage}% (${tenthClass}) | 12th: ${profile.twelfth.percentage}% (${twelfthClass}). ${avgAcademic > 80 ? 'Your consistent performance indicates strong academic capability.' : avgAcademic > 65 ? 'Solid academic foundation with room for competitive growth.' : 'Academic scores suggest focusing on colleges where you can thrive without excessive pressure.'}`,
      boardEvaluation: boardEval,
      examPerformance: examPerf,
      overallRating: avgAcademic > 80 ? 'Strong' : avgAcademic > 65 ? 'Average' : 'Needs Improvement',
    },
    riskAnalysis: { admissionDifficulty, academicPressure, financialRisk },
    personalizedAdvice: advice,
    futureRisk: {
      stressLevel: stressLevel,
      placementChances: placementChances,
      campusLifeBalance: campusLife,
      internshipOpportunities: internship,
    },
  };
}

export function analyzeClaim(claim: string): {
  truthScore: number;
  verdict: 'True' | 'Misleading' | 'Suspicious';
  explanation: string;
  redFlags: string[];
} {
  const lower = claim.toLowerCase();
  let score = 50;
  const redFlags: string[] = [];

  // Red flag keywords
  if (lower.includes('100%')) { score -= 25; redFlags.push('"100%" claims are almost always exaggerated'); }
  if (lower.includes('guaranteed')) { score -= 20; redFlags.push('"Guaranteed" outcomes cannot be promised in education'); }
  if (lower.includes('crore package')) { score -= 15; redFlags.push('Highest packages are outliers, not representative'); }
  if (lower.includes('no 1') || lower.includes('#1') || lower.includes('number 1')) { score -= 10; redFlags.push('Ranking claims often use cherry-picked metrics'); }
  if (lower.includes('placement') && (lower.includes('100') || lower.includes('all'))) { score -= 20; redFlags.push('Universal placement claims ignore students who opt out or pursue higher studies'); }
  if (lower.includes('top') && lower.includes('rank')) { score -= 10; redFlags.push('Ranking systems vary widely; verify the ranking source'); }
  if (lower.includes('world class') || lower.includes('international')) { score -= 10; redFlags.push('Vague superlatives without specific metrics are marketing language'); }
  if (lower.includes('lakh') || lower.includes('lpa')) { score += 5; } // specific numbers = slightly more credible
  if (lower.includes('nirf') || lower.includes('naac')) { 
    score += 10; 
    if (redFlags.length === 0) {
      redFlags.push('Verified accreditation adds credibility'); 
    }
  }

  score = Math.max(5, Math.min(95, score));

  const verdict = score >= 65 ? 'True' : score >= 35 ? 'Misleading' : 'Suspicious';
  
  const explanations: Record<string, string> = {
    'True': `This claim appears largely credible based on keyword analysis. However, always verify with independent sources like NIRF rankings, alumni reviews, and placement reports.`,
    'Misleading': `This claim contains elements that are likely exaggerated or presented without full context. ${redFlags[0] || 'Claims should be verified with third-party data.'} We recommend cross-referencing with alumni experiences and official placement audit reports.`,
    'Suspicious': `This claim raises multiple red flags. ${redFlags.slice(0, 2).join('. ')}. Exercise extreme caution and verify every detail independently before making decisions based on this claim.`,
  };

  return { truthScore: score, verdict, explanation: explanations[verdict], redFlags };
}

export function detectScam(text: string): {
  scamProbability: number;
  highlightedKeywords: string[];
  explanation: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
} {
  const lower = text.toLowerCase();
  let prob = 10;
  const keywords: string[] = [];

  const scamPatterns = [
    { pattern: 'pay now', weight: 20, keyword: 'Pay Now' },
    { pattern: 'limited seats', weight: 15, keyword: 'Limited Seats' },
    { pattern: 'last date', weight: 10, keyword: 'Last Date' },
    { pattern: 'direct admission', weight: 20, keyword: 'Direct Admission' },
    { pattern: 'management quota', weight: 15, keyword: 'Management Quota' },
    { pattern: 'donation', weight: 25, keyword: 'Donation' },
    { pattern: 'capitation', weight: 25, keyword: 'Capitation' },
    { pattern: 'spot admission', weight: 15, keyword: 'Spot Admission' },
    { pattern: 'call now', weight: 15, keyword: 'Call Now' },
    { pattern: 'whatsapp', weight: 10, keyword: 'WhatsApp Contact' },
    { pattern: 'guaranteed seat', weight: 25, keyword: 'Guaranteed Seat' },
    { pattern: 'no entrance', weight: 20, keyword: 'No Entrance Exam' },
    { pattern: 'cash', weight: 20, keyword: 'Cash Payment' },
    { pattern: 'agent', weight: 20, keyword: 'Agent/Middleman' },
    { pattern: 'consultant', weight: 10, keyword: 'Consultant' },
    { pattern: 'hurry', weight: 15, keyword: 'Urgency Pressure' },
    { pattern: 'act fast', weight: 15, keyword: 'Urgency Pressure' },
    { pattern: 'special offer', weight: 15, keyword: 'Special Offer' },
    { pattern: 'discount on fee', weight: 15, keyword: 'Fee Discount' },
  ];

  scamPatterns.forEach(({ pattern, weight, keyword }) => {
    if (lower.includes(pattern)) {
      prob += weight;
      if (!keywords.includes(keyword)) keywords.push(keyword);
    }
  });

  prob = Math.min(98, prob);
  const riskLevel = prob >= 75 ? 'Critical' : prob >= 50 ? 'High' : prob >= 25 ? 'Medium' : 'Low';

  let explanation = '';
  if (prob >= 75) explanation = `CRITICAL ALERT: This message shows strong indicators of an admission scam. Multiple high-risk keywords detected: ${keywords.join(', ')}. Never pay money to agents or intermediaries. All legitimate admissions happen through official counseling processes.`;
  else if (prob >= 50) explanation = `HIGH RISK: Several suspicious elements detected. Keywords like ${keywords.join(', ')} are commonly used in fraudulent admission schemes. Verify the source through official college websites and admission helplines.`;
  else if (prob >= 25) explanation = `MODERATE RISK: Some concerning elements found. While not definitively a scam, exercise caution. Verify all claims through official channels and never share financial information with unverified sources.`;
  else explanation = `LOW RISK: No significant scam indicators detected. However, always verify admission information through official college websites and government counseling portals.`;

  return { scamProbability: prob, highlightedKeywords: keywords, explanation, riskLevel };
}
