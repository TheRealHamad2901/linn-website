import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// --- CONFIGURATION ---
const poetry = {
  arabic: "يا قمر بالخمس والليل ساجي.. نور وجهك جلى عنا الظلام",
  translation: "O moon of the five-fold beauty while the night is still... the light of your face has cleared the darkness from us.",
  poet: "Ousha Al Suwaidi"
};

const greetings = ["Velkommen", "Bienvenue", "أهلاً بكِ"];

const sectionVariant = {
  initial: { opacity: 0, y: 50 },
  whileInView: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] } 
  },
  viewport: { once: true, amount: 0.1 }
};

// --- COMPONENTS ---

const BloomParticles = ({ icon, count = 35 }) => {
  const particlesArray = useMemo(() => Array.from({ length: count }), [count]);
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]">
      {particlesArray.map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-xl md:text-3xl"
          style={{ left: `${Math.random() * 100}%`, bottom: '-10%' }}
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: '-110vh', rotate: Math.random() * 720, scale: [0, 1, 1, 0.5] }}
          transition={{ duration: 3, ease: "easeOut", delay: Math.random() * 0.8 }}
        >
          {icon}
        </motion.span>
      ))}
    </div>
  );
};

const SideDecorator = ({ side }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], side === 'left' ? [-150, 150] : [150, -150]);
  const isLeft = side === 'left';
  return (
    <motion.div 
      style={{ y }}
      className={`fixed top-[15vh] ${isLeft ? 'left-[-120px]' : 'right-[-120px]'} w-[350px] h-[70vh] pointer-events-none hidden lg:block opacity-20 z-0`}
    >
      <svg viewBox="0 0 400 700" className={`w-full h-full ${isLeft ? 'stroke-rose-300' : 'stroke-rose-400'}`} fill="none" strokeWidth="0.5">
        {isLeft ? (
          <path d="M200 100 C 300 150, 300 250, 200 300 C 100 250, 100 150, 200 100 M 200 300 C 100 350, 100 450, 200 500 C 300 450, 300 350, 200 300 M 200 100 L 200 500 M 150 150 A 50 50 0 1 1 250 150" />
        ) : (
          <path d="M 0 350 Q 100 250, 200 350 T 400 350 L 400 450 Q 300 550, 200 450 T 0 450 Z M 100 100 L 300 600 M 300 100 L 100 600 M 200 0 L 200 700" />
        )}
      </svg>
    </motion.div>
  );
};

