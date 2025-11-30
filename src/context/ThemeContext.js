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
  background: '#ffffff',
  backgroundSecondary: '#f8fafc',
  backgroundTertiary: '#f1f5f9',
  backgroundGradient: ['#ffffff', '#f8fafc'],

  // Text colors
  text: '#0f172a',
  textSecondary: '#475569',
  textTertiary: '#94a3b8',

  // Primary colors & gradients
  primary: '#2563eb',
  primaryDark: '#1e40af',
  primaryLight: '#dbeafe',
  primaryGradient: ['#3b82f6', '#2563eb'],

  // Accent colors
  accent: '#8b5cf6',
  accentGradient: ['#a78bfa', '#8b5cf6'],

  // Status colors
  success: '#10b981',
  successGradient: ['#34d399', '#10b981'],
  warning: '#f59e0b',
  warningGradient: ['#fbbf24', '#f59e0b'],
  danger: '#ef4444',
  dangerGradient: ['#f87171', '#ef4444'],

  // Border colors
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
  borderDark: '#cbd5e1',

  // Card colors
  card: '#ffffff',
  cardSecondary: '#fafbfc',
  cardShadow: 'rgba(0, 0, 0, 0.08)',
  cardShadowLarge: 'rgba(0, 0, 0, 0.12)',

  // Header
  headerBackground: '#1e40af',
  headerGradient: ['#2563eb', '#1e40af'],
  headerText: '#ffffff',

  // Special gradients
  heroGradient: ['#3b82f6', '#1e40af', '#1e3a8a'],
  featureGradient: ['#f8fafc', '#ffffff'],

  // Other
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  gold: '#f59e0b',
  shimmer: '#e2e8f0',
};

export const darkTheme = {
  // Background colors
  background: '#0f172a',
  backgroundSecondary: '#1e293b',
  backgroundTertiary: '#334155',
  backgroundGradient: ['#0f172a', '#1e293b'],

  // Text colors
  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textTertiary: '#94a3b8',

  // Primary colors & gradients
  primary: '#3b82f6',
  primaryDark: '#2563eb',
  primaryLight: '#1e3a8a',
  primaryGradient: ['#60a5fa', '#3b82f6'],

  // Accent colors
  accent: '#a78bfa',
  accentGradient: ['#c4b5fd', '#a78bfa'],

  // Status colors
  success: '#22c55e',
  successGradient: ['#4ade80', '#22c55e'],
  warning: '#fbbf24',
  warningGradient: ['#fcd34d', '#fbbf24'],
  danger: '#f87171',
  dangerGradient: ['#fca5a5', '#f87171'],

  // Border colors
  border: '#334155',
  borderLight: '#1e293b',
  borderDark: '#475569',

  // Card colors
  card: '#1e293b',
  cardSecondary: '#334155',
  cardShadow: 'rgba(0, 0, 0, 0.4)',
  cardShadowLarge: 'rgba(0, 0, 0, 0.6)',

  // Header
  headerBackground: '#1e293b',
  headerGradient: ['#334155', '#1e293b'],
  headerText: '#f1f5f9',

  // Special gradients
  heroGradient: ['#1e293b', '#0f172a', '#020617'],
  featureGradient: ['#1e293b', '#334155'],

  // Other
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',
  gold: '#fbbf24',
  shimmer: '#475569',
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
