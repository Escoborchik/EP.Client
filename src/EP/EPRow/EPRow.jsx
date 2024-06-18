import { IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fragment, useState } from "react";
import { EMPTY_PROGRAM, LEVELS, STANDARDS, check } from "../../Consts/Consts";
import EPModal from "../EPModal/EPModal";
import axios from "axios";
import EPModules from "../EPModules/EPModules";

const EPRow = ({ program, fetchData }) => {
  const [openArrow, setOpenArrow] = useState(false);
  const [open, setOpen] = useState(false);
  let token = sessionStorage.getItem("token");
  const [programEdit, setProgramEdit] = useState({
    uuid: "",
    ...EMPTY_PROGRAM,
  });

  function editModal(change) {
    setOpen(change);
  }

  function updateData(e) {
    const { name, value } = e.target;
    setProgramEdit({ ...programEdit, [name]: value });
  }

  function sendEditData(e) {
    e.preventDefault();
    const emptyList = check(programEdit);
    if (emptyList.length > 0) {
      alert("Заполните все поля!");
    } else {
      axios
        .patch(
          `http://localhost:5278/api/EducationPrograms?uuid=${programEdit.uuid}`,
          programEdit,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then(() => fetchData());
      editModal(!open);
      setProgramEdit({
        uuid: "",
        ...EMPTY_PROGRAM,
      });
    }
  }

  function deleteProgram(uuid) {
    if (confirm("Вы уверены, что хотите удалить программу?")) {
      axios
        .delete(`http://localhost:5278/api/EducationPrograms?uuid=${uuid}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then(() => fetchData());
    }
  }

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenArrow(!openArrow)}
          >
            {openArrow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {program.title}
        </TableCell>
        <TableCell align="right">{program.status}</TableCell>
        <TableCell align="right">{program.cypher}</TableCell>
        <TableCell align="right">
          {LEVELS.find((s) => s.uuid === program.standard).name}
        </TableCell>
        <TableCell align="right">
          {STANDARDS.find((s) => s.uuid === program.standard).name}
        </TableCell>
        <TableCell align="right">{program.institute.name}</TableCell>
        <TableCell align="right">{program.head.name}</TableCell>
        <TableCell align="right">{program.accreditationTime}</TableCell>
        <TableCell>
          <div className="btn-group">
            <button
              onClick={() => {
                setProgramEdit({
                  ...program,
                  institute: program.institute.uuid,
                  head: program.head.uuid,
                });
                editModal(!open);
              }}
              type="button"
              className="btn btn-warning"
            >
              Редактировать
            </button>
            <EPModal
              open={open}
              data={programEdit}
              updateData={updateData}
              editModal={editModal}
              sendData={sendEditData}
            />
            <button
              onClick={() => deleteProgram(program.uuid)}
              type="button"
              className="btn btn-danger"
            >
              Удалить
            </button>
          </div>
        </TableCell>
      </TableRow>
      <EPModules uuid={program.uuid} openArrow={openArrow} />
    </Fragment>
  );
};

export default EPRow;
