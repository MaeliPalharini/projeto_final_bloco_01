import { Plano } from "../model/Plano";
import { Colors } from "../util/Colors";
import { PlanoRepository } from "../repository/PlanoRepository";

export class PlanoController implements PlanoRepository {
  private listaPlanos: Plano[] = [];
  private id: number = 0;

  public listarTodos(): void {
    if (this.listaPlanos.length === 0) {
      console.log(Colors.fg.red, "\nNenhum plano cadastrado.", Colors.reset);
    } else {
      for (let plano of this.listaPlanos) {
        plano.visualizar();
      }
    }
  }

  public buscarPorId(id: number): Plano | null {
    const plano = this.listaPlanos.find((plano) => plano.getId() === id);
    if (plano) {
      plano.visualizar();
      return plano;
    }

    console.log(
      Colors.fg.red,
      `\nPlano ID ${id} não encontrado.`,
      Colors.reset
    );
    return null;
  }

  public cadastrar(plano: Plano): void {
    plano.setId(this.gerarId());
    this.listaPlanos.push(plano);

    console.log(
      Colors.fg.green,
      `\nPlano ID ${plano.getId()} cadastrado com sucesso!`,
      Colors.reset
    );
  }
  //Usei o findIndex pra econtrar a posição exata de um plano
  public atualizar(id: number, novoPlano: Plano): void {
    const index = this.listaPlanos.findIndex((plano) => plano.getId() === id);

    if (index !== -1) {
      novoPlano.setId(id);
      this.listaPlanos[index] = novoPlano;
      console.log(
        Colors.fg.green,
        `\nPlano ID ${id} atualizado com sucesso!`,
        Colors.reset
      );
    } else {
      console.log(
        Colors.fg.red,
        `\nPlano ID ${id} não encontrado.`,
        Colors.reset
      );
    }
  }

  public excluir(id: number): void {
    const index = this.listaPlanos.findIndex((plano) => plano.getId() === id);

    if (index !== -1) {
      this.listaPlanos.splice(index, 1);
      console.log(Colors.fg.green, `\nPlano ID ${id} excluído.`, Colors.reset);
    } else {
      console.log(
        Colors.fg.red,
        `\nPlano ID ${id} não encontrado.`,
        Colors.reset
      );
    }
  }

  private gerarId(): number {
    return ++this.id;
  }
}
