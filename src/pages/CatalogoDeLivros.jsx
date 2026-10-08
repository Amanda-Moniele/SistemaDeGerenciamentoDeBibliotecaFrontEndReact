import { useQuery } from "@tanstack/react-query";
import LivroCatalogo from "../Components/livroCatalogo";
import { listarLivrosCatalogo } from "../services/Livros";

function CatalogoDeLivros() {

    const {
        data: livros = [],
        isPending,
        isError,
        error
    } = useQuery({
        queryKey: ["catalogo-livros"],
        queryFn: listarLivrosCatalogo
    });

    if (isPending) {
        return <p>Carregando catálogo...</p>;
    }

    if (isError) {
        return (
            <p className="text-red-500">
                Erro: {error.message}
            </p>
        );
    }

    return (
        <div className="flex flex-col gap-5">

            <h1 className="text-2xl font-bold">
                Catálogo de Livros
            </h1>

            {livros.length === 0 ? (
                <p>Nenhum livro cadastrado.</p>
            ) : (
                <div className="flex flex-col gap-3">
                    {livros.map((livro) => (
                        <LivroCatalogo
                            key={livro.id}
                            livro={livro}
                        />
                    ))}
                </div>
            )}

        </div>
    );
}

export default CatalogoDeLivros;