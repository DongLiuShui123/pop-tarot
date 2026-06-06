import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, ReadingSession, CARD_BACKS } from '../types';

interface AppContextType {
  user: UserProfile;
  history: ReadingSession[];
  saveReading: (reading: ReadingSession) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
  login: (name: string, email: string) => void;
  logout: () => void;
}

// 生成唯一的用户ID
const generateUserId = () => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// 根据用户名生成用户ID（保持一致性）
const generateUserIdFromName = (name: string) => {
  // 简单的哈希函数，为相同的用户名生成相同的ID
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i);
    hash = hash & hash; // 转换为32位整数
  }
  return 'user_' + Math.abs(hash);
};

const defaultUser: UserProfile = {
  id: '', // 添加用户ID字段
  name: '探寻者',
  email: '',
  isLoggedIn: false,
  cardBackId: 'classic'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [history, setHistory] = useState<ReadingSession[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const storedCurrentUser = localStorage.getItem('lumina_current_user');
    if (storedCurrentUser) {
      const parsedUser = JSON.parse(storedCurrentUser);
      setUser(parsedUser);
      
      // 加载该用户的占卜历史
      if (parsedUser.id && parsedUser.isLoggedIn) {
        const userHistoryKey = `lumina_history_${parsedUser.id}`;
        const storedHistory = localStorage.getItem(userHistoryKey);
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      }
    }
  }, []);

  const saveReading = (reading: ReadingSession) => {
    if (!user.isLoggedIn || !user.id) {
      console.warn('Cannot save reading: user not logged in');
      return;
    }

    // 确保阅读记录有用户ID
    const readingWithUserId = {
      ...reading,
      userId: user.id
    };

    const newHistory = [readingWithUserId, ...history];
    setHistory(newHistory);
    
    // 保存到该用户的专属历史记录
    const userHistoryKey = `lumina_history_${user.id}`;
    localStorage.setItem(userHistoryKey, JSON.stringify(newHistory));
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    const newUser = { ...user, ...updates };
    setUser(newUser);
    
    // 只有当用户登录时才保存当前用户信息
    if (newUser.isLoggedIn && newUser.id) {
      localStorage.setItem('lumina_current_user', JSON.stringify(newUser));
      
      // 同时保存用户配置信息到用户专属存储
      const userConfigKey = `lumina_user_${newUser.id}`;
      localStorage.setItem(userConfigKey, JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        cardBackId: newUser.cardBackId
      }));
    }
  };

  const login = (name: string, email: string) => {
    // 为用户名生成唯一的ID
    const userId = generateUserIdFromName(name);
    
    // 检查是否已有该用户的配置
    const userConfigKey = `lumina_user_${userId}`;
    const existingConfig = localStorage.getItem(userConfigKey);
    
    let cardBackId = 'classic';
    if (existingConfig) {
      const config = JSON.parse(existingConfig);
      cardBackId = config.cardBackId || 'classic';
    }
    
    const newUser: UserProfile = {
      id: userId,
      name,
      email,
      isLoggedIn: true,
      cardBackId
    };
    
    setUser(newUser);
    localStorage.setItem('lumina_current_user', JSON.stringify(newUser));
    
    // 保存或更新用户配置
    localStorage.setItem(userConfigKey, JSON.stringify({
      name,
      email,
      cardBackId
    }));
    
    // 加载该用户的占卜历史
    const userHistoryKey = `lumina_history_${userId}`;
    const storedHistory = localStorage.getItem(userHistoryKey);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    } else {
      setHistory([]);
    }
  };

  const logout = () => {
    // 保留用户ID但标记为未登录
    const loggedOutUser = { 
      ...user, 
      isLoggedIn: false 
    };
    
    setUser(loggedOutUser);
    setHistory([]); // 清空当前历史记录
    localStorage.removeItem('lumina_current_user');
  };

  return (
    <AppContext.Provider value={{ user, history, saveReading, updateUser, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};