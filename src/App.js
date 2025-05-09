
import './App.css';
//import TaxCalculator from './useMemo';
import Calculator from './useCallback';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Calculator />
      </header>
    </div>
  );
}

export default App;
