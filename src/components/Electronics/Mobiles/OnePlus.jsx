import React, { useState } from 'react'
import useFetch from '../../CustomHooks/useFetch'
import { Link } from 'react-router-dom'

const OnePlus = () => {
  const { data, pending, err } = useFetch('http://localhost:8000/onePlusMobiles');
  return (
    <div className='onePlusMain container'>
      {pending && <div> <span className='spinner-border spinner-border-sm text-success'></span> Loading....</div>}
      {err && <div>{err}</div>}
      <div className="row">
        {data &&
          data.map((mobile) => {
            return (
              <div className="col-sm-6 col-md-4 text-center mb-3" key={mobile.text}>
                <Link to={`${mobile.id}`} >
                  <div className="card">
                    <div className="card-body">
                      <img src={mobile.image} alt="" width={mobile.width} height={mobile.height} />
                    </div>
                    <div className="card-footer">
                      <h5>{mobile.text}</h5>
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
export default OnePlus