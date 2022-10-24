import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../service/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

const SignUp: React.FC = () => {
    const formRef = useRef();
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [image, setImage] = useState("");
    const navigate = useNavigate();

    const sign = (e: any) => {
        
        e.preventDefault();
        try {
            api.post('/usuarios/', {
                nome: name,
                email: email,
                senha: pass,
                imagem: image
            }).then(function (res: any) {
                notifySign();
                setTimeout(() => {
                    setName('');
                    setEmail('');
                    setPass('');
                    setImage('');
                    navigate('/');
                }, 3000);
            });
        } catch (error: any) {
            console.error(error);
        }
    }

    const notifySign = () => {
        toast.success('Usuário cadastrado com sucesso', {
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
            <div className="title-sign"><h1>Cadastro</h1></div>
            <form onSubmit={sign} ref={formRef} className='container-form'>
                <div className="itens">
                    <label>Nome</label>
                    <input type='text' placeholder="Joao" onChange={(e) => setName(e.target.value)} value={name}/>
                </div>
                <div className="itens">
                    <label>E-mail</label>
                    <input type='email' placeholder="exemplo@gmail.com" onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
                <div className="itens">
                    <label>Senha</label>
                    <input type='password' onChange={(e) => setPass(e.target.value)} value={pass}/>
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

export default SignUp;