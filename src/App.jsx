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

export default function MyFavouriteLinn() {
  const [index, setIndex] = useState(0);
  const [isHamadMode, setIsHamadMode] = useState(false);
  const [kneeStatus, setKneeStatus] = useState(() => localStorage.getItem('knee_status') || 'pending');
  const [mDayCommitted, setMDayCommitted] = useState(() => localStorage.getItem('mday_committed') === 'true');
  const [hasSubmittedFavs, setHasSubmittedFavs] = useState(() => localStorage.getItem('favs_submitted') === 'true');
  const [isSending, setIsSending] = useState(false);
  const mapSectionRef = useRef(null);

  const [favorites, setFavorites] = useState(() => {
    const defaults = { song: '', movie: '', scent: '', peace: '', dreamDay: '', norwegianWord: '', parisCorner: '', soulColor: '' };
    try {
      const saved = localStorage.getItem('linn_complete_map');
      return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch (e) { return defaults; }
  });

  const hamadData = {
    song: "Mayonaise — The Smashing Pumpkins",
    movie: "Dune & Dune: Part Two (A sneaky double feature)",
    arabWord: "Wajd (وجد) — The intensity of love where the soul finds itself in another.",
    scent: "Dry Wood near Trinity Campus during the Toronto Spring.",
    soulColor: "Lavender. A dark, moody shade that carries a heavy weight of devotion to those I love.",
    dreamDay: "I would hold her, teach her how to solve a Rubik's cube, but use every excuse in the book to keep touching her as much as possible.",
    view: "Chester Hill Lookout, overlooking the valley."
  };

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

  const handleFavSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    await new Promise(r => setTimeout(r, 2500));
    setIsSending(false);
    setHasSubmittedFavs(true);
  };

  // Dynamic Styles
  const primaryColor = isHamadMode ? "text-blue-600" : "text-rose-500";
  const particleIcon = isHamadMode ? "💙" : "🌹";

  return (
    <div className={`min-h-screen ${isHamadMode ? 'bg-slate-50' : 'bg-[#FCFAF7]'} text-[#1A1A1A] font-sans transition-colors duration-1000 overflow-x-hidden relative`}>
      
      {/* 🌊 Dynamic Background Terrain 🌊 */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <motion.div
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0"
          style={{
            backgroundImage: isHamadMode 
              ? 'linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #F8FAFC 100%)'
              : 'linear-gradient(135deg, #FCFAF7 0%, #E8DED1 50%, #FCFAF7 100%)',
            backgroundSize: '400% 400%',
          }}
        />
      </div>

      <AnimatePresence>
        {(kneeStatus === 'yes' || hasSubmittedFavs || mDayCommitted) && <BloomParticles icon={particleIcon} />}
      </AnimatePresence>

      {/* 🔘 THE SWITCH (Hamad's Interaction) */}
      <div className="fixed top-8 left-8 z-[100] flex items-center gap-4">
        <div 
          onClick={() => setIsHamadMode(!isHamadMode)}
          className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-500 ${isHamadMode ? 'bg-blue-600' : 'bg-rose-200'}`}
        >
          <motion.div 
            layout
            className="bg-white w-6 h-6 rounded-full shadow-md"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${isHamadMode ? 'text-blue-600' : 'text-rose-400'}`}>
          {isHamadMode ? "Hamad Mode" : "Switch to see my answers"}
        </span>
      </div>

      {/* 1. HERO */}
      <section className="h-[100dvh] flex flex-col items-center justify-center px-6 relative z-10 text-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
          <div className={`text-[10px] tracking-[0.6em] ${primaryColor} font-bold mb-8 uppercase italic`}>
            {isHamadMode ? "The Tech-Savvy Arab Boy" : greetings[index]}
          </div>
          <h1 className="text-[18vw] lg:text-[160px] font-serif leading-none mb-4 tracking-tighter">
            {isHamadMode ? "Hamad." : "Linn."}
          </h1>
          <p className="text-gray-400 tracking-[0.4em] uppercase text-[9px] font-medium">
            {isHamadMode ? "Obsessed with his cute Norwegian girl" : "An Archive for You"}
          </p>
        </motion.div>
      </section>

      {/* 2. STATIONERY LETTER */}
      <motion.section {...sectionVariant} className="py-24 lg:py-48 px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-10 md:p-16 rounded-sm shadow-2xl border border-white relative overflow-hidden">
            <div className={`mt-6 mb-16 border-b ${isHamadMode ? 'border-blue-50' : 'border-rose-50'} pb-8 flex justify-between items-end`}>
              <div className="space-y-1"><p className={`text-[9px] uppercase tracking-widest ${primaryColor} font-bold`}>From</p><p className="text-sm font-serif italic">{isHamadMode ? "Paris, in spirit" : "Sharjah, UAE"}</p></div>
              <div className="text-right space-y-1"><p className={`text-[9px] uppercase tracking-widest ${primaryColor} font-bold`}>To</p><p className="text-sm font-serif italic">{isHamadMode ? "My Favourite Tech Prodigy" : "Paris, France"}</p></div>
            </div>
            <div className="relative">
              <p className="text-xl md:text-2xl font-serif italic text-gray-800 mb-8 leading-relaxed">
                {isHamadMode 
                  ? `"You're likely viewing this because a certain Arab boy couldn't keep his thoughts about you to himself. Welcome to the other side of the screen."`
                  : `"If you're reading this, you're highly likely a very cute tall Norwegian girl with a wonky knee who may or may not secretly have a crush on her secret Arab muse."`}
              </p>
              <div className="space-y-6 text-gray-500 font-light text-base md:text-lg leading-relaxed">
                <p>I built this little feature so you could see the answers to the same questions I asked you. A way to show you that I'm just as much an open book for you as I hope you are for me.</p>
              </div>
              <div className="mt-20 text-right">
                <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">With all my affection,</p>
                <p className={`text-5xl ${primaryColor} font-signature leading-none`}>Your {isHamadMode ? 'Muse' : 'Tech Prodigy'}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. MAP OF SOUL */}
      <section ref={mapSectionRef} className="py-24 lg:py-40 px-6 bg-white relative z-10 shadow-sm border-y border-gray-50 overflow-hidden">
        <div className="max-w-2xl mx-auto min-h-[700px] flex flex-col justify-center">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-serif mb-6 tracking-tight">
              A Map of {isHamadMode ? "Hamad's" : "Your"} Soul
            </h2>
            <p className="text-gray-500 font-light italic text-lg leading-relaxed max-w-lg mx-auto px-4">
              {isHamadMode 
                ? "A rare look inside the archive of the tech-savvy boy from Sharjah." 
                : "To know you is to understand the rhythm of your world. This map is a quiet archive of the sights, scents, and sounds that move you."}
            </p>
          </div>
          
          <AnimatePresence mode="wait">
            {!isHamadMode ? (
              /* LINN VIEW */
              !hasSubmittedFavs ? (
                <motion.form key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleFavSubmit} className="space-y-24 text-left">
                  <Question label="Favourite Song" value={favorites.song} onChange={(v)=>setFavorites({...favorites, song: v})} />
                  <Question label="Favourite Movie" value={favorites.movie} onChange={(v)=>setFavorites({...favorites, movie: v})} />
                  <Question label="Soul Color" value={favorites.soulColor} onChange={(v)=>setFavorites({...favorites, soulColor: v})} />
                  <button className="w-full py-6 bg-[#1A1A1A] text-white rounded-full font-bold uppercase tracking-[0.4em] text-[10px]">Submit to my muse</button>
                </motion.form>
              ) : (
                <motion.div key="c" className="p-16 bg-rose-50/50 rounded-[3rem] text-center py-32"><h3 className="text-3xl font-serif text-rose-900 mb-6 italic italic">Safely Kept.</h3><button onClick={()=>setHasSubmittedFavs(false)} className="text-[10px] uppercase tracking-widest text-rose-300 underline">Edit your map</button></motion.div>
              )
            ) : (
              /* HAMAD VIEW */
              <motion.div key="h" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-20">
                <StaticAnswer label="Favourite Song" value={hamadData.song} />
                <StaticAnswer label="Favourite Movie" value={hamadData.movie} />
                <StaticAnswer label="An Arab Word" value={hamadData.arabWord} />
                <StaticAnswer label="The Scent of Toronto" value={hamadData.scent} />
                <StaticAnswer label="The Color of My Soul" value={hamadData.soulColor} />
                <StaticAnswer label="If we had 24 hours..." value={hamadData.dreamDay} />
                <StaticAnswer label="The Secret View" value={hamadData.view} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* 5. POETRY */}
      <motion.section {...sectionVariant} className={`py-40 lg:py-60 transition-colors duration-1000 ${isHamadMode ? 'bg-blue-950' : 'bg-[#1A1A1A]'} text-[#FCFAF7] px-6 text-center relative z-10`}>
        <p className="text-5xl lg:text-8xl font-arabic leading-[1.8] mb-12 tracking-wide" dir="rtl">{poetry.arabic}</p>
        <div className={`h-px w-20 ${isHamadMode ? 'bg-blue-400' : 'bg-rose-900'} mx-auto mb-12`} />
        <p className="text-xl lg:text-3xl font-serif italic text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed px-4">"{poetry.translation}"</p>
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500">— {poetry.poet}</p>
      </motion.section>

      <footer className="py-32 bg-white text-center relative z-10">
        <h3 className="text-4xl font-serif text-[#1A1A1A] mb-4 font-bold tracking-tighter">Hamad Almheiri</h3>
        <p className="text-gray-400 font-serif italic text-lg mb-16 italic font-serif">Coded by hand and obsession ;)</p>
      </footer>
    </div>
  );
}

function Question({ label, value, onChange }) {
  return (
    <div className="group border-b border-gray-100 py-6">
      <label className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mb-3 block">{label}</label>
      <input type="text" value={value || ''} onChange={(e)=>onChange(e.target.value)} className="w-full bg-transparent outline-none italic text-xl transition-all" />
    </div>
  );
}

function StaticAnswer({ label, value }) {
  return (
    <div className="border-l-2 border-blue-200 pl-8 py-2">
      <label className="text-[10px] uppercase tracking-[0.4em] text-blue-400 font-bold mb-3 block">{label}</label>
      <p className="text-2xl font-serif italic text-gray-800 leading-relaxed">{value}</p>
    </div>
  );
}