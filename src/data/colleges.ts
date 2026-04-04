export interface College {
  name: string;
  code: string; // EAMCET/University college code
  location: string;
  district: string;
  type: 'IIT' | 'NIT' | 'IIIT' | 'State' | 'Private' | 'Deemed' | 'Central' | 'Autonomous';
  rating: number; // 1-5
  brochureRating: number;
  realityRating: number;
  realityReason: string;
  avgPackage: number; // LPA
  highestPackage: number;
  placementRate: number; // %
  fees: number; // per year in lakhs
  eamcetRankCutoff?: number;
  jeePercentileCutoff?: number;
  jeeAdvancedRankCutoff?: number;
  branches: string[];
  sentiment: { positive: number; negative: number; neutral: number };
  tier: 'dream' | 'best-fit' | 'safe';
  naacGrade?: string;
  nirfRank?: number;
  establishedYear: number;
  affiliated?: string;
  bitterTruth: string; // Raw unfiltered truth
}

// ========================
// ALL TELANGANA COLLEGES
// ========================
const telanganaColleges: College[] = [
  // === TIER 1: NATIONAL INSTITUTES IN TELANGANA ===
  {
    name: "IIT Hyderabad", code: "IITH", location: "Hyderabad", district: "Sangareddy",
    type: "IIT", rating: 4.5, brochureRating: 5, realityRating: 4.5,
    realityReason: "New-gen IIT with strong AI/ML focus. Campus is still developing but academics are world-class.",
    bitterTruth: "Campus is in Kandi, middle of nowhere. Food options are terrible. Hostel life can be isolating. But if you survive the loneliness, placements are genuinely excellent.",
    avgPackage: 18, highestPackage: 140, placementRate: 88, fees: 2.2,
    jeeAdvancedRankCutoff: 800, jeePercentileCutoff: 99.4,
    branches: ["CSE", "AI", "Data Science", "Electrical", "Mechanical", "Civil"],
    sentiment: { positive: 85, negative: 5, neutral: 10 }, tier: "dream",
    naacGrade: "A++", nirfRank: 8, establishedYear: 2008
  },
  {
    name: "IIIT Hyderabad", code: "IIITH", location: "Hyderabad", district: "Hyderabad",
    type: "IIIT", rating: 5, brochureRating: 5, realityRating: 5,
    realityReason: "India's best for CS research, placements match top IITs. Research-first culture.",
    bitterTruth: "Only for hardcore CS enthusiasts. If you're not into research/coding, you'll hate it. Social life is almost zero. But placement numbers don't lie — they're real.",
    avgPackage: 22, highestPackage: 160, placementRate: 96, fees: 3.5,
    jeePercentileCutoff: 99, eamcetRankCutoff: 500,
    branches: ["CSE", "AI", "Data Science"],
    sentiment: { positive: 91, negative: 3, neutral: 6 }, tier: "dream",
    naacGrade: "A++", nirfRank: 15, establishedYear: 1998
  },
  {
    name: "NIT Warangal", code: "NITW", location: "Warangal", district: "Warangal",
    type: "NIT", rating: 4.5, brochureRating: 4.5, realityRating: 4,
    realityReason: "Strong in CSE and ECE. Placements are genuine. One of the best NITs.",
    bitterTruth: "Warangal city has nothing for students. Campus is self-contained but old infrastructure. Ragging was a problem historically. CSE/ECE placements are great but Mech/Civil students struggle badly.",
    avgPackage: 13, highestPackage: 70, placementRate: 85, fees: 1.4,
    jeePercentileCutoff: 98, eamcetRankCutoff: 2000,
    branches: ["CSE", "AI", "Data Science", "Electrical", "Mechanical", "Civil"],
    sentiment: { positive: 80, negative: 7, neutral: 13 }, tier: "dream",
    naacGrade: "A++", nirfRank: 22, establishedYear: 1959
  },
  {
    name: "University of Hyderabad", code: "UOH", location: "Hyderabad", district: "Hyderabad",
    type: "Central", rating: 4, brochureRating: 4.5, realityRating: 4,
    realityReason: "Excellent for research and humanities. Engineering programs are newer and developing.",
    bitterTruth: "Not an engineering-first university. B.Tech programs exist but don't have the same placement ecosystem as dedicated engineering colleges. Great for MTech/PhD.",
    avgPackage: 8, highestPackage: 30, placementRate: 65, fees: 0.5,
    jeePercentileCutoff: 90,
    branches: ["CSE", "AI"],
    sentiment: { positive: 70, negative: 12, neutral: 18 }, tier: "best-fit",
    naacGrade: "A++", nirfRank: 9, establishedYear: 1974
  },

  // === TIER 2: TOP PRIVATE / AUTONOMOUS IN HYDERABAD ===
  {
    name: "CBIT Hyderabad", code: "CBIT", location: "Hyderabad", district: "Hyderabad",
    type: "Autonomous", rating: 4, brochureRating: 4, realityRating: 3.5,
    realityReason: "One of the best private colleges in Telangana. Genuine placement records for CSE.",
    bitterTruth: "Only CSE students get good placements. ECE is average. Mech/Civil placements are dismal. Infrastructure is aging. They show highest package as average to parents. Fees have been increasing sharply.",
    avgPackage: 7, highestPackage: 35, placementRate: 72, fees: 1.8,
    eamcetRankCutoff: 3000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 68, negative: 12, neutral: 20 }, tier: "best-fit",
    naacGrade: "A", nirfRank: 78, establishedYear: 1979, affiliated: "Osmania University"
  },
  {
    name: "VNR VJIET", code: "VNRV", location: "Hyderabad", district: "Hyderabad",
    type: "Autonomous", rating: 4, brochureRating: 4, realityRating: 3.5,
    realityReason: "Good placement stats for CSE. Other branches are average.",
    bitterTruth: "CSE placements look good on paper but mass recruiters (TCS, Wipro, Infosys) make up 60% of offers. Core branch placements are almost non-existent. Good for getting a 'safe' IT job, not for high packages.",
    avgPackage: 6.5, highestPackage: 30, placementRate: 70, fees: 1.7,
    eamcetRankCutoff: 4000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical"],
    sentiment: { positive: 65, negative: 14, neutral: 21 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 1995, affiliated: "JNTUH"
  },
  {
    name: "Vasavi College of Engineering", code: "VCE", location: "Hyderabad", district: "Hyderabad",
    type: "Autonomous", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Decent for Hyderabad region but placement numbers are inflated in brochures.",
    bitterTruth: "They count internship stipends as placements. Real full-time placement rate is around 50%, not the 85% they claim. Good campus life though. Faculty quality is inconsistent — some excellent, many outdated.",
    avgPackage: 5.5, highestPackage: 25, placementRate: 55, fees: 1.6,
    eamcetRankCutoff: 6000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 58, negative: 18, neutral: 24 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 1981, affiliated: "Osmania University"
  },
  {
    name: "Mahatma Gandhi Institute of Technology (MGIT)", code: "MGIT", location: "Hyderabad", district: "Hyderabad",
    type: "Autonomous", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Growing college with decent infrastructure. Placements improving.",
    bitterTruth: "Brochure shows 95% placements — reality is closer to 55-60% for full-time roles. Most offers are from mass service companies at 3.5-4 LPA. Top packages are rare outliers. Attendance is strictly enforced.",
    avgPackage: 5, highestPackage: 18, placementRate: 58, fees: 1.5,
    eamcetRankCutoff: 8000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 55, negative: 20, neutral: 25 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 1997, affiliated: "JNTUH"
  },
  {
    name: "Chaitanya Bharathi Institute of Technology (CBIT-Proddatur)", code: "CBITP", location: "Hyderabad", district: "Hyderabad",
    type: "Autonomous", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Don't confuse with CBIT Gandipet. This is a different institution entirely.",
    bitterTruth: "Name confusion with the prestigious CBIT is deliberate marketing. Actual placements and infrastructure are far below CBIT Gandipet standards.",
    avgPackage: 3.5, highestPackage: 12, placementRate: 40, fees: 1.2,
    eamcetRankCutoff: 40000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 35, negative: 35, neutral: 30 }, tier: "safe",
    establishedYear: 2001, affiliated: "JNTUH"
  },
  {
    name: "Geethanjali College of Engineering and Technology", code: "GCET", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "NBA accredited. Decent infrastructure.",
    bitterTruth: "Placement numbers are padded with mass recruiters. Real average for non-CSE is 3-3.5 LPA. Location in Cheeryal is far from city. Bus commute is exhausting.",
    avgPackage: 5, highestPackage: 16, placementRate: 55, fees: 1.4,
    eamcetRankCutoff: 12000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 52, negative: 22, neutral: 26 }, tier: "best-fit",
    establishedYear: 2004, affiliated: "JNTUH"
  },
  {
    name: "Vardhaman College of Engineering", code: "VARD", location: "Hyderabad", district: "Rangareddy",
    type: "Autonomous", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Growing reputation. NAAC A grade.",
    bitterTruth: "Fees are high for what you get. Faculty is a mix of good and freshers who just completed their MTech. CSE placements are decent but other branches struggle. Shamshabad location means long commute.",
    avgPackage: 5, highestPackage: 18, placementRate: 58, fees: 1.6,
    eamcetRankCutoff: 10000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 56, negative: 19, neutral: 25 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 1999, affiliated: "JNTUH"
  },
  {
    name: "Malla Reddy College of Engineering & Technology", code: "MRCET", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Autonomous", rating: 3, brochureRating: 4.5, realityRating: 2.5,
    realityReason: "Part of Malla Reddy group. Heavy marketing doesn't match ground reality.",
    bitterTruth: "The Malla Reddy empire runs 20+ colleges — quantity over quality. Brochures show 12 LPA average, reality is 3.5-4 LPA for most. Infrastructure looks good in photos but maintenance is poor. Faculty turnover is very high. They literally have colleges with almost identical names to confuse students.",
    avgPackage: 4, highestPackage: 14, placementRate: 45, fees: 1.5,
    eamcetRankCutoff: 25000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 38, negative: 35, neutral: 27 }, tier: "safe",
    establishedYear: 2004, affiliated: "JNTUH"
  },
  {
    name: "Malla Reddy Engineering College", code: "MREC", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 3, brochureRating: 4, realityRating: 2.5,
    realityReason: "Another Malla Reddy group institution. Similar issues.",
    bitterTruth: "Same management, same problems. Multiple colleges with 'Malla Reddy' in the name — students often don't know which one they've joined until orientation day. Real placements are far below claims.",
    avgPackage: 3.5, highestPackage: 12, placementRate: 42, fees: 1.4,
    eamcetRankCutoff: 30000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 36, negative: 36, neutral: 28 }, tier: "safe",
    establishedYear: 2002, affiliated: "JNTUH"
  },
  {
    name: "Malla Reddy Institute of Technology & Science", code: "MRITS", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 2.5, brochureRating: 3.5, realityRating: 2,
    realityReason: "Yet another Malla Reddy institution. Lower quality than MRCET.",
    bitterTruth: "This is the bottom tier of the Malla Reddy colleges. Avoid unless you have absolutely no other option. Placement cell barely functions for non-CSE branches.",
    avgPackage: 3, highestPackage: 10, placementRate: 35, fees: 1.2,
    eamcetRankCutoff: 50000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 30, negative: 40, neutral: 30 }, tier: "safe",
    establishedYear: 2005, affiliated: "JNTUH"
  },
  {
    name: "CVR College of Engineering", code: "CVRE", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Average college with basic infrastructure. Placement claims need verification.",
    bitterTruth: "Ibrahimpatnam location is far from everything. Infrastructure exists but isn't maintained well. Placement data is unreliable. Most students prepare on their own for placements — college support is minimal.",
    avgPackage: 3.5, highestPackage: 12, placementRate: 45, fees: 1.2,
    eamcetRankCutoff: 30000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 40, negative: 30, neutral: 30 }, tier: "safe",
    establishedYear: 2001, affiliated: "JNTUH"
  },
  {
    name: "MVSR Engineering College", code: "MVSR", location: "Hyderabad", district: "Rangareddy",
    type: "Autonomous", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Established but needs modernization. Placements are modest.",
    bitterTruth: "Once a decent college, now struggling to keep up. Faculty is aging and not being replaced. Labs are from the 2000s era. CSE still gets some companies but other branches are practically zero placements.",
    avgPackage: 3, highestPackage: 10, placementRate: 40, fees: 1,
    eamcetRankCutoff: 35000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 38, negative: 32, neutral: 30 }, tier: "safe",
    establishedYear: 1981, affiliated: "Osmania University"
  },

  // === STATE UNIVERSITIES ===
  {
    name: "JNTU Hyderabad (Main Campus)", code: "JNTUH", location: "Hyderabad", district: "Hyderabad",
    type: "State", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Main campus is decent but affiliated colleges vary hugely in quality.",
    bitterTruth: "JNTUH main campus is okay, but 90% of students who say 'I study in JNTU' are actually in affiliated colleges which range from decent to terrible. The university name carries weight but the actual education depends entirely on WHICH college you're in.",
    avgPackage: 5, highestPackage: 25, placementRate: 55, fees: 0.8,
    eamcetRankCutoff: 15000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 50, negative: 25, neutral: 25 }, tier: "safe",
    naacGrade: "A+", nirfRank: 65, establishedYear: 1972
  },
  {
    name: "Osmania University College of Engineering", code: "OUCE", location: "Hyderabad", district: "Hyderabad",
    type: "State", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Historic university with decent faculty but outdated infrastructure.",
    bitterTruth: "Living on past glory. Infrastructure hasn't been updated in decades. Political interference is high. But the OU brand still works for government jobs and some companies. Don't expect IIT-level placements though.",
    avgPackage: 5, highestPackage: 20, placementRate: 50, fees: 0.5,
    eamcetRankCutoff: 20000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 48, negative: 27, neutral: 25 }, tier: "safe",
    naacGrade: "A++", establishedYear: 1918
  },
  {
    name: "University College of Engineering, Kakatiya University", code: "KUCE", location: "Warangal", district: "Warangal",
    type: "State", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "State university engineering college. Basic infrastructure.",
    bitterTruth: "Government college with government speed of improvement. Labs are ancient. But fees are rock-bottom. If you're self-motivated and can learn on your own, you'll do fine. Don't expect spoon-feeding or placement training.",
    avgPackage: 3.5, highestPackage: 12, placementRate: 35, fees: 0.3,
    eamcetRankCutoff: 40000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 40, negative: 30, neutral: 30 }, tier: "safe",
    establishedYear: 1976
  },

  // === MORE HYDERABAD PRIVATE COLLEGES ===
  {
    name: "Sreenidhi Institute of Science & Technology", code: "SNIST", location: "Hyderabad", district: "Rangareddy",
    type: "Autonomous", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "NAAC A grade. Decent campus. CSE placements are reasonable.",
    bitterTruth: "One of the better private colleges but still inflates numbers. Their '8 LPA average' is the average of placed students only — if you count everyone, it drops to 4-5 LPA. Ghatkesar location is inconvenient.",
    avgPackage: 5, highestPackage: 18, placementRate: 60, fees: 1.6,
    eamcetRankCutoff: 9000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 57, negative: 18, neutral: 25 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 1997, affiliated: "JNTUH"
  },
  {
    name: "Gokaraju Rangaraju Institute of Engineering & Technology", code: "GRIET", location: "Hyderabad", district: "Hyderabad",
    type: "Autonomous", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Well-maintained campus. NBA accredited programs.",
    bitterTruth: "Bachupally location is far but campus is genuinely good. CSE/IT placements are decent (5-7 LPA average). But they count every internship conversion as a placement. Core branches get almost nothing. Strict attendance policy is frustrating.",
    avgPackage: 5.5, highestPackage: 20, placementRate: 62, fees: 1.5,
    eamcetRankCutoff: 7000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 60, negative: 16, neutral: 24 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 2001, affiliated: "JNTUH"
  },
  {
    name: "Anurag University", code: "ANUR", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Deemed university status. Good infrastructure.",
    bitterTruth: "Fees are premium (₹2L+/year) but placements don't justify the cost. Average package for CSE is around 4-5 LPA with mass recruiters. The 'university' tag is recent — don't assume it equals quality. Some good faculty but mostly young and inexperienced.",
    avgPackage: 5, highestPackage: 16, placementRate: 55, fees: 2,
    eamcetRankCutoff: 15000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 52, negative: 22, neutral: 26 }, tier: "best-fit",
    establishedYear: 1997, affiliated: "Autonomous"
  },
  {
    name: "Matrusri Engineering College", code: "MEC", location: "Hyderabad", district: "Hyderabad",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Old college with some reputation but declining standards.",
    bitterTruth: "Was once decent, now declining fast. Faculty leaving for better colleges. Labs are outdated. Only merit students who self-prepare get placed. Location in Saidabad is the only plus point.",
    avgPackage: 3.5, highestPackage: 10, placementRate: 38, fees: 1,
    eamcetRankCutoff: 35000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 38, negative: 32, neutral: 30 }, tier: "safe",
    establishedYear: 1980, affiliated: "Osmania University"
  },
  {
    name: "Bhoj Reddy Engineering College for Women", code: "BRECW", location: "Hyderabad", district: "Hyderabad",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Women's college. Safe campus. Basic infrastructure.",
    bitterTruth: "Safety and discipline are genuine positives. But academic rigor and placements are below average. Companies that visit are mostly mass recruiters offering 2.5-3.5 LPA. Good for families prioritizing safety over placements.",
    avgPackage: 3, highestPackage: 8, placementRate: 35, fees: 1,
    eamcetRankCutoff: 45000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 45, negative: 25, neutral: 30 }, tier: "safe",
    establishedYear: 1998, affiliated: "Osmania University"
  },
  {
    name: "Guru Nanak Institute of Technology", code: "GNIT", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Ibrahimpatnam area college. Average infrastructure.",
    bitterTruth: "Remote location. Transport is a daily struggle. Placement cell exists on paper. Most students end up in mass recruitment drives. Don't expect individual attention or career guidance.",
    avgPackage: 3, highestPackage: 9, placementRate: 35, fees: 1.1,
    eamcetRankCutoff: 45000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 35, negative: 35, neutral: 30 }, tier: "safe",
    establishedYear: 2001, affiliated: "JNTUH"
  },
  {
    name: "Kommuri Pratap Reddy Institute of Technology", code: "KPRIT", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 2.5, brochureRating: 3.5, realityRating: 2,
    realityReason: "Below average institution. Last-resort option.",
    bitterTruth: "If you're considering this college, strongly reconsider your options. Placement rate is in single digits for non-CSE. Infrastructure is poor. Many students drop out or transfer. Only join if you have zero other options and plan to prepare for placements entirely on your own.",
    avgPackage: 2.5, highestPackage: 7, placementRate: 25, fees: 0.9,
    eamcetRankCutoff: 70000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 25, negative: 45, neutral: 30 }, tier: "safe",
    establishedYear: 2007, affiliated: "JNTUH"
  },
  {
    name: "Nalla Malla Reddy Engineering College", code: "NMREC", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Part of a college group. Average quality.",
    bitterTruth: "Yet another Malla Reddy group variant (different family but same business model). Heavy marketing, reality is average. Placement numbers are fabricated in brochures. Actual placed percentage is around 30-35%.",
    avgPackage: 3, highestPackage: 10, placementRate: 35, fees: 1.1,
    eamcetRankCutoff: 40000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 35, negative: 35, neutral: 30 }, tier: "safe",
    establishedYear: 2003, affiliated: "JNTUH"
  },
  {
    name: "CMR College of Engineering & Technology", code: "CMRCE", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Autonomous", rating: 3, brochureRating: 4, realityRating: 2.5,
    realityReason: "Good campus on paper. Reality is different.",
    bitterTruth: "CMR group runs multiple colleges. This one is better than most but the '10 LPA average' they advertise is a myth. Real average for all students is 3.5-4 LPA. Kandlakoya location. Campus looks fancy in ads, maintenance tells a different story.",
    avgPackage: 4, highestPackage: 14, placementRate: 45, fees: 1.5,
    eamcetRankCutoff: 20000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 40, negative: 30, neutral: 30 }, tier: "safe",
    establishedYear: 2002, affiliated: "JNTUH"
  },
  {
    name: "CMR Institute of Technology", code: "CMRIT", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 2.5, brochureRating: 3.5, realityRating: 2,
    realityReason: "Lower tier CMR institution.",
    bitterTruth: "Don't confuse with CMRCE. This is the weaker sibling. Placements are almost non-existent for most branches. Only CSE top performers get any offers.",
    avgPackage: 3, highestPackage: 8, placementRate: 30, fees: 1.2,
    eamcetRankCutoff: 55000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 30, negative: 40, neutral: 30 }, tier: "safe",
    establishedYear: 2005, affiliated: "JNTUH"
  },
  {
    name: "Vidya Jyothi Institute of Technology", code: "VJIT", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Average Hyderabad college. Some NBA accredited programs.",
    bitterTruth: "Location in Aziznagar is far from city center. Gets some mass recruiters. Real placements are around 35-40%. Faculty is a revolving door — new teachers every semester. Lab equipment is basic.",
    avgPackage: 3.5, highestPackage: 10, placementRate: 38, fees: 1.1,
    eamcetRankCutoff: 35000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 38, negative: 30, neutral: 32 }, tier: "safe",
    establishedYear: 2002, affiliated: "JNTUH"
  },
  {
    name: "MLR Institute of Technology", code: "MLRIT", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Growing college. Some improvement in recent years.",
    bitterTruth: "Has improved its infrastructure recently but placements are still mass-recruiter dependent. The 'Research University' tag is aspirational, not actual. CSE students who self-prepare do okay. Others struggle.",
    avgPackage: 3.5, highestPackage: 12, placementRate: 40, fees: 1.3,
    eamcetRankCutoff: 30000,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 42, negative: 28, neutral: 30 }, tier: "safe",
    establishedYear: 2005, affiliated: "JNTUH"
  },
  {
    name: "Sphoorthy Engineering College", code: "SPEC", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 2, brochureRating: 3, realityRating: 1.5,
    realityReason: "Below average. Last-resort college.",
    bitterTruth: "Avoid if you have any other option. No real placement support. Labs barely function. Faculty is severely understaffed. This is a degree-mill, not an engineering college.",
    avgPackage: 2, highestPackage: 5, placementRate: 15, fees: 0.8,
    eamcetRankCutoff: 90000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 18, negative: 55, neutral: 27 }, tier: "safe",
    establishedYear: 2004, affiliated: "JNTUH"
  },
  {
    name: "TKR College of Engineering & Technology", code: "TKRCE", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Average college. Meerpet area.",
    bitterTruth: "One of many Hyderabad colleges that exists to fill seats. CSE has some activity in placements. Other branches are dead zones. Faculty quality is poor. Only saving grace is relatively lower fees.",
    avgPackage: 3, highestPackage: 10, placementRate: 35, fees: 1,
    eamcetRankCutoff: 40000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 36, negative: 32, neutral: 32 }, tier: "safe",
    establishedYear: 2002, affiliated: "JNTUH"
  },
  {
    name: "Jayamukhi Institute of Technological Sciences", code: "JITS", location: "Warangal", district: "Warangal",
    type: "Private", rating: 2.5, brochureRating: 3, realityRating: 2,
    realityReason: "Rural Warangal college. Limited exposure.",
    bitterTruth: "Far from any IT hub. Companies don't visit. Students have to find their own jobs. Infrastructure is basic at best. Only choose if you want a degree certificate and nothing more.",
    avgPackage: 2.5, highestPackage: 6, placementRate: 20, fees: 0.7,
    eamcetRankCutoff: 80000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 25, negative: 45, neutral: 30 }, tier: "safe",
    establishedYear: 2001, affiliated: "Kakatiya University"
  },
  {
    name: "Kakatiya Institute of Technology & Science", code: "KITS", location: "Warangal", district: "Warangal",
    type: "Autonomous", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Best private college in Warangal. NAAC A grade.",
    bitterTruth: "For Warangal, this is the best you can get after NIT. But 'best in Warangal' is a low bar. Placements are improving but still mostly mass recruiters. Decent campus. If NIT Warangal is out of reach, this is a reasonable fallback.",
    avgPackage: 4.5, highestPackage: 14, placementRate: 55, fees: 1.3,
    eamcetRankCutoff: 12000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 55, negative: 18, neutral: 27 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 1980, affiliated: "Kakatiya University"
  },
  {
    name: "SR Engineering College", code: "SREC", location: "Warangal", district: "Warangal",
    type: "Autonomous", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Warangal private college. NBA accredited.",
    bitterTruth: "Second-tier Warangal college. Gets NIT Warangal rejects. Placements exist but package levels are low (3-4 LPA). The NBA accreditation is genuine but doesn't translate to great jobs.",
    avgPackage: 3.5, highestPackage: 10, placementRate: 40, fees: 1.1,
    eamcetRankCutoff: 20000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 42, negative: 28, neutral: 30 }, tier: "safe",
    establishedYear: 2002, affiliated: "JNTUH"
  },

  // === TELANGANA DISTRICTS ===
  {
    name: "Vaagdevi College of Engineering", code: "VAGE", location: "Warangal", district: "Warangal",
    type: "Private", rating: 2.5, brochureRating: 3, realityRating: 2,
    realityReason: "Small Warangal college. Minimal industry connections.",
    bitterTruth: "Exists primarily to provide a degree. No real placement infrastructure. If you go here, you're on your own for career preparation. Very low fees is the only advantage.",
    avgPackage: 2.5, highestPackage: 6, placementRate: 20, fees: 0.7,
    eamcetRankCutoff: 75000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 28, negative: 42, neutral: 30 }, tier: "safe",
    establishedYear: 2001, affiliated: "Kakatiya University"
  },
  {
    name: "Vignan Institute of Technology & Science", code: "VITS", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Part of Vignan group. Deshmukhi campus.",
    bitterTruth: "Vignan name carries some weight in AP but less in Telangana. Campus is far from city. Placement numbers are borderline fictional. Only CSE top 10% get decent offers. Everyone else is on their own.",
    avgPackage: 3.5, highestPackage: 10, placementRate: 38, fees: 1.2,
    eamcetRankCutoff: 35000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 38, negative: 30, neutral: 32 }, tier: "safe",
    establishedYear: 2002, affiliated: "JNTUH"
  },
  {
    name: "Balaji Institute of Technology & Science", code: "BITS_W", location: "Narsampet", district: "Warangal",
    type: "Private", rating: 2, brochureRating: 3, realityRating: 1.5,
    realityReason: "Rural college. Minimal infrastructure.",
    bitterTruth: "Don't be fooled by 'BITS' in the name — this has ZERO connection to BITS Pilani. It's a rural college with no placements to speak of. Pure degree factory.",
    avgPackage: 2, highestPackage: 4, placementRate: 10, fees: 0.6,
    eamcetRankCutoff: 100000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 18, negative: 52, neutral: 30 }, tier: "safe",
    establishedYear: 2005, affiliated: "Kakatiya University"
  },
  {
    name: "Nalla Narasimha Reddy Education Society's Group of Institutions", code: "NNRG", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Average private college. Ghatkesar area.",
    bitterTruth: "Long name, average reality. Mass recruiter placements for CSE. Nothing for other branches. Infrastructure is okay but not well maintained. Faculty keeps changing every year.",
    avgPackage: 3, highestPackage: 10, placementRate: 35, fees: 1.1,
    eamcetRankCutoff: 40000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 36, negative: 32, neutral: 32 }, tier: "safe",
    establishedYear: 2004, affiliated: "JNTUH"
  },
  {
    name: "ACE Engineering College", code: "ACEEC", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Average college. Some NBA accredited programs.",
    bitterTruth: "Ghatkesar area like many others. Gets some mass recruiters but the '80% placement' claim is a fantasy. Real number is closer to 35%. Average package is 3 LPA if you're lucky.",
    avgPackage: 3, highestPackage: 9, placementRate: 35, fees: 1,
    eamcetRankCutoff: 45000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 34, negative: 34, neutral: 32 }, tier: "safe",
    establishedYear: 2001, affiliated: "JNTUH"
  },
  {
    name: "Mahindra University (Ecole Centrale)", code: "MU", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 4, brochureRating: 4.5, realityRating: 3.5,
    realityReason: "New premium institution. Mahindra-backed. High fees.",
    bitterTruth: "Genuinely good academics and faculty (many foreign-trained). But fees are ₹5-6L/year — extremely expensive. First few batches are just graduating, so placement data is limited. It's a gamble — could become great or could fizzle. Good for rich students who want a premium experience.",
    avgPackage: 8, highestPackage: 25, placementRate: 70, fees: 5.5,
    jeePercentileCutoff: 85,
    branches: ["CSE", "AI", "Data Science", "Mechanical", "Electrical"],
    sentiment: { positive: 65, negative: 15, neutral: 20 }, tier: "best-fit",
    establishedYear: 2020
  },
  {
    name: "Woxsen University", code: "WOXS", location: "Hyderabad", district: "Sangareddy",
    type: "Private", rating: 3.5, brochureRating: 5, realityRating: 3,
    realityReason: "Heavy marketing. Beautiful campus. Newer institution.",
    bitterTruth: "Instagram-worthy campus, but that's mostly what you're paying for. ₹6-7L/year fees for a college with very little placement track record. Known more for MBA than B.Tech. Engineering program is still finding its feet. Beautiful campus ≠ good education.",
    avgPackage: 6, highestPackage: 15, placementRate: 50, fees: 6,
    branches: ["CSE", "AI", "Data Science"],
    sentiment: { positive: 50, negative: 25, neutral: 25 }, tier: "best-fit",
    establishedYear: 2014
  },
  {
    name: "BVRIT Hyderabad College of Engineering for Women", code: "BVRITH", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Autonomous", rating: 3.5, brochureRating: 4, realityRating: 3,
    realityReason: "Women's engineering college. Safe and disciplined environment.",
    bitterTruth: "Good for safety-conscious families. Placements for CSE are decent (4-6 LPA range). But they count every offer letter as a placement, even if students don't join. Strict rules that can feel suffocating. Overall, better than many co-ed colleges for women students.",
    avgPackage: 4.5, highestPackage: 14, placementRate: 55, fees: 1.5,
    eamcetRankCutoff: 12000,
    branches: ["CSE", "AI", "Data Science", "Electrical"],
    sentiment: { positive: 55, negative: 18, neutral: 27 }, tier: "best-fit",
    naacGrade: "A", establishedYear: 2013, affiliated: "JNTUH"
  },
  {
    name: "St. Martin's Engineering College", code: "SMEC", location: "Hyderabad", district: "Medchal-Malkajgiri",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Average private college. Dhulapally area.",
    bitterTruth: "Claims to be 'Top Engineering College' — every Hyderabad college claims this. Reality is average. Mass recruiter placements for CSE. Infrastructure is basic. Faculty quality is inconsistent.",
    avgPackage: 3.5, highestPackage: 10, placementRate: 38, fees: 1.2,
    eamcetRankCutoff: 30000,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 38, negative: 30, neutral: 32 }, tier: "safe",
    establishedYear: 2003, affiliated: "JNTUH"
  },
  {
    name: "Vignan's Institute of Information Technology (Hyderabad)", code: "VIITH", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 3, brochureRating: 3.5, realityRating: 2.5,
    realityReason: "Vignan group Hyderabad campus.",
    bitterTruth: "Different from Vignan Guntur which is in AP and better. This Hyderabad branch doesn't have the same pull with companies. Average at best.",
    avgPackage: 3.5, highestPackage: 10, placementRate: 35, fees: 1.2,
    eamcetRankCutoff: 35000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 35, negative: 32, neutral: 33 }, tier: "safe",
    establishedYear: 2003, affiliated: "JNTUH"
  },

  // === KARIMNAGAR / NIZAMABAD / OTHER DISTRICTS ===
  {
    name: "Kamala Institute of Technology & Science", code: "KITS_K", location: "Karimnagar", district: "Karimnagar",
    type: "Private", rating: 2.5, brochureRating: 3, realityRating: 2,
    realityReason: "District-level college. Limited scope.",
    bitterTruth: "If you're from Karimnagar and can't afford Hyderabad, this exists. But don't expect placements. You'll need to move to Hyderabad after graduation for any career prospects.",
    avgPackage: 2.5, highestPackage: 6, placementRate: 18, fees: 0.6,
    eamcetRankCutoff: 80000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 25, negative: 45, neutral: 30 }, tier: "safe",
    establishedYear: 2000, affiliated: "JNTUH"
  },
  {
    name: "Siddhartha Institute of Engineering & Technology", code: "SIET", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 2.5, brochureRating: 3, realityRating: 2,
    realityReason: "Below average. Ibrahimpatnam area.",
    bitterTruth: "One of the many forgettable colleges in the Ibrahimpatnam cluster. No unique selling point. Placements are almost zero for non-CSE. Even CSE gets only 2-3 companies visiting.",
    avgPackage: 2.5, highestPackage: 7, placementRate: 22, fees: 0.8,
    eamcetRankCutoff: 70000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 25, negative: 45, neutral: 30 }, tier: "safe",
    establishedYear: 2004, affiliated: "JNTUH"
  },
  {
    name: "Pendekanti Institute of Technology", code: "PIT", location: "Hyderabad", district: "Rangareddy",
    type: "Private", rating: 2.5, brochureRating: 3, realityRating: 2,
    realityReason: "Low-tier private college.",
    bitterTruth: "Exists to fill the gap for students with very low EAMCET ranks. No meaningful placements. If you're here, invest heavily in self-learning through online platforms. The college won't help your career.",
    avgPackage: 2.5, highestPackage: 6, placementRate: 18, fees: 0.8,
    eamcetRankCutoff: 75000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 22, negative: 48, neutral: 30 }, tier: "safe",
    establishedYear: 2003, affiliated: "JNTUH"
  },

  // === RECENTLY RELEVANT / GROWING COLLEGES ===
  {
    name: "JNTUH College of Engineering Sultanpur", code: "JNTUH_S", location: "Sultanpur", district: "Sangareddy",
    type: "State", rating: 3, brochureRating: 3, realityRating: 2.5,
    realityReason: "JNTUH constituent college. Government-run.",
    bitterTruth: "Gets the JNTUH brand name but none of the main campus infrastructure. Located in a village. Basic labs, minimal faculty. Only advantage is government college fees. You're essentially paying for a JNTUH degree certificate, not an education.",
    avgPackage: 3, highestPackage: 8, placementRate: 25, fees: 0.35,
    eamcetRankCutoff: 50000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 32, negative: 38, neutral: 30 }, tier: "safe",
    establishedYear: 2007
  },
  {
    name: "JNTUH College of Engineering Manthani", code: "JNTUH_M", location: "Manthani", district: "Peddapalli",
    type: "State", rating: 2.5, brochureRating: 3, realityRating: 2,
    realityReason: "Remote JNTUH constituent college.",
    bitterTruth: "In a small town with zero industry. JNTUH name on the degree is the only value. No placements worth mentioning. If you can commute to Hyderabad for interviews, the degree helps. Otherwise, it's just paper.",
    avgPackage: 2.5, highestPackage: 6, placementRate: 15, fees: 0.3,
    eamcetRankCutoff: 60000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 25, negative: 45, neutral: 30 }, tier: "safe",
    establishedYear: 2007
  },
  {
    name: "JNTUH College of Engineering Jagtial", code: "JNTUH_J", location: "Jagtial", district: "Jagtial",
    type: "State", rating: 2.5, brochureRating: 3, realityRating: 2,
    realityReason: "Remote JNTUH constituent college in district headquarters.",
    bitterTruth: "Same story as other JNTUH constituent colleges. JNTUH degree, village infrastructure. No company will travel here for placements. You will have to go to Hyderabad for everything career-related.",
    avgPackage: 2.5, highestPackage: 5, placementRate: 12, fees: 0.3,
    eamcetRankCutoff: 65000,
    branches: ["CSE", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 23, negative: 47, neutral: 30 }, tier: "safe",
    establishedYear: 2007
  },
];

