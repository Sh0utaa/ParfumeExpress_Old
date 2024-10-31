import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/AuthContext'


const Header = () => {
    const navigate = useNavigate()

    const {user, logoutUser} = useAuth()


  return (
    <div className="header">
        <div>
            <Link id="header-logo" to="/">ParfumeExpress</Link>
        </div>

        <div className="links--wrapper">
            {user ? (
                <>
                    <Link to="/" className="header--link">Home</Link>
                    <Link to={`/profile/${user.$id}`} className="header--link">Profile</Link>
                    <Link to="/search" className="header--link">Search</Link>
                </>
            ):(
                <Link className="btn" to="/login">Login</Link>
            )}

            {/* <>

            </> */}
            
        </div>
    </div>
  )
}

export default Header
