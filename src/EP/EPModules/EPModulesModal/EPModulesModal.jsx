import EPModuleSelect from "../EPModulesSelect/EPModuleSelect";

const EPModulesModal = (props) => {
  const { open, data, updateData, editModal, sendEditData } = props;

  return (
    <div
      className="modal "
      style={open ? { display: "block" } : { display: "none" }}
      tabIndex="-1"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Добавьте модули</h5>
          </div>
          <div className="modal-body">
            <form>
              <EPModuleSelect data={data} updateData={updateData} />
              <div className="d-flex justify-content-end">
                <button
                  onClick={(e) => sendEditData(e)}
                  type="submit"
                  className="btn btn-primary py-6"
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EPModulesModal;
