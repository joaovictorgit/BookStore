import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Context from "../context/contextLogin";
import HomeAuthor from "../pages/HomeAuthor";
import HomeUser from "../pages/HomeUser";
import Login from "../pages/Login";
import SignAuthor from "../pages/SignAuthor";
import SignUp from "../pages/SignUp";

const Path = () => {
    const [user, setUser] = useState({});

  return (
    <>
      <Context.Provider value={[user, setUser]}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home-user" element={<HomeUser />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home-author" element={<HomeAuthor />} />
            <Route path="/add-book" element={<SignAuthor />} />  
          </Routes>
      </Context.Provider>

    </>
  );
};

export default Path;
