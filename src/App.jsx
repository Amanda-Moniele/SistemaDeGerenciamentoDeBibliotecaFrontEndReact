import TelaLogin from "./pages/TelaLogin"
import AdministradorTela from "./pages/AdministradorTela"
import AdicionarLivro from "./pages/AdicionarLivro"
import Sidebar from "./Components/Sidebar"
import Emprestimo from "./pages/Emprestimo"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./Components/ProtectedRoute"

function App() {

  return (
    <div className="flex justify-center h-full w-full">
      <BrowserRouter>
        <Routes>
          <Route path="/"
            element={<TelaLogin />} />

          <Route
            path="/administrador"
            element={
              < ProtectedRoute>
                  <AdministradorTela />
              </ ProtectedRoute >
            }
          />

           <Route
            path="/AdicionarLivro"
            element={
              < ProtectedRoute>
                  <AdicionarLivro />
              </ ProtectedRoute >
            }
          />

           <Route
            path="/emprestimo"
            element={
              < ProtectedRoute>
                  <emprestimo />
              </ ProtectedRoute >
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
