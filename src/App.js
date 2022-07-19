import './App.css';
import Locations from './screens/Locations';
import { Routes, Route } from "react-router-dom";
import Residents from './screens/Residents';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Locations />} />
        <Route path=":residentsId" element={<Residents />} />
      </Routes>
    </div>
  );
}

export default App;
