import { useState } from "react";

const HeaderLeft = ({toggle,setToggle}) => {
    return ( 
        <div className="header-left">
            <div className="header-logo">
                <div className="img">
                    <a href=' '><img src='../images/logo.png' alt=''></img></a>
                </div>
            <strong> Sketch-Blog</strong>
            </div>
            <div onClick={()=>setToggle(!toggle)} className="header-menu">
               {toggle ?  <i  className="bi bi-x-lg"></i>:<i  className="bi bi-list"></i>}
            </div>
            </div>
     );
}
 
export default HeaderLeft;