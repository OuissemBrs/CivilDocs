import React from 'react';
import Seal from '../img/seal.png'
import "./Header.css"
const Header = () => {

    return (
        <div id="upperdiv">
            <div id="maindiv">
                <div className="seal"><img src={Seal} alt="" /></div>
                <div id="centerdiv">
                    <div id="name">
                        People's Democratic Republic of Algeria
                    </div>
                    <div id="solgan">
                        By the People, for the People
                    </div>
                </div>
                <div className="seal"><img src={Seal} alt="" /></div>
            </div>
        </div>

    );

}

export default Header;