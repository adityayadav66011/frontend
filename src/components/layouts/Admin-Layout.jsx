import { NavLink, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineContactPage } from "react-icons/md";
import { FaHome } from "react-icons/fa";

export const AdminLayout = () => {
    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/admin/users">
                                    <FaUser /> Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts">
                                    <MdOutlineContactPage /> Contacts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contact1"> {/* Navigation for Contact1 */}
                                    <MdOutlineContactPage /> Contact1
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
};
