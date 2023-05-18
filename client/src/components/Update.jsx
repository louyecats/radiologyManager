import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

const Update = (props) => {

    const {id} = useParams(); //access value from route w/ useParams, import it from react-router-dom
    const navigate = useNavigate(); //to redirect after delete method ran
    const [radTech, setRadTech] = useState({}); //place data in state that's returend from get() method as an object

    //use axios get() to grab the specific id's object data from back-end/DB, then place in state to have access/display current values for user to update
    useEffect(() => {
        axios.get(`http://localhost:8000/api/radtechs/${id}`)
            .then(res => setRadTech(res.data.radTech))
            .catch(err => console.log(err))
    }, []); //always have empty dependency  array so runs get() when component mounts

    //when input form changes, this function is called, which calls the setRadTech function to put in state, passing in the spread operator to combine the getter radTech with the object of input name as a key and the input value as the value
    const onChangeHandler = (e) => {
        setRadTech({
            ...radTech,
            [e.target.name]: e.target.value
        })
    }
    
    //We can set the form data in state w/an onChange event on each form input, then send that data to our server/DB post request route, which is connected to the update function
    const submitHandler = (e) => {
        e.preventDefault()
        if (formValidator()) {
        //if passes validations above and returns true, then send post request to route w/create function and pass in radTech object data from useState function above, if passes log response or if fails log the error
            axios.patch(`http://localhost:8000/api/radtechs/${id}`, radTech)
                .then(res => navigate ("/api/radtechs"))
                .catch(err =>console.log(err))
        }
        else {
            setErrors({
                firstName: "First name must be at least 2 characters",
                lastName: "Last name must be at least 2 characters",
                modality: "Modality must be at least 2 characters",
                firstShiftStatus: "Status must be Undecided, Working or Not Working",
                secondShiftStatus: "Status must be Undecided, Working or Not Working",
                thirdShiftStatus: "Status must be Undecided, Working or Not Working"
            })
        }
    }

    const [errors, setErrors] = useState({})

    const formValidator = () => {
        let isValid = true
        if (radTech.firstName.length < 2) {
            return false
        }
        if (radTech.lastName.length < 2) {
            return false
        }
        if (radTech.modality.length < 2) {
            return false
        }
        if (radTech.firstShiftStatus === "Undecided" || "Working" || "Not Working") {
            return false
        } 
        if (radTech.secondShiftStatus === "Undecided" || "Working" || "Not Working") {
            return false
        } 
        if (radTech.thirdShiftStatus === "Undecided" || "Working" || "Not Working") {
            return false
        } 
        return isValid
    }

    return (
        <div className="mt-5 bg-white col-6 mx-auto p-3 border border-dark rounded">
            <h2>Edit Rad Tech {radTech.firstName}:</h2>
            <form action="" className="col md-6 mx-auto" onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" id="firstName" className="form-control" value={radTech.firstName} onChange={onChangeHandler}/>
                    {/* firstName is important to match to connect to our state */}
                    {errors.firstName ? <p className="text-danger">{errors.firstName}</p> : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" id="lastName" className="form-control" value={radTech.lastName} onChange={onChangeHandler}/>
                    {errors.lastName ? <p className="text-danger">{errors.lastName}</p> : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="modality">Preferred Modality:</label>
                    <input type="text" name="modality" id="modality" className="form-control" value={radTech.modality} onChange={onChangeHandler}/>
                    {errors.modality ? <p className="text-danger">{errors.modality}</p> : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="firstShiftStatus">First Shift Status:</label>
                    <input type="text" name="firstShiftStatus" id="firstShiftStatus" className="form-control" value={radTech.firstShiftStatus} onChange={onChangeHandler}/>
                    {errors.firstShiftStatus ? <p className="text-danger">{errors.firstShiftStatus}</p> : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="secondShiftStatus">Second Shift Status:</label>
                    <input type="text" name="secondShiftStatus" id="secondShiftStatus" className="form-control" value={radTech.secondShiftStatus} onChange={onChangeHandler}/>
                    {errors.secondShiftStatus ? <p className="text-danger">{errors.secondShiftStatus}</p> : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="thirdShiftStatus">Third Shift Status:</label>
                    <input type="text" name="thirdShiftStatus" id="thirdShiftStatus" className="form-control" value={radTech.thirdShiftStatus} onChange={onChangeHandler}/>
                    {errors.thirdShiftStatus ? <p className="text-danger">{errors.thirdShiftStatus}</p> : ""}
                </div>
                    <button className="btn btn-warning mt-3">Update Rad Tech</button>
            </form>
                <a href="/" className="btn btn-secondary mt-3 offset-6">Home</a>
        </div>
    )
}

export default Update