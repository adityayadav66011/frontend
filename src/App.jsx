import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Contact1Component } from "./pages/contact1";
import { Contact2Component } from "./pages/contact2";
import { Contact3Component } from "./pages/contact3";
import { Contact4Component } from "./pages/contact4";
import { Contact5Component } from "./pages/contact5";
import { Contact6Component } from "./pages/contact6";
import { Contact7Component } from "./pages/contact7";
import { Contact8Component } from "./pages/contact8";
import { Contact9Component } from "./pages/contact9";
import { Contact10Component } from "./pages/contact10";
import { Contact11Component } from "./pages/contact11";
import { Contact12Component } from "./pages/contact12";
import { Contact13Component } from "./pages/contact13";
import { Contact14Component } from "./pages/contact14"; // Import the Contact14Component

import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Services } from "./pages/Services";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminContact1 } from "./pages/Admin-Contacts1";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact1" element={<Contact1Component />} />
          <Route path="/contact2" element={<Contact2Component />} />
          <Route path="/contact3" element={<Contact3Component />} />
          <Route path="/contact4" element={<Contact4Component />} />
          <Route path="/contact5" element={<Contact5Component />} />
          <Route path="/contact6" element={<Contact6Component />} />
          <Route path="/contact7" element={<Contact7Component />} />
          <Route path="/contact8" element={<Contact8Component />} />
          <Route path="/contact9" element={<Contact9Component />} />
          <Route path="/contact10" element={<Contact10Component />} />
          <Route path="/contact11" element={<Contact11Component />} />
          <Route path="/contact12" element={<Contact12Component />} />
          <Route path="/contact13" element={<Contact13Component />} /> {/* Route for Contact13Component */}
          <Route path="/contact14" element={<Contact14Component />} /> {/* Route for Contact14Component */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Error />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="contact1" element={<AdminContact1 />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;