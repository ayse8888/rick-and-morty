import './App.css';
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Locations from './screens/Locations/Locations';
import Residents from './screens/Residents/Residents';

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
