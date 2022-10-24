import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Context from "../../context/contextLogin";
import api from "../../service/auth";
import {BiBookAdd} from 'react-icons/bi';

import './style.css';
import { useNavigate } from "react-router-dom";


  


const HomeAuthor: React.FC = () => {
    const [user, setUser] = useContext(Context);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const new_id = JSON.parse(localStorage.getItem("@id"));
    const [userName, setUserName] = useState('');
    const getBooksByAuthor = () => {
        try {
            if (user.id === undefined || user.id === null) {
                user.id = new_id;
            }
            api.get(`/livros/${user.id}`)
                .then((res: any) => {
                    setBooks(res.data);
                });
        } catch (error: any) {
            console.error(error);
        }
    }

    const getNameById = () => {
        try {
            if (user.id === undefined || user.id === null) {
                user.id = new_id;
            }
            console.log(user.id);
            api.get(`/usuarios/${user.id}`)
                .then((res: any) => {
                    setUserName(res.data.nome);
                });
        } catch (error: any) {
            console.error(error);
        }
    };

    
    
    useEffect(() => {getBooksByAuthor()}, []);
    getNameById();
    return(
        <>
            <Header />
            <div className="container-author">
                <h1>Lista de livros de {userName}</h1>
                <div className='container-menu'>
                    {books.map((book: any) => (
                        <div className='item-menu-author' key={book.id_livro}>
                        <ul>
                            <li className='item'><img src={book.imagem} /></li>
                            <li className='item'>{book.nome_livro}</li>
                            <li className='item'><b>R$ {book.preco.toLocaleString('pt-br',{minimumFractionDigits: 2})}</b></li>
                        </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="container-add-book" onClick={() => {navigate('/add-book')}}>
                <BiBookAdd className="add-book"/>
            </div>
        </>
    );
}

export default HomeAuthor;