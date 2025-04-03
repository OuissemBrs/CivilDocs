import "./Form.css";
import Swal from "sweetalert2";
const states = [
    "Adrar",
    "Chlef",
    "Laghouat",
    "Oum El Bouaghi",
    "Batna",
    "Béjaïa",
    "Biskra",
    "Béchar",
    "Blida",
    "Bouira",
    "Tamanrasset",
    "Tébessa",
    "Tlemcen",
    "Tiaret",
    "Tizi Ouzou",
    "Algiers",
    "Djelfa",
    "Jijel",
    "Sétif",
    "Saïda",
    "Skikda",
    "Sidi Bel Abbès",
    "Annaba",
    "Guelma",
    "Constantine",
    "Médéa",
    "Mostaganem",
    "M'Sila",
    "Mascara",
    "Ouargla",
    "Oran",
    "El Bayadh",
    "Illizi",
    "Bordj Bou Arréridj",
    "Boumerdès",
    "El Tarf",
    "Tindouf",
    "Tissemsilt",
    "El Oued",
    "Khenchela",
    "Souk Ahras",
    "Tipaza",
    "Mila",
    "Aïn Defla",
    "Naâma",
    "Aïn Témouchent",
    "Ghardaïa",
    "Relizane",
    "Timimoun",
    "Bordj Badji Mokhtar",
    "Ouled Djellal",
    "Béni Abbès",
    "In Salah",
    "In Guezzam",
    "Touggourt",
    "Djanet",
    "El M'Ghair",
    "El Meniaa"
];


const check = () => {
    Swal.fire({
        icon: "success",
        title: "Succes",
        text: "",
    });
}

const Form = ({ Ctype }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const NId = document.getElementById("NIDnbr").value;
        const ID = document.getElementById("IDnbr").value;
        const CertID = document.getElementById("BirthNbr").value;
        const FName = document.getElementById("firstName").value;
        const LName = document.getElementById("lastName").value;
        const State = document.getElementById("state").value;
        const Date = document.getElementById("dob").value;

        const data = `NId=${encodeURIComponent(NId)}&ID=${encodeURIComponent(ID)}&CertID=${encodeURIComponent(CertID)}&FName=${encodeURIComponent(FName)}&LName=${encodeURIComponent(LName)}&State=${encodeURIComponent(State)}&Date=${encodeURIComponent(Date)}&Ctype=${encodeURIComponent(Ctype)}`;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/Users/ItzWSM/Desktop/IHMPROJECT/my-react-app/check.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var str = xhr.responseText;
                if (str === "true") {
                    Swal.fire({
                        icon: "success",
                        title: "Succes",
                        html: `<p class="text">We have sent the certificate to <strong>${document.getElementById("email").value}</strong></p>`,
                        customClass: {
                            popup: "custom-swal-popup",
                            title: "custom-swal-title",
                            confirmButton: "custom-swal-button",
                        },
                    });
                    document.getElementsByClassName("custom-swal-title")[0].style.color = "#4caf50"
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        html: `<p class="text">Your data is wrong please check and re-submit</p>`,
                        customClass: {
                            popup: "custom-swal-popup",
                            title: "custom-swal-title",
                            confirmButton: "custom-swal-button",
                        },
                    });

                    document.getElementsByClassName("custom-swal-title")[0].style.color = "#ff6767"


                }
            }
        };

        xhr.send(data);
    };


    var Tstate = "";
    var name1 = ""
    var name2 = ""
    switch (Ctype) {
        case "BC": Tstate = "Birth";
            name1 = "Enter your first name"
            name2 = "Enter your last name"
            break;
        case "MC": Tstate = "Marriage";
            name1 = "Enter your husband first name"
            name2 = "Enter your husband last name"
            break;
        case "DC": Tstate = "Death";
            name1 = "Enter his first name"
            name2 = "Enter his last name"
            break;
    }

    return (

        <div id="formmain">

            <form onSubmit={handleSubmit} method="post">
                <div id="formcontainer">
                    <div className="textinfo">Identifications</div>
                    <div className="fcontainer">
                        <div className="form-group fbox">
                            <label htmlFor="NIDnbr">National ID number</label>
                            <input
                                type="text"
                                id="NIDnbr"
                                name="NIDnbr"
                                placeholder="Enter your National ID number"
                                minLength={18}
                                maxLength={18}
                                required
                            />
                        </div>
                        <div className="form-group fbox">
                            <label htmlFor="IDnbr">ID/Passport/Driver License</label>
                            <input
                                type="text"
                                id="IDnbr"
                                name="IDnbr"
                                placeholder="Enter your ID/Passport/Driver License"
                                minLength={9}
                                maxLength={9}
                                required
                            />
                        </div>
                    </div>
                    <div className="fcontainer">
                        <div className="form-group sbox fbox">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="BirthNbr">{Tstate} Certificate N°</label>
                            <input
                                type="text"
                                id="BirthNbr"
                                name="BirthNbr"
                                placeholder="Enter your certificate number"
                                minLength={3}
                                maxLength={3}
                                required
                            />
                        </div>
                    </div>


                    <div className="textinfo">Informations</div>
                    <div className="fcontainer">
                        <div className="form-group">
                            <label htmlFor="firstName">{Ctype === "MC" ? "Husband " : ""}First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder={name1}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">{Ctype === "MC" ? "Husband " : ""}Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder={name2}
                                required
                            />
                        </div>
                    </div>
                    <div className="fcontainer">
                        <div className="form-group">
                            <label htmlFor="state">State of {Tstate}</label>
                            <select id="state"
                                name="state">
                                {states.map((wilaya, index) => (
                                    <option key={index} value={wilaya}>
                                        {wilaya}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of {Tstate}</label>
                            <input type="date" id="dob" name="dob" required />
                        </div>
                    </div>

                    <div id="button"><button type="submit" >Submit</button></div>
                </div>

            </form>


        </div>

    );
};

export default Form;