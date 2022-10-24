import React, { useEffect, useState } from "react";
import {AiFillDelete} from 'react-icons/ai';
import api from "../../service/auth";
import './style.css';
const ListBooks: React.FC = (props) => {
    // eslint-disable-next-line
    const {id_book, id_car} = props;
    const [book, setBook] = useState([]);
    
    const getBookById = () => {
        try {
            api.get(`/livros/book/${id_book}`)
                .then((res: any) => {
                    setBook(res.data);
                });
        } catch (error: any) {
            console.error(error);
        }
    }

    const deleteCar = () => {
        try {
            if (window.confirm("Desejá excluir?")) {
                api.delete(`/carrinhos/${id_car}`)
                    .then((res: any) => {
                        window.location.reload();
                    });
            }
        } catch (error: any) {
            console.error(error);
        }
    }

    useEffect(() => {getBookById();}, []);
    
    return (
        <>
            <div className="container-list-book">
                <label className="lbl-name">Nome: <b>{book.nome_livro}</b></label>
                <label className="lbl-price">Preço: <b> R${book.preco},00</b></label>
                <label className="lbl-delete"><AiFillDelete className="delete-book-car" onClick={deleteCar}/></label>
            </div>
        </> 
    );
}

export default ListBooks;