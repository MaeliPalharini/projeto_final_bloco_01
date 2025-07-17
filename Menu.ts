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
  console.log("  1 - Cadastrar Plano Básico");
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

let opcao: number;
const dataAtual = new Date().toLocaleString("pt-BR");
console.log(`${Colors.fg.cyan}Data atual: ${dataAtual}${Colors.reset}`);

do {
  exibirMenu();
  opcao = readlineSync.questionInt("Escolha uma opcao para prosseguirmos: ");

  switch (opcao) {
    case 1:
      console.log("\n--- Cadastrar Plano Simples ---");
      const nomeSimples = readlineSync.question("Nome do plano: ");
      const precoSimples = readlineSync.questionFloat("Preco: ");
      const frequenciaSimples = readlineSync.question(
        "Frequencia (semanal, mensal): "
      );
      const planoSimples = new PlanoSimples(
        0,
        nomeSimples,
        frequenciaSimples,
        precoSimples
      );
      controller.cadastrar(planoSimples);
      break;

    case 2: {
      console.log("\n--- Cadastrar Plano Personalizado ---");
      const nomePersonalizado = readlineSync.question("Nome do plano: ");
      const precoPersonalizado = readlineSync.questionFloat("Preco: ");
      const frequenciaPersonalizada = readlineSync.question(
        "Frequencia (semanal, mensal): "
      );

      const opcoesExtras = [
        "Entrega de frutas exóticas",
        "Produtos veganos",
        "Cesta light/fitness",
        "Produtos sem glúten",
      ];

      const selecionado = readlineSync.keyInSelect(
        opcoesExtras,
        "Escolha os itens personalizados:",
        { cancel: "Nenhum" }
      );

      const itensSelecionados =
        selecionado >= 0 ? [opcoesExtras[selecionado]] : [];

      const planoPersonalizado = new PlanoPersonalizado(
        0,
        nomePersonalizado,
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
      const idAtualizar = readlineSync.questionInt("Digite o ID do plano: ");
      const novoNome = readlineSync.question("Novo nome: ");
      const novoPreco = readlineSync.questionFloat("Novo preco: ");
      const novaFrequencia = readlineSync.question("Nova frequencia: ");
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
