import { TableCell, TableRow } from "@mui/material";
import ModuleModal from "../../ModuleModal/ModuleModal";
import { EMPTY_MODULE, check } from "../../../Consts/Consts";
import { useState } from "react";
import axios from "axios";

const TableRoWComp = ({ module, fetchData }) => {
  let token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const [moduleEdit, setModuleEdit] = useState({
    uuid: "",
    title: "",
    type: "",
  });

  function editModal(change) {
    setOpen(change);
  }

  function updateData(e) {
    const { name, value } = e.target;
    setModuleEdit({ ...moduleEdit, [name]: value });
  }

  function sendEditData(e) {
    e.preventDefault();
    const emptyList = check(moduleEdit);
    if (emptyList.length > 0) {
      alert("Заполните все поля!");
    } else {
      axios
        .patch(
          `http://localhost:5278/api/Modules?uuid=${moduleEdit.uuid}`,
          moduleEdit,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => fetchData());
      editModal(!open);
      setModuleEdit({ uuid: "", ...EMPTY_MODULE });
    }
  }

  function deleteModule(uuid) {
    if (confirm("Вы уверены, что хотите удалить модуль?")) {
      axios
        .delete(`http://localhost:5278/api/Modules?uuid=${uuid}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => fetchData());
    }
  }

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {module.title}
      </TableCell>
      <TableCell>{module.type}</TableCell>
      <TableCell align="right">
        <div className="btn-group">
          <button
            onClick={() => {
              setModuleEdit(module);
              editModal(!open);
            }}
            type="button"
            className="btn btn-warning"
          >
            Редактировать
          </button>
          <ModuleModal
            open={open}
            data={moduleEdit}
            updateData={updateData}
            editModal={editModal}
            sendData={sendEditData}
          />
          <button
            onClick={() => deleteModule(module.uuid)}
            type="button"
            className="btn btn-danger"
          >
            Удалить
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default TableRoWComp;
