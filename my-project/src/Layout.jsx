import Header from "./Header";
import {Outlet} from "react-router-dom";

const Layout = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen max-w-4xl mx-auto">
      <Header />
      <Outlet />
   </div>
    )
}

export default Layout;

// Outlet to show content of the page which is dynamic
// and changes depending on the page youre looking at
// so if you look at app.jsx, you see layout has many deff routes inside it