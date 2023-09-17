# Fwork React mui-theme-mode-provider

```bash
npm i fwork-react-mui-theme-mode-provider
```

```js
// ...code
import { ThemeModeProvider } from 'fwork-react-mui-theme-mode-provider';

function App() {
  return (
    // ...code
    
    <ThemeModeProvider>
      <div>My App</div>
    </ThemeModeProvider>

    // code...
  );
}
// code...
```

```js
// ...code
import { 
  ThemeModeProvider, 
  ThemeModeToggleComponent 
} from 'fwork-react-mui-theme-mode-provider';

function MyComponent() {
  return <div>
    <label>My Component</label>
    <ThemeModeToggleComponent />
  </div>
}

function App() {
  return (
    // ...code
    
    <ThemeModeProvider>
      <MyComponent />
    </ThemeModeProvider>

    // code...
  );
}
// code...
```