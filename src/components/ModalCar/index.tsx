import React, { useContext, useEffect, useState } from "react"
import {MdOutlineLocalGroceryStore} from 'react-icons/md';
import Modal from 'react-modal';
import Context from "../../context/contextLogin";

import api from "../../service/auth";
import ListBooks from "../ListBooks";
import './style.css';

Modal.setAppElement('#root');

const styleModalCar = {
    content: {
      top: "50%",
      left: "50%",
      right: "40%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
};

const ModalCar: React.FC = () => {
    const [user, setUser] = useContext(Context);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [cars, setCars] = useState([]);
    const new_id = JSON.parse(localStorage.getItem("@id"));

    const getAllBooksCar = () => {
        try {
            if (user.id === undefined || user.id === null) {
                user.id = new_id;
            }
            api.get(`/carrinhos/${user.id}`)
                .then((res: any) => {
                    setCars(res.data);
                })
        } catch (error: any) {
            console.error(error);
        }
    };

    

    
    const openModal = () => {
        setIsOpen(true);
    }
    
    const closeModal = () => {
        setIsOpen(false);
    }

    
    useEffect(() => {getAllBooksCar();}, []);
    
    
    
    return (
        <>
            <button className="container-modal-car" >
                <MdOutlineLocalGroceryStore onClick={openModal} className='icon-car'/>
            </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={styleModalCar}>
                    <div className="container-modal">
                        {cars.map((car) => {

                            return(
                                <div className="container-car" key={car.id_carrinho}>
                                    <ListBooks id_book={car.livro_id} id_car={car.id_carrinho}/>
                                </div>
                            );
                        })}
                        
                    </div>
                </Modal>
        </>
    );
};

export default ModalCar;