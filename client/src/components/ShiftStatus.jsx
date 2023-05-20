import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ShiftStatus = () => {

    const [radTechs, setRadTechs] = useState([]) //must be an array to iterate through w/map()

    useEffect(() => {
        //this route calls our get all function
        axios.get('http://localhost:8000/api/radtechs')
            //the response is an array of objects that we will set in state use .radTechs bc we placed in an object on our controller
            .then(res => setRadTechs(res.data.radTechs))
    }, []) //need dependency array to avoid infinite loop of function being ran multiple times and instead only when the component is mounted



  return (
    <div className="mt-3 mb-5 bg-white col-8 mx-auto p-3 border border-dark rounded">
            <h2>Shift Status:</h2>
            <table className="col-md-8 mx-auto mt-4 table table-bordered">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Preferred Modality</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {/* Conditionally render for First Shift */}
                {ShiftStatus === firstShiftStatus ? (

                )}
                {radTechs.map((tech) => {
                    return (
                        <tr key={tech._id}>
                            <td><Link to={`${tech._id}`}>{tech.firstName}</Link></td> 
                            {/* same as {`/api/radtechs/${tech._id}`} */}
                            <td>{tech.lastName}</td>
                            <td>{tech.modality}</td>
                            <td colSpan="2">

                                <a href={`http://localhost:3000/api/radtechs/${tech._id}`} className=" btn btn-secondary">View</a>

                                <button 
                                    className="btn btn-danger" onClick={(e) => {
                                        const confirmDelete = window.confirm(
                                            "Do you really want to delete this Rad Tech?"
                                        )
                                        if (confirmDelete === true) {deleteRadTech(tech._id)}
                                    }}>
                                    Delete
                                </button>
                                {/* you MUST have onclick={(e)=> before the delete function or when you click the delete button, javascript will auto select all buttons and delete everyone! */}
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
    </div>
  )
}

export default ShiftStatus