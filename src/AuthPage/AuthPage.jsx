import GroupInput from "../Components/GroupInput/GroupInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { check } from "../Consts/Consts";

const AuthPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function updateData(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function login(e) {
    e.preventDefault();
    const emptyList = check(user);
    if (emptyList.length > 0) {
      alert("Заполните все поля!");
    } else {
      axios
        .post("http://localhost:5278/api/User/Login", user)
        .then((res) => res.data)
        .then((res) => sessionStorage.setItem("token", res))
        .then(() => navigate("/"))
        .catch((er) => alert(er.response.data));
    }
  }
  return (
    <div className="container">
      <form>
        <h1 className="py-3 h3 mb-3 fw-normal">Войдите</h1>
        <GroupInput updateData={updateData} data={user} />
        <button
          onClick={(e) => login(e)}
          className="btn btn-primary w-100 py-2 mb-3"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
