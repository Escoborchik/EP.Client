import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import EPRow from "../EPRow/EPRow";
import { useState, useEffect } from "react";
import axios from "axios";

const EPTable = ({ open }) => {
  let token = sessionStorage.getItem("token");
  const [programs, setPrograms] = useState([]);
  const fetchData = () => {
    axios
      .get("http://localhost:5278/api/EducationPrograms", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .then((res) => setPrograms(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => fetchData(), [open]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right">Название</TableCell>
            <TableCell align="right">Статус</TableCell>
            <TableCell align="right">Шифр</TableCell>
            <TableCell align="right">Уровень обучения </TableCell>
            <TableCell align="right">Стандарт обучения </TableCell>
            <TableCell align="right">Институт</TableCell>
            <TableCell align="right">Ответственное лицо</TableCell>
            <TableCell align="right">Дата следующей аккредитации</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {programs.length > 0 ? (
            programs.map((program) => (
              <EPRow
                key={program.uuid}
                program={program}
                fetchData={fetchData}
              />
            ))
          ) : (
            <TableRow>
              <TableCell>Программы отсутствуют</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EPTable;
