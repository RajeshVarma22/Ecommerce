import axios from 'axios'
import React from 'react'
  import './clothes.css'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Cloths = ({ routed }) => {
// const Cloths = ({ routed }) => {
  const [clothes, setClothes] = useState([])

  useEffect(() => {
    return () => {
      axios.get('http://localhost:8000/clothesMain')
        .then(response => {
          console.log(response)
          console.log(response.data)
          setClothes(response.data)
        }).catch(error => {
          console.log(error)
        })
    }
  }, [])

  // let path = (route) => {
  //   localStorage.removeItem('path')
  //   localStorage.setItem('path', route)
  //   routed(route)
  // }

  let path = (route) => {
    sessionStorage.setItem('productPath', route)
  }

  return (
    <div className='ClothesMainList container mt-4'>
      <div className="row">
        {
          clothes.map((item) => {
            return (
              <div className="col-sm-6 col-md-4" key={item.id}>
                <Link to={`${item.path}`} onClick={() => path(item.path)} style={{ textDecoration: 'none' }}>
                  <div className="card text-center shadow-lg">
                    <div className="card-body">
                      <img src={item.image} alt="" className='shadow-lg' height={item.height} width={item.width} />
                    </div>
                    <div className="card-footer mx-3 bg-white">
                      <h4><b>{item.text}</b></h4>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cloths