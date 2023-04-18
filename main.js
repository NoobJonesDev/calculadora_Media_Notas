const form = document.getElementById('form-atividade')
const imgAprovado = '<img src="./imagens/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./imagens/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado= '<span class="resultado aprovado">Aprovado </span>';
const spanReprovado= '<span class="resultado reprovado">Reprovado </span>';
const notaMinima = parseFloat(prompt("Digite a nota minima"))
let linhas= '';


// adicionando um evento, tirando o submit e chamando as functions separadas para organizar o codigo
form.addEventListener('submit',function(e) {
    e.preventDefault();
    adicionaLinha();
    atualizaTabela();
    atualizaMediaFinal();
});

function adicionaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade')
    const inputNotaAtividade = document.getElementById('nota-atividade')
    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
    } else {
        //adicionado aos arrays os inputs realizados
        atividades.push(inputNomeAtividade.value)
        notas.push(parseFloat(inputNotaAtividade.value))
        //recebendo o codigo html como uma string
        let linha = '<tr>'
        // += e igual a concatenar
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        // Operador ternário utilizando if como ? e else como :
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado } </td>`;
        linha += `<tr>`;
        linhas += linha;
        //declarando os campos vazios apos adicionar a linha
        inputNomeAtividade.value = ''
        inputNotaAtividade.value = ''
    }
}

function atualizaTabela() {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal() {
    //defindo a media em uma variavel através da function
    const mediaFinal = calculaMediaFinal();
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado ;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;
    //laco de repeticao para somar as notas conforme entrarem no input
    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i]
    }
    //divisao final das somas das notas com quantidade notas no array retornado a media
    return somaDasNotas / notas.length;
}