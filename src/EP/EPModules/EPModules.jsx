import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import EPModulesModal from "./EPModulesModal/EPModulesModal";
import axios from "axios";
const EPModules = (props) => {
  let token = sessionStorage.getItem("token");
  const { uuid, openArrow } = props;
  const [modules, setModules] = useState([]);
  const [open, setOpen] = useState(false);
  const [newModules, setNewModules] = useState([]);

  const fetchData = () => {
    axios
      .get(
        `http://localhost:5278/api/EducationPrograms/getModules?uuid=${uuid}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => res.data)
      .then((res) => setModules(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchData(), []);

  function editModal(change) {
    setOpen(change);
  }

  function updateData(e) {
    const { value } = e.target;
    setNewModules(typeof value === "string" ? value.split(",") : value);
  }

  async function sendEditData(e) {
    e.preventDefault();
    await axios
      .post(
        `http://localhost:5278/api/EducationPrograms/addModules?uuid=${uuid}`,
        newModules,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then(() => fetchData());
    editModal(!open);
    setNewModules([]);
  }

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        <Collapse in={openArrow} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Модули
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>Название</TableCell>
                  <TableCell>Тип</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {modules.length > 0 ? (
                  modules.map((module) => (
                    <TableRow key={module?.title}>
                      <TableCell component="th" scope="row">
                        {module?.title}
                      </TableCell>
                      <TableCell>{module?.type}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>Модули отсутствуют</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell>
                    <button
                      onClick={() => {
                        setNewModules(modules.map((m) => m.uuid));
                        editModal(!open);
                      }}
                      className="btn btn-warning"
                    >
                      Изменить
                    </button>
                    <EPModulesModal
                      open={open}
                      data={newModules}
                      updateData={updateData}
                      editModal={editModal}
                      sendEditData={sendEditData}
                    />
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default EPModules;
