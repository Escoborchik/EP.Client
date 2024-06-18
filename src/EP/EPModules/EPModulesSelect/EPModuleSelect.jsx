import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
} from "@mui/material";

import { useState, useEffect } from "react";
import axios from "axios";

const EPModuleSelect = (props) => {
  let token = sessionStorage.getItem("token");
  const { data, updateData } = props;
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5278/api/Modules", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data)
      .then((res) => setModules(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <InputLabel id="demo-multiple-checkbox-label">Выберите модули</InputLabel>
      <Select
        sx={{ m: 1, maxWidth: 400, minWidth: 150 }}
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={data}
        onChange={updateData}
        input={<OutlinedInput label="Tag" />}
        renderValue={() => ""}
      >
        {modules.length > 0 ? (
          modules.map((module) => (
            <MenuItem key={module.uuid} value={module.uuid}>
              <Checkbox checked={data.indexOf(module.uuid) > -1} />
              <ListItemText primary={module.title} />
            </MenuItem>
          ))
        ) : (
          <MenuItem>
            Доступных модулей нет. Добавьте их во вкладке модули
          </MenuItem>
        )}
      </Select>
    </div>
  );
};

export default EPModuleSelect;
