// eslint-disable-next-line
import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../context/contextLogin";
import api from "../../service/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

const Login: React.FC = () => {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const formRef = useRef();

  const logar = (e: any) => {
    checkDataLogin();
    e.preventDefault();
    
    try {
      api
        .post("/usuarios/login/", {
          email: email,
          senha: pass,
        })
        .then((res: any) => {
            
          setUser({
              id:  res.data.checkEmail.id_usuario,
          });
          localStorage.setItem('@id', JSON.stringify(res.data.checkEmail.id_usuario));
          let aux_email = res.data.checkEmail.email.split('@');
          if (aux_email[1] === 'gmail.com') {
            navigate("/home-user");
          } else {
            navigate("/home-author")
          }
          
        });
    } catch (error: any) {
      console.error(error);
    }
  };

  const signUpScreen = () => {
    navigate("/sign-up");
  };

  const checkDataLogin = () => {
    if (email === '' || pass === '') {
      notify();
    }
  }

  const notify = () => {
    toast.error('Por favor, preencher todos os campos obrigatórios', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  };

  return (
    <div className="container-login">
      <ToastContainer />
      <div className="title-store">
        <h1>BookStore</h1>
      </div>
      <form onSubmit={logar} ref={formRef} className="container-form">
        <div className="itens">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="itens">
          <label>Senha</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
            value={pass}
          />
        </div>
        <div className="itens-buttons">
          <button className="btn-login">Logar</button>
          <button className="btn-cad" onClick={signUpScreen}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
