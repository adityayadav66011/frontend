import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [showFormsDropdown, setShowFormsDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowFormsDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowFormsDropdown(false);
  };

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/">Saisatwik</NavLink>
        </div>

        <nav>
          <ul>
            <li>
              <NavLink to="/"> Home </NavLink>
            </li>
            <li>
              <NavLink to="/about"> About </NavLink>
            </li>
            <li>
              <NavLink to="/services"> Services </NavLink>
            </li>
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span> Forms </span>
              {showFormsDropdown && (
                <ul className="dropdown vertical">
                  <li>
                    <NavLink to="/contact"> Contact </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact1"> Country Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact2"> Zone Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact3"> State Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact4"> Pool Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact5"> Station Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact6"> City Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact7"> Company Master </NavLink>
                  </li>
                  {/* Include Contact form 8 in the dropdown */}
                  <li>
                    <NavLink to="/contact8"> Branch Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact9"> Functional levels Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact10"> Function Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact11"> Industry Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact12"> User Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact13"> Role Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact14"> User Role Combination</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact15"> Application Master</NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink to="/admin"> Admin </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout">Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register"> Register </NavLink>
                </li>
                <li>
                  <NavLink to="/login"> Login </NavLink>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
