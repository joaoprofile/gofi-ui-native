import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'gofi-ui-native';
import { ToastProvider } from 'gofi-ui-native';
import { DocsApp } from '@/docs/App';

// Web only: keep keyboard focus rings, but drop the rectangular outline box that
// the browser draws on mouse/touch press (it looked like an accidental selection).
if (Platform.OS === 'web' && typeof document !== 'undefined') {
  const ID = 'gofi-focus-reset';
  if (!document.getElementById(ID)) {
    const style = document.createElement('style');
    style.id = ID;
    style.textContent = ':focus:not(:focus-visible){outline:none !important;}';
    document.head.appendChild(style);
  }
}

/** Root of the gofi-ui-native docs app (runs on web via react-native-web + native). */
export function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider>
          <StatusBar style="auto" />
          <DocsApp />
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;
