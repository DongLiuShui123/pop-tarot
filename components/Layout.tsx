import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, History as HistoryIcon, Home, Sparkles } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: '占卜大厅', path: '/', icon: Home },
    { label: '我的日记', path: '/history', icon: HistoryIcon },
    { label: '个人中心', path: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans overflow-x-hidden selection:bg-pop-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <Sparkles className="w-6 h-6 text-pop-500 group-hover:rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-serif font-bold bg-clip-text text-transparent bg-gradient-to-r from-pop-600 to-purple-600">
                Pop Tarot
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    location.pathname === item.path ? 'text-pop-600' : 'text-slate-500 hover:text-pop-500'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              {!user.isLoggedIn && (
                <Link to="/profile" className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm font-bold transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  登录 / 注册
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-pop-600 p-2"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 shadow-xl absolute w-full z-50">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium ${
                    location.pathname === item.path ? 'bg-pop-50 text-pop-600' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-8 bg-white mt-auto">
        <div className="text-center text-slate-400 text-sm">
          <p className="font-serif font-bold text-slate-600">Pop Tarot</p>
          <p className="mt-2 text-xs">你的每日心灵指引 • Powered by Deepseek AI</p>
        </div>
      </footer>
    </div>
  );
};