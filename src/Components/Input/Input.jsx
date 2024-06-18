const Input = (props) => {
  const { updateData, askData, data } = props;
  return (
    <div className="mb-3">
      <label className="form-label">{askData.label}</label>
      <input
        type={askData.type}
        className="form-control"
        onChange={updateData}
        name={askData.name}
        value={data[askData.name]}
        disabled={askData.name === "status" ? true : false}
      />
    </div>
  );
};

export default Input;
