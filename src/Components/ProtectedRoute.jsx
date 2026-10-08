import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({
    somenteAdministrador = false
}) {

    const token = localStorage.getItem("token");
    const usuarioSalvo = localStorage.getItem("usuario");

    if (!token || !usuarioSalvo) {
        return <Navigate to="/" replace />;
    }

    const usuario = JSON.parse(usuarioSalvo);
    console.log(usuario)
    if (
        somenteAdministrador &&
        usuario.tipoUsuario !== "administrador"
    ) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;