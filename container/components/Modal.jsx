import React from "react";
import "./Modal.css";

function Modal({ setOpenModal, Email, setEmail }) {
    var Title;
    var Text;
    var Btext;
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(Email)) {
        Title = "Error";
        Text = "Your data is wrong please check and re-submit"
        Btext = "Try Again"
    } else {
        Title = "Succes";
        Text = `We have sent the certificate to ${Email} `
        Btext = "Ok";
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                            setEmail("");
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>{Title}</h1>
                </div>
                <div className="body">
                    <p>{Text}</p>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                            setEmail("");
                        }}
                        id="cancelBtn"
                    >
                        {Btext}
                    </button>
                </div>
            </div>
            <style jsx>{`
        .title {
          color: ${(Title === "Error") ? "red" : "green"};
        }
        #cancelBtn {
          background-color: ${(Title === "Error") ? "blue" : "green"};
        }
      `}</style>
        </div>
    );
}

export default Modal;