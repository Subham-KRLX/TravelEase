import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const lightTheme = {
  // Background colors
  background: '#fff',
  backgroundSecondary: '#f8fafc',
  backgroundTertiary: '#f1f5f9',
  
  // Text colors
  text: '#1e293b',
  textSecondary: '#64748b',
  textTertiary: '#94a3b8',
  
  // Primary colors
  primary: '#1e40af',
  primaryLight: '#dbeafe',
  
  // Status colors
  success: '#16a34a',
  warning: '#f97316',
  danger: '#ef4444',
  
  // Border colors
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  
  // Card colors
  card: '#fff',
  cardShadow: 'rgba(0, 0, 0, 0.1)',
  
  // Header
  headerBackground: '#1e40af',
  headerText: '#fff',
  
  // Other
  overlay: 'rgba(0, 0, 0, 0.4)',
  gold: '#fbbf24',
};

export const darkTheme = {
  // Background colors
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  backgroundTertiary: '#334155',
  
  // Text colors
  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',
  
  // Primary colors
  primary: '#3b82f6',
  primaryLight: '#1e3a8a',
  
  // Status colors
  success: '#22c55e',
  warning: '#fb923c',
  danger: '#f87171',
  
  // Border colors
  border: '#334155',
  borderLight: '#1e293b',
  
  // Card colors
  card: '#1e293b',
  cardShadow: 'rgba(0, 0, 0, 0.3)',
  
  // Header
  headerBackground: '#1e293b',
  headerText: '#f1f5f9',
  
  // Other
  overlay: 'rgba(0, 0, 0, 0.6)',
  gold: '#fbbf24',
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('travelease_theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('travelease_theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  const value = {
    isDarkMode,
    theme,
    toggleTheme,
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
