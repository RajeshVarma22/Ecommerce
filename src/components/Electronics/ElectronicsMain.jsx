import React, { useEffect } from 'react'
import { useState } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const ElectronicsMain = () => {
  const [showElectronicsMain, setShowElectronicsMain] = useState([])
  useEffect(() => {
    return async () => {
      await axios.get('http://localhost:8000/electronics')
        .then(response => {
          console.log(response)
          console.log(response.data)
          setShowElectronicsMain(response.data)
        }).catch(error => {
          console.log(error)
        })
    }
  }, [])

  return (
    <div className='electronicsAll container'>
      <div className="row">
        {
          showElectronicsMain.map((item) => {
            return (
              <div className="col-sm-6 col-md-4 my-2" key={item.id}>
                <div className="card">
                  <Link to={item.path}>
                    <div className="card-body text-center">
                      <img src={item.image} alt="CameraAccesoriesInElectronics" height={item.height} width={item.width} />
                      <div className="card-footer">
                        <h4>{item.text}</h4>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ElectronicsMain