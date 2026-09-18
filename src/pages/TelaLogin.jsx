import BotaoMaior from "../Components/BotaoMaior"
import CadastroModal from "../Components/CadastroModal"
import Input from "../Components/Input"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

function TelaLogin() {

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function Login() {
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email,
                senha
            })
        })

        const dados = await resposta.json()

        if (!resposta.ok) {
            alert(dados.mensagem);
            return;
        } 

        localStorage.setItem("token", dados.token)

        localStorage.setItem(
            "usuario",
            JSON.stringify(dados.usuario)
        )

        navigate("/administrador")
    }

    return (
        <div>
            <div className="flex items-center flex-col">
                <img src="src/assets/gatoLogo.jpg" alt="" className="h-60 w-60 rounded-full mt-10" />
                <p className="text-marrom mb-5 mt-5 font-bold text-3xl">Biblioteca</p>
                <h1 className="text-marrom mb-5 text-lg font-semibold">Sistema de Gerenciamento</h1>
            </div>

            <div className="bg-offwhite w-180 p-5 border  border-bege rounded-lg flex flex-col items-center ">
                <p className="mb-5 text-lg font-bold text-center">Entrar na sua conta</p>
                < Input value={email} onChange={(e) => setEmail(e.target.value)} label="Email" type="email" placeholder="seuemail@exemplo.com.br" />
                < Input value={senha} onChange={(e) => setSenha(e.target.value)} label="Senha" type="password" placeholder="......." />

                <div className="flex justify-end w-full">
                    <button onClick={() => { setOpen(true) }} className="cursor-pointer mb-5 text-marrom hover:text-marromEscuro">Criar conta</button>
                </div>

                <div className="flex justify-center">
                    < BotaoMaior onClick={Login} text="Entrar" />
                </div>
            </div>

            {open && (
                <CadastroModal
                    setOpen={setOpen}
                />
            )}
        </div>
    )
}

export default TelaLogin