import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import ModalCar from "../../components/ModalCar";
import Context from "../../context/contextLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../service/auth";
import "./style.css";

const HomeUser: React.FC = () => {
  const [user, setUser] = useContext(Context);
  const [books, setBooks] = useState([]);
  const new_id = JSON.parse(localStorage.getItem("@id"));

  const getBooks = () => {
    try {
      api.get("/livros/").then((res: any) => {
        setBooks(res.data);
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  const buyBook = (id_livro: number) => {
    try {
      if (user.id === undefined || user.id === null) {
        user.id = new_id;
      }
      api
        .post("/carrinhos/", {
          livro_id: id_livro,
          usuario_id: user.id,
        })
        .then((res: any) => {
          notifyBuy();
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        });
    } catch (error: any) {
      console.error(error);
    }
  };

  const notifyBuy = () => {
    toast.success("Livro adicionado no carrinho!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <ToastContainer />
      <Header />
      <div className="container-home">
        <div className="container-menu">
          {books.map((book: any) => (
            <div className="item-menu" key={book.id_livro}>
              <ul>
                <li className="item">
                  <img src={book.imagem} />
                </li>
                <li className="item">{book.nome_livro}</li>
                <li className="item">
                  <b>
                    R${" "}
                    {book.preco.toLocaleString("pt-br", {
                      minimumFractionDigits: 2,
                    })}
                  </b>
                </li>
                <li className="item">
                  <label onClick={() => buyBook(book.id_livro)}>Comprar</label>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <ModalCar />
      </div>
    </>
  );
};

export default HomeUser;
