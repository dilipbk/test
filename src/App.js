import Front from "./frontend/Front";
import ProfileCard from "./frontend/ProfileCard";
import ClientRegistration from "./frontend/ClientRegistration";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "./components/Datacontext";
//import Dashboard from "./backend/Dashboard";
import CRegistration from "./backend/CRegistration";
import ClientsList from "./backend/ClientsList";
import ClientService from "./backend/ClientService";
import Booking from "./backend/Booking";
import "./App.css";
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <DataProvider>
      <Routes path="/">
        {/* Public routes */}
        <Route path="/" element={<Front />} />
        <Route path="servicecard" element={<ProfileCard />} />
        <Route path="signup" element={<ClientRegistration />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected routes */}
        <Route element={<Layout />}>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="login/home" element={<ClientsList />} />
              <Route path="login/clientregister" element={<CRegistration />} />
              <Route path="login/clientservice" element={<ClientService />} />
              <Route path="login/booking" element={<Booking />} />
            </Route>

            {/* For future use */}
            {/* 
        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
        */}
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </DataProvider>
  );
}

export default App;
