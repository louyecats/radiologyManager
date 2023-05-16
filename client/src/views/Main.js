import React, { useState } from 'react'
import RadTechForm from '../components/RadTechForm';
import ViewAll from '../components/ViewAll';

const Main = () => {

    const [radTech, setRadTech] = useState([]); //lifted state

    return (
        <div>
            <RadTechForm radTech={radTech} setRadTech={setRadTech}/>
            <ViewAll radTech={radTech} setRadTech={setRadTech}/>
        </div>
    )
}

export default Main;