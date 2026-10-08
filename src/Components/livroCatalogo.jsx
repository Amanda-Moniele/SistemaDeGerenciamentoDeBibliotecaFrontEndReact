function LivroCatalogo({ livro }) {
  return (
    <div className="flex gap-5 border border-bege rounded-lg p-5">

      <img
        src={livro.capa_url || "/sem-capa.jpg"}
        alt={livro.titulo}
        className="h-40 w-30 rounded-lg object-cover"
      />

      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-lg">
          {livro.titulo}
        </h2>

        <p className="text-pretoClaro">
          Autor: {livro.autor || "Não informado"}
        </p>

        <p>
          Editora: {livro.editora || "Não informada"}
        </p>

        <p>
          Quantidade: {livro.quantidade}
        </p>

        <p>
          Localização: {livro.localizacao}
        </p>
      </div>

    </div>
  );
}

export default LivroCatalogo;