// === NON-TELANGANA TOP COLLEGES (for comparison in Dream category) ===
const nationalColleges: College[] = [
  {
    name: "IIT Bombay", code: "IITB", location: "Mumbai", district: "Mumbai",
    type: "IIT", rating: 5, brochureRating: 5, realityRating: 5,
    realityReason: "World-class faculty, infrastructure, and placements consistently match claims.",
    bitterTruth: "The hype is real. But the pressure is also real. Mental health issues are common. Competition is cutthroat. If you can handle it, it's the best.",
    avgPackage: 25, highestPackage: 200, placementRate: 95, fees: 2.2,
    jeeAdvancedRankCutoff: 150, jeePercentileCutoff: 99.9,
    branches: ["CSE", "AI", "Electrical", "Mechanical"],
    sentiment: { positive: 88, negative: 4, neutral: 8 }, tier: "dream",
    naacGrade: "A++", nirfRank: 3, establishedYear: 1958
  },
  {
    name: "IIT Delhi", code: "IITD", location: "Delhi", district: "Delhi",
    type: "IIT", rating: 5, brochureRating: 5, realityRating: 5,
    realityReason: "Top-tier research and industry connections.",
    bitterTruth: "Delhi pollution is real. But academics and placements are undeniable. Hostel conditions vary. Old campus charm.",
    avgPackage: 24, highestPackage: 190, placementRate: 94, fees: 2.2,
    jeeAdvancedRankCutoff: 200, jeePercentileCutoff: 99.85,
    branches: ["CSE", "AI", "Data Science", "Electrical"],
    sentiment: { positive: 87, negative: 5, neutral: 8 }, tier: "dream",
    naacGrade: "A++", nirfRank: 2, establishedYear: 1961
  },
  {
    name: "IIT Madras", code: "IITM", location: "Chennai", district: "Chennai",
    type: "IIT", rating: 5, brochureRating: 5, realityRating: 5,
    realityReason: "Strongest research park in India.",
    bitterTruth: "Best research ecosystem in India. Hot and humid. Deer on campus are cute. Placements are genuinely world-class.",
    avgPackage: 22, highestPackage: 180, placementRate: 93, fees: 2.2,
    jeeAdvancedRankCutoff: 250, jeePercentileCutoff: 99.8,
    branches: ["CSE", "AI", "Data Science", "Mechanical"],
    sentiment: { positive: 90, negative: 3, neutral: 7 }, tier: "dream",
    naacGrade: "A++", nirfRank: 1, establishedYear: 1959
  },
  {
    name: "NIT Trichy", code: "NITT", location: "Trichy", district: "Trichy",
    type: "NIT", rating: 4.5, brochureRating: 4.5, realityRating: 4.5,
    realityReason: "Best NIT. Placements rival some IITs.",
    bitterTruth: "Genuinely great NIT. Trichy city is boring but campus life makes up for it. Placements are real and verified.",
    avgPackage: 14, highestPackage: 80, placementRate: 88, fees: 1.5,
    jeePercentileCutoff: 98.5, eamcetRankCutoff: 1500,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 83, negative: 6, neutral: 11 }, tier: "dream",
    naacGrade: "A++", nirfRank: 11, establishedYear: 1964
  },
  {
    name: "BITS Pilani", code: "BITSP", location: "Pilani", district: "Jhunjhunu",
    type: "Deemed", rating: 5, brochureRating: 5, realityRating: 4.5,
    realityReason: "Excellent academics. Unique dual degree system. High fees but strong ROI.",
    bitterTruth: "Pilani is literally in a desert. But the education and network are worth it if you can afford ₹5L+/year. Practice school system is genuinely unique and useful.",
    avgPackage: 18, highestPackage: 120, placementRate: 90, fees: 5,
    jeePercentileCutoff: 97,
    branches: ["CSE", "AI", "Mechanical", "Electrical", "Civil"],
    sentiment: { positive: 85, negative: 5, neutral: 10 }, tier: "dream",
    naacGrade: "A", nirfRank: 18, establishedYear: 1964
  },
];

export const colleges: College[] = [...telanganaColleges, ...nationalColleges];

export function getCollegeRecommendations(profile: {
  eamcetRank?: number;
  jeePercentile?: number;
  jeeAdvancedRank?: number;
  budget: 'low' | 'medium' | 'high';
  interest: string;
  location?: string;
}): { dream: College[]; bestFit: College[]; safe: College[] } {
  const { eamcetRank, jeePercentile, jeeAdvancedRank, budget, interest, location } = profile;

  const budgetMax = budget === 'low' ? 2 : budget === 'medium' ? 4 : 100;

  const branchMap: Record<string, string[]> = {
    'CSE / AI / Data Science': ['CSE', 'AI', 'Data Science'],
    'Core (Mechanical / Civil / Electrical)': ['Mechanical', 'Civil', 'Electrical'],
    'Undecided': ['CSE', 'AI', 'Data Science', 'Mechanical', 'Civil', 'Electrical'],
  };
  const preferredBranches = branchMap[interest] || branchMap['Undecided'];

  // Location-based filtering: prioritize user's location
  const locationLower = (location || '').toLowerCase().trim();
  const isLocationSpecified = locationLower.length > 0;

  const eligible = colleges.filter(c => {
    if (c.fees > budgetMax) return false;
    if (!c.branches.some(b => preferredBranches.includes(b))) return false;

    // Location filter: show colleges matching location OR national dream colleges
    if (isLocationSpecified) {
      const matchesLocation = c.location.toLowerCase().includes(locationLower) ||
        c.district.toLowerCase().includes(locationLower) ||
        locationLower.includes(c.location.toLowerCase()) ||
        locationLower.includes(c.district.toLowerCase());
      
      // Only show non-matching location if it's a dream-tier national institute
      if (!matchesLocation && c.rating < 4.5) return false;
    }

    let canAdmit = false;
    if (jeeAdvancedRank && c.jeeAdvancedRankCutoff) {
      canAdmit = canAdmit || jeeAdvancedRank <= c.jeeAdvancedRankCutoff * 2;
    }
    if (jeePercentile && c.jeePercentileCutoff) {
      canAdmit = canAdmit || jeePercentile >= c.jeePercentileCutoff - 5;
    }
    if (eamcetRank && c.eamcetRankCutoff) {
      canAdmit = canAdmit || eamcetRank <= c.eamcetRankCutoff * 2;
    }
    if (!c.jeeAdvancedRankCutoff && !c.jeePercentileCutoff && !c.eamcetRankCutoff) {
      canAdmit = true;
    }
    return canAdmit;
  });

  const dream: College[] = [];
  const bestFit: College[] = [];
  const safe: College[] = [];

  eligible.forEach(c => {
    let isSafe = false;

    if (jeeAdvancedRank && c.jeeAdvancedRankCutoff) {
      if (jeeAdvancedRank <= c.jeeAdvancedRankCutoff * 0.5) isSafe = true;
    }
    if (jeePercentile && c.jeePercentileCutoff) {
      if (jeePercentile >= c.jeePercentileCutoff + 2) isSafe = true;
    }
    if (eamcetRank && c.eamcetRankCutoff) {
      if (eamcetRank <= c.eamcetRankCutoff * 0.7) isSafe = true;
    }

    if (c.rating >= 4.5 && !isSafe) {
      dream.push(c);
    } else if (isSafe || c.rating < 3) {
      safe.push(c);
    } else {
      bestFit.push(c);
    }
  });

  return {
    dream: dream.sort((a, b) => b.rating - a.rating).slice(0, 5),
    bestFit: bestFit.sort((a, b) => b.avgPackage - a.avgPackage).slice(0, 8),
    safe: safe.sort((a, b) => b.placementRate - a.placementRate).slice(0, 5),
  };
}
