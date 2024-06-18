const GroupInput = (props) => {
  const { updateData, data } = props;
  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          name="email"
          onChange={updateData}
          value={data["email"]}
        />
        <label>Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          onChange={updateData}
          name="password"
          value={data["password"]}
        />
        <label>Пароль</label>
      </div>
    </div>
  );
};

export default GroupInput;
