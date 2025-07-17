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
  console.log("  3 - Listar Planos");
  console.log("  4 - Atualizar Plano");
  console.log("  5 - Excluir Plano");
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
// add o !isNaN pois ele garante que o valor inserido seja um número e maior que zero.
function lerPreco(): number {
  let preco: number;
  while (true) {
    preco = readlineSync.questionFloat("Preco (numero positivo): ");
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
      const precoSimples = lerPreco();
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
      const precoPersonalizado = lerPreco();
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
      controller.listarTodos();
      break;

    case 4:
      console.log("\n--- Atualizar Plano ---");

      const idAtualizar = readlineSync.questionInt(
        "Digite o ID do plano que deseja atualizar: "
      );
      const novoNome = lerNomePlano();
      const novoPreco = lerPreco();
      const novaFrequencia = lerFrequencia();
      const planoAtualizado = new PlanoSimples(
        idAtualizar,
        novoNome,
        novaFrequencia,
        novoPreco
      );
      controller.atualizar(idAtualizar, planoAtualizado);
      break;

    case 5:
      console.log("\n--- Excluir Plano ---");
      const idExcluir = readlineSync.questionInt("ID do plano a excluir: ");
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
