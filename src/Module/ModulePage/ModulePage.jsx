import axios from "axios";
import ModuleTable from "../ModuleTable/ModuleTable";
import ModuleModal from "../ModuleModal/ModuleModal";
import { EMPTY_MODULE, check } from "../../Consts/Consts";
import { useState } from "react";

const ModulePage = () => {
  const [open, setOpen] = useState(false);
  const [module, setModule] = useState({
    title: "",
    type: "",
  });
  let token = sessionStorage.getItem("token");

  function editModal(change) {
    setOpen(change);
  }

  function updateData(e) {
    const { name, value } = e.target;
    setModule({ ...module, [name]: value });
  }

  function sendData(e) {
    e.preventDefault();
    const emptyList = check(module);
    if (emptyList.length > 0) {
      alert("Заполните все поля!");
    } else {
      axios
        .post("http://localhost:5278/api/Modules", module, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => editModal(!open));
      setModule(EMPTY_MODULE);
    }
  }

  return (
    <div>
      <ModuleTable open={open} />
      <button
        onClick={() => editModal(!open)}
        type="button"
        className="btn btn-success"
      >
        Добавить модуль
      </button>
      <ModuleModal
        open={open}
        data={module}
        updateData={updateData}
        editModal={editModal}
        sendData={sendData}
      />
    </div>
  );
};

export default ModulePage;
