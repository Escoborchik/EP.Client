import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import RegPage from "./RegPage/RegPage";
import AuthPage from "./AuthPage/AuthPage";
import ModulePage from "./Module/ModulePage/ModulePage";
import Header from "./Components/Header/Header";
import EPPage from "./EP/EPPage/EPPage";

const App = () => {
  const location = useLocation();
  let token = sessionStorage.getItem("token");

  useEffect(() => {
    token = sessionStorage.getItem("token");
  }, [location.pathname]);

  return (
    <div>
      {token ? <Header /> : <></>}
      <Routes>
        <Route path="/reg" element={<RegPage />} />
        <Route path="/auth" element={<AuthPage />} />
        {token && (
          <>
            <Route path="/" element={<EPPage />} />
            <Route path="/modules" element={<ModulePage />} />
          </>
        )}
        <Route
          path="*"
          replace
          element={<Navigate to={token ? "/" : "/reg"} />}
        />
      </Routes>
    </div>
  );
};

export default App;
