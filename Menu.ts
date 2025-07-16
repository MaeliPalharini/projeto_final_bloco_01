import readlineSync from "readline-sync";
import { Colors } from "./src/util/Colors";

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
  opcao = readlineSync.questionInt("Escolha uma opção para prosseguirmos: ");

  switch (opcao) {
    case 1:
      console.log("Cadastrar novo Plano de assinatura");
      break;
    case 2:
      console.log("Listando todos os planos");
      break;
    case 3:
      console.log("Atualizando plano existente");
      break;
    case 4:
      console.log("Deletando plano");
      break;
    case 0:
      console.log("Saindo do sistema");
      break;
    default:
      console.log("Opção inválida! Tente novamente");
  }

  if (opcao !== 0) keyPress();
} while (opcao !== 0);
