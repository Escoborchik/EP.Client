import { useNavigate } from "react-router-dom";
import GroupInput from "../Components/GroupInput/GroupInput";
import { useState } from "react";
import axios from "axios";
import { check } from "../Consts/Consts";

const RegPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function updateData(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function signUp(e) {
    e.preventDefault();
    const emptyList = check(user);
    if (emptyList.length > 0) {
      alert("Заполните все поля!");
    } else {
      axios.post("http://localhost:5278/api/User/Register", user);
      navigate("/auth");
    }
  }
  return (
    <div className="container">
      <form>
        <h1 className="py-3 h3 mb-3 fw-normal">Зарегистрируйтесь</h1>
        <GroupInput updateData={updateData} data={user} />
        <button
          onClick={(e) => signUp(e)}
          className="btn btn-primary w-100 mb-3 py-2"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <button
          onClick={() => navigate("/auth")}
          className="btn btn-primary w-100 py-2"
          type="submit"
        >
          Войти
        </button>
      </form>
    </div>
  );
};

export default RegPage;
