import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const [response, setResponse] = useState("NotCame");
  const [currentUserData, setCurrentUserData] = useState();
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState();

  useEffect(() => {
    return () => {
      let currentUser = JSON.parse(localStorage.getItem("currentUser"))
      if (currentUser === null) {
        setCurrentUserLoggedIn(false)
      } else {
        setCurrentUserLoggedIn(true)
        setCurrentUserData(currentUser)
      }
    }
  }, [])

  let navigate = useNavigate()

  const checkForLogOut = async () => {
    let currentUserId = currentUserData.id
    let details = {
      email: currentUserData.email,
      password: currentUserData.password,
      login: false,
    }

    if (currentUserData.login) {
      navigate('/')
      localStorage.clear("currentUser")
      localStorage.setItem("currentUser", JSON.stringify(details))
      await axios.put(`http://localhost:8000/users/${currentUserId}`, {
        email: currentUserData.email,
        password: currentUserData.password,
        login: false,
      },
        {
          withCredentials: true
        })
        .then(response => {
          console.log(response.status)
          // console.log(response.data)
          setResponse("Logged out Successfully")

        })
        .catch(error => {
          console.log(error)
        })
    } else {
      setResponse("Please Login")
    }
  }

  return (
    <div>
      {
        currentUserLoggedIn ?
          currentUserData.login ?
            <button onClick={checkForLogOut} className="btn btn-warning mx-2">LogOut</button>
            : ""
          : ""
      }
    </div>
  )
}

export default LogOut