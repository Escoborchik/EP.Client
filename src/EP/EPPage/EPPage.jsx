import axios from "axios";
import { useState } from "react";
import EPTable from "../EPTable/EPTable";
import EPModal from "../EPModal/EPModal";
import { EMPTY_PROGRAM, STATUS, check } from "../../Consts/Consts";

const EPPage = () => {
  const [open, setOpen] = useState(false);
  let token = sessionStorage.getItem("token");
  const [program, setProgram] = useState({
    title: "",
    status: STATUS,
    cypher: "",
    level: "",
    standard: "",
    institute: "",
    head: "",
    accreditationTime: "",
  });

  function editModal(change) {
    setOpen(change);
  }

  function updateData(e) {
    const { name, value } = e.target;
    setProgram({ ...program, [name]: value });
  }

  async function sendData(e) {
    e.preventDefault();
    const emptyList = check(program);
    if (emptyList.length > 0) {
      alert("Заполните все поля!");
    } else {
      await axios.post("http://localhost:5278/api/EducationPrograms", program, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      editModal(!open);
      setProgram(EMPTY_PROGRAM);
    }
  }

  return (
    <div>
      <EPTable open={open} />
      <button
        onClick={() => editModal(!open)}
        type="button"
        className="btn btn-success"
      >
        Добавить программу
      </button>
      <EPModal
        open={open}
        data={program}
        updateData={updateData}
        editModal={editModal}
        sendData={sendData}
      />
    </div>
  );
};

export default EPPage;
