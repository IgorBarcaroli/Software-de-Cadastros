let vetor = [] // Vetor onde serão armazenados os alunos e seus campos.
let vetorAprovados = []

/* ---------------------- Funções Primárias ---------------------- */

function menu() { // Função principal, com propósito de mostrar a tela de apresentação.
    let opcao = Number(prompt("Entre com uma das opções abaixo:\n\n1. Cadastrar alunos.\n2. Relatório de Alunos em "+
    "ordem crescente por Nome.\n3. Relatório de Alunos em ordem descrescente por RA.\n4. Relatório de alunos em "+ 
    "ordem crescente por Nome, apenas dos Aprovados.\n5. Encerre a execução do programa.\n\nOpção:"))
    switch (opcao) {
        case 0:
            break;
        case 1:
            cadastrarAluno(vetor);
            menu()
            break;
        case 2: 
            relatorio(vetor, (elem1, elem2) => elem1.nome > elem2.nome); criarTabela(vetor);
            break;
        case 3:
            relatorio(vetor, (elem1, elem2) => elem1.ra < elem2.ra); criarTabela(vetor);
            break;
        case 4:
            relatorio(vetorAprovados, (elem1, elem2) => elem1.nome > elem2.nome); criarTabela(vetorAprovados); console.log(vetorAprovados)
            break;
        case 5:
            break;
        default: 
            alert("Insira uma opção válida!")
            opcao = Number(prompt("Entre com uma das opções abaixo:\n\n1. Cadastrar alunos.\n2. Relatório de Alunos em "+
            "ordem crescente por Nome.\n3. Relatório de Alunos em ordem descrescente por RA.\n4. Relatório de alunos em "+
            "ordem crescente por Nome, apenas dos Aprovados.\n5. Encerre a execução do programa.\n\nOpção:"))
    }
}
function cadastrarAluno(array, arrayAprovados = vetorAprovados) { // Função utilizada para formar o Array de objetos.
    if (array.length > 49) {
        alert("Limite máximo de alunos alcançado.")
        return
    }
    let aluno = {}
    let nome = prompt("Insira o nome do aluno: ")
    nome = nome.toUpperCase()
    aluno.nome = nome
    let ra = Number(prompt("Insira o RA do aluno: "))
        while (isNaN(ra)==true) {
            alert("RA Inválido! Insira um RA com 13 caracteres de número.")
            ra = Number(prompt("Insira o RA do aluno: "))
        }
        while (ra.toString().length !== 13) {
            alert("RA Inválido! Insira um RA com 13 caracteres de número.")
            ra = Number(prompt("Insira o RA do aluno: "))
        }    
    aluno.ra = ra
    let idade = Number(prompt("Insira a idade do aluno: "))
    while (isNaN(idade)==true) {
        alert("Idade Inválida! Insira apenas números")
        idade = Number(prompt("Insira a idade do aluno: "))
    }
    while (idade <= 0) {
        alert("Insira uma idade válida!")
        idade = Number(prompt("Insira a idade do aluno: "))
    }    
    aluno.idade = idade
    let sexo = String(prompt("Insira o sexo do aluno (M/F): "))
        while ((sexo !== "M" && sexo !== "m") && (sexo !== "F" && sexo !== "f")) {
            alert("Sexo inválido! Insira M ou F.")
            sexo = prompt("Insira o sexo do aluno (M/F): ")
        }
    sexo = sexo.toUpperCase()
    aluno.sexo = sexo
    let media = Number(prompt("Insira a média do aluno: "))
        while (media < 0 || media > 10) {
            alert("Média inválida! Insira uma nota entre 0 e 10.")
            media = Number(prompt("Insira a média do aluno: "))
        }
        if (media >= 6 ) {
            aluno.resultado = "Aprovado";
        }
        else {
            aluno.resultado = "Reprovado"
        }
    aluno.media = media
    array.push(aluno)
        if (aluno.resultado === "Aprovado") {
            arrayAprovados.push(aluno)
        }
}

function relatorio(array,fnComp){ // Estrutura Selection Sort usada para fazer os relatórios.
    for (let posSel = 0; posSel < array.length -1; posSel++) {
        let menorValor = posSel + 1
        for (let i = menorValor+1; i < array.length; i++) {
            if (fnComp(array[menorValor],array[i])) { // Função de comparação, utilizada via arrow function na Opção 2 e 3.
                menorValor = i
            }
        }
        if (fnComp(array[posSel],array[menorValor])) {
            [array[posSel],array[menorValor]] = [array[menorValor],array[posSel]]
        }
    }
}

/* ---------------------- Funções Secundárias ---------------------- */

function criarTabela(array){ // Função utilizada para criar a tabela no HTML contendo os relatórios.
    document.getElementById("tabela").innerHTML = `<table id="table"></table>`
    let table = document.getElementById("table")
    let linha = table.insertRow(0)
    let celulaNome = linha.insertCell(0)
    let celulaRA = linha.insertCell(1)
    let celulaIdade = linha.insertCell(2)
    let celulaSexo = linha.insertCell(3)
    let celulaMedia = linha.insertCell(4) 
    let celulaResultado = linha.insertCell(5)
    celulaNome.innerHTML = "Nome"
    celulaRA.innerHTML = "RA"
    celulaIdade.innerHTML = "Idade"
    celulaSexo.innerHTML = "Sexo"
    celulaMedia.innerHTML = "Média"
    celulaResultado.innerHTML = "Resultado"
    for (let i = 0; i < array.length; i++) {
        linha = table.insertRow(i+1)
        celulaNome = linha.insertCell(0)
        celulaNome.innerHTML = array[i].nome
        celulaRA = linha.insertCell(1)
        celulaRA.innerHTML = array[i].ra
        celulaIdade = linha.insertCell(2)
        celulaIdade.innerHTML = array[i].idade
        celulaSexo = linha.insertCell(3)
        celulaSexo.innerHTML = array[i].sexo
        celulaMedia = linha.insertCell(4)
        celulaMedia.innerHTML = array[i].media
        celulaResultado = linha.insertCell(5)
        celulaResultado.innerHTML = array[i].resultado
    }
}