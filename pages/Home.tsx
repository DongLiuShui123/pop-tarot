import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SPREADS } from '../data/tarotData';
import { ArrowRight, Sparkles, HelpCircle } from 'lucide-react';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState(SPREADS[0].id);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    navigate('/reading', { state: { question, spreadId: selectedSpread } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-4">
      
      {/* Hero Section */}
      <div className="mb-10 space-y-6 animate-fade-in-up max-w-3xl">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-pop-50 text-pop-500 mb-2 ring-4 ring-pop-50/50">
            <Sparkles className="w-8 h-8" />
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
          洞悉内心的<br className="md:hidden"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pop-500 to-purple-600">宇宙指引</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
          无论困惑还是迷茫，Pop Tarot 结合古老智慧与先进 AI，为你点亮前行的路灯。
        </p>
      </div>

      {/* Main Interaction Area */}
      <div className="w-full max-w-2xl bg-white p-2 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
        <form onSubmit={handleStart} className="flex flex-col p-6 md:p-8 space-y-8">
          
          {/* Question Input Group */}
          <div className="space-y-4 text-left">
            <label htmlFor="question" className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">
              <HelpCircle className="w-4 h-4" /> 你的问题
            </label>
            
            <div className="relative group">
              <input
                id="question"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="在此输入你想问的问题..."
                className="w-full bg-slate-50/50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-pop-400 focus:bg-white focus:ring-4 focus:ring-pop-50 transition-all text-lg font-medium shadow-inner"
                autoComplete="off"
                required
              />
              <div className="absolute right-3 top-3 hidden md:block">
                 <span className="text-[10px] bg-white border border-slate-200 text-slate-400 px-2 py-1 rounded-md">Enter ↲</span>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-slate-100"></div>

          {/* Spread Selection */}
          <div className="space-y-4 text-left">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">
              选择牌阵
            </label>
            <div className="grid grid-cols-1 gap-3">
              {SPREADS.map((spread) => (
                <button
                  key={spread.id}
                  type="button"
                  onClick={() => setSelectedSpread(spread.id)}
                  className={`relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left group ${
                    selectedSpread === spread.id
                      ? 'bg-pop-50 border-pop-500 shadow-sm'
                      : 'bg-white border-slate-100 hover:border-pop-200 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                     selectedSpread === spread.id ? 'border-pop-500 bg-white' : 'border-slate-300'
                  }`}>
                      {selectedSpread === spread.id && <div className="w-2.5 h-2.5 rounded-full bg-pop-500" />}
                  </div>
                  <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-serif font-bold ${selectedSpread === spread.id ? 'text-pop-900' : 'text-slate-700'}`}>
                            {spread.name}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${selectedSpread === spread.id ? 'bg-white/80 text-pop-600' : 'bg-slate-100 text-slate-500'}`}>
                            {spread.cards} 张
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{spread.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            className="w-full group relative flex items-center justify-center gap-2 bg-slate-900 hover:bg-pop-600 text-white font-bold py-5 px-6 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-y-0 active:scale-95"
            disabled={!question.trim()}
          >
            <span className="text-lg tracking-widest">开始占卜</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;