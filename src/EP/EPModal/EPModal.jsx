import Input from "../../Components/Input/Input";
import {
  EP_REQUEST_INPUT_DATA,
  EP_REQUEST_SELECT_DATA,
} from "../../Consts/Consts";
import EPSelect from "../EPSelect/EPSelect";

const EPModal = (props) => {
  const { open, data, updateData, editModal, sendData } = props;

  return (
    <div
      className="modal"
      style={open ? { display: "block" } : { display: "none" }}
      tabIndex="-1"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Добавьте программу</h5>
          </div>
          <div className="modal-body">
            <form>
              {EP_REQUEST_INPUT_DATA.map((el) => (
                <Input
                  key={el.name}
                  askData={el}
                  data={data}
                  updateData={updateData}
                />
              ))}
              {EP_REQUEST_SELECT_DATA.map((el) => (
                <EPSelect
                  key={el.name}
                  askData={el}
                  data={data}
                  updateData={updateData}
                  open={open}
                />
              ))}
              <button
                onClick={(e) => sendData(e)}
                type="submit"
                className="btn btn-primary"
              >
                Отправить
              </button>
              <button
                onClick={() => editModal(!open)}
                type="button"
                className="btn btn-secondary"
              >
                Закрыть
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPModal;
