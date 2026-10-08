import { useState, useEffect } from "react"
import Input from "./Input"

function DadosLivros({ livro }) {

    const [quantidade, setQuantidade] = useState(1);
    const [localizacao, setLocalizacao] = useState("");
    const [sinopse, setSinopse] = useState("");
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        setQuantidade(1);
        setLocalizacao("");
        setSinopse("");
    }, [livro]);

    async function handleSalvarLivro() {
        if (!livro) {
            alert("Selecione um livro primeiro.");
            return;
        }

        if (!localizacao) {
            alert("Escolha uma localização.");
            return;
        }

        if (!Number.isInteger(Number(quantidade)) || Number(quantidade) < 1) {
            alert("Informe uma quantidade válida.");
            return;
        }

        setSalvando(true);

        try {
            const resposta = await fetch("http://localhost:3000/livros", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    titulo: livro.title,
                    autor: livro.author_name?.[0] || null,
                    editora: livro.publisher?.[0] || null,
                    ano_publicacao: livro.first_publish_year || null,
                    categoria: livro.subject?.[0] || null,
                    isbn: livro.isbn?.[0] || null,
                    capa_url: livro.cover_i
                        ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`
                        : null,
                    quantidade: Number(quantidade),
                    localizacao,
                    sinopse
                })
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.mensagem || "Erro ao salvar livro."
                );
            }

            alert("Livro salvo com sucesso!");

            setQuantidade(1);
            setLocalizacao("");
            setSinopse("");

        } catch (error) {
            alert(error.message);

        } finally {
            setSalvando(false);
        }
    }

    return (
        <div className="border border-bege w-200 rounded-lg p-5">

            <div>
                <p className="font-bold text-lg pt-3 pb-3">
                    2 - Dados do livro selecionado
                </p>

                <span className="text-pretoClaro">
                    Revise as informações importadas da api
                </span>
            </div>


            <div className="flex col pt-5">

                <div className="flex">

                    <img
                        src={
                            livro?.cover_i
                                ? `https://covers.openlibrary.org/b/id/${livro.cover_i}-L.jpg`
                                : "/sem-capa.jpg"
                        }
                        className="h-60 w-50 rounded-lg"
                    />

                </div>


                <div className="pl-5">

                    <div className="flex gap-5">

                        <Input
                            label="Título"
                            value={livro?.title || ""}
                        />

                        <Input
                            label="Autor"
                            value={livro?.author_name?.[0] || ""}
                        />

                    </div>


                    <div className="flex gap-5">

                        <Input
                            label="Editora"
                            value={livro?.publisher?.[0] || ""}
                        />

                        <Input
                            label="Ano de publicação"
                            value={livro?.first_publish_year || ""}
                        />

                    </div>


                    <div className="flex gap-5">

                        <Input
                            label="Categoria"
                            value={livro?.subject?.[0] || ""}
                        />

                        <Input
                            label="ISBN"
                            value={livro?.isbn?.[0] || ""}
                        />

                    </div>

                </div>

            </div>


            <div>

                <p className="font-bold text-lg">
                    3 - Dados da Biblioteca
                </p>

                <p className="text-pretoClaro">
                    Preencha os dados específicos da sua biblioteca
                </p>


                <div>

                    <div className="flex pt-5 pb-5">

                        <p className="text-lg pr-3">
                            Quantidade de exemplares:
                        </p>

                        <input value={quantidade} onChange={(e) => setQuantidade(e.target.value)}
                            className="border border-marrom outline-none w-20 rounded-md"
                            type="text"
                        />

                    </div>


                    <div className="pb-3">

                        <label className="text-lg">

                            Localização:

                            <select value={localizacao} onChange={(e) => setLocalizacao(e.target.value)} className="text-white bg-marrom rounded-lg ml-2">

                                <option value="" disabled>
                                    Escolha uma estante
                                </option>

                                <option value="someOption">
                                    Estante A - prateleira 2
                                </option>

                                <option value="otherOption">
                                    Estante B - prateleira 3
                                </option>

                                <option value="otherOption">
                                    Estante C - prateleira 4
                                </option>

                            </select>

                        </label>

                    </div>


                    <div>

                        <label className="text-lg">
                            Sinopse
                        </label>

                        <textarea value={sinopse} onCanPlay={(e) => setSinopse(e.target.value)}
                            className="w-full h-70 border border-bege outline-none rounded-lg text-base p-3"
                        />

                    </div>

                </div>

            </div>


            <div className="flex justify-end pt-5">
                <button
                    onClick={handleSalvarLivro}
                    disabled={!livro || salvando}
                    className="bg-marromEscuro text-white px-5 py-3 rounded-lg cursor-pointer disabled:opacity-50"
                >
                    {salvando ? "Salvando..." : "Salvar livro"}
                </button>
            </div>

        </div>
    )
}

export default DadosLivros