export default function MyFavouriteLinn() {
  const [index, setIndex] = useState(0);
  const [kneeStatus, setKneeStatus] = useState(() => localStorage.getItem('knee_status') || 'pending');
  const [mDayCommitted, setMDayCommitted] = useState(() => localStorage.getItem('mday_committed') === 'true');
  const [hasSubmittedFavs, setHasSubmittedFavs] = useState(() => localStorage.getItem('favs_submitted') === 'true');
  const [isSending, setIsSending] = useState(false);
  
  const mapSectionRef = useRef(null);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('linn_complete_map');
    return saved ? JSON.parse(saved) : {
      song: '', movie: '', scent: '', peace: '', dreamDay: '', norwegianWord: '', parisCorner: '', soulColor: ''
    };
  });

  useEffect(() => {
    localStorage.setItem('knee_status', kneeStatus);
    localStorage.setItem('mday_committed', mDayCommitted);
    localStorage.setItem('favs_submitted', hasSubmittedFavs);
    localStorage.setItem('linn_complete_map', JSON.stringify(favorites));
  }, [kneeStatus, mDayCommitted, favorites, hasSubmittedFavs]);

  useEffect(() => {
    const greetTimer = setInterval(() => setIndex(i => (i + 1) % greetings.length), 4000);
    return () => clearInterval(greetTimer);
  }, []);

  useEffect(() => {
    if (hasSubmittedFavs && mapSectionRef.current) {
        mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hasSubmittedFavs]);

  const handleFavSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    setIsSending(false);
    setHasSubmittedFavs(true);
  };

  const adores = [
    { title: "The Smile", desc: "The way it lights up everything around you, even through a screen." },
    { title: "The 'Denial'", desc: "The way you pretend to not like my shameless flirting (we both know you love it)." },
    { title: "The Influence", desc: "For being such a good influence on me and pushing me to be better every single day." },
    { title: "The Depth", desc: "Your effortless affection and the deep empathy you show to everyone around you." },
    { title: "The Redirect", desc: "How you always answer my questions with questions of your own—I see what you're doing." },
    { title: "The Heist", desc: "How you have to sneak away from your mom just to talk to me (hehe)." }
  ];

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-[#1A1A1A] font-sans selection:bg-rose-100 overflow-x-hidden relative">
      
      {/* 🌊 Liquid Side Terrain 🌊 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(135deg, #FCFAF7 0%, #E8DED1 25%, #FCFAF7 50%, #E5B7A1 75%, #FCFAF7 100%)',
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      <SideDecorator side="left" />
      <SideDecorator side="right" />

      <AnimatePresence>
        {(kneeStatus === 'yes' || hasSubmittedFavs || mDayCommitted) && <BloomParticles icon="🌹" />}
        {kneeStatus === 'no' && <BloomParticles icon="❤️" />}
      </AnimatePresence>

      {/* 1. HERO */}
      <section className="h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 2 }}>
          <div className="text-[10px] tracking-[0.6em] text-rose-500 font-bold mb-8 uppercase italic">{greetings[index]}</div>
          <h1 className="text-[18vw] lg:text-[160px] font-serif leading-none mb-4 tracking-tighter">Linn.</h1>
          <p className="text-gray-400 tracking-[0.4em] uppercase text-[9px] font-medium">An Archive for You</p>
        </motion.div>
      </section>

      {/* 2. STATIONERY LETTER */}
      <motion.section {...sectionVariant} className="py-24 lg:py-48 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-md p-10 md:p-16 rounded-sm shadow-[30px_30px_80px_rgba(0,0,0,0.03)] border border-white relative overflow-hidden">
            <div className="absolute top-6 right-6 w-12 h-12 border border-rose-200 rounded-full flex items-center justify-center opacity-30">
              <span className="text-[7px] text-rose-400 font-bold uppercase tracking-tighter text-center leading-none">Priority<br/>Post</span>
            </div>
            <div className="mt-6 mb-16 border-b border-rose-50 pb-8 flex justify-between items-end">
              <div className="space-y-1"><p className="text-[9px] uppercase tracking-widest text-rose-400 font-bold">From</p><p className="text-sm font-serif italic">Sharjah, UAE</p></div>
              <div className="text-right space-y-1"><p className="text-[9px] uppercase tracking-widest text-rose-400 font-bold">To</p><p className="text-sm font-serif italic">Paris, France</p></div>
            </div>
            <div className="relative">
              <p className="text-xl md:text-2xl font-serif italic text-gray-800 mb-8 leading-relaxed">
                "If you're reading this, you're highly likely a very cute tall Norwegian girl with a wonky knee who may or may not secretly have a crush on her secret Arab muse."
              </p>
              <div className="space-y-6 text-gray-500 font-light text-base md:text-lg leading-relaxed">
                <p>I've been working on this little website through the weekend and well since I got today off early, I wanted to really give this a special touch, because you deserve it.</p>
                <p>I do want to get to know you more too, so below I attached a couple of things you can give me—questions that go a bit deeper, so I can fill the time in which I am yet to hold you in my arms with something that is truly you.</p>
              </div>
              <div className="mt-20 text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">With all my affection,</p>
                <p className="text-5xl text-rose-500 font-signature leading-none">Your favourite Tech prodigy</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. THE ADORATION GALLERY */}
      <motion.section {...sectionVariant} className="py-24 lg:py-40 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-serif mb-20 text-center tracking-tight">The Details I Adore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {adores.map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className={`p-10 bg-white/40 border border-white/60 shadow-sm rounded-sm ${i % 2 === 1 ? 'md:mt-12' : ''}`}
              >
                <span className="text-[9px] uppercase tracking-[0.4em] text-rose-300 font-bold mb-4 block italic">Detail {i + 1}</span>
                <h3 className="text-2xl font-serif italic mb-4 text-gray-800 tracking-tight">{item.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. MAP OF SOUL (Stability Refined) */}
      <section 
        ref={mapSectionRef}
        className="py-24 lg:py-40 px-6 bg-white relative z-10 shadow-sm border-y border-gray-50 overflow-hidden"
      >
        <motion.div {...sectionVariant} className="max-w-2xl mx-auto min-h-[700px] flex flex-col justify-center">
          {/* PURPOSE HEADER ADDED HERE */}
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif mb-6 tracking-tight">A Map of Your Soul</h2>
            <div className="h-px w-12 bg-rose-100 mx-auto mb-6" />
            <p className="text-gray-500 font-light italic text-lg leading-relaxed max-w-lg mx-auto px-4">
              "To know you is to understand the rhythm of your world. This map is a quiet archive of the sights, scents, and sounds that move you—a way for me to understand you better "
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {!hasSubmittedFavs ? (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} onSubmit={handleFavSubmit} className="space-y-24 text-left">
                <div className="space-y-14">
                  <h3 className="text-rose-800 font-serif italic text-2xl border-b border-rose-50 pb-2 inline-block">The Aesthetic</h3>
                  <Question label="Favourite Song" value={favorites.song} onChange={(v)=>setFavorites({...favorites, song: v})} placeholder="What's playing right now?" />
                  <Question label="Favourite Movie" value={favorites.movie} onChange={(v)=>setFavorites({...favorites, movie: v})} placeholder="The story you never get tired of..." />
                  <Question label="A Norwegian Word" value={favorites.norwegianWord} onChange={(v)=>setFavorites({...favorites, norwegianWord: v})} placeholder="One that feels like home." />
                </div>
                <div className="space-y-14">
                  <h3 className="text-rose-800 font-serif italic text-2xl border-b border-rose-50 pb-2 inline-block">The Senses</h3>
                  <Question label="The Scent of Paris" value={favorites.scent} onChange={(v)=>setFavorites({...favorites, scent: v})} placeholder="Rain on stone, or fresh croissants?" />
                  <Question label="The Color of Your Soul" value={favorites.soulColor} onChange={(v)=>setFavorites({...favorites, soulColor: v})} placeholder="If you were a shade in a painting..." />
                </div>
                <div className="space-y-14">
                  <h3 className="text-rose-800 font-serif italic text-2xl border-b border-rose-50 pb-2 inline-block">The Connection</h3>
                  <Question label="A Dream Day" value={favorites.dreamDay} onChange={(v)=>setFavorites({...favorites, dreamDay: v})} placeholder="If we had 24 hours and no rules?" />
                  <Question label="Your Secret Parisian Corner" value={favorites.parisCorner} onChange={(v)=>setFavorites({...favorites, parisCorner: v})} placeholder="The view you've never told anyone about." />
                </div>
                <button disabled={isSending} className="w-full py-6 bg-[#1A1A1A] text-white rounded-full font-bold uppercase tracking-[0.4em] text-[10px] hover:bg-rose-500 transition-all shadow-2xl relative overflow-hidden disabled:bg-gray-800">
                  <span className={isSending ? 'opacity-0' : 'opacity-100'}>Submit to my muse</span>
                  {isSending && <motion.div initial={{ left: '-100%' }} animate={{ left: '0%' }} transition={{ duration: 2.5, ease: "linear" }} className="absolute inset-0 bg-rose-500 flex items-center justify-center"><span className="tracking-[0.2em]">Sending to your muse...</span></motion.div>}
                </button>
              </motion.form>
            ) : (
              <motion.div key="confirmed" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} className="p-16 bg-[#FCFAF7] rounded-[3rem] border border-rose-50 text-center shadow-inner py-32 relative">
                <div className="mb-8 opacity-20 text-rose-400 flex justify-center"><svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"/></svg></div>
                <h3 className="text-3xl font-serif text-rose-900 mb-6 italic">Pieces of you, safely kept.</h3>
                <p className="text-gray-500 font-light text-xl mb-12 italic leading-relaxed">"I feel a bit more complete now that I have these details. They are saved in my archive until the day we can experience them together."</p>
                <button onClick={()=>setHasSubmittedFavs(false)} className="text-[10px] uppercase tracking-widest text-gray-300 underline hover:text-rose-500 transition-colors">Edit your map</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* 5. POETRY */}
      <motion.section {...sectionVariant} className="py-40 lg:py-60 bg-[#1A1A1A] text-[#FCFAF7] px-6 text-center relative z-10">
        <p className="text-5xl lg:text-8xl font-arabic leading-[1.8] mb-12 tracking-wide" dir="rtl">{poetry.arabic}</p>
        <div className="h-px w-20 bg-rose-900 mx-auto mb-12" />
        <p className="text-xl lg:text-3xl font-serif italic text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed px-4">"{poetry.translation}"</p>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">— {poetry.poet}</p>
      </motion.section>

      {/* 6. KNEE */}
      <motion.section {...sectionVariant} className="py-32 lg:py-48 px-6 max-w-xl mx-auto text-center relative z-10">
        <h2 className="text-3xl lg:text-4xl font-serif mb-12">Bionic Verification</h2>
        <div className="bg-white p-12 lg:p-20 rounded-[3rem] border border-gray-50 shadow-sm">
          <AnimatePresence mode="wait">
            {kneeStatus === 'pending' ? (
              <div key="p" className="space-y-12">
                <p className="text-gray-500 font-light italic text-lg leading-relaxed">Will those wonky knees be back to 100% and ready for our walks?</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center"><button onClick={()=>setKneeStatus('yes')} className="bg-[#1A1A1A] text-white px-12 py-4 rounded-full font-bold hover:bg-rose-500 transition-all shadow-lg">Yes / Ja</button><button onClick={()=>setKneeStatus('no')} className="bg-gray-50 text-gray-400 px-12 py-4 rounded-full font-bold hover:bg-gray-100 transition-all">Not quite</button></div>
              </div>
            ) : (
              <div key="r">{kneeStatus === 'yes' ? <h3 className="text-4xl font-serif text-rose-900">Official 🌹</h3> : <p className="text-2xl font-serif italic text-rose-800 leading-relaxed italic">"(its okay, what can be more perfect than whats already perfect xoxo)"</p>}<button onClick={()=>setKneeStatus('pending')} className="mt-16 text-[9px] text-gray-300 uppercase underline block mx-auto tracking-widest hover:text-rose-500">Reset Verification</button></div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* 7. M-DAY RSVP */}
      <motion.section {...sectionVariant} className="py-32 md:py-48 px-6 bg-[#F5F2EE] border-y border-white relative z-10">
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait">
            {!mDayCommitted ? (
              <motion.div key="i-l" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="bg-white p-12 md:p-16 rounded-sm shadow-[30px_30px_80px_rgba(0,0,0,0.02)] border border-rose-50">
                <div className="flex justify-between items-start mb-14 border-b border-rose-50 pb-8"><div className="space-y-1"><span className="text-[9px] uppercase tracking-[0.4em] text-rose-300 font-bold">Event</span><h2 className="text-2xl font-serif italic text-gray-800">M-Day</h2></div><div className="text-right space-y-1"><span className="text-[9px] uppercase tracking-[0.4em] text-rose-300 font-bold">Timeline</span><span className="text-sm font-serif italic underline decoration-rose-200 underline-offset-4">Before August</span></div></div>
                <div className="space-y-8 text-center md:text-left"><p className="text-xl md:text-2xl font-serif leading-relaxed text-gray-800 italic">Hamad Almheiri requests the pleasure of your company for the very first meeting of hearts and minds.</p><p className="text-gray-500 font-light text-base md:text-lg leading-relaxed">Aiming for our first date <span className="text-rose-500 italic">before August</span>. Since you clearly can’t get enough of your muse, I’m hustling even harder to bridge the gap sooner. It’s a lot of work, but when the motivation is a girl as beautiful as you, every bit of effort feels like a privilege.</p><div className="pt-8 flex flex-col items-center justify-center"><button onClick={() => setMDayCommitted(true)} className="px-16 py-5 bg-[#1A1A1A] text-white rounded-full font-bold shadow-2xl tracking-[0.3em] text-[10px] uppercase hover:bg-rose-500 transition-all">Accept Invitation 🌹</button><p className="mt-4 text-[9px] text-gray-300 uppercase tracking-widest text-center">Formal RSVP Required</p></div></div>
              </motion.div>
            ) : (
              <motion.div key="a-l" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-14 md:p-20 rounded-sm shadow-2xl border-2 border-rose-100 text-center relative overflow-hidden"><div className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest text-rose-500">Sealed</div><span className="text-[10px] uppercase tracking-[0.6em] text-rose-400 font-bold mb-8 block">The Commitment</span><h3 className="text-3xl md:text-5xl font-serif italic text-rose-900 mb-8 leading-tight">"I have officially accepted."</h3><div className="h-px w-16 bg-rose-200 mx-auto mb-8" /><p className="text-gray-500 font-light text-lg italic mb-12">Paris awaits me, and I await the day I no longer have to build websites to hold your attention.</p><button onClick={() => setMDayCommitted(false)} className="text-[9px] uppercase tracking-widest text-gray-300 underline hover:text-rose-500">Change RSVP Status</button></motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>

      {/* 8. FOOTER */}
      <footer className="py-32 lg:py-48 px-6 bg-white text-center relative z-10">
        <h3 className="text-4xl font-serif text-[#1A1A1A] mb-4 font-bold tracking-tighter">Hamad Almheiri</h3>
        <p className="text-gray-400 font-light italic text-lg mb-16 italic font-serif">Coded by hand and affection ;)</p>
        <p className="text-[9px] tracking-[0.5em] text-gray-200 uppercase font-bold tracking-widest">For Only One Person</p>
      </footer>
    </div>
  );
}

function Question({ label, value, onChange, placeholder }) {
  return (
    <div className="group">
      <label className="text-[9px] uppercase tracking-[0.3em] text-rose-400 font-bold mb-3 block">{label}</label>
      <input type="text" value={value || ''} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} className="w-full bg-transparent border-b border-gray-100 py-3 focus:border-rose-400 outline-none italic text-xl transition-all placeholder:text-gray-200" />
    </div>
  );
}