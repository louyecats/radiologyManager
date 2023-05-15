import axios from 'axios'; //at top
import './App.css';
import {useEffect} from 'react';
import RadTechForm from './components/RadTechForm';


function App() {

  useEffect(()=> {
    axios.get("http://localhost:8000/api/radtechs")
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }, []) //empty dependency array runs get() after component is mounted

  return (
    <div className="App">
      <h1>In the main App</h1>
      <RadTechForm/>
    </div>
  );
}

export default App;
