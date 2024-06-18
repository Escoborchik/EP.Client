import { InputLabel, MenuItem, FormHelperText, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { STANDARDS, LEVELS } from "../../Consts/Consts";
import axios from "axios";

const EPSelect = (props) => {
  const { askData, data, updateData } = props;
  const [dataRequest, setDataRequest] = useState([]);
  let token = sessionStorage.getItem("token");
  useEffect(() => {
    if (askData.isNeedRequest) {
      axios
        .get(`http://localhost:5278/api/${askData.query}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => res.data)
        .then((res) => setDataRequest(res))
        .catch((err) => console.log(err));
    } else {
      if (askData.name === "level") setDataRequest(LEVELS);
      else setDataRequest(STANDARDS);
    }
  }, []);
  return (
    <div>
      <InputLabel id="demo-simple-select-label">{askData.label}</InputLabel>
      <Select
        sx={{ m: 1, maxWidth: 400, minWidth: 150 }}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={
          data[askData.name].uuid ? data[askData.name].uuid : data[askData.name]
        }
        label={askData.label}
        onChange={updateData}
        name={askData.name}
      >
        {dataRequest.map((el) => (
          <MenuItem key={el.uuid} value={el.uuid}>
            {el.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default EPSelect;
