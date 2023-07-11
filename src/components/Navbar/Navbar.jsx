import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/Images/Logo.jpg'
import LogOut from '../Auth/LogOut'


const Navbar = () => {
  let userDetails = JSON.parse(localStorage.getItem("currentUser"))
  return (
    <>
      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            <img src={logo} width={60} height={50} alt="" id='logoImg' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link text-white" aria-current="page" href="#">
                  <i className='fa fa-home fa-1x'></i> Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Products
                </a>
                <ul className="dropdown-menu">
                  <li><Link to={"/electronics"} className="dropdown-item">Electronics</Link></li>
                  <li><Link to={'/clothes'} className="dropdown-item" href="#">Clothes</Link></li>
                  <li><a className="dropdown-item" href="#">Grocery</a></li>
                  <li><a className="dropdown-item" href="#">Furniture</a></li>
                  <li><a className="dropdown-item" href="#">Foot wear</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  User
                </a>
                <ul className="dropdown-menu">
                  <li><Link to={"/orders"} className="dropdown-item" href="#">Orders</Link></li>
                  <li><a className="dropdown-item" href="#">Wish List</a></li>
                </ul>
              </li>
            </ul>
            <Link to={"/cart"}><button className="btn btn-light" type="submit"><i className='fa-solid fa-cart-shopping text-danger'></i></button></Link>
            {/* <form className="d-flex" role="search">
              <input className="form-control mx-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-light" type="submit"><i className='fa-solid fa-search'></i></button>
            </form> */}
            {
              userDetails === null ?
                <Link to={"/login"}><button className="btn btn-light mx-2" type="submit">Login/Signup</button></Link>
                :
                userDetails.login ?
                  <LogOut />
                  :
                  <Link to={"/login"}><button className="btn btn-light mx-2" type="submit">Login/Signup</button></Link>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar