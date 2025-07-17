import readlineSync from "readline-sync";
import { Colors } from "./src/util/Colors";
import { PlanoSimples } from "./src/model/PlanoSimples";
import { PlanoPersonalizado } from "./src/model/PlanoPersonalizado";
import { PlanoController } from "./src/controller/PlanoController";

const controller = new PlanoController();

function exibirMenu(): void {
  console.clear();

  const dataAtual = new Date().toLocaleString("pt-BR");

  console.log(Colors.fg.magenta + "=".repeat(60) + Colors.reset);
  console.log(
    Colors.fg.magenta +
      "          SISTEMA DE ASSINATURA - BIOBOX" +
      Colors.reset
  );
  console.log(
    Colors.fg.cyan + "         Data e Hora: " + dataAtual + Colors.reset
  );
  console.log(Colors.fg.magenta + "=".repeat(60) + Colors.reset);

  console.log("");
  console.log("  1 - Cadastrar Plano Simples");
  console.log("  2 - Cadastrar Plano Personalizado");
  console.log("  3 - Buscar por Id");
  console.log("  4 - Listar Planos");
  console.log("  5 - Atualizar Plano");
  console.log("  6 - Excluir Plano");
  console.log(Colors.fg.yellow + "  0 - Sair" + Colors.reset);
  console.log("");
  console.log(Colors.fg.magenta + "=".repeat(60) + Colors.reset);
}

function keyPress(): void {
  console.log(Colors.reset, "");
  console.log("\nPressione enter para continuar.");
  readlineSync.prompt();
}

function lerNomePlano(): string {
  const opcoesValidas = ["simples", "personalizado"];
  let nome: string;
  while (true) {
    nome = readlineSync
      .question("Nome do plano (simples/personalizado): ")
      .toLowerCase();
    if (opcoesValidas.includes(nome)) {
      return nome;
    } else {
      console.log("Nome inválido. Digite 'simples' ou 'personalizado'.");
    }
  }
}
// add o !isNaN (Not a Number) pois ele garante que o valor inserido seja um número e maior que zero.
// função alterada para versao generica usada para preço ou numero (id)
function lerNumero(ehPreco = true): number {
  let preco: number;
  while (true) {
    let texto = ehPreco ? "Preco (numero positivo): " : "Digite o ID: ";
    preco = readlineSync.questionFloat(texto);
    if (!isNaN(preco) && preco > 0) {
      return preco;
    } else {
      console.log("Preco invalido. Digite um numero positivo.");
    }
  }
}

function lerFrequencia(): string {
  const opcoesValidas = ["semanal", "mensal"];
  let frequencia: string;
  while (true) {
    frequencia = readlineSync
      .question("Frequencia (semanal/mensal): ")
      .toLowerCase();
    if (opcoesValidas.includes(frequencia)) {
      return frequencia;
    } else {
      console.log("Frequencia invalida. Digite 'semanal' ou 'mensal'.");
    }
  }
}
//add keyIn resposta com tecla unica
function perguntarSimNao(mensagem: string): boolean {
  const resposta = readlineSync.keyIn(
    `${Colors.fg.yellow}${mensagem} [s/n]: ${Colors.reset}`,
    {
      limit: "sn",
      caseSensitive: false,
    }
  );
  return resposta.toLowerCase() === "s";
}

const dataAtual = new Date().toLocaleString("pt-BR");
console.log(`${Colors.fg.cyan}Data atual: ${dataAtual}${Colors.reset}`);
let opcao: number;

do {
  exibirMenu();
  opcao = readlineSync.questionInt("Escolha uma opcao para prosseguirmos: ");

  switch (opcao) {
    case 1:
      console.log("\n--- Cadastrar Plano Simples ---");
      const nomeSimples = "simples";
      const precoSimples = lerNumero();
      const frequenciaSimples = lerFrequencia();
      const planoSimples = new PlanoSimples(
        0,
        nomeSimples,
        frequenciaSimples,
        precoSimples
      );
      controller.cadastrar(planoSimples);
      1;
      break;

    case 2: {
      console.log("\n--- Cadastrar Plano Personalizado ---");
      const nomePersonalizado = "personalizado";
      const precoPersonalizado = lerNumero();
      const frequenciaPersonalizada = lerFrequencia();

      const opcoesExtras = [
        "Entrega de frutas exóticas",
        "Produtos veganos",
        "Cesta light/fitness",
        "Produtos sem glúten",
      ];
      //acabei tirando o keyselect(selecionava so um) e fiz função e esse for de sim ou não
      const itensSelecionados: string[] = [];
      console.log("\nEscolha os itens personalizados:");
      for (const extra of opcoesExtras) {
        if (perguntarSimNao(`Deseja incluir "${extra}"?`)) {
          itensSelecionados.push(extra);
        }
      }

      const planoPersonalizado = new PlanoPersonalizado(
        0,
        "personalizado",
        precoPersonalizado,
        frequenciaPersonalizada,
        itensSelecionados
      );
      controller.cadastrar(planoPersonalizado);
      break;
    }
    case 3:
      console.log("\n--- Buscar por ID ---");
      4;
      const id = lerNumero(false);
      controller.buscarPorId(id);
      break;

    case 4:
      controller.listarTodos();
      break;

    case 5:
      console.log("\n--- Atualizar Plano ---");

      const idAtualizar = lerNumero(false);
      const novoNome = lerNomePlano();
      const novoPreco = lerNumero();
      const novaFrequencia = lerFrequencia();
      const planoAtualizado = new PlanoSimples(
        idAtualizar,
        novoNome,
        novaFrequencia,
        novoPreco
      );
      controller.atualizar(idAtualizar, planoAtualizado);
      break;

    case 6:
      console.log("\n--- Excluir Plano ---");
      const idExcluir = lerNumero(false);
      controller.excluir(idExcluir);
      break;

    case 0:
      console.log("Muito obrigada por escolher a BIOBOX!");
      break;

    default:
      console.log("Opção inválida! Tente novamente.");
  }

  if (opcao !== 0) keyPress();
} while (opcao !== 0);
