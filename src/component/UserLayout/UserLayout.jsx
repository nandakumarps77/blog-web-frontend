import { Outlet } from "react-router-dom"
import Navbar from "../UserNavbar/UserNavbar"



const UserLayout = ()=>{
    return<>
    <Navbar/>
    
    <Outlet/>
    </>
}

export default UserLayout;