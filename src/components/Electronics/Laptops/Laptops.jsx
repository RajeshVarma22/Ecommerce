import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Laptops = ({ routed }) => {

  const [mainContent, setMainContent] = useState([])
  // let path = (route) => {
  //   localStorage.removeItem('path');
  //   localStorage.setItem('path', route)
  //   routed(route)
  // }

  useEffect(() => {
    return () => {
      axios.get('http://localhost:8000/laptopsMainContent')
        .then(response => {
          // console.log(response)
          // console.log(response.data)
          setMainContent(response.data)
        }).catch(error => {
          console.log(error)
        })
    }
  }, [])


  return (
    <div id='laptopsMain' className='container d-flex flex-row justify-content-center align-items-center'>
      <div className='row mb-2'>
        {
          mainContent.map(item => {
            return (
              <div className="lapSubContent col-md-6 my-2" key={item.id}>
                <Link to={item.path}>
                {/* <Link to={item.path} onClick={() => path(item.path)}> */}
                  <div className="card text-center my-1 ">
                    <div className="card-body">
                      <img src={item.image} alt="" height={item.height} width={item.width} />
                    </div>
                    <div className="card-footer">
                      <h3>{item.text}</h3>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div >
  )
}

export default Laptops