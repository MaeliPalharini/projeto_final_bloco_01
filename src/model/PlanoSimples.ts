import { Plano } from "./Plano";

export class PlanoSimples extends Plano {
  constructor(id: number, nome: string, frequencia: string, preco: number) {
    super(id, nome, frequencia, preco);
  }

  public exibirTipoPlano(): void {
    console.log("Tipo: Plano Simples");
    console.log("Itens inclusos: " + this.getItensFixos().join(", "));
  }
}
