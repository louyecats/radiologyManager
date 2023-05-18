import React from 'react'
import {Link} from 'react-router-dom'

const NavBar = () => {
  return (
    <div className="mt-5 bg-white col-6 mx-auto p-3 border border-dark rounded">
        <Link to="/">Home</Link>
    </div>
  )
}

export default NavBar