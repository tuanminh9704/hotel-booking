import { Navigate, Outlet } from "react-router";
import Cookie from "js-cookie"

function PrivateRouters() {
    let isLogin = false;
    if(Cookie.get("token")){
        isLogin = true;
    } else {
        isLogin = false;
    }

    return(
        <>
            {isLogin ? (<Outlet />) : (<Navigate to="/login" />)}
        </>
    )
}

export default PrivateRouters;