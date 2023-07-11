import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cnfpassword, setCnfPassword] = useState("")
  const [succes, setSuccess] = useState(null)

  let navigate = useNavigate()

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const details = { email, password }
  //   if (password === cnfpassword) {
  //     fetch('http://localhost:8000/users', {
  //       method: 'POST',
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(details)
  //     }, {
  //       withCredentials: true
  //     }).then(() => {
  //       setSuccess(true)
  //       setTimeout(() => {
  //         navigate('/login')
  //       }, 2000)
  //     }).catch(error => {
  //       console.log(error)
  //       alert('Please check the fields')
  //     })
  //   } else {
  //     alert('Passwords are not matched')
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/users', {
      email: email,
      password: password
    },
      {
        withCredentials: true
      }
    ).then(response => {
      console.log(response)
      navigate('/login')
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      {
        succes ?
          <div className='text-center mt-5 pt-5 '>
            <h1 className='mt-5 fw-bold bg-success text-white p-3 d-inline-block cornersCurve'>Signup Successfull</h1>
            <p>you're redirected to Login</p>
          </div>
          :
          <div className='signUp d-flex flex-row justify-content-center mt-5'>
            <div className="card bg-primary p-3 shadows">
              <div className="card-body text-white">
                <h1 className='text-center'>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                  <div className='m-3'>
                    <label htmlFor="userEmail">Email</label>
                    <input
                      type="email"
                      id='userEmail'
                      className='form-control mt-2'
                      placeholder='Email'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className='m-3'>
                    <label htmlFor="userPassword">Password</label>
                    <input
                      type="password"
                      id='userPassword'
                      className='form-control mt-2'
                      placeholder='Password'
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='m-3'>
                    <label htmlFor="userPassword">Confirm Password</label>
                    <input
                      type="password"
                      id='userPassword'
                      className='form-control mt-2'
                      placeholder='Password'
                      required
                      value={cnfpassword}
                      onChange={(e) => setCnfPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn btnCnhg mx-3 my-1"><b>Sign Up</b></button>
                </form>
              </div>
            </div>
          </div>
      }
    </>
  )
}

export default SignUp