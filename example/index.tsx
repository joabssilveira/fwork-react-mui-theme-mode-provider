import * as React from 'react';
import 'react-app-polyfill/ie11';
import { createRoot } from 'react-dom/client';
// import * as ReactDOM from 'react-dom';
import { ThemeModeProvider, ThemeModeToggleComponent } from '../src';

const App = () => {
  return (
    <ThemeModeProvider disableSystemColor boxProps={{
      height: '100%'
    }}>
      <div style={{
        padding: 20
      }}>
        <ThemeModeToggleComponent />
        <label>ThemeModeProvider</label>
      </div>
    </ThemeModeProvider>
  );
};

// ReactDOM.render(<App />, document.getElementById('root'));
// Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App />)
