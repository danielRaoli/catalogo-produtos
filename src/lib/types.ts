export interface Produto {
  id: number,
  nome: string,
  descricao: string,
  preco: number,
  disponivel: boolean,
  imagemUrl: string,
  imagens: Imagem[]
}

export interface Imagem {
  id: number,
  url: string,
  produtoId: number
}