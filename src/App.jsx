import TelaLogin from "./pages/TelaLogin";
import AdministradorTela from "./pages/AdministradorTela";
import AdicionarLivro from "./pages/AdicionarLivro";
import Emprestimo from "./pages/Emprestimo";
import Sidebar from "./Components/Sidebar";
import ProtectedRoute from "./Components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import CatalogoDeLivros from "./pages/CatalogoDeLivros";

function App() {

  return (
    <div className="flex justify-center h-full w-full">

      <BrowserRouter>

        <Routes>

          {/* ROTA PÚBLICA */}
          <Route
            path="/"
            element={<TelaLogin />}
          />


          {/* ROTAS QUE PRECISAM DE LOGIN */}
          <Route element={<ProtectedRoute />}>

            <Route
              path="/Emprestimo"
              element={<Emprestimo />}
            />

          </Route>


          {/* ROTAS EXCLUSIVAS DO ADMINISTRADOR */}
          <Route
            element={
              <ProtectedRoute
                somenteAdministrador={true}
              />
            }
          >
            <Route
              path="/CatalogoDeLivros"
              element={<CatalogoDeLivros  />}
            />

            <Route
              path="/AdministradorTela"
              element={<AdministradorTela />}
            />

            <Route
              path="/AdicionarLivro"
              element={<AdicionarLivro />}
            />

          </Route>

        </Routes>

      </BrowserRouter>

    </div>
  );
}

export default App;