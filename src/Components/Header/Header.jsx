import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="d-flex justify-content-center py-3 text-bg-dark">
        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to={`/`} className="nav-link text-white">
              Образовательные программы
            </Link>
          </li>
          <li className="nav-item">
            <Link to={`/modules`} className="nav-link text-white">
              Модули
            </Link>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default Header;
