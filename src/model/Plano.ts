export abstract class Plano {
    protected id: number;
    protected nome: string;
    protected frequencia: string;
    protected preco: number;
}

constructor(id:number, nome: string, frequencia: string, preco:number) {
    this.id = id;
    this.nome = nome;
    this.frequencia = frequencia;
    this.preco = preco;
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

public setPreco(number: preco): void {
    if (preco > 0);
    this.preco = preco;
}

public getFrequencia(): string (
    return this.frequencia;
)

public setFrequencia(string: frequencia): void {
    this.frequencia = frequencia;
}


public visualizar(): void {
      console.log('\n----------------------------------------------------');
      console.log('\n-----------Resumo do seu contrato-------------------');
      console.log(`Plano: ${this.nome}`);
      console.log(`Plano: ${this.frequencia}`);
      console.log(`Plano: ${this.preco}`);
      this.exibirTipoPlano;
}