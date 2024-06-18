import Input from "../../Components/Input/Input";
import { MODULE_REQUEST_DATA } from "../../Consts/Consts";
const ModuleModal = (props) => {
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
            <h5 className="modal-title">Добавьте модуль</h5>
          </div>
          <div className="modal-body">
            <form>
              {MODULE_REQUEST_DATA.map((el) => (
                <Input
                  key={el.name}
                  askData={el}
                  data={data}
                  updateData={updateData}
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

export default ModuleModal;
