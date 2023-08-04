import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import './Index.css'
// import IndexPage from './Pages/IndexPage';
import axios from 'axios';

//front end talks to back end 
axios.defaults.baseURL = 'http://localhost:4000';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        {/* <Route index element={<IndexPage/>}></Route> */}
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="Register" element={<RegisterPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
