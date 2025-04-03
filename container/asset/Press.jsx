import React from 'react';
import '../../src/App.css';
//import { DC, BC, MC } from '../img'
import DC from '../img/DC.png'
import BC from '../img/BC.png'
import MC from '../img/MC.png'
const Press = ({ Ctype }) => {
    var info = "";
    var src;
    switch (Ctype) {
        case "BC": info = "BirthCertificate";
            src = BC;
            break;
        case "MC": info = "MarriageCertificate";
            src = MC;
            break;
        case "DC": info = "DeathCertificate";
            src = DC;
            break;
    }
    return (
        <div>
            <img src={src} alt="" height={100} width={100} />
            <h2>{info}</h2>
        </div>
    )
}

export default Press;