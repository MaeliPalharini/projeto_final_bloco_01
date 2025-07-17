export abstract class Plano {
  protected id: number;
  protected nome: string;
  protected frequencia: string;
  protected preco: number;

  protected itensFixos: string[] = [
    "Entrega semanal de produtos orgânicos",
    "Seleção personalizada de frutas e vegetais",
    "Suporte nutricional via WhatsApp",
    "Relatório de origem dos alimentos",
    "Produtos de produtores locais e agroecológicos",
  ];

  constructor(id: number, nome: string, frequencia: string, preco: number) {
    this.id = id;
    this.nome = nome;
    this.frequencia = frequencia;
    this.preco = preco;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getId(): number {
    return this.id;
  }

  public setNome(nome: string): void {
    this.nome = nome;
  }

  public getNome(): string {
    return this.nome;
  }

  public setPreco(preco: number): void {
    if (preco > 0) {
      this.preco = preco;
    }
  }

  public getFrequencia(): string {
    return this.frequencia;
  }

  public setFrequencia(frequencia: string): void {
    this.frequencia = frequencia;
  }

  public getItensFixos(): string[] {
    return this.itensFixos;
  }

  public visualizar(): void {
    console.log("\n┌──────────────────────────────────────────────────┐");
    console.log(`└───────────── Resumo do seu contrato ─────────────┘`);
    console.log(`Id: ${this.id}`);
    console.log(`Plano: ${this.nome}`);
    console.log(`Frequência: ${this.frequencia}`);
    console.log(`Preço: R$ ${this.preco.toFixed(2)}`);
    console.log("Itens Fixos: " + this.itensFixos.join(", "));
    console.log("                 ──────//──────");
  }

  public abstract exibirTipoPlano(): void;
}
