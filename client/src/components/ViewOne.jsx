import React, {useEffect, useState} from 'react'
//useEffect to query database and useState to store that data somewhere to iterate through
import axios from 'axios' //to make request to back-end to retrieve data
import {useParams, useNavigate} from 'react-router-dom';
import NavBar from './NavBar';

const ViewOne = () => {

    const {id} = useParams(); //access value from route w/ useParams, import it from react-router-dom
    const navigate = useNavigate(); //to redirect after delete method ran
    const [radTech, setRadTech] = useState({}); //place data in state that's returend from get() method as an object

    //use axios get() to grab the specific id's object data from back-end/DB, then place in state to have access/display current values
    useEffect(() => {
        axios.get(`http://localhost:8000/api/radtechs/${id}`)
            .then(res => {
                console.log(res.data.radTech); //use .radTech bc placed in object on controller method
                setRadTech(res.data.radTech);
            })
            .catch(err => console.log(err));
    }, []); //always have empty dependency  array so runs get() when component mounts

    //delete
    const deleteRadTech = (e) => {
        axios.delete(`http://localhost:8000/api/radtechs/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        navigate("/")
    }
    //update
    const updateRadTech = (e) => {
        navigate(`/api/radtechs/edit/${id}`)
    }

    return (
        <div>
            <NavBar/>
       
            <div className="mt-5 mb-5 bg-white col-6 mx-auto p-2 border border-dark rounded">
                <h2 className="text-info">Technologist Profile:</h2>
                <h3 className="mt-4">{radTech.firstName} {radTech.lastName}</h3>
                <p className="mt-4"><b>Preferred Modality:</b> {radTech.modality}</p>
                <p className="mt-4"><b>First Shift Status:</b> {radTech.firstShiftStatus}</p>
                <p className="mt-4"><b>Second Shift Status:</b> {radTech.secondShiftStatus}</p>
                <p className="mt-4"><b>Third Shift Status:</b> {radTech.thirdShiftStatus}</p>
                {/* <a href="/" className=" btn btn-secondary mt-3">Home</a> */}
                {/* <a href={`http://localhost:3000/api/radtechs/edit/${radTech._id}`} className=" btn btn-info mt-3">Update</a> */}
                <button className=" btn btn-info mt-3" onClick={(e) => updateRadTech(radTech._id)}>Update</button>
                <button className="btn btn-danger mt-3" onClick={deleteRadTech}>Delete</button>
            </div>
        </div>
    )
}
export default ViewOne