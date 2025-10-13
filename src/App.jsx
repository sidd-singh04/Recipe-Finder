import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Mainpage from './Components/Mainpage';
import Mealinfo from './Components/Mealinfo';
import './App.css';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/:mealid' element={<Mealinfo />} />
      </Routes>
  );
}

export default App;
