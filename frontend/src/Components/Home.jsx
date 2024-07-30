import React from 'react'
import { useNavigate } from 'react-router-dom'


export const Home = () => {
    const navigate = useNavigate();
    const gotoUser = () => {
        navigate('/userpage');
    }
    return (
        <div>
            <h1>TaskManagment</h1>
            <div>


                <button type='SignUp' onClick={gotoUser}>Kindly Start</button>



            </div>
        </div>
    )
}
