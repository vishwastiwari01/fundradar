"use client";

import React, { useState, useEffect } from 'react';
import { opportunities as staticOpportunities, Opportunity } from '../data/opportunities';
import { supabase } from '../lib/supabase';
import { CinematicHero } from '@/components/ui/CinematicHero';
import { LinkPreview } from '@/components/ui/LinkPreview';
import { WalletCard } from '@/components/ui/WalletCard';
import { RetroTV } from '@/components/ui/RetroTV';
import { WordsPullUp } from '@/components/ui/WordsPullUp';
import { ElegantShape } from '@/components/ui/HeroGeometric';
import { 
  Building2, 
  Rocket, 
  Zap, 
  Award, 
  Cloud, 
  Globe, 
  Bot, 
  Bell, 
  Send, 
  SlidersHorizontal, 
  MapPin, 
  Tag, 
  GraduationCap, 
  Clock, 
  Check,
  Sparkles
} from 'lucide-react';

export default function Home() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(staticOpportunities);
  const [loadingDb, setLoadingDb] = useState(true);

  const [logoErrors, setLogoErrors] = useState<Record<string, boolean>>({});

  const handleLogoError = (id: string) => {
    setLogoErrors(prev => ({ ...prev, [id]: true }));
  };

  const getLogoUrl = (opp: Opportunity): string => {
    if (opp.logo && (opp.logo.startsWith('http') || opp.logo.includes('.'))) {
      return opp.logo;
    }
    if (opp.source_url) {
      let domain = opp.source_url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
      return `https://logo.clearbit.com/${domain}`;
    }
    if (opp.organization) {
      const cleanOrg = opp.organization.toLowerCase().replace(/\s+/g, '') + '.com';
      return `https://logo.clearbit.com/${cleanOrg}`;
    }
    return '';
  };

  const [activeTab, setActiveTab] = useState('All');
  const [activeFilter, setActiveFilter] = useState('');
  const [minFund, setMinFund] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch Opportunities from Supabase on mount
  useEffect(() => {
    async function fetchOpps() {
      try {
        const { data, error } = await supabase
          .from('opportunities')
          .select('*')
          .order('deadline', { ascending: true });
        
        if (data && data.length > 0) {
          // Normalize names for compatibility
          const normalized = data.map(o => ({
            ...o, 
            logoBg: o.logo_bg || o.logoBg || 'var(--accent-dim)'
          }));
          setOpportunities(normalized);
        }
      } catch (err) {
        console.error("Supabase fetch failed, falling back to mock data", err);
      } finally {
        setLoadingDb(false);
      }
    }
    fetchOpps();
  }, []);

  // Pro Feature State
  const [isPro, setIsPro] = useState(false);
  const [deckUploaded, setDeckUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [autofillModalOpen, setAutofillModalOpen] = useState(false);
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [autofillProgress, setAutofillProgress] = useState(0);

  const setFilter = (type: string) => {
    setActiveFilter(type);
    document.getElementById('listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUploadDeck = () => {
    if (!isPro) {
      alert('This is a Pro feature. Please upgrade to use AI Pitch Autofill.');
      document.getElementById('premium')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setDeckUploaded(true);
      alert('Deck parsed! AI Context extracted successfully.');
    }, 2000);
  };

  const handleAutoApply = (opp: Opportunity) => {
    if (!isPro || !deckUploaded) {
      alert('Please upload your pitch deck first in the Pro section.');
      return;
    }
    setSelectedOpp(opp);
    setAutofillModalOpen(true);
    setAutofillProgress(0);
    
    // Simulate auto-filling
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAutofillProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const filteredOpportunities = opportunities.filter(opp => {
    if (activeTab === 'VCs' && opp.type !== 'vc') return false;
    if (activeTab === 'Hackathons' && opp.type !== 'hackathon') return false;
    if (activeTab === 'Grants' && opp.type !== 'grant') return false;
    if (activeFilter && opp.type !== activeFilter && activeFilter !== '') return false;
    if (opp.amount_min < minFund * 1000) return false;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchesName = opp.name?.toLowerCase().includes(term);
      const matchesOrg = opp.organization?.toLowerCase().includes(term);
      const matchesDesc = opp.description?.toLowerCase().includes(term);
      const matchesSector = opp.sector_tags?.some(tag => tag.toLowerCase().includes(term));
      if (!matchesName && !matchesOrg && !matchesDesc && !matchesSector) return false;
    }
    return true;
  });

  const getTagClass = (type: string) => {
    if (type === 'vc') return 'tag-vc';
    if (type === 'accelerator') return 'tag-acc';
    if (type === 'hackathon') return 'tag-hack';
    if (type === 'grant') return 'tag-grant';
    return 'tag-grant'; // default
  };

  const getTypeLabel = (type: string) => {
    if (type === 'vc') return 'VC';
    if (type === 'accelerator') return 'Accelerator';
    if (type === 'hackathon') return 'Hackathon';
    if (type === 'grant') return 'Grant';
    if (type === 'credits') return 'Credits';
    return type;
  };

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  const formatDeadline = (date: string) => {
    if (date === 'rolling') return 'Rolling';
    const d = new Date(date);
    if (isNaN(d.getTime())) return date;
    return `${d.toLocaleString('default', { month: 'short' })} ${d.getDate()}`;
  };

  const getUrl = (url: string) => {
    if (!url) return '#';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  return (
    <>
      <nav>
        <a href="#" className="logo">
          <div className="logo-dot"></div>
          FundRadar
        </a>
        <ul className="nav-links">
          <li><a href="#listings">Explore</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#premium">Pricing</a></li>
          <li><a href="#explore">VCs</a></li>
        </ul>
        <button className="nav-cta" onClick={() => document.getElementById('premium')?.scrollIntoView({ behavior: 'smooth' })}>Get Early Access</button>
      </nav>

      {/* DYNAMIC CINEMATIC HERO */}
      <CinematicHero 
        brandName="FundRadar"
        tagline1="Stop hunting."
        tagline2="Start building. "
        cardHeading="Every opportunity, cataloged."
        metricValue={opportunities.length > staticOpportunities.length ? opportunities.length : 2400}
        metricLabel="Active Funds"
      />

      {/* TICKER */}
      <div className="ticker-wrap">
        <div className="ticker" id="ticker">
          <span className="ticker-item"><span className="ticker-dot"></span> YC S25 Applications Open — Deadline: Jun 30</span>
          <span className="ticker-item"><span className="ticker-dot"></span> MLH Hackathon — $50K Prize Pool — Registrations Open</span>
          <span className="ticker-item"><span className="ticker-dot"></span> Google for Startups Fund — Up to $350K Cloud Credits</span>
          <span className="ticker-item"><span className="ticker-dot"></span> a16z SPEEDRUN — Applications Closing Jul 15</span>
          <span className="ticker-item"><span className="ticker-dot"></span> Founders Fund — Seed Round — Deep Tech Focus</span>
          <span className="ticker-item"><span className="ticker-dot"></span> AWS Activate — $100K Credits for Startups</span>
          <span className="ticker-item"><span className="ticker-dot"></span> ETH Global Brussels — $200K in Prizes</span>
          <span className="ticker-item"><span className="ticker-dot"></span> YC S25 Applications Open — Deadline: Jun 30</span>
          <span className="ticker-item"><span className="ticker-dot"></span> MLH Hackathon — $50K Prize Pool — Registrations Open</span>
        </div>
      </div>

      {/* BROWSE CATEGORIES */}
      <section className="categories-section relative" id="explore">
        {/* Subtle geometric overlay background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <ElegantShape
            delay={0.5}
            width={300}
            height={90}
            rotate={15}
            gradient="from-indigo-500/[0.12]"
            className="left-[-5%] top-[10%]"
          />
          <ElegantShape
            delay={0.8}
            width={250}
            height={80}
            rotate={-20}
            gradient="from-rose-500/[0.12]"
            className="right-[5%] bottom-[5%]"
          />
        </div>

        <div className="section-header relative z-10">
          <div>
            <div className="section-tag">Browse by Type</div>
            <h2>
              <WordsPullUp text="Every kind of capital" />
            </h2>
          </div>
          <a href="#listings" className="see-all">See all opportunities →</a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-center relative z-10">
          <div className="cat-grid">
            <div className="cat-card" onClick={() => setFilter('vc')}>
              <div className="cat-accent" style={{ background: 'var(--blue)' }}></div>
              <div className="cat-icon flex items-center h-8" style={{ color: 'var(--blue)' }}><Building2 size={24} /></div>
              <div className="cat-title">Venture Capital</div>
              <div className="cat-count">840 firms tracked</div>
            </div>
            <div className="cat-card" onClick={() => setFilter('accelerator')}>
              <div className="cat-accent" style={{ background: 'var(--orange)' }}></div>
              <div className="cat-icon flex items-center h-8" style={{ color: 'var(--orange)' }}><Rocket size={24} /></div>
              <div className="cat-title">Accelerators</div>
              <div className="cat-count">210 programs</div>
            </div>
            <div className="cat-card" onClick={() => setFilter('hackathon')}>
              <div className="cat-accent" style={{ background: 'var(--pink)' }}></div>
              <div className="cat-icon flex items-center h-8" style={{ color: 'var(--pink)' }}><Zap size={24} /></div>
              <div className="cat-title">Hackathons</div>
              <div className="cat-count">120+ this month</div>
            </div>
            <div className="cat-card" onClick={() => setFilter('grant')}>
              <div className="cat-accent" style={{ background: 'var(--accent)' }}></div>
              <div className="cat-icon flex items-center h-8" style={{ color: 'var(--accent)' }}><Award size={24} /></div>
              <div className="cat-title">Grants & Awards</div>
              <div className="cat-count">340 active grants</div>
            </div>
            <div className="cat-card" onClick={() => setFilter('credits')}>
              <div className="cat-accent" style={{ background: '#a78bfa' }}></div>
              <div className="cat-icon flex items-center h-8" style={{ color: '#a78bfa' }}><Cloud size={24} /></div>
              <div className="cat-title">Cloud Credits</div>
              <div className="cat-count">AWS, GCP, Azure</div>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <WalletCard />
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section className="listings-section relative" id="listings">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          <ElegantShape
            delay={0.2}
            width={400}
            height={110}
            rotate={-12}
            gradient="from-emerald-500/[0.1]"
            className="right-[-10%] top-[20%]"
          />
        </div>

        <div className="section-tag">Live Opportunities</div>
        <h2 style={{ marginBottom: '2rem' }}>
          Curated for <em>builders</em>
        </h2>

        <div className="listings-grid">
          {/* FILTER PANEL */}
          <div className="filter-panel">
            <div className="filter-title flex items-center gap-1.5"><SlidersHorizontal size={14} /> Filters</div>

            <div className="filter-group">
              <div className="filter-group-label">Type</div>
              <label className="filter-option"><input type="checkbox" defaultChecked /> <label>Venture Capital</label></label>
              <label className="filter-option"><input type="checkbox" defaultChecked /> <label>Hackathon</label></label>
              <label className="filter-option"><input type="checkbox" defaultChecked /> <label>Grant</label></label>
              <label className="filter-option"><input type="checkbox" /> <label>Accelerator</label></label>
              <label className="filter-option"><input type="checkbox" /> <label>Cloud Credits</label></label>
            </div>

            <div className="filter-group">
              <div className="filter-group-label">Stage</div>
              <label className="filter-option"><input type="checkbox" defaultChecked /> <label>Pre-seed</label></label>
              <label className="filter-option"><input type="checkbox" defaultChecked /> <label>Seed</label></label>
              <label className="filter-option"><input type="checkbox" /> <label>Series A</label></label>
              <label className="filter-option"><input type="checkbox" /> <label>Series B+</label></label>
            </div>

            <div className="filter-group">
              <div className="filter-group-label">Min. Funding ($K)</div>
              <input type="range" className="range-slider" min="0" max="1000" value={minFund} onChange={(e) => setMinFund(Number(e.target.value))} id="minFund" />
              <div style={{ fontSize: '0.8rem', color: 'var(--text2)', marginTop: '4px', fontFamily: 'var(--font-dm-mono), monospace' }} id="minFundVal">${minFund}K</div>
            </div>

            <div className="filter-group">
              <div className="filter-group-label">Sector</div>
              <label className="filter-option"><input type="checkbox" defaultChecked /> <label>AI / ML</label></label>
              <label className="filter-option"><input type="checkbox" /> <label>Web3 / Crypto</label></label>
              <label className="filter-option"><input type="checkbox" /> <label>Climate Tech</label></label>
              <label className="filter-option"><input type="checkbox" /> <label>FinTech</label></label>
            </div>

            <button className="btn-primary" style={{ width: '100%', fontSize: '0.875rem' }} onClick={() => { setActiveFilter(''); setSearchTerm(''); setMinFund(10); }}>Reset Filters</button>
          </div>

          {/* RESULTS */}
          <div className="results-area">
            <div className="tabs">
              {['All', 'VCs', 'Hackathons', 'Grants'].map((tab) => (
                <button
                  key={tab}
                  className={`tab ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="results-meta">
              <div className="results-count"><span>{filteredOpportunities.length}</span> opportunities found</div>
              <select className="sort-select" defaultValue="Sort: Relevance">
                <option>Sort: Match Score (High to Low)</option>
                <option>Sort: Deadline (Soonest)</option>
                <option>Sort: Amount (Highest)</option>
                <option>Sort: Newest Added</option>
              </select>
            </div>

            <div className="search-bar-wrap" style={{ marginBottom: '1.5rem' }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: 'var(--text3)' }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="text" placeholder="Search by name, organization, sector, description..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')} 
                  style={{ background: 'none', border: 'none', color: 'var(--text3)', marginRight: '8px', cursor: 'pointer', fontSize: '1.2rem' }}
                >
                  ×
                </button>
              )}
              <button className="search-btn">Search</button>
            </div>

            <div className="card-list">
              {filteredOpportunities.map((opp, idx) => (
                <div key={opp.id} className={`fund-card ${idx === 0 ? 'featured' : ''}`}>
                  <div className="fund-logo" style={{ background: opp.logoBg || 'var(--accent-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {(() => {
                      const logoUrl = getLogoUrl(opp);
                      const hasError = logoErrors[opp.id] || !logoUrl;
                      return !hasError ? (
                        <img 
                          src={logoUrl} 
                          alt={opp.organization} 
                          className="w-full h-full object-contain p-1"
                          onError={() => handleLogoError(opp.id)}
                        />
                      ) : (
                        <span className="font-bold text-xs uppercase tracking-wider text-neutral-200">{opp.organization?.substring(0, 2)}</span>
                      );
                    })()}
                  </div>
                  <div className="fund-main">
                    <div className="fund-header">
                      {/* Premium hover LinkPreview integrated */}
                      <LinkPreview url={getUrl(opp.source_url)} className="fund-name font-bold hover:text-[#c8f135] transition-colors duration-200">
                        {opp.name}
                      </LinkPreview>
                      <span className={`tag ${getTagClass(opp.type)}`} style={{ marginLeft: '8px' }}>{getTypeLabel(opp.type)}</span>
                    </div>
                    <p className="fund-desc">{opp.description}</p>
                    <div className="fund-meta">
                      {opp.geo_restriction && opp.geo_restriction.map((geo, i) => (
                        <span key={i} className="fund-meta-item flex items-center gap-1">
                          <MapPin size={12} className="text-neutral-400" />
                          <strong style={{textTransform:'capitalize'}}>{geo}</strong>
                        </span>
                      ))}
                      {opp.sector_tags && (
                        <span className="fund-meta-item flex items-center gap-1">
                          <Tag size={12} className="text-neutral-400" />
                          <strong>{opp.sector_tags.join(', ')}</strong>
                        </span>
                      )}
                      {opp.eligibility?.students_allowed && (
                        <span className="fund-meta-item flex items-center gap-1">
                          <GraduationCap size={12} className="text-neutral-400" />
                          <strong>Students Allowed</strong>
                        </span>
                      )}
                    </div>
                    {deckUploaded && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleAutoApply(opp); }}
                        style={{ marginTop: '1rem', background: 'var(--pink)', color: '#0a0a0b', border: 'none', padding: '0.4rem 1rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        ✨ Auto-Apply (Pro)
                      </button>
                    )}
                  </div>
                  <div className="fund-amount">
                    <div className="amount-num">{formatAmount(opp.amount_min)}</div>
                    <div className="amount-label">{opp.amount_label}</div>
                    <div className="deadline-badge flex items-center gap-1" style={{ background: opp.deadline_urgency === 'hot' ? 'rgba(255,107,157,0.2)' : 'var(--border2)'}}>
                      <Clock size={11} /> {formatDeadline(opp.deadline)}
                    </div>
                    {isPro && (
                      <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 'bold' }}>
                        Match: {Math.floor(Math.random() * 20) + 80}%
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Skeuomorphic RetroTV displays on zero search results */}
              {filteredOpportunities.length === 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', border: '1px dashed var(--border)', borderRadius: '14px', background: 'var(--bg2)' }}>
                  <RetroTV message="NO MATCHES" />
                  <p style={{ color: 'var(--text3)', fontSize: '0.9rem', marginTop: '-1.5rem', textAlign: 'center', maxWidth: '320px', lineHeight: 1.5 }}>
                    No funds indexed matching these parameters. Reset filters or search for another keyword.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="section-tag">Process</div>
        <h2>How <em>FundRadar</em> works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-num">01 —</div>
            <div className="step-icon text-[var(--accent)] flex items-center h-8"><Globe size={28} /></div>
            <div className="step-title">We scrape everything</div>
            <div className="step-desc">Our bots crawl VC websites, accelerator portals, hackathon platforms, and grant databases 24/7. New opportunities added within hours.</div>
          </div>
          <div className="step-card">
            <div className="step-num">02 —</div>
            <div className="step-icon text-[var(--accent)] flex items-center h-8"><Bot size={28} /></div>
            <div className="step-title">AI ranks & matches</div>
            <div className="step-desc">Claude AI analyzes your startup profile and ranks opportunities by fit, deadline, and success probability. No more irrelevant cold leads.</div>
          </div>
          <div className="step-card">
            <div className="step-num">03 —</div>
            <div className="step-icon text-[var(--accent)] flex items-center h-8"><Bell size={28} /></div>
            <div className="step-title">Real-time alerts</div>
            <div className="step-desc">Get instant notifications when a new match drops or a deadline is approaching. Email, Slack, and WhatsApp integrations available.</div>
          </div>
          <div className="step-card">
            <div className="step-num">04 —</div>
            <div className="step-icon text-[var(--accent)] flex items-center h-8"><Send size={28} /></div>
            <div className="step-title">One-click apply</div>
            <div className="step-desc">AI-drafted cold outreach and application templates pre-filled with your data. Apply to 10 opportunities in the time it used to take for one.</div>
          </div>
        </div>
      </section>

      {/* PREMIUM SECTION */}
      <section className="premium-section relative" id="premium">
        {/* Subtle geometric circles background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25">
          <ElegantShape
            delay={0.6}
            width={350}
            height={90}
            rotate={-15}
            gradient="from-[#ff6b9d]/[0.1]"
            className="left-[10%] top-[40%]"
          />
        </div>

        <div className="section-tag" style={{ color: 'var(--pink)' }}>Pro Feature</div>
        <h2 style={{ marginBottom: '2rem' }}>AI Pitch <em>Autofill</em></h2>
        <div className="premium-card">
          <div className="premium-content">
            <h3>Auto-Extract from PPTs & Docs</h3>
            <p>Upload your pitch deck or idea docs. Our AI instantly parses your vision, extracts key metrics, and auto-fills every application with tailored responses. Save 20 hours a week on repetitive forms.</p>
            
            {!isPro ? (
              <>
                <div className="price-wrap">
                  <span className="price-strike">₹1000</span>
                  <span className="price-current">₹500 <span className="price-period">/ mo (Launch Offer)</span></span>
                </div>
                <button className="btn-primary" style={{ background: 'var(--pink)', color: '#0a0a0b' }} onClick={() => setIsPro(true)}>Upgrade to Pro →</button>
              </>
            ) : (
              <div style={{ background: 'var(--bg3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Check size={16} /> Pro Active
                </div>
                {deckUploaded ? (
                  <div style={{ color: 'var(--text2)', fontSize: '0.9rem' }}>
                    <div style={{ marginBottom: '0.5rem' }}>📄 <strong>deck_v3_final.pdf</strong> parsed successfully.</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, opacity: 0.8, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <li className="flex items-center gap-1.5"><Check size={12} className="text-[var(--accent)]" /> Problem & Solution extracted</li>
                      <li className="flex items-center gap-1.5"><Check size={12} className="text-[var(--accent)]" /> Market Size analyzed</li>
                      <li className="flex items-center gap-1.5"><Check size={12} className="text-[var(--accent)]" /> Traction & Revenue captured</li>
                    </ul>
                    <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--pink)' }}>Head to the Explore section and look for the Auto-Apply buttons!</p>
                  </div>
                ) : (
                  <div>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text2)', marginBottom: '1rem' }}>Upload your latest pitch deck (.pdf, .ppt) to extract context.</p>
                    <button 
                      className="btn-primary" 
                      style={{ background: 'var(--bg2)', color: 'var(--text)', border: '1px solid var(--border)' }} 
                      onClick={handleUploadDeck}
                      disabled={uploading}
                    >
                      {uploading ? 'Parsing with AI...' : 'Upload Pitch Deck'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="premium-visual">
            <div className="pv-header"><span>Application Form</span><span style={{ color: 'var(--pink)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Sparkles size={12} /> Auto-filling...</span></div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text2)', marginBottom: '4px' }}>Describe your solution</div>
            <div className="pv-line fill"></div>
            <div className="pv-line fill" style={{ width: '70%' }}></div>
            <div className="pv-line short"></div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text2)', marginTop: '1rem', marginBottom: '4px' }}>Market Size</div>
            <div className="pv-line fill" style={{ width: '40%' }}></div>
          </div>
        </div>
      </section>

      {/* AUTOFILL MODAL */}
      {autofillModalOpen && selectedOpp && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: '16px', width: '90%', maxWidth: '600px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--pink)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AI Pitch Autofill</div>
                <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>Applying to {selectedOpp.organization}</div>
              </div>
              <button onClick={() => setAutofillModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>
            <div style={{ padding: '2rem' }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text2)' }}>
                  <span>Generating responses...</span>
                  <span>{autofillProgress}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: 'var(--pink)', width: `${autofillProgress}%`, transition: 'width 0.3s' }}></div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ background: 'var(--bg3)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginBottom: '0.5rem' }}>Question 1: What is the problem you are solving?</div>
                  <div style={{ fontSize: '0.9rem', color: autofillProgress > 20 ? 'var(--text)' : 'transparent', transition: 'color 0.5s' }}>
                    We are addressing the fragmentation in the startup funding ecosystem. Founders spend 20+ hours a week searching for grants and VCs instead of building their product.
                  </div>
                </div>
                <div style={{ background: 'var(--bg3)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text3)', marginBottom: '0.5rem' }}>Question 2: How does your solution work?</div>
                  <div style={{ fontSize: '0.9rem', color: autofillProgress > 60 ? 'var(--text)' : 'transparent', transition: 'color 0.5s' }}>
                    FundRadar uses AI to scrape thousands of active opportunities, ranks them based on the founder's profile, and offers an AI pitch autofill to generate tailored applications instantly.
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', background: 'var(--bg)' }}>
              <button className="btn-ghost" onClick={() => setAutofillModalOpen(false)}>Cancel</button>
              <button 
                className="btn-primary" 
                style={{ 
                  background: autofillProgress === 100 ? 'var(--accent)' : 'var(--bg3)', 
                  color: autofillProgress === 100 ? '#000' : 'var(--text3)', 
                  pointerEvents: autofillProgress === 100 ? 'auto' : 'none',
                  cursor: autofillProgress === 100 ? 'pointer' : 'default'
                }}
                onClick={() => {
                  alert("Application submitted successfully through FundRadar AI!");
                  setAutofillModalOpen(false);
                }}
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TESTIMONIALS */}
      <div className="testimonials">
        <div className="testi-inner">
          <div className="section-tag">Founders Love Us</div>
          <h2>Real stories, real <em>outcomes</em></h2>
          <div className="testi-grid">
            <div className="testi-card">
              <p className="testi-text">&quot;Found our seed round lead through FundRadar in 3 weeks. The AI matching was scarily accurate — every firm it suggested was genuinely interested in climate tech.&quot;</p>
              <div className="testi-author">
                <div className="avatar" style={{ background: 'var(--accent-dim)', color: 'var(--accent)' }}>AR</div>
                <div>
                  <div className="testi-name">Aanya Reddy</div>
                  <div className="testi-role">CEO @ GreenLoop — Raised $1.2M Seed</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <p className="testi-text">&quot;As a solo student founder, I had no idea where to apply for hackathons with real prize money. FundRadar showed me 40 I qualified for. Won two of them.&quot;</p>
              <div className="testi-author">
                <div className="avatar" style={{ background: 'var(--pink-dim)', color: 'var(--pink)' }}>KP</div>
                <div>
                  <div className="testi-name">Karan Patel</div>
                  <div className="testi-role">Student @ IIT Bombay — Won $18K in Hackathons</div>
                </div>
              </div>
            </div>
            <div className="testi-card">
              <p className="testi-text">&quot;The deadline tracker alone is worth it. I was losing applications because I missed windows. Now I have a pipeline view of everything I need to act on this week.&quot;</p>
              <div className="testi-author">
                <div className="avatar" style={{ background: 'var(--blue-dim)', color: 'var(--blue)' }}>SM</div>
                <div>
                  <div className="testi-name">Sara Mensah</div>
                  <div className="testi-role">Founder @ Ledgr — YC W25 Alum</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-box">
            <div className="cta-glow"></div>
            <div className="section-tag" style={{ color: 'var(--accent)' }}>Get Early Access</div>
            <h2>Stop searching.<br /><em>Start building.</em></h2>
            <p>Join 4,000+ founders and students on the waitlist. Free tier always available.</p>
            <div className="email-row">
              <input className="email-input" type="email" placeholder="your@email.com" />
              <button className="btn-primary">Join Waitlist →</button>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text3)', marginTop: '1rem' }}>No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

      <footer>
        <a href="#" className="logo" style={{ fontSize: '1rem' }}>
          <div className="logo-dot"></div>
          FundRadar
        </a>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Blog</a>
          <a href="#">API</a>
          <a href="#">Privacy</a>
          <a href="#">Twitter</a>
        </div>
        <div className="footer-note">© 2025 FundRadar · Hyderabad 🇮🇳</div>
      </footer>
    </>
  );
}
