import { Plano } from "../model/Plano";

export interface PlanoRepository {
  listarTodos(): void;
  buscarPorId(id: number): Plano | null;
  cadastrar(plano: Plano): void;
  atualizar(id: number, plano: Plano): void;
  excluir(id: number): void;
}
