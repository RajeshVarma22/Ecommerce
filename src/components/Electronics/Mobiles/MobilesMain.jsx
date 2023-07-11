import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from "../../CustomHooks/useFetch"

const MobilesMain = ({ routed }) => {
  const routeShow = (route) => {
    routed(route)
    let pathIn = localStorage.getItem('path')
    if (pathIn === null) {
      localStorage.setItem('path', route)
    } else {
      localStorage.removeItem('path')
      localStorage.setItem('path', route)
    }
  }
  const { data, pending, err } = useFetch('http://localhost:8000/allMobilesListShow')

  return (
    <div className='MobilesMain container mb-4'>
      {/* {pending && <div> <span className='spinner-border spinner-border-sm text-success'></span> Loading....</div>} */}
      {err && <div>{err}</div>}
      <div className="row">
        {data &&
          data.map((mobile) => {
            return (
              <div className="col-sm-6 col-md-4" key={mobile.text}>
                <Link to={`${mobile.link}`}>
                  <button className='btn container-fluid' onClick={() => routeShow(`${mobile.path}`)}>
                    <div className="card text-center my-2">
                      <div className="card-body">
                        <img src={mobile.image} alt="" width={mobile.width} height={300} />
                      </div>
                      <div className="card-footer">
                        <h4>{mobile.text}</h4>
                      </div>
                    </div>
                  </button>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default MobilesMain