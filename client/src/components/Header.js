import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<nav>
			<div className='nav-wrapper'>
                <Link to={"/"} className='brand-logo' style={{marginLeft:25}}>SMU</Link>
                <ul id='nav-mobile' className='right hide-on-med-and-down' style={{marginRight:25}}>
                    <li>
                        <Link to={"/shop"}>Library</Link>
                    </li>
                    <li>
                        <Link to={"/about"}>About us</Link>
                    </li>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                </ul>
            </div>
		</nav>
	);
};

export default Header;
