import { Plano } from "./Plano";

export class PlanoPersonalizado extends Plano {
  private itensSelecionados: string[];

  constructor(
    id: number,
    nome: string,
    preco: number,
    frequencia: string,
    itensSelecionados: string[]
  ) {
    super(id, nome, frequencia, preco);
    this.itensSelecionados = itensSelecionados;
  }

  public exibirTipoPlano(): void {
    console.log("Tipo: Plano Personalizado");
    console.log("Itens escolhidos: " + this.itensSelecionados.join(", "));
  }

  public getItensSelecionados(): string[] {
    return this.itensSelecionados;
  }

  public setItensSelecionados(itens: string[]): void {
    this.itensSelecionados = itens;
  }
}
