import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export const User = () => {
  const navigate = useNavigate();
  const backtoHome= ()=> {
    navigate('/');
  }

  const [FormData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, email, password } = e.target;

    setFormData((FormData)=> ({
      ...FormData,
      [name]: e.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form data submitted', FormData)
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type='text'
            id='name'
            name='name'
            value={FormData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email' name='email' value={FormData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' name='password' value={FormData.password}
            onChange={handleChange}
          />
        </div>
        <button type='submit'>Submit</button>
        <button onClick={backtoHome}>Back to Home</button>
      </form>
    </div>
  )
}
