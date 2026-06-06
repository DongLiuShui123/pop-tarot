import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SPREADS, FULL_DECK } from '../data/tarotData';
import { TarotCard } from '../components/TarotCard';
import { DrawnCard, CARD_BACKS } from '../types';
import { getTarotReading } from "../services/deepseekService";
import ReactMarkdown from 'react-markdown';
import { Sparkles, RefreshCcw, Loader2, Hand } from 'lucide-react';
import { useApp } from '../store/AppContext';

const ReadingRoom: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { saveReading, user } = useApp();
  
  const state = location.state as { question: string, spreadId: string } | null;
  
  const [phase, setPhase] = useState<'shuffling' | 'drawing' | 'revealing' | 'interpreting' | 'complete'>('shuffling');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [deck, setDeck] = useState(FULL_DECK);
  const [interpretation, setInterpretation] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);
  
  const readingRef = useRef<HTMLDivElement>(null);

  const spread = SPREADS.find(s => s.id === state?.spreadId) || SPREADS[0];
  const question = state?.question || "通用指引";
  
  const userCardBack = CARD_BACKS.find(b => b.id === user.cardBackId) || CARD_BACKS[0];

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  const handleShuffleComplete = () => {
    // Perform actual shuffle of the deck array when entering drawing phase
    const shuffled = [...FULL_DECK].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setPhase('drawing');
  };

  const handleSelectCard = (index: number) => {
    if (drawnCards.length >= spread.cards) return;

    const remainingDeck = [...deck];
    // Remove the specific card the user clicked from the deck
    const [selected] = remainingDeck.splice(index, 1);
    
    // 20% chance of reversal
    const isReversed = Math.random() < 0.2;
    
    const nextPosition = spread.layout[drawnCards.length];

    const newDrawnCard: DrawnCard = {
      card: selected,
      isReversed,
      positionId: nextPosition.id
    };

    setDeck(remainingDeck);
    setDrawnCards([...drawnCards, newDrawnCard]);

    if (drawnCards.length + 1 >= spread.cards) {
      // Small delay before moving to reveal phase to let animation finish
      setTimeout(() => setPhase('revealing'), 1000);
    }
  };

  const [revealedIds, setRevealedIds] = useState<number[]>([]);

  const handleReveal = (positionId: number) => {
    if (revealedIds.includes(positionId)) return;
    setRevealedIds([...revealedIds, positionId]);
  };

  useEffect(() => {
    if (phase === 'revealing' && revealedIds.length === spread.cards) {
        setPhase('interpreting');
        setLoadingAI(true);
        // Scroll to interpretation area
        setTimeout(() => {
            readingRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 500);

        getTarotReading(question, drawnCards, spread).then(text => {
            setInterpretation(text);
            setLoadingAI(false);
            setPhase('complete');
            
            // 创建完整的阅读记录对象
            const readingRecord = {
                id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 9),
                date: new Date().toISOString(),
                question,
                spreadId: spread.id,
                cards: drawnCards,
                interpretation: text
                // userId 会在 AppContext 的 saveReading 中自动添加
            };
            
            if (user.isLoggedIn) {
              saveReading(readingRecord);
            }
        }).catch(error => {
            console.error('Failed to get AI interpretation:', error);
            setInterpretation('抱歉，AI解读服务暂时不可用。请稍后再试。');
            setLoadingAI(false);
            setPhase('complete');
        });
    }
  }, [revealedIds, phase, spread.cards, question, drawnCards, spread, saveReading]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header Info */}
      <div className="text-center mb-8 animate-fade-in-down">
        <h2 className="text-xs text-pop-500 uppercase font-bold tracking-[0.2em] mb-3">{spread.name}</h2>
        <h1 className="text-2xl md:text-3xl font-serif text-slate-800 mb-4 px-4">"{question}"</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-pop-300 to-purple-400 rounded-full mx-auto"></div>
      </div>

      {/* Main Stage */}
      <div className="relative max-w-6xl mx-auto min-h-[600px] flex flex-col items-center px-4">
        
        {/* SHUFFLING PHASE */}
        {phase === 'shuffling' && (
           <div className="flex flex-col items-center justify-center h-[500px] w-full bg-white rounded-3xl border border-slate-100 shadow-xl p-8">
             <div className="relative w-32 h-48 md:w-40 md:h-64 mb-8">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className={`absolute inset-0 bg-pop-600 rounded-xl shadow-md border-2 border-white animate-shuffle`} style={{ animationDelay: `${i * 0.1}s`, top: -i*1, left: -i*1, zIndex: 10-i }}></div>
                ))}
                <div className="absolute inset-0 bg-pop-700 rounded-xl border-2 border-pop-300 flex items-center justify-center z-20">
                    <Sparkles className="text-white w-12 h-12 animate-pulse" />
                </div>
             </div>
             <p className="text-slate-500 animate-pulse font-medium">洗牌中，请专注于你的问题...</p>
             <button 
               onClick={handleShuffleComplete}
               className="mt-8 px-10 py-3 bg-pop-600 hover:bg-pop-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-pop-200 transform hover:-translate-y-1"
             >
               开始抽牌
             </button>
           </div>
        )}

        {/* DRAWING / REVEALING PHASE */}
        {(phase === 'drawing' || phase === 'revealing' || phase === 'interpreting' || phase === 'complete') && (
            <div className="w-full flex flex-col items-center">
                
                {/* The Spread Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 justify-items-center items-start pt-4 pb-24 w-full max-w-4xl">
                    {spread.layout.map((pos) => {
                        const drawn = drawnCards.find(d => d.positionId === pos.id);
                        return (
                            <div 
                                key={pos.id} 
                                className="relative flex flex-col items-center gap-3"
                                style={{ gridColumn: `span 1` }}
                            >
                                <div className="w-32 h-52 sm:w-40 sm:h-64 relative">
                                    {drawn ? (
                                        <TarotCard 
                                            cardName={drawn.card.name}
                                            cardCode={drawn.card.name_short}
                                            isReversed={drawn.isReversed}
                                            isRevealed={revealedIds.includes(pos.id)}
                                            onClick={() => phase === 'revealing' && handleReveal(pos.id)}
                                            className={revealedIds.includes(pos.id) ? '' : 'cursor-pointer hover:scale-[1.02] transition-transform shadow-2xl'}
                                        />
                                    ) : (
                                        <div className="w-full h-full border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-xl flex items-center justify-center">
                                            <span className="text-3xl text-slate-200 font-serif font-bold opacity-50">{pos.id}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="text-center w-32 sm:w-40">
                                    <p className="text-pop-500 text-[10px] font-bold uppercase tracking-widest mb-1">{pos.name}</p>
                                    {/* Show card name if revealed */}
                                    {drawn && revealedIds.includes(pos.id) ? (
                                        <p className="text-slate-800 font-serif font-bold text-sm">{drawn.card.name}</p>
                                    ) : (
                                        <p className="text-slate-400 text-[10px] leading-tight">{pos.description}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Deck Selector (Fixed Bottom) - ONLY visible during drawing */}
                {phase === 'drawing' && (
                    <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 backdrop-blur-xl border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] pt-6 pb-8 transition-transform duration-500">
                         <div className="text-center mb-4">
                            <p className="text-pop-600 font-bold text-sm animate-pulse flex items-center justify-center gap-2">
                                <Hand className="w-4 h-4" /> 
                                请凭借直觉选取 {spread.cards - drawnCards.length} 张牌
                            </p>
                         </div>
                         
                         {/* Scrollable Container */}
                         <div className="w-full overflow-x-auto overflow-y-hidden pb-4 px-4 md:px-10 hide-scrollbar perspective-1000">
                            <div className="flex items-end justify-start min-w-max h-40 px-8">
                                {deck.map((_, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => handleSelectCard(index)}
                                        className="group relative w-20 h-32 md:w-24 md:h-36 -ml-12 md:-ml-16 first:ml-0 flex-shrink-0 cursor-pointer transition-all duration-300 hover:-translate-y-6 hover:z-50 hover:scale-105"
                                        style={{ zIndex: index }}
                                    >
                                        <div className="w-full h-full rounded-lg bg-slate-800 shadow-lg border border-white/50 overflow-hidden transform transition-transform">
                                            <div 
                                                className="w-full h-full bg-cover bg-center"
                                                style={{ backgroundImage: `url(${userCardBack.url})` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                         </div>
                    </div>
                )}
            </div>
        )}

        {/* AI Interpretation */}
        {(phase === 'interpreting' || phase === 'complete') && (
            <div ref={readingRef} className="mt-8 w-full max-w-4xl bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.1)] animate-fade-in-up">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                    <div className="p-2 bg-pop-100 text-pop-600 rounded-lg">
                        {loadingAI ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">牌面解读</h2>
                </div>
                
                {loadingAI ? (
                    <div className="space-y-6 animate-pulse max-w-2xl mx-auto py-10">
                         <div className="flex gap-4 items-center justify-center mb-6">
                            <span className="text-pop-500 font-medium">正在连接宇宙能量...</span>
                         </div>
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                        <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                        <div className="h-4 bg-slate-100 rounded w-4/6"></div>
                        <div className="h-4 bg-slate-100 rounded w-full"></div>
                    </div>
                ) : (
                    <div className="prose prose-slate prose-lg prose-headings:font-serif prose-headings:text-pop-700 prose-p:text-slate-600 prose-strong:text-pop-600 max-w-none">
                        <ReactMarkdown>{interpretation}</ReactMarkdown>
                    </div>
                )}

                {phase === 'complete' && (
                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center">
                         <button 
                           onClick={() => navigate('/')} 
                           className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl bg-pop-600 hover:bg-pop-700 text-white font-bold transition-all shadow-lg hover:shadow-xl"
                         >
                            <RefreshCcw className="w-4 h-4" /> 新的占卜
                         </button>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default ReadingRoom;
