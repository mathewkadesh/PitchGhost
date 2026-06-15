import type { Dossier } from "../lib/types";
import type { SampleReportSlug } from "../lib/constants";

/**
 * Hand-authored sample dossiers for the six firms on the homepage
 * leaderboard. These ship as static data so they render instantly with zero
 * network calls — every claim below is grounded in a public source.
 */
const GENERATED_AT = "2026-01-12T08:00:00.000Z";

export const sampleReports: Record<SampleReportSlug, Dossier> = {
  "sequoia-capital": {
    firm: "Sequoia Capital",
    partner: "Pat Grady",
    generatedAt: GENERATED_AT,
    source: "sample",
    snapshot: {
      summary:
        "One of the most influential venture firms in history, now concentrating new capital on AI-native companies while keeping its enterprise SaaS playbook intact.",
      stageFocus: "Seed through growth and pre-IPO, via a single evergreen fund",
      checkSize: "From roughly $100K (Sequoia Arc) to $100M+ at growth stage",
      sectors: ["AI/ML", "Enterprise SaaS", "Consumer", "Fintech"],
      geography:
        "US-headquartered (Menlo Park) with a European team; India/SEA and China practices spun off as independent firms in 2023.",
    },
    investmentThesis:
      "Sequoia's modern thesis centers on 'compute-native' companies — businesses where AI isn't a feature but the operating model — paired with the enterprise software discipline the firm built over five decades. Partners like Pat Grady look for a defensible wedge in a market being reshaped by foundation models, not a thin wrapper around someone else's API. Since restructuring into a single evergreen fund in 2021, Sequoia can also hold positions well past IPO, so partners increasingly ask whether a company has the bones of a multi-decade compounder rather than just a fast Series A.",
    signalsTheyReward: [
      "A precise point of view on where AI changes unit economics, not a generic 'AI for X' framing",
      "Founders who've already shipped something people use, even if small",
      "Specific thinking about defensibility once underlying models become commoditized",
      "Capital efficiency — partners often probe burn multiples and payback periods early",
      "A credible, founder-market-fit answer to 'why you, why now'",
    ],
    antiPatterns: [
      "Pitches that lean on the model provider's capability as the moat",
      "Vague TAM slides without a bottom-up path to the first 100 customers",
      "Founders who can't speak to churn, retention, or gross margin with specifics",
      "Overly broad positioning — 'we do everything for everyone'",
      "A pitch that hasn't engaged with Sequoia's own published thinking on the category",
    ],
    partnerDossier: {
      name: "Pat Grady",
      background:
        "Pat Grady joined Sequoia in 2007 and built his reputation backing enterprise software and SaaS companies through their growth stages, before becoming one of the firm's most visible voices on generative AI. He sits on the boards of several portfolio companies and, with partner Sonya Huang, authored Sequoia's widely-read generative AI thesis pieces that shaped how much of the industry talks about the 'applications vs. infrastructure' split.",
      notableInvestments: [
        {
          label: "HubSpot — board member and long-time growth-stage backer of the SaaS leader",
          source: { title: "Sequoia Capital — Pat Grady", url: "https://www.sequoiacap.com/people/pat-grady/" },
        },
        {
          label: "Notion — early growth investor",
          source: { title: "Sequoia Capital — Our Companies", url: "https://www.sequoiacap.com/our-companies/" },
        },
        {
          label: "OpenAI — investment central to Sequoia's generative AI thesis",
          source: { title: "Sequoia Capital — Generative AI's Act Two", url: "https://www.sequoiacap.com/article/generative-ai-act-two/" },
        },
      ],
      publicWriting: [
        {
          label: "\"Generative AI's Act Two\" — argues the next wave of value accrues to AI-native applications, not just model providers",
          source: { title: "Sequoia Capital", url: "https://www.sequoiacap.com/article/generative-ai-act-two/" },
        },
        {
          label: "\"Generative AI: A Creative New World\" — Sequoia's original map of the generative AI landscape",
          source: { title: "Sequoia Capital", url: "https://www.sequoiacap.com/article/generative-ai-a-creative-new-world/" },
        },
      ],
      statedInterests: [
        "AI-native applications with durable, defensible workflows",
        "Enterprise SaaS with strong net revenue retention",
        "Founders building category-defining products, not features",
        "Companies that can compound for decades, not just to an exit",
      ],
      sources: [
        { title: "Sequoia Capital — People", url: "https://www.sequoiacap.com/people/" },
        { title: "Sequoia Capital — Our Companies", url: "https://www.sequoiacap.com/our-companies/" },
        { title: "Sequoia Capital — Articles", url: "https://www.sequoiacap.com/articles/" },
      ],
    },
    recentActivity: [
      {
        title: "Sequoia Arc continues funding pre-seed founders directly",
        description:
          "Arc brings small cohorts of pre-seed companies into a structured program with direct partner access — a deliberate move to meet founders earlier than the firm's traditional Series A entry point, especially in AI.",
        sources: [{ title: "Sequoia Capital — Arc", url: "https://www.sequoiacap.com/arc/" }],
      },
      {
        title: "AI Ascent gathers Sequoia's AI portfolio founders annually",
        description:
          "Sequoia hosts an invite-only event for AI founders and researchers where partners, including Pat Grady, present updated thinking on where value is accruing across the AI stack.",
        sources: [{ title: "Sequoia Capital — AI Ascent", url: "https://www.sequoiacap.com/ai-ascent/" }],
      },
    ],
    questionsToAsk: [
      "How has Sequoia's view on the applications-vs-infrastructure value split evolved since Generative AI's Act Two?",
      "Given the evergreen fund structure, how do you think about reserves for follow-on if we raise from a firm without that structure?",
      "What would make this feel like a compute-native company to you, versus a SaaS company with an AI feature bolted on?",
      "How involved is Sequoia at the board level pre-Series B — observer, formal seat, or informal?",
      "What's the bar for moving from Arc into a full Series A check?",
    ],
    followUpEmail: {
      subject: "Following up — the defensibility question from our chat",
      body:
        "Pat — thank you for the time today. You asked how we think about defensibility once the underlying model layer commoditizes, and I wanted to give you a sharper answer than I managed in the room.\n\n[One paragraph on the specific workflow, data, or distribution moat — written for your actual product.]\n\nSince we spoke, [one new data point — a pilot conversion, a retention number, a hire].\n\nWe're finishing our round in the next few weeks — would it be useful to get [a specific team member] 20 minutes with your team before then?",
    },
  },

  a16z: {
    firm: "Andreessen Horowitz (a16z)",
    partner: "Marc Andreessen",
    generatedAt: GENERATED_AT,
    source: "sample",
    snapshot: {
      summary:
        "The largest brand-name multi-stage firm in venture, built on the 'software eating the world' thesis and now running some of the biggest dedicated AI and crypto funds in the industry.",
      stageFocus: "Seed through late-stage growth, across dedicated stage- and sector-specific funds",
      checkSize: "Roughly $1M at seed up to $100M+ in growth rounds, with larger anchor checks via dedicated funds",
      sectors: ["AI/ML", "Crypto", "Fintech", "Bio/Healthcare"],
      geography: "US-headquartered (Menlo Park & San Francisco), investing globally.",
    },
    investmentThesis:
      "Marc Andreessen's framing — that software, and now AI, restructures every industry it touches — still drives a16z's posture: place bets across the stack, from foundation models to the application layer, and back them with the largest in-house operating platform in venture (recruiting, marketing, policy, talent). The firm increasingly frames AI and 'American Dynamism' (defense, manufacturing, energy) as the decade's two biggest structural shifts, alongside a continued multi-cycle bet on crypto infrastructure.",
    signalsTheyReward: [
      "A thesis tied to a 'software/AI eats this industry' structural shift, not just a point solution",
      "Founders who think in platforms and ecosystems, not single products",
      "Willingness to use a16z's operating platform — talent, GTM, policy — as part of the plan",
      "For regulated or hard-tech categories, a credible plan for navigating policy, not just product",
      "Ambition scaled to a16z's typical multi-stage involvement — they want to follow on",
    ],
    antiPatterns: [
      "Founders dismissive of regulation in fintech, crypto, or healthcare categories",
      "A product strategy that depends on a single foundation model provider with no plan B",
      "Pitches scoped too small for the fund sizes a16z deploys",
      "No answer for 'what happens when a well-capitalized incumbent copies this in six months'",
    ],
    partnerDossier: {
      name: "Marc Andreessen",
      background:
        "Marc Andreessen co-created Mosaic, one of the first graphical web browsers, then co-founded Netscape. After Netscape and Loudcloud/Opsware, he co-founded Andreessen Horowitz in 2009 with Ben Horowitz. He has served on Meta's board of directors since 2008 — one of the longest-running independent board seats in big tech — and remains one of the firm's most prolific public writers on technology and policy.",
      notableInvestments: [
        {
          label: "Meta (Facebook) — board member since 2008",
          source: { title: "Meta Platforms — Investor Relations", url: "https://investor.atmeta.com/" },
        },
        {
          label: "Coinbase — a16z's largest and most publicly discussed crypto bet",
          source: { title: "a16z — Portfolio", url: "https://a16z.com/portfolio/" },
        },
        {
          label: "Andreessen Horowitz — co-founder and general partner since 2009",
          source: { title: "a16z — About", url: "https://a16z.com/about/" },
        },
      ],
      publicWriting: [
        {
          label: "\"Why Software Is Eating the World\" (2011) — the foundational thesis behind a16z's multi-stage, multi-sector strategy",
          source: { title: "a16z", url: "https://a16z.com/2011/08/20/why-software-is-eating-the-world/" },
        },
        {
          label: "\"It's Time to Build\" (2020) — argues institutional failure to build, not lack of ideas, is the core problem",
          source: { title: "a16z", url: "https://a16z.com/2020/04/18/its-time-to-build/" },
        },
        {
          label: "\"The Techno-Optimist Manifesto\" (2023) — Andreessen's case for technology-driven abundance, now a touchstone for a16z's AI and American Dynamism framing",
          source: { title: "a16z", url: "https://a16z.com/the-techno-optimist-manifesto/" },
        },
      ],
      statedInterests: [
        "AI across the full stack, from infrastructure to applications",
        "Crypto and decentralized infrastructure as a multi-decade bet",
        "American Dynamism — defense, manufacturing, energy, supply chains",
        "Founders willing to engage publicly and build in the open",
      ],
      sources: [
        { title: "a16z — Team", url: "https://a16z.com/team/" },
        { title: "a16z — Portfolio", url: "https://a16z.com/portfolio/" },
        { title: "a16z", url: "https://a16z.com/" },
      ],
    },
    recentActivity: [
      {
        title: "American Dynamism practice continues to scale",
        description:
          "a16z's American Dynamism fund backs companies in defense, aerospace, manufacturing, and supply chains — the 'hard tech meets policy' counterpart to the firm's AI bets.",
        sources: [{ title: "a16z — American Dynamism", url: "https://a16z.com/american-dynamism/" }],
      },
      {
        title: "Continued large-scale AI infrastructure investment",
        description:
          "a16z remains among the most active investors writing large checks into foundation model companies and the infrastructure layer beneath them, consistent with the firm's view that AI is the next platform shift after mobile.",
        sources: [{ title: "a16z — AI", url: "https://a16z.com/ai/" }],
      },
    ],
    questionsToAsk: [
      "Where in the stack — infrastructure, model, or application layer — does a16z see the most durable value accruing right now?",
      "How does a16z's operating platform typically engage with a seed-stage company day-to-day?",
      "For a category like ours, how does a16z think about policy risk, and does that shape which partner leads?",
      "Given a16z's multi-stage structure, how do you think about reserving for follow-on rounds?",
      "How does the 'Techno-Optimist' framing show up in how you evaluate a pitch like ours?",
    ],
    followUpEmail: {
      subject: "Following up — the incumbent-response question",
      body:
        "Marc — thanks for the conversation today. You pushed on what happens if a larger player responds quickly, and I wanted to come back with a sharper answer.\n\n[One paragraph on the specific distribution, data, or platform advantage that compounds even if a feature gets copied.]\n\nSince we spoke, [one new data point — usage, a partnership, a hire].\n\nWe're moving quickly on this round — happy to get [a specific team member] in front of the broader team this week if that's useful.",
    },
  },

  "index-ventures": {
    firm: "Index Ventures",
    partner: "Martin Mignot",
    generatedAt: GENERATED_AT,
    source: "sample",
    snapshot: {
      summary:
        "A dual-hub London/San Francisco firm known for backing European founders with global ambitions from the earliest stages, with particular strength in consumer marketplaces and fintech.",
      stageFocus: "Seed through Series B, with growth-stage follow-on capacity",
      checkSize: "Roughly £500K–£1M at seed, scaling to $20M+ at Series B",
      sectors: ["Consumer", "Fintech", "SaaS", "Gaming"],
      geography: "London and San Francisco, investing across Europe, the US, and Israel.",
    },
    investmentThesis:
      "Index's pitch to founders is that being based in Europe shouldn't cap ambition — the firm has repeatedly backed companies that started in a single European market and became global category leaders. Martin Mignot, who focuses on consumer and marketplace businesses, looks for network effects and unit economics that work in one city before assuming they'll work everywhere, paired with founders who think about international expansion as a sequencing problem from day one rather than an afterthought.",
    signalsTheyReward: [
      "Strong unit economics in a single city or market before claims about global scale",
      "Founders who've thought through international expansion as a sequencing problem",
      "Evidence of organic, word-of-mouth growth in consumer products",
      "A credible answer to 'why didn't a US incumbent already do this'",
      "Founders comfortable being challenged on marketplace liquidity and take-rate assumptions",
    ],
    antiPatterns: [
      "Consumer pitches with no organic growth signal, relying entirely on paid acquisition",
      "Marketplace businesses that haven't solved chicken-and-egg liquidity in at least one city",
      "Founders who frame 'European' as a limitation rather than a starting point",
      "Overconfident international expansion timelines without local-market evidence",
    ],
    partnerDossier: {
      name: "Martin Mignot",
      background:
        "Martin Mignot is a partner at Index Ventures based in London, focused on consumer technology, fintech, and marketplace businesses across Europe and the US. He has worked closely with founders building category-defining consumer brands from a single home market into global businesses, and serves as a board director at several Index portfolio companies.",
      notableInvestments: [
        {
          label: "BlaBlaCar — long-standing board-level relationship as the carpooling marketplace scaled across Europe",
          source: { title: "Index Ventures — Companies", url: "https://www.indexventures.com/companies/" },
        },
        {
          label: "Robinhood — early Index investment in the commission-free trading platform",
          source: { title: "Index Ventures — Companies", url: "https://www.indexventures.com/companies/" },
        },
      ],
      publicWriting: [
        {
          label: "Index Ventures' compensation and equity benchmarking research, widely used by European startups setting salary and option bands",
          source: { title: "Index Ventures", url: "https://www.indexventures.com/" },
        },
      ],
      statedInterests: [
        "Consumer products with organic growth loops",
        "Marketplaces with a clear liquidity strategy",
        "European founders building for global markets from day one",
        "Fintech infrastructure for consumers and SMBs",
      ],
      sources: [
        { title: "Index Ventures — Team", url: "https://www.indexventures.com/team/" },
        { title: "Index Ventures — Companies", url: "https://www.indexventures.com/companies/" },
        { title: "Index Ventures — About", url: "https://www.indexventures.com/about/" },
      ],
    },
    recentActivity: [
      {
        title: "Continued early-stage focus on European consumer and fintech",
        description:
          "Index has kept a dedicated early-stage practice alongside its growth funds, with London-based partners like Martin Mignot typically the first call for European consumer and marketplace founders.",
        sources: [{ title: "Index Ventures — Companies", url: "https://www.indexventures.com/companies/" }],
      },
    ],
    questionsToAsk: [
      "What did the early traction of a company like BlaBlaCar look like at our stage, and what told you liquidity would come?",
      "How does Index think about the right time for a European company to open a US office?",
      "Where do you draw the line between 'organic enough to back' and 'too early to tell'?",
      "How hands-on is Index at board level for seed investments versus Series A?",
    ],
    followUpEmail: {
      subject: "Following up — the liquidity question from today",
      body:
        "Martin — thank you for making time today. You asked how confident we are that liquidity holds as we expand beyond our first city, and I wanted to answer that more precisely.\n\n[One paragraph on the specific evidence — supply/demand ratios, repeat usage — from your first market.]\n\nSince we spoke, [one new data point on growth or retention].\n\nWe're planning to close this round in the coming weeks — would a short call with [a specific team member] be useful before then?",
    },
  },

  "balderton-capital": {
    firm: "Balderton Capital",
    partner: "Suranga Chandratillake",
    generatedAt: GENERATED_AT,
    source: "sample",
    snapshot: {
      summary:
        "A London-based firm investing across Europe with a long history of being the first institutional check for technical founders, now leaning heavily into AI and deep tech.",
      stageFocus: "Seed through Series B, often the first institutional round",
      checkSize: "Roughly €1M–€15M depending on stage",
      sectors: ["Deep Tech", "AI/ML", "SaaS", "Fintech"],
      geography: "London-headquartered, pan-European focus.",
    },
    investmentThesis:
      "Balderton has built its reputation on backing technically deep European founders early — often before there's a finished product. Suranga Chandratillake, who founded and took public the video search company blinkx before becoming an investor, brings an operator's lens to deep tech and AI bets: he looks for founders solving a problem they've personally felt as engineers, with a realistic view of what's hard about productionizing AI rather than just demoing it.",
    signalsTheyReward: [
      "Founders with deep technical credibility in the specific problem space — often ex-researchers or engineers who hit the problem firsthand",
      "Specific discussion of what's hard about deploying AI/ML in production — latency, cost, reliability — not just model capability",
      "Early signs of enterprise pull (design partners, pilots) even pre-product",
      "European founders with global technical ambition, not just local market plans",
    ],
    antiPatterns: [
      "AI demos that look impressive but have no path to production reliability",
      "Founders who can't speak to the operational cost of running their own models or infrastructure",
      "Generic 'deep tech' positioning without a specific, defensible technical insight",
      "Underestimating the enterprise sales cycle for technical buyers",
    ],
    partnerDossier: {
      name: "Suranga Chandratillake",
      background:
        "Before becoming a general partner at Balderton Capital, Suranga Chandratillake founded blinkx, a video search engine he built and took public on the London Stock Exchange's AIM market — giving him rare first-hand experience as a deeply technical founder who has been through an IPO. At Balderton, he focuses on deep tech, AI, and infrastructure investments across Europe, often as the first institutional investor and board member.",
      notableInvestments: [
        {
          label: "Aiven — backed the open-source data infrastructure company from an early stage",
          source: { title: "Balderton Capital — Portfolio", url: "https://www.balderton.com/portfolio/" },
        },
        {
          label: "blinkx — founded and took public the video search company prior to joining Balderton",
          source: { title: "Balderton Capital — Team", url: "https://www.balderton.com/team/" },
        },
      ],
      publicWriting: [
        {
          label: "Writes for Balderton's Insights series on AI infrastructure and deep tech investing in Europe",
          source: { title: "Balderton Capital — Insights", url: "https://www.balderton.com/insights/" },
        },
      ],
      statedInterests: [
        "AI infrastructure and applied ML with real production constraints",
        "Deep tech founded by technical operators, not just researchers",
        "European-built companies with global technical ambition",
        "Open-source-adjacent infrastructure businesses",
      ],
      sources: [
        { title: "Balderton Capital — Team", url: "https://www.balderton.com/team/" },
        { title: "Balderton Capital — Portfolio", url: "https://www.balderton.com/portfolio/" },
        { title: "Balderton Capital — Insights", url: "https://www.balderton.com/insights/" },
      ],
    },
    recentActivity: [
      {
        title: "Continued first-check investing in European AI infrastructure",
        description:
          "Balderton has stayed active as a first institutional investor in European deep tech and AI infrastructure companies, often before there's a finished product.",
        sources: [{ title: "Balderton Capital — Portfolio", url: "https://www.balderton.com/portfolio/" }],
      },
    ],
    questionsToAsk: [
      "Given your own experience taking blinkx public, what do you wish you'd known earlier about the gap between a working demo and a production system?",
      "What's the operational cost most AI infrastructure founders underestimate?",
      "How does Balderton think about the line between 'first check' and 'too early'?",
      "What would need to be true about our production reliability for this to feel fundable to you?",
    ],
    followUpEmail: {
      subject: "Following up — the production-reliability question",
      body:
        "Suranga — thanks for the time today. You asked how we think about reliability once this moves from a pilot to production load, and I wanted to give a more concrete answer.\n\n[One paragraph on the specific infrastructure, latency, or cost approach.]\n\nSince we spoke, [one new data point — a pilot result, a benchmark, a design partner].\n\nWe'd value your perspective as we firm up the round — would it help to get [a specific team member] time with your team in the next couple of weeks?",
    },
  },

  accel: {
    firm: "Accel",
    partner: "Sonali De Rycker",
    generatedAt: GENERATED_AT,
    source: "sample",
    snapshot: {
      summary:
        "One of the longest-running multi-stage firms in venture, with its London office under Sonali De Rycker a dominant force in European fintech, consumer, and marketplace investing.",
      stageFocus: "Seed through growth, with deep follow-on capacity across stages",
      checkSize: "Roughly €1M at seed scaling to $50M+ at growth",
      sectors: ["Fintech", "Consumer", "SaaS", "Marketplaces"],
      geography: "London-headquartered European practice, part of a global multi-stage platform.",
    },
    investmentThesis:
      "Accel's European practice, led by Sonali De Rycker, has consistently backed companies that became category leaders by combining a strong local foundation with rapid pan-European or global expansion — across gaming, fintech, and delivery marketplaces. The firm's annual Euroscape report reflects a broader thesis: that Europe now produces enough breakout companies that pattern recognition built on European data, not just an imported Silicon Valley playbook, is itself a competitive advantage.",
    signalsTheyReward: [
      "Evidence of product-market fit in one market with a clear playbook for the next",
      "Founders building category leaders, not just 'good businesses' — Accel checks tend to back outlier ambition",
      "Strong founding teams with complementary technical and commercial skills",
      "For fintech, regulatory readiness as a feature of the product, not an afterthought",
    ],
    antiPatterns: [
      "Founders who treat regulatory or compliance work in fintech as something to defer until later",
      "Pitches scoped to a 'good outcome' rather than a category-defining one",
      "Marketplace or gaming pitches without retention data, however early",
      "Founding teams missing either the technical or commercial half of the pair",
    ],
    partnerDossier: {
      name: "Sonali De Rycker",
      background:
        "Sonali De Rycker is a senior partner at Accel, based in London, and one of the most senior women in European venture capital. She has backed and served on the boards of companies spanning gaming, fintech, and consumer marketplaces as they scaled from European roots into global businesses, and is closely associated with Accel's annual Euroscape research on the state of the European tech ecosystem.",
      notableInvestments: [
        {
          label: "Supercell — board-level relationship with the mobile gaming company as it scaled globally",
          source: { title: "Accel — Portfolio", url: "https://www.accel.com/portfolio" },
        },
        {
          label: "Wolt — backed the delivery platform during its expansion across Europe",
          source: { title: "Accel — Portfolio", url: "https://www.accel.com/portfolio" },
        },
      ],
      publicWriting: [
        {
          label: "Accel's annual Euroscape report on the European tech and startup ecosystem",
          source: { title: "Accel — Euroscape", url: "https://www.accel.com/euroscape" },
        },
      ],
      statedInterests: [
        "Category-leading consumer and gaming companies built from Europe",
        "Fintech with regulatory readiness built in from the start",
        "Founding teams with complementary technical and commercial strengths",
        "Companies with a credible path to outlier, not just solid, outcomes",
      ],
      sources: [
        { title: "Accel — Team", url: "https://www.accel.com/team" },
        { title: "Accel — Portfolio", url: "https://www.accel.com/portfolio" },
        { title: "Accel — Euroscape", url: "https://www.accel.com/euroscape" },
      ],
    },
    recentActivity: [
      {
        title: "Euroscape report continues to frame Accel's European thesis",
        description:
          "Accel's annual Euroscape research tracks funding, talent, and category trends across European tech — a public artifact of the pattern recognition the London team applies to new pitches.",
        sources: [{ title: "Accel — Euroscape", url: "https://www.accel.com/euroscape" }],
      },
    ],
    questionsToAsk: [
      "What did the early trajectory of a European category leader you've backed look like at our stage?",
      "How does Accel distinguish a 'good business' from a category leader at seed or Series A?",
      "For a fintech pitch, how early do you want regulatory strategy worked out?",
      "How does the London team coordinate with Accel's global platform on follow-on rounds?",
    ],
    followUpEmail: {
      subject: "Following up — the category-leader question",
      body:
        "Sonali — thank you for the conversation today. You asked what would make this a category leader rather than a good business, and I wanted to come back with a sharper answer.\n\n[One paragraph on the specific expansion path or category dynamic that points to an outlier outcome.]\n\nSince we spoke, [one new data point — traction, a hire, a partnership].\n\nWe're moving on this round in the next few weeks — happy to set up time with [a specific team member] if useful.",
    },
  },

  "y-combinator": {
    firm: "Y Combinator",
    partner: "Garry Tan",
    generatedAt: GENERATED_AT,
    source: "sample",
    snapshot: {
      summary:
        "The world's most prolific early-stage program, running three-month batches that culminate in Demo Day, with a growing share of each batch building AI-native companies.",
      stageFocus: "Pre-seed, via a fixed-term cohort program",
      checkSize: "Standard YC deal: $500K total ($125K SAFE for 7% plus a $375K uncapped MFN note)",
      sectors: ["AI/ML", "Consumer", "SaaS", "Fintech"],
      geography: "San Francisco-based program, globally accessible — founders relocate for the batch.",
    },
    investmentThesis:
      "YC's model hasn't changed since Paul Graham's original essays: take a large number of bets on founders early, run them through an intense structured program, and let Demo Day create a competitive market for the best companies. Under president and CEO Garry Tan, the program has leaned hard into AI — a large share of recent batches build AI-native products — while keeping the original emphasis on 'make something people want,' weekly growth tracking, and direct, often blunt partner feedback.",
    signalsTheyReward: [
      "Founders who can show even small, real usage — YC famously prizes 'do things that don't scale' early traction",
      "Clear, weekly-trackable growth metrics rather than vague momentum claims",
      "Speed of iteration — visible evidence the team ships and responds to feedback fast",
      "For AI startups, a specific application-layer insight rather than a thin wrapper",
      "Founders comfortable with direct, high-volume feedback from partners and peers",
    ],
    antiPatterns: [
      "Pitches with no usage data at all, even informal",
      "Founders who can't articulate what they'll do differently after blunt partner feedback",
      "Overly polished decks that signal more time on fundraising than building",
      "AI pitches indistinguishable from dozens of others in the same batch",
    ],
    partnerDossier: {
      name: "Garry Tan",
      background:
        "Garry Tan is the president and CEO of Y Combinator, having previously co-founded Posterous and Posthaven and co-founded the venture firm Initialized Capital, where he was an early investor in companies including Coinbase and Instacart. Since taking over YC's leadership, he has been an outspoken public voice — frequently posting on X about building, AI, and San Francisco policy — and has steered the program toward a heavy AI focus across recent batches.",
      notableInvestments: [
        {
          label: "Coinbase — early investment via Initialized Capital, prior to his YC role",
          source: { title: "Y Combinator — About", url: "https://www.ycombinator.com/about" },
        },
        {
          label: "Instacart — early investment via Initialized Capital, prior to his YC role",
          source: { title: "Y Combinator — About", url: "https://www.ycombinator.com/about" },
        },
      ],
      publicWriting: [
        {
          label: "YC's Startup Library — the essay collection (including 'How to Start a Startup' and 'Do Things that Don't Scale') that still underpins YC's advice to founders",
          source: { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library" },
        },
        {
          label: "Garry Tan's YC YouTube appearances on fundraising and growth",
          source: { title: "Y Combinator — YouTube", url: "https://www.youtube.com/@ycombinator" },
        },
      ],
      statedInterests: [
        "AI-native products with a specific application-layer insight",
        "Founders who can demonstrate real, even tiny, usage",
        "Fast iteration speed and responsiveness to feedback",
        "Companies building toward Demo Day with a clear growth story",
      ],
      sources: [
        { title: "Y Combinator — About", url: "https://www.ycombinator.com/about" },
        { title: "Y Combinator — Startup Library", url: "https://www.ycombinator.com/library" },
        { title: "Y Combinator — Companies", url: "https://www.ycombinator.com/companies" },
      ],
    },
    recentActivity: [
      {
        title: "AI-native companies make up a large share of recent batches",
        description:
          "YC has repeatedly highlighted that a majority of companies in its most recent batches are building AI-first products, reflecting both founder interest and partner emphasis during the application process.",
        sources: [{ title: "Y Combinator — Companies", url: "https://www.ycombinator.com/companies" }],
      },
    ],
    questionsToAsk: [
      "What's the biggest difference in what YC looks for in an AI startup now versus two years ago?",
      "How should we think about the $500K standard deal relative to raising a larger seed alongside it?",
      "What does a strong 'weekly growth' story look like for a company at our stage?",
      "How directly does Garry Tan engage with individual batch companies versus group office hours?",
      "What's the most common reason YC-backed AI startups stall after Demo Day?",
    ],
    followUpEmail: {
      subject: "Following up — the growth-metric question",
      body:
        "Garry — thanks for the candid feedback today. You pushed on whether our growth was real or vanity, and I wanted to follow up with the specific number.\n\n[One paragraph on the actual weekly metric and what's driving it.]\n\nSince we spoke, [one new data point — a user milestone, a piece of feedback you've acted on].\n\nWe're applying for the next batch and would value any quick reaction to this before we submit.",
    },
  },
};

export function getSampleReport(slug: string): Dossier | undefined {
  return sampleReports[slug as SampleReportSlug];
}
