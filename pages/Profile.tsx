import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { CARD_BACKS } from '../types';
import { User, Settings, LogOut, Clock, ChevronDown, ChevronUp, Check } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, login, logout, updateUser, history } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) login(formData.name, formData.email);
  };

  const toggleHistory = (id: string) => {
    setExpandedHistory(expandedHistory === id ? null : id);
  };

  // 获取卡片图片URL的辅助函数
  const getCardImageUrl = (card: any) => {
    // 优先使用 name_short，如果没有则使用 name
    const fileName = card?.name_short || card?.name;
    if (!fileName) return null;
    return `/tarot-cards/${fileName}.jpg`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      
      {/* Profile / Auth Section */}
      <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-pop-50 rounded-2xl">
            <User className="w-6 h-6 text-pop-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">用户档案</h2>
        </div>

        {!user.isLoggedIn ? (
          <form onSubmit={handleLogin} className="space-y-5 max-w-md">
            <p className="text-slate-500 text-sm">告诉我们你的称呼，开启专属的灵魂之旅。</p>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 pl-1">昵称</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:border-pop-500 focus:ring-2 focus:ring-pop-100 transition-all outline-none"
                placeholder="你的名字"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase mb-2 pl-1">邮箱 (选填)</label>
              <input 
                 type="email" 
                 value={formData.email}
                 onChange={e => setFormData({...formData, email: e.target.value})}
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-slate-800 focus:border-pop-500 focus:ring-2 focus:ring-pop-100 transition-all outline-none"
                 placeholder="seeker@example.com"
              />
            </div>
            <button type="submit" className="px-8 py-3 bg-pop-600 hover:bg-pop-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg">
              进入圣殿
            </button>
          </form>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
             <div>
               <h3 className="text-xl text-slate-800 font-bold">欢迎回来, {user.name}</h3>
               <p className="text-slate-400 text-sm mt-1">Pop Tarot 会员</p>
             </div>
             <button 
               onClick={logout}
               className="flex items-center gap-2 px-5 py-2 border border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 hover:bg-red-50 rounded-lg transition-colors text-sm font-medium"
             >
               <LogOut className="w-4 h-4" /> 退出登录
             </button>
          </div>
        )}
      </section>

      {/* Settings: Card Backs */}
      <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-purple-50 rounded-2xl">
            <Settings className="w-6 h-6 text-purple-500" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-slate-800">卡背定制</h2>
        </div>
        
        <p className="text-slate-500 mb-6 text-sm">选择你喜欢的塔罗牌背面图案。</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CARD_BACKS.map(back => (
            <button 
              key={back.id}
              onClick={() => updateUser({ cardBackId: back.id })}
              className={`group relative aspect-[2/3] rounded-xl overflow-hidden border-2 transition-all shadow-sm hover:shadow-md ${
                user.cardBackId === back.id 
                  ? 'border-pop-500 ring-2 ring-pop-100 ring-offset-2' 
                  : 'border-transparent hover:border-slate-200'
              }`}
            >
              <img src={back.url} alt={back.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-white shadow-black drop-shadow-md">{back.name}</span>
              </div>
              {user.cardBackId === back.id && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-pop-500 text-white rounded-full flex items-center justify-center shadow-md">
                   <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* History - 只在登录时显示 */}
      {user.isLoggedIn && (
        <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">占卜日记</h2>
          </div>

          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
               <p className="font-medium">还没有占卜记录</p>
               <p className="text-sm mt-2 opacity-70">未来是一张白纸，等待你去书写。</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((reading) => (
                <div key={reading.id} className="border border-slate-100 rounded-2xl bg-white hover:shadow-md transition-shadow overflow-hidden">
                   <button 
                     onClick={() => toggleHistory(reading.id)}
                     className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left"
                   >
                      <div>
                        <h3 className="font-serif font-bold text-lg text-slate-800">"{reading.question}"</h3>
                        <p className="text-xs text-slate-400 mt-2 font-medium uppercase tracking-wide">
                          {new Date(reading.date).toLocaleDateString()} • {reading.cards.length} 张牌
                        </p>
                      </div>
                      <div className={`p-2 rounded-full ${expandedHistory === reading.id ? 'bg-pop-50 text-pop-500' : 'text-slate-300'}`}>
                          {expandedHistory === reading.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                   </button>
                   
                   {expandedHistory === reading.id && (
                     <div className="p-6 border-t border-slate-50 bg-slate-50/50">
                        <div className="flex flex-wrap gap-3 mb-6">
                          {reading.cards.map(c => {
                            const imageUrl = getCardImageUrl(c.card);
                            const cardName = c.card?.name || '未知牌';
                            
                            return (
                             <div key={c.positionId} className="text-center group w-20">
                                <div className="aspect-[2/3] bg-white rounded-lg shadow-sm border border-slate-200 mb-2 overflow-hidden relative">
                                    {imageUrl ? (
                                      <img 
                                        src={imageUrl}
                                        alt={cardName} 
                                        className={`w-full h-full object-cover ${c.isReversed ? 'rotate-180' : ''}`}
                                        onError={(e) => {
                                          console.error(`Failed to load card image: ${c.card?.name_short || c.card?.name}`, c.card);
                                          const target = e.target as HTMLImageElement;
                                          target.style.display = 'none';
                                          const parent = target.parentElement;
                                          if (parent) {
                                            parent.style.background = 'linear-gradient(135deg, #f0abfc 0%, #d946ef 100%)';
                                            parent.style.display = 'flex';
                                            parent.style.alignItems = 'center';
                                            parent.style.justifyContent = 'center';
                                            const fallbackText = document.createElement('div');
                                            fallbackText.className = 'text-white text-center p-2';
                                            fallbackText.innerHTML = `<p class="text-xs font-bold">${cardName}</p>${c.isReversed ? '<p class="text-[10px] text-red-300">逆位</p>' : ''}`;
                                            parent.appendChild(fallbackText);
                                          }
                                        }}
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100">
                                        <div className="text-center p-2">
                                          <p className="text-xs font-bold text-purple-800">{cardName}</p>
                                          {c.isReversed && <p className="text-[10px] text-red-500">逆位</p>}
                                        </div>
                                      </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                                </div>
                                <p className="text-[10px] font-bold text-slate-600 truncate">{cardName}</p>
                                {c.isReversed && <p className="text-[9px] text-red-400">逆位</p>}
                             </div>
                            );
                          })}
                        </div>
                        <div className="prose prose-sm prose-slate max-w-none text-slate-600">
                          <p className="whitespace-pre-line leading-relaxed">{reading.interpretation.substring(0, 300)}...</p>
                          <p className="text-xs text-pop-400 font-medium mt-4 cursor-pointer hover:underline">点击查看完整解读 (模拟功能)</p>
                        </div>
                     </div>
                   )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
      
      {/* 未登录时显示提示 */}
      {!user.isLoggedIn && (
        <section className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-50 rounded-2xl">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-slate-800">占卜日记</h2>
          </div>
          
          <div className="text-center py-12 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <p className="font-medium">登录后查看你的占卜日记</p>
            <p className="text-sm mt-2 opacity-70">记录你的每一次灵魂之旅</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default Profile;