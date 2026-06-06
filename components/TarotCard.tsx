import React from 'react';
import { CARD_BACKS } from '../types';
import { useApp } from '../store/AppContext';

interface TarotCardProps {
  cardName: string;
  cardCode: string; // 应该传这个，但如果undefined就用cardName
  isReversed: boolean;
  isRevealed: boolean;
  onClick?: () => void;
  className?: string;
}

export const TarotCard: React.FC<TarotCardProps> = ({ 
  cardName, 
  cardCode, 
  isReversed, 
  isRevealed, 
  onClick, 
  className = '' 
}) => {
  const { user } = useApp();
  const cardBack = CARD_BACKS.find(b => b.id === user.cardBackId) || CARD_BACKS[0];
  
  // 生成图片URL - 优先使用cardCode，如果没有则使用cardName
  const getImageUrl = () => {
    // 使用cardCode或cardName作为文件名
    const fileName = cardCode && cardCode !== 'undefined' ? cardCode : cardName;
    if (!fileName) {
      console.warn('No valid filename for card, using default');
      return '/tarot-cards/default.jpg';
    }
    return `/tarot-cards/${fileName}.jpg`;
  };
  
  const cardImageUrl = getImageUrl();

  return (
    <div 
      className={`relative w-40 h-64 sm:w-48 sm:h-72 cursor-pointer perspective-1000 group ${className}`}
      onClick={onClick}
    >
      <div className={`relative w-full h-full duration-700 transform-style-3d transition-all ${isRevealed ? 'rotate-y-180' : ''}`}>
        
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl shadow-lg overflow-hidden border-[3px] border-white ring-1 ring-slate-200 group-hover:ring-pop-300 transition-all bg-slate-800">
           <div 
             className="w-full h-full bg-cover bg-center opacity-90"
             style={{ backgroundImage: `url(${cardBack.url})` }}
           />
           <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/10">
               <span className="text-white/90 text-2xl">✨</span>
             </div>
           </div>
        </div>

        {/* Card Front */}
        <div className={`absolute w-full h-full backface-hidden rotate-y-180 rounded-xl shadow-xl overflow-hidden border-[3px] border-white ring-1 ring-slate-200 bg-white`}>
          <img 
            src={cardImageUrl}
            alt={cardName}
            className={`w-full h-full object-cover transition-transform duration-700 ${isReversed ? 'rotate-180' : ''}`}
            onError={(e) => {
              console.error(`Failed to load card image: ${cardCode || cardName}`, { cardCode, cardName });
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // 显示备用背景
              const parent = target.parentElement;
              if (parent) {
                parent.style.background = 'linear-gradient(135deg, #f0abfc 0%, #d946ef 100%)';
                parent.style.display = 'flex';
                parent.style.alignItems = 'center';
                parent.style.justifyContent = 'center';
                const fallbackText = document.createElement('div');
                fallbackText.className = 'text-white text-center p-4';
                fallbackText.innerHTML = `<h3 class="text-xl font-bold mb-2">${cardName}</h3><p class="text-sm opacity-80">${isReversed ? '逆位' : '正位'}</p>`;
                parent.appendChild(fallbackText);
              }
            }}
          />
             
          {/* Card Label */}
          <div className={`absolute bottom-0 w-full p-4 text-center ${isReversed ? 'rotate-180 top-0 bottom-auto' : ''}`}>
            <div className="inline-block px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
                <h3 className="text-white font-serif font-bold text-lg tracking-wide">{cardName}</h3>
            </div>
            {isReversed && (
                <div className="mt-1">
                    <span className="text-[10px] font-bold text-white bg-red-500/80 px-2 py-0.5 rounded uppercase tracking-wider">
                        逆位
                    </span>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};