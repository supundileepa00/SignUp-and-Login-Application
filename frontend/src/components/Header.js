import React from "react";
import {Link} from "react-router-dom";

import './style.css'

function Header() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light ">
        <div class="container-fluid header">
          <a class="navbar-brand" href="/register">Home</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>


          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
              <Link to="/register" className="nav-link active" aria-current="page" >Register</Link>

              </li>
              <li class="nav-item">
              <Link to="/login" className="nav-link active" aria-current="page" >Login</Link>

              </li>

            </ul>

          </div>
        </div>
      </nav>
      <br />

    </div>
  );
}

export default Header;