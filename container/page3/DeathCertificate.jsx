import { useState } from 'react';
import Modal from "../components/Modal"
import '../../src/App.css';
import Header from '../components/Header';
import Form from '../components/Form';
const DeathCertificate = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [Email, setEmail] = useState("");
    const setModal = (a) => {
        setModalOpen(a);
    }


    return (
        <div id="Main">
            {modalOpen && <Modal setOpenModal={setModalOpen} Email={Email} setEmail={setEmail} />}
            <Header />
            <div className='header'><h1>Death Certificate</h1></div>
            <div className="container">
                <Form Ctype="DC" setOpenModal={setModal} setEmail={setEmail} />
            </div>
        </div>
    );
}

export default DeathCertificate;