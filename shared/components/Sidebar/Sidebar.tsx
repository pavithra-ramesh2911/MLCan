import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.scss';
import logoimg from '../../../assets/img/MLCAN logo.svg';
import '../../../styles/_icons.scss';
import userimg from './Group 290.png';
import Notification from "../../../shared/components/Notification";
import { NotificationTypes } from "../../../enums/notificationTypes";
import { AppRoutes, NavigationRoutes } from '../../../routes/routeConstants/appRoutes';




const Sidebar = () => {

    const location = useLocation();
    const [selectedMenu, setSelectedMenu] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
  
    const handleMenuClick = (menuKey:string) => {
      setSelectedMenu(menuKey);
    };
  
    const getMenuItemClassName = (menuKey: string) => {
      let className = 'menu-item';
      if (location.pathname.includes(menuKey)) {
        className += ' active';
      }
      return className;
    };



    const handleDropdownClick = () => {
      setIsDropdownOpen(!isDropdownOpen); 
    };
    const handleLogoutClick = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
       navigate(NavigationRoutes.LOGIN);
      Notification({
        message: "Logout",
        description: "Logged out successfully",
        type: NotificationTypes.SUCCESS
        });
        setTimeout(() => {
          navigate(NavigationRoutes.LOGIN);
        }, 1000);
    };

  return (
    <div className="sidebar">
      <div className="logo">
      <img src={logoimg} />
      </div>
      <ul className="menu">
      <li className={getMenuItemClassName('container')}>
      <Link to="/container">
      <i className={`icon-container${getMenuItemClassName('containers').includes('active') ? ' active' : ''}`}></i>
            Containers
        </Link>
        </li>
        <li className={getMenuItemClassName('customer')}>
          <Link to="/customer">
          <i className={`icon-customer${getMenuItemClassName('customer').includes('active') ? ' active' : ''}`}></i>
            Customers
          </Link>
        </li>
        <li className={getMenuItemClassName('repairlist')}>
          <Link to="/repairlist">
          <i className={`icon-repair-list${getMenuItemClassName('customer').includes('active') ? ' active' : ''}`}></i>
            Repair List
          </Link>
        </li>
        <li className={getMenuItemClassName('usermanagement')}>
          <Link to="/usermanagement">
          <i className={`icon-user-management${getMenuItemClassName('customer').includes('active') ? ' active' : ''}`}></i>
            User Management
          </Link>
        </li>
      </ul>


<div className="sidebar-bottom">
        <button className="user-button" onClick={handleDropdownClick}>
          <img src={userimg} alt="User Icon" />
          <span>Richard Williams</span>
          <h5>Admin</h5>
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
             <div className='dropdown-menu__name'>
              <button className='name-icon'></button>
              <a className='text'>JR</a>
              <h3>Jeremy Roberts</h3> <h5>Admin &nbsp;&#x2022; &nbsp;A00989</h5>
             </div>
            <div className='dropdown-menu__email'>
              <h4><i className='icon-mail'></i>jeremyroberts.yahoo.com</h4>
              <div className='dropdown-menu__email__phone'>
              <h4><i className='icon-call'></i>(183)019-1934</h4>
              </div>
              <div className='dropdown-menu__logout'>
              <button onClick={handleLogoutClick}><i className='icon-logout'></i>Logout
             </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );

  


};

export default Sidebar;



