import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'; //to refresh route after form completed and display created

const RadTechForm = () => {

    // const [firstName, setFirstName] = useState("")
    // const [lastName, setLastName] = useState("")
    // const [modality, setModality] = useState("")
    //above does same as below except inside one function

    const [radTech, setRadTech] = useState({
        firstName: "",
        lastName: "",
        modality: "" 
    })
    //**make sure keys above 1. match form names & 2. match server/model.js name or different key: values will be put in state and cause error when send to DB on create function

    //when input form changes, this function is called, which calls the setRadTech function to put in state, passing in the spread operator to combine the getter radTech with the object of input name as a key and the input value as the value
    const onChangeHandler = (e) => {
        setRadTech({
            ...radTech,
            [e.target.name]: e.target.value
        })
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

    const navigate = useNavigate();

    //We have two options to get data to back-end. 
    //Both ways require axios imported to communicate w/server

    //Option 1: We can set the form data in state w/an onChange event on each form input, then send that data to our server/DB post request route, which is connected to the create function
    const submitHandler = (e) => {
        e.preventDefault()
        if (formValidator()) {
        //if passes validations above and returns true, then send post request to route w/create function and pass in radTech object data from useState function above, if passes log response or if fails log the error
            axios.post('http://localhost:8000/api/radtechs', radTech)
                .then(res => {
                    console.log(res.data.radTech._id);
                    navigate(`/api/radtechs/${res.data.radTech._id}`)
                })
                .catch(err =>console.log(err))
                setHasBeenSubmitted(true);
                // navigate('/')
        }
        else {
            setErrors({
                firstName: "First name must be at least 2 characters",
                lastName: "Last name must be at least 2 characters",
                modality: "Modality must be at least 2 characters"
            })
        }

    //Option 2: Since we have our server/DB, we can send the form data straight to the back-end w/o putting in state.
        // axios.post('http://localhost:8000/api/radtechs', {
        //     firstName: e.target.firstName.value,
        //     lastName: e.target.lastName.value,
        //     modality: e.target.modality.value
        // })
        //sends they key and value from the form input name="firstName" to our back-end post request route that is connected to the create function
    }
    
    const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false); //make default value false


    return (
        <div className="mt-5 bg-white col-6 mx-auto p-3 border border-dark rounded">
            <h2>Add Rad Tech</h2>

            <form action="" className="col md-6 mx-auto" onSubmit={submitHandler}>

            {/* form messages - conditional statement w/ displayed statement */}
            {
                hasBeenSubmitted ?
                <h3 className="text-info">New rad tech has been created!</h3> :
                <h3 className="text-info">Please fill out the form below.</h3>
            }

                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" name="firstName" id="firstName" className="form-control" onChange={onChangeHandler}/>
                    {/* firstName is important to match to connect to our state */}
                    {errors.firstName ? <p className="text-danger">{errors.firstName}</p> : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" name="lastName" id="lastName" className="form-control" onChange={onChangeHandler}/>
                    {errors.lastName ? <p className="text-danger">{errors.lastName}</p> : ""}
                </div>

                <div className="form-group">
                    <label htmlFor="modality">Preferred Modality:</label>
                    <input type="text" name="modality" id="modality" className="form-control" onChange={onChangeHandler}/>
                    {errors.modality ? <p className="text-danger">{errors.modality}</p> : ""}
                </div>

                <button className="btn btn-secondary mt-3">Create Rad Tech</button>
            </form>
        </div>
    )
}

export default RadTechForm