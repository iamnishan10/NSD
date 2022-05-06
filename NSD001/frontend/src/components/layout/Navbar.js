import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import "../../App.css";

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      setIsAuth(true);
    }
  }, []);

  return (
    <nav>
      <ul>
        {isAuth === true ? (
          <Fragment>
          {' '}
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                NSDevil
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/add"} className="nav-link">
                    Add
                  </Link>
                </li>
              </div>
            </nav>
          </Fragment>
        ) : (
          <Fragment>
          {' '}
          <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/" className="navbar-brand">
                NSDevil
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/record"} className="nav-link">
                    Record
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to={"/users"} className="nav-link">
                    Users
                  </Link>
                </li>
              </div>
            </nav>
          </Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
