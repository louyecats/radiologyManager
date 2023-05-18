import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {useState} from 'react';
import ViewOne from './components/ViewOne';
import Main from '../src/views/Main';
import Update from './components/Update';



function App() {
  const [radTech, setRadTech] = useState({}); //lifted state

  return (
    <div className="App mt-5">
      <h1>Radiology Shift Manager</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to = "/api/radtechs"/>}/>
          <Route path="/api/radtechs" element={<Main/>} default />
          <Route path="/api/radtechs/:id" element={<ViewOne/>} radTech={radTech} setRadTech={setRadTech} />
          <Route path="/api/radtechs/edit/:id" element={<Update/>} radTech={radTech} setRadTech={setRadTech} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
