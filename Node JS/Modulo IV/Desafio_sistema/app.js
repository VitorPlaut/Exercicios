import pg from "pg";
import promptSync from "prompt-sync";
import chalk from "chalk";

const { Client } = pg;
const prompt = promptSync();

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "banco_teste"
});

async function sistemaDeTurma() {
    let resposta = -1;

    try {
        await client.connect();

        while (resposta !== 0) {

            console.clear();

            console.log(chalk.cyan("════════════════════════════════════════════════════"));
            console.log(chalk.yellow.bold("              🎓 SISTEMA DE TURMA 3DS"));
            console.log(chalk.cyan("════════════════════════════════════════════════════"));
            console.log(chalk.green("1 - Ver todos os alunos"));
            console.log(chalk.green("2 - Ver situação da turma"));
            console.log(chalk.green("3 - Cadastrar aluno"));
            console.log(chalk.green("4 - Lançar nota"));
            console.log(chalk.green("5 - Remover aluno"));
            console.log(chalk.red("0 - Sair"));
            console.log(chalk.cyan("════════════════════════════════════════════════════"));

            resposta = Number(prompt(chalk.blue("\nDigite uma opção: ")));

            switch (resposta) {

                case 1: {

                    console.log(chalk.yellow("\n===== LISTA DE ALUNOS ====="));

                    const listarAlunos = await client.query(
                        "SELECT id, nome, nota FROM alunos"
                    );

                    if (listarAlunos.rowCount === 0) {
                        console.log(chalk.red("Nenhum aluno cadastrado."));
                    } else {

                        listarAlunos.rows.forEach(aluno => {
                            console.log(
                                chalk.white(
                                    `ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`
                                )
                            );
                        });

                    }

                    prompt(chalk.gray("\nPressione ENTER para continuar..."));
                    break;
                }

                case 2: {

                    console.log(chalk.yellow("\n===== SITUAÇÃO DA TURMA ====="));

                    const aprovados = await client.query(
                        "SELECT nome, nota FROM alunos WHERE nota >= 7"
                    );

                    const recuperacao = await client.query(
                        "SELECT nome, nota FROM alunos WHERE nota >= 5 AND nota < 7"
                    );

                    const reprovados = await client.query(
                        "SELECT nome, nota FROM alunos WHERE nota < 5"
                    );

                    console.log(chalk.green("\nAprovados"));

                    aprovados.rows.forEach(aluno => {
                        console.log(`${aluno.nome} - ${aluno.nota}`);
                    });

                    console.log(chalk.yellow("\nRecuperação"));

                    recuperacao.rows.forEach(aluno => {
                        console.log(`${aluno.nome} - ${aluno.nota}`);
                    });

                    console.log(chalk.red("\nReprovados"));

                    reprovados.rows.forEach(aluno => {
                        console.log(`${aluno.nome} - ${aluno.nota}`);
                    });

                    prompt(chalk.gray("\nPressione ENTER para continuar..."));
                    break;
                }

                case 3: {

                    console.log(chalk.yellow("\n===== CADASTRAR ALUNO ====="));

                    const nome = prompt("Digite o nome: ");
                    const turma = prompt("Digite a turma: ");
                    const nota = Number(prompt("Digite a nota: "));

                    if (nome.trim() === "") {
                        console.log(chalk.red("Nome inválido."));
                        prompt("\nENTER...");
                        break;
                    }

                    if (Number.isNaN(nota) || nota < 0 || nota > 10) {
                        console.log(chalk.red("Nota inválida."));
                        prompt("\nENTER...");
                        break;
                    }

                    const resultado = await client.query(
                        "INSERT INTO alunos (nome, turma, nota) VALUES ($1,$2,$3) RETURNING *",
                        [nome, turma, nota]
                    );

                    console.log(chalk.green("\nAluno cadastrado com sucesso!"));
                    console.log(resultado.rows[0]);

                    prompt("\nENTER...");
                    break;
                }

                case 4: {

                    console.log(chalk.yellow("\n===== LANÇAR NOTA ====="));

                    const listarAlunos = await client.query(
                        "SELECT id,nome,nota FROM alunos"
                    );

                    listarAlunos.rows.forEach(aluno => {
                        console.log(
                            `ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`
                        );
                    });

                    const id = Number(prompt("\nDigite o ID: "));

                    if (Number.isNaN(id) || id <= 0) {
                        console.log(chalk.red("ID inválido."));
                        prompt("\nENTER...");
                        break;
                    }

                    const nota = Number(prompt("Digite a nova nota: "));

                    if (Number.isNaN(nota) || nota < 0 || nota > 10) {
                        console.log(chalk.red("Nota inválida."));
                        prompt("\nENTER...");
                        break;
                    }

                    const atualizarDados = await client.query(
                        "UPDATE alunos SET nota = $1 WHERE id = $2 RETURNING *",
                        [nota, id]
                    );

                    if (atualizarDados.rowCount === 0) {
                        console.log(chalk.red("Aluno não encontrado."));
                        prompt("\nENTER...");
                        break;
                    }

                    console.log(chalk.green("\nNota atualizada com sucesso!"));
                    console.log(atualizarDados.rows[0]);

                    prompt("\nENTER...");
                    break;
                }

                case 5: {

                    console.log(chalk.yellow("\n===== REMOVER ALUNO ====="));

                    const listarAlunos = await client.query(
                        "SELECT id,nome,nota FROM alunos"
                    );

                    listarAlunos.rows.forEach(aluno => {
                        console.log(
                            `ID: ${aluno.id} | Nome: ${aluno.nome} | Nota: ${aluno.nota}`
                        );
                    });

                    const id = Number(prompt("\nDigite o ID do aluno: "));

                    if (Number.isNaN(id) || id <= 0) {
                        console.log(chalk.red("ID inválido."));
                        prompt("\nENTER...");
                        break;
                    }

                    const aluno = await client.query(
                        "SELECT * FROM alunos WHERE id = $1",
                        [id]
                    );

                    if (aluno.rowCount === 0) {
                        console.log(chalk.red("Aluno não encontrado."));
                        prompt("\nENTER...");
                        break;
                    }

                    console.log(aluno.rows[0]);

                    const confirmar = prompt(
                        `Deseja remover ${aluno.rows[0].nome}? (s/n): `
                    );

                    if (confirmar === "s" || confirmar === "S") {

                        await client.query(
                            "DELETE FROM alunos WHERE id = $1",
                            [id]
                        );

                        console.log(
                            chalk.green(`${aluno.rows[0].nome} removido com sucesso!`)
                        );

                    } else {

                        console.log(chalk.yellow("Operação cancelada."));

                    }

                    prompt("\nENTER...");
                    break;
                }

                case 0:

                    console.log(chalk.green("\nEncerrando o sistema..."));
                    break;

                default:

                    console.log(chalk.red("\nOpção inválida."));
                    prompt("\nENTER...");
            }
        }

    } catch (erro) {

        console.log(chalk.red("Erro: " + erro.message));

    } finally {

        await client.end();

    }
}

sistemaDeTurma();