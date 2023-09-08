import Front from "./frontend/Front";
import ClientSignin from "./frontend/ClientSignin";
import ProfileCard from './frontend/ProfileCard';
import ClientRegistration from "./frontend/ClientRegistration";
import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Editor from "./components/Editor";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route } from "react-router-dom";
import '@coreui/coreui/dist/css/coreui.min.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { DataProvider } from "./components/Datacontext";
//import Dashboard from "./backend/Dashboard";
import CRegistration from "./backend/CRegistration";
import ClientsList from "./backend/ClientsList";
import ClientService from "./backend/ClientService";
//import ClientActivity from "./backend/ClientActivity"
import './App.css';
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <DataProvider>
    <Routes>
      <Route path="/">
        {/* public routes */}
        <Route path="/" element={<Front />} />
        <Route path="signin" element={<ClientSignin />} />
        <Route path="servicecard" element={<ProfileCard/>} />
        <Route path="signup" element={<ClientRegistration />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> 
       
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>
        {/* we want to protect these routes */}
      <Route element={<Layout />}>
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin]} />}
          >
            <Route path="login/home" element={<ClientsList />} />
            <Route path="login/clientregister" element={<CRegistration />} />
            <Route path="login/clientservice" element={<ClientService />} />
          </Route>
         

          {/* for future use}
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>
          {*/}
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </DataProvider>
  );
}

export default App;
