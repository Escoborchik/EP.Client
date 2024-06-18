import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ModuleTableRoWComp from "./ModuleTableRow/ModuleTableRowComp";

const ModuleTable = ({ open }) => {
  const [modules, setModules] = useState([]);
  let token = sessionStorage.getItem("token");

  const fetchData = () => {
    axios
      .get("http://localhost:5278/api/Modules", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .then((res) => setModules(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchData(), [open]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Тип модуля</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modules.length > 0 ? (
            modules.map((module) => (
              <ModuleTableRoWComp
                key={module.uuid}
                module={module}
                fetchData={fetchData}
              />
            ))
          ) : (
            <TableRow>
              <TableCell>Модули отсутствуют</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModuleTable;
