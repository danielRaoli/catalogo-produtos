export interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    disponivel: boolean;
    imagemUrl: string;
    categoria?: string;
  }