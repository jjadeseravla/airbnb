import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import './Index.css'
// import IndexPage from './Pages/IndexPage';
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
          <Route path="/" element={<Layout />}></Route>
          {/* <Route index element={<IndexPage/>}></Route> */}
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="Register" element={<RegisterPage/>}></Route>
        </Routes>
        </UserContextProvider>
    </>
  )
}

export default App
