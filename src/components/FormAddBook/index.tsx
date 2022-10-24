import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context/contextLogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../../service/auth";

const FormAddBook: React.FC = () => {
    const formRef = useRef();
    const [user, setUser] = useContext(Context);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const signBook = (e: any) => {
        e.preventDefault();
        try {
            if (user.id === undefined || user.id === null) {
                user.id = new_id;
            }
            api.post('/livros/', {
                nome_livro: name,
                categoria: category,
                imagem: image,
                preco: parseFloat(price),
                usuario_id: user.id
            }).then((res: any) => {
                //console.log(res.data)
                notifyaddBook();
                setTimeout(() => {
                    navigate('/home-author');
                }, 3000);
            })
        } catch (error: any) {
            console.error(error);
        }
    }

    const notifyaddBook = () => {
        toast.success('Livro cadastrado com sucesso!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    return (
        <div className="container-sign">
            <ToastContainer />
            <div className="title-sign"><h1>Cadastrar Livro</h1></div>
            <form onSubmit={signBook} ref={formRef} className='container-form'>
                <div className="itens">
                    <label>Nome</label>
                    <input type='text' placeholder="Vidas Secas" onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div className="itens">
                    <label>Categoria</label>
                    <input type='text' placeholder="romance" onChange={(e) => setCategory(e.target.value)} value={category}/>
                </div>
                <div className="itens">
                    <label>Preço</label>
                    <input type='text' placeholder="15,50" onChange={(e) => setPrice(e.target.value)} value={price}/>
                </div>
                <div className="itens">
                    <label>Imagem</label>
                    <input type='text' placeholder="url" onChange={(e) => setImage(e.target.value)} value={image}/>
                </div>
                <div className="item-button">
                    <button className="btn-cad">Cadastrar</button>
                </div>
            </form>
       </div>
    );
};

export default FormAddBook;