import React from 'react'
import { NavLink ,Link} from 'react-router-dom'
import "./Navbar.css"
import logoSite from "../assets/logo-site.png";

const Navbar = () => {
  return (
    <div className='nav'>

      <div className='navbar-div1'>
        <li><Link to="/" id='my-site-logo'><img style={{width:"30px",height:"30px"}} src={logoSite} alt="" /><span style={{fontFamily:"'Typo Round Regular Demo', sans-serif"}}>Leetmetric</span></Link></li>

      </div>
       
        <ul className='navLi'>
            <li><NavLink className={({isActive})=>{return isActive ? "active-nav":""}} to="/">Home</NavLink></li>
            <li><NavLink className={({isActive})=>{return isActive ? "active-nav":""}} to="/pastes">Pastes</NavLink></li>
            <li><NavLink className={({isActive})=>{return isActive ? "active-nav":""}} to="/bookmark">Favourites</NavLink></li>
        </ul>

        <div className='navbar-div3'>

        </div>
    </div>
  )
}

export default Navbar
