import LogoSidebar from "./LogoSidebar";
import SidebarButton from "./SidebarButton";

import {
    FaBookOpen,
    FaBookMedical,
    FaUser,
    FaHome
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div>

            <div className="bg-marromClaro w-75 h-screen">

                <div className="p-5">
                    <LogoSidebar />
                </div>


                <div className="flex flex-col gap-10 w-full pl-2">

                    <NavLink to="/AdministradorTela">

                        <SidebarButton texto="Dashboard">

                        <FaHome className="text-2xl" />

                        </SidebarButton>

                    </NavLink>

                    <NavLink to="/CatalogoDeLivros">

                        <SidebarButton texto="Catálogo de Livros">

                            <FaBookOpen className="text-2xl" />

                        </SidebarButton>

                    </NavLink>

                    <NavLink to="/AdicionarLivro">

                        <SidebarButton texto="Adicionar Livro">

                            <FaBookOpen className="text-2xl" />

                        </SidebarButton>

                    </NavLink>

                    <NavLink to="/Emprestimo">

                        <SidebarButton texto="Registrar empréstimo">

                            <FaBookMedical className="text-2xl" />

                        </SidebarButton>

                    </NavLink>
                </div>

            </div>

        </div>

    );
}

export default Sidebar;