import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppProvider } from './context/AppContext';
import AppNavigation from './navigation/AppNavigation';
import 'react-native-reanimated';

export default function App() {
  return (
      <AppProvider>
        <AppNavigation/>
      </AppProvider>  
  );
}