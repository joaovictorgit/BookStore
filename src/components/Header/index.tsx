import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BiExit } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Modal from "react-modal";
import "./style.css";
import api from "../../service/auth";
import Context from "../../context/contextLogin";

const stylesModal = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const Header: React.FC = () => {
  const [user, setUser] = useContext(Context);
  const navigate = useNavigate();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const formRef = useRef();
  const new_id = JSON.parse(localStorage.getItem("@id"));

  const getUser = useCallback(async () => {
    try {
      if (user.id === undefined || user.id === null) {
        user.id = new_id;
      }
      await api.get(`/usuarios/${user.id}`).then((res: any) => {
        setName(res.data.nome);
        setEmail(res.data.email);
        setImage(res.data.imagem);
        setCurrentUser(res.data);
      });
    } catch (error: any) {
      console.error(error);
    }
  }, [user.id]);

  const updateUser = () => {
    try {
      if (user.id === undefined || user.id === null) {
        user.id = new_id;
      }
      api
        .patch(`/usuarios/${user.id}`, {
          nome: name,
          email: email,
          imagem: image,
        })
        .then((res: any) => {
          closeModal();
          window.location.reload();
        });
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [getUser]);

  const logout = () => {
    localStorage.removeItem('@id');
    setUser({});
    navigate("/");
  };

  const openModal = () => {
    //console.log(user);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="container-header">
        <div className="foto-perfil">
          <img src={currentUser.imagem} />
        </div>
        <h1>Book Store</h1>
        <button onClick={logout}>
          <BiExit className="icon-exit" />
        </button>
        <button onClick={openModal}>
          <FaRegEdit className="icon-edit" />
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={stylesModal}
        >
          <form onSubmit={updateUser} ref={formRef}>
            <div className="itens">
              <label>Nome</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="itens">
              <label>E-mail</label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="itens">
              <label>Imagem</label>
              <input
                type="text"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </div>
            <div className="item-button">
              <button className="btn-update">Atualizar</button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Header;
