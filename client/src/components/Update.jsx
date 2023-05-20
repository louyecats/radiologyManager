import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';

const Update = (props) => {

    const {id} = useParams(); //access value from route w/ useParams, import it from react-router-dom
    const navigate = useNavigate(); //to redirect after delete method ran
    const [radTech, setRadTech] = useState({}); //place data in state that's returend from get() method as an object

    //use axios get() to grab the specific id's object data from back-end/DB, then place in state to have access/display current values for user to update
    useEffect(() => {
        axios.get(`http://localhost:8000/api/radtechs/${id}`)
            .then(res => {
                console.log(res.data.radTech);
                setRadTech(res.data.radTech);
                })
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
                modality: "Modality must be at least 2 characters"
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
        return isValid
    }

    return (
        <div>
            <NavBar/>
            <div className="mt-5 bg-white col-6 mx-auto p-3 border border-dark rounded">
                <h2>Edit Rad Tech {radTech.firstName}:</h2>
                <form action="" className="col md-6 mx-auto" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input 
                            type="text" 
                            name="firstName" 
                            id="firstName" 
                            className="form-control" 
                            value={radTech.firstName} 
                            onChange={onChangeHandler}
                        />
                        {errors.firstName ? <p className="text-danger">{errors.firstName}</p> : ""}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input 
                            type="text" 
                            name="lastName" 
                            id="lastName" 
                            className="form-control" 
                            value={radTech.lastName} 
                            onChange={onChangeHandler}
                        />
                        {errors.lastName ? <p className="text-danger">{errors.lastName}</p> : ""}
                    </div>

                    <div className="form-group">
                        <label htmlFor="modality">Preferred Modality:</label>
                        <input 
                            type="text" 
                            name="modality" 
                            id="modality" 
                            className="form-control" 
                            value={radTech.modality} 
                            onChange={onChangeHandler}
                        />
                        {errors.modality ? <p className="text-danger">{errors.modality}</p> : ""}
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstShiftStatus">First Shift Status:</label>
                        
                        <input 
                        type="checkbox" 
                        name="firstShiftStatus" 
                        id="firstShiftStatus" 
                        checked={(radTech.firstShiftStatus === "Undecided")? true:false} 
                        value="Undecided" 
                        onChange={onChangeHandler}
                        /> Undecided

                        <input 
                        type="checkbox" 
                        name="firstShiftStatus" 
                        id="firstShiftStatus" 
                        checked={(radTech.firstShiftStatus === "Working")? true:false} 
                        value="Working" 
                        onChange={onChangeHandler}
                        /> Working

                        <input 
                            type="checkbox" 
                            name="firstShiftStatus" 
                            id="firstShiftStatus" 
                            checked={(radTech.firstShiftStatus == "Not Working")? true:false} 
                            value="Not Working" 
                            onChange={onChangeHandler}
                        />Not Working
                    </div>

                    <div className="form-group">
                        <label htmlFor="secondShiftStatus">Second Shift Status:</label>

                        <input 
                            type="radio" 
                            name="secondShiftStatus" 
                            id="secondShiftStatus" 
                            value="Undecided" 
                            checked={radTech.secondShiftStatus === "Undecided"} 
                            onChange={onChangeHandler}
                        /> Undecided

                        <input 
                            type="radio" 
                            name="secondShiftStatus" 
                            id="secondShiftStatus" 
                            value="Working" 
                            checked={radTech.secondShiftStatus === "Working"} 
                            onChange={onChangeHandler}
                        /> Working

                        <input 
                            type="radio" 
                            name="secondShiftStatus" 
                            id="secondShiftStatus" 
                            value="Not Working" 
                            checked={radTech.secondShiftStatus === "Not Working"} 
                            onChange={onChangeHandler}
                        /> Not Working
                    </div>

                    <div className="form-group">
                        <label htmlFor="thirdShiftStatus">Third Shift Status: 
                            <select 
                                name="thirdShiftStatus" 
                                id="thirdShiftStatus" 
                                onChange={onChangeHandler}>
                                <option 
                                    selected={(radTech.thirdShiftStatus == "Undecided")? "selected": null}
                                    value="Undecided">Undecided
                                </option>
                                <option 
                                    selected={(radTech.thirdShiftStatus == "Working")? "selected": null}
                                    value="Working">Working
                                </option>
                                <option 
                                    selected={(radTech.thirdShiftStatus == "Not Working")? "selected": null}
                                    value="Not Working">Not Working
                                </option>
                            </select>
                        </label>
                    </div>

                    <button className="btn btn-secondary mt-3">Update Rad Tech</button>
                </form>
            </div>
        </div>
    )
}

export default Update