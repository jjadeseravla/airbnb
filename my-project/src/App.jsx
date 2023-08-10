import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import './Index.css'
import IndexPage from './Pages/IndexPage';
import AccountPage from './Pages/AccountPage';
import ProfilePage from "./Pages/ProfilePage.jsx";
import PlacesPage from "./Pages/PlacesPage.jsx";
import axios from 'axios';
import { UserContextProvider } from './UserContext';

//front end talks to back end 
axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />}></Route>
            <Route path="/Account/:subpage?" element={<AccountPage />}></Route>
            <Route path="/account" element={<ProfilePage />} />
            {/* <Route path="/account/places" element={<PlacesPage />} /> */}
            <Route path="/account/places/:action" element={<PlacesPage />} />
            {/* <Route path="/Account/bookings" element={<AccountPage />}></Route>
            <Route path="/Account/places" element={<AccountPage/>}></Route> */}
            <Route path="/Login" element={<LoginPage />}></Route>
            <Route path="Register" element={<RegisterPage/>}></Route>
          </Route>
        </Routes>
        </UserContextProvider>
    </>
  )
}

export default App
