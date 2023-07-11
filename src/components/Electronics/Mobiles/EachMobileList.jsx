import React from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetch from '../../CustomHooks/useFetch';

const EachMobileList = () => {
  const {path} = useParams() 
  const { data, pending, err } = useFetch(`http://localhost:8000/${path}`);

  const setSelectedPath = (path) => {
    sessionStorage.setItem('productPath', path)
  }

  return (
    <div>
      {err && <div>{err}</div>}
      <div className="container">
        <div className="row ">
          {data &&
            data.map((mobile) => {
              return (
                <div className="col-sm-6 col-md-4 text-center mb-3" key={mobile.id}>
                  <Link to={`${mobile.id}`} onClick={() => setSelectedPath(mobile.path)} style={{textDecoration:'none'}}>
                    <div className="card">
                      <div className="card-body">
                        <span style={{ position: 'relative', top: '0px', right: '0px', float: 'right' }}>
                          {mobile.like ? <i className='fa-solid fa-heart text-danger fa-2x'></i> : <i className='fa-regular fa-heart'></i>}
                        </span>
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
    </div>
  )
}

export default EachMobileList