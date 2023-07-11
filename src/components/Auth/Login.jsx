import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ getEmail, getLogIn, getUserId, getPassword }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [data, setData] = useState([])
  const [id, setId] = useState("")
  const [userPresent, setUserPresent] = useState()

  let navigate = useNavigate()

  useEffect(() => {
    return () => {
      axios.get('http://localhost:8000/users')
        .then(response => {
          // console.log(response)
          setData(response.data)
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(data) 
    let present = false
    let idCurrent = null

    let putData = async () => {
      data.forEach(userEmail => {
        if ((userEmail.email === email) && (userEmail.password === password)) {
          present = true
          idCurrent = userEmail.id
          setId(idCurrent);
          setUserPresent(true);
          console.log("userSignedUp")
          let details = {
            email: userEmail.email,
            password: userEmail.password,
            login: true,
            id: userEmail.id
          }
          let addDetails = () => {
            if (localStorage.getItem("currentUser") === null) {
              localStorage.setItem("currentUser", JSON.stringify(details))
            } else {
              localStorage.removeItem("currentUser")
              localStorage.setItem("currentUser", JSON.stringify(details))
            }
          }
          addDetails();
        }
      })

      if (present) {
        // let users = {
        //   email: email,
        //   password: password,
        //   userPresent: true,
        //   id : idCurrent
        // }
        // console.log(users)
        // console.log(JSON.stringify(users))
        // await fetch('http://localhost:8000/users/' + idCurrent, {
        //   method: 'PUT',
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(users)
        // }).then((response) => {
        //   console.log(response)
        //   console.log(response.data)
        //   console.log('Successfully submitted')
        //   // navigate('/cart')
        // }).catch(error => {
        //   console.log(error)
        // })
        await axios.put(`http://localhost:8000/users/${idCurrent}`, {
          email: email,
          password: password,
          login: true,
        },
          {
            withCredentials: true
          })
          .then(response => {
            getEmail(email)
            getLogIn(true)
            getUserId(id)
            getPassword(password)
            setId(idCurrent)
            // console.log(response.status)
            // console.log(response.data)
            navigate('/')
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
    putData()
  }



  return (
    <>
      <div className='login d-flex flex-row justify-content-center mt-5'>
        <div className="card p-3 shadows">
          <div className="card-body text-white">
            <h1 className='text-center fw-bold'>Log In</h1>
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
              <button className="btn btnCnhg2 mx-3 my-1"><b>LogIn</b></button>
              <Link to={'/signup'} className='linksDecorate'><p className='m-3'>New User? Signup here</p></Link>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login