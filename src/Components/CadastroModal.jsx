import { useState } from "react";

import BotaoMaior from "./BotaoMaior";
import Input from "./Input";
import Toast from "./Toast";

import { IoClose } from "react-icons/io5";

function CadastroModal({ setOpen }) {

    const [email, setEmail] = useState("");
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");

    const [toast, setToast] = useState(null);

    const [tipoUsuario, setTipoUsuario] = useState("usuario");

    async function cadastrarUsuario() {

        // Email no formato padrão
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Apenas letras e espaços
        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;

        // Mínimo de 8 caracteres
        // Pelo menos 1 letra minúscula
        // Pelo menos 1 letra maiúscula
        // Pelo menos 1 caractere especial
        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/;

        if (!nomeRegex.test(nome)) {

            setToast({
                mensagem: "O nome não pode conter caracteres especiais, apenas letras e espaços.",
                tipo: "erro"
            });

            return;
        }

        if (!emailRegex.test(email)) {

            setToast({
                mensagem: "Digite um email válido.",
                tipo: "erro"
            });

            return;
        }

        if (!senhaRegex.test(senha)) {

            setToast({
                mensagem: "A senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma letra minúscula e um caractere especial.",
                tipo: "erro"
            });

            return;
        }

        try {

            const resposta = await fetch("http://localhost:3000/usuarios", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    nome,
                    senha,
                    tipoUsuario
                })
            });


            const dados = await resposta.json();

            if (!resposta.ok) {

                setToast({
                    mensagem: dados.mensagem || "Não foi possível criar a conta.",
                    tipo: "erro"
                });

                return;
            }

            setToast({
                mensagem: "Conta criada com sucesso!",
                tipo: "sucesso"
            });

            setEmail("");
            setNome("");
            setSenha("");

            setOpen(false);

        } catch (error) {

            setToast({
                mensagem: "Erro ao conectar com o servidor.",
                tipo: "erro"
            });
        }
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">

                <div className="border-bege rounded-lg bg-offwhite w-180 p-5 flex flex-col items-center">

                    <button
                        onClick={() => setOpen(false)}
                        className="flex justify-end w-full cursor-pointer"
                    >
                        <IoClose className="text-3xl text-marromEscuro" />
                    </button>

                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        label="Email"
                        type="email"
                        placeholder="seuemail@exemplo.com.br"
                    />

                    <Input
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        label="Nome de usuário"
                        type="text"
                        placeholder="Amanda Moniele"
                    />

                    <Input
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        label="Senha"
                        type="password"
                        placeholder="......."
                    />

                    <div className="flex gap-5 pb-3">

                        <div>
                            <input
                                type="radio"
                                name="tipoUsuario"
                                value="administrador"
                                checked={tipoUsuario === "administrador"}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                            />

                            <label className="pl-1">
                                Administrador
                            </label>
                        </div>

                        <div>
                            <input
                                type="radio"
                                name="tipoUsuario"
                                value="usuario"
                                checked={tipoUsuario === "usuario"}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                            />

                            <label className="pl-1">
                                Usuário comum
                            </label>
                        </div>

                    </div>

                    <BotaoMaior
                        onClick={cadastrarUsuario}
                        text="Criar conta"
                    />

                </div>

            </div>

            {toast && (
                <Toast
                    mensagem={toast.mensagem}
                    tipo={toast.tipo}
                    fechar={() => setToast(null)}
                />
            )}
        </>
    );
}

export default CadastroModal;

