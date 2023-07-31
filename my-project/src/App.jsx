import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import LoginPage from './Pages/LoginPage';
import './Index.css'
// import IndexPage from './Pages/IndexPage';

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        {/* <Route index element={<IndexPage/>}></Route> */}
        <Route path="/Login" element={<LoginPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
