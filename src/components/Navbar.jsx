import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../store/auth";

export const Navbar = () => {
  const { isLoggedIn } = useAuth();
  const [showFormsDropdown, setShowFormsDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setShowFormsDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowFormsDropdown(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <div className="logo-brand">
          <NavLink to="/" onClick={closeMobileMenu}>Saisatwik</NavLink>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>

        <nav className={isMobileMenuOpen ? "active" : ""}>
          <ul>
            <li>
              <NavLink to="/" onClick={closeMobileMenu}> Home </NavLink>
            </li>
            <li>
              <NavLink to="/about" onClick={closeMobileMenu}> About </NavLink>
            </li>
            <li>
              <NavLink to="/services" onClick={closeMobileMenu}> Services </NavLink>
            </li>
            <li>
              <NavLink to="/get" onClick={closeMobileMenu}> Visit Planner </NavLink>
            </li>
            <li>
              <NavLink to="/visitentry" onClick={closeMobileMenu}> Visit Entry </NavLink>
            </li>
            <li
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <span> Forms </span>
              {showFormsDropdown && (
                <ul className="dropdown vertical">
                  <li>
                    <NavLink to="/contact" onClick={closeMobileMenu}> Contact </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact1" onClick={closeMobileMenu}> Country Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact2" onClick={closeMobileMenu}> Zone Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact3" onClick={closeMobileMenu}> State Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact4" onClick={closeMobileMenu}> Pool Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact5" onClick={closeMobileMenu}> Station Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact6" onClick={closeMobileMenu}> City Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact7" onClick={closeMobileMenu}> Company Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact8" onClick={closeMobileMenu}> Branch Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact9" onClick={closeMobileMenu}> Functional Levels Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact10" onClick={closeMobileMenu}> Function Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact11" onClick={closeMobileMenu}> Industry Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact12" onClick={closeMobileMenu}> User Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact13" onClick={closeMobileMenu}> Role Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact14" onClick={closeMobileMenu}> User Role Combination</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact15" onClick={closeMobileMenu}> Application Master</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact16" onClick={closeMobileMenu}> Currency Master</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact17" onClick={closeMobileMenu}> GST Master</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact18" onClick={closeMobileMenu}> Crop Master</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact19" onClick={closeMobileMenu}> Crop Lot Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact20" onClick={closeMobileMenu}> Soil Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact21" onClick={closeMobileMenu}> Season Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact22" onClick={closeMobileMenu}> Material Master </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact23" onClick={closeMobileMenu}> Payment Term Master</NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact24" onClick={closeMobileMenu}> Customer Master</NavLink>
                  </li>
                  <li>
                    <NavLink to="/employee" onClick={closeMobileMenu}> Employee Master</NavLink>
                  </li>
                  <li>
                    <NavLink to="/mapping" onClick={closeMobileMenu}> Crop Soil Season Mapping </NavLink>
                  </li>
                  <li>
                    <NavLink to="/crop-material-mapping" onClick={closeMobileMenu}>Crop Material Mapping</NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink to="/admin" onClick={closeMobileMenu}> Admin </NavLink>
            </li>
            {isLoggedIn ? (
              <li>
                <NavLink to="/logout" onClick={closeMobileMenu}>Logout</NavLink>
              </li>
            ) : (
              <>
                <li>
                  <NavLink to="/register" onClick={closeMobileMenu}> Register </NavLink>
                </li>
                <li>
                  <NavLink to="/login" onClick={closeMobileMenu}> Login </NavLink>
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
