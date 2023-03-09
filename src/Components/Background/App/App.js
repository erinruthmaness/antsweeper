import Window from '../Window/Window';
import Footer from '../Footer/Footer';

import { useContext } from 'react';
import paramContext from '../../../utils/store/paramsContext';
import '../../../style/levels.css'

// import styles from './App.module.css';

function App() {
  const paramCtx = useContext(paramContext)
  return (
    <div className={paramCtx.level}>
      <Window />
      <Footer />
    </div>
  );
}

export default App;
