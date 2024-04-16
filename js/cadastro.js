'use strict'

const mensagem = document.getElementById("mensagem");
const inputCpf = document.getElementById("cpf");
const form = document.getElementById("cadastroForm")
const btnSave = document.getElementById("salvar");
const btnVizualizarCadastros = document.getElementById("vizualizarCadastros");

//Função para pegar a idade do usuário
function getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}


const getIdade = function () {

    const divResponsavelCpf = document.getElementById('responsavelCpf')
    const labelResponsavelCpf = document.getElementById('labelResponsavelCpf')
    const inputResponsavelCpf = document.getElementById('inputResponsavelCpf')

    const dataAtual = moment();

    const anoNascimento = moment(document.getElementById('dataNascimento').value)

    const idade = parseInt(getAge(anoNascimento));

    console.log(anoNascimento.isAfter(dataAtual, 'day'))
    if (idade < 18 && anoNascimento.isAfter(dataAtual, 'day')) {
        mensagem.classList.remove("none")
        mensagem.innerText = "Data de nascimento inválida!"
        mensagem.style.color = "red"
        divResponsavelCpf.classList.add('none')
        labelResponsavelCpf.classList.add('none')
        inputResponsavelCpf.classList.add('none')
    } else if (idade >= 99) {
        mensagem.classList.remove("none")
        mensagem.innerText = "Data de nascimento inválida!"
        mensagem.style.color = "red"
        divResponsavelCpf.classList.add('none')
        labelResponsavelCpf.classList.add('none')
        inputResponsavelCpf.classList.add('none')
    } else if (idade < 18) {
        divResponsavelCpf.classList.remove('none')
        labelResponsavelCpf.classList.remove('none')
        inputResponsavelCpf.classList.remove('none')
        mensagem.classList.add("none")
    }else{
        divResponsavelCpf.classList.add('none')
        labelResponsavelCpf.classList.add('none')
        inputResponsavelCpf.classList.add('none')
        mensagem.classList.add("none")
    }

    return idade

}

document.getElementById('dataNascimento').addEventListener('blur', getIdade);

//Mascara para telefone
const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
}

const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, "($1) $2")
    value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    return value
}

document.getElementById('telefone').addEventListener('keyup', handlePhone);
//Mascara para o cep

const handleZipCode = (event) => {
    let input = event.target
    input.value = zipCodeMask(input.value)
}

const zipCodeMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{5})(\d)/, '$1-$2')
    return value
}

document.getElementById('cep').addEventListener('keyup', handleZipCode)




function validaCPF(cpf) {

    cpf = document.getElementById("cpf").value;
    var Soma = 0
    var Resto
    var status = true

    var strCPF = String(cpf).replace(/[^\d]/g, '')

    if (strCPF.length !== 11) {
        status = false
    }
    if ([
        '00000000000',
        '11111111111',
        '22222222222',
        '33333333333',
        '44444444444',
        '55555555555',
        '66666666666',
        '77777777777',
        '88888888888',
        '99999999999',
    ].indexOf(strCPF) !== -1) {
        status = false
    }

    for (var i = 1; i <= 9; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(9, 10))) {
        status = false
    }
    Soma = 0

    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)

    Resto = (Soma * 10) % 11

    if ((Resto == 10) || (Resto == 11))
        Resto = 0

    if (Resto != parseInt(strCPF.substring(10, 11))) {
        status = false
    }

    if (status == false) {
        mensagem.innerText = "CPF Inválido"
        mensagem.style.color = "red"
        mensagem.classList.remove('none')
    } else {
        mensagem.classList.add('none')
    }

}

inputCpf.addEventListener('blur', validaCPF)

// Função para buscar endereço a partir do CEP
import { pesquisarCep } from './viacep.js'

const preencherFormulario = async function () {

    const cepDigitado = document.getElementById('cep').value
    const cep = await pesquisarCep(cepDigitado)

    document.getElementById('logradouro').value = cep.logradouro
    document.getElementById('bairro').value = cep.bairro
    document.getElementById('cidade').value = cep.municipio
    document.getElementById('uf').value = cep.estado

}

document.getElementById('cep').addEventListener('blur', preencherFormulario)



//Função para carregar os bancos
import { getBancos } from './brasilapi.js';

const carregarBancos = async function () {
    const bancos = await getBancos();

    const selectBanco = document.getElementById('banco');
    bancos.forEach(banco => {
        const option = document.createElement('option');
        option.text = banco.name;
        option.value = banco.code;
        selectBanco.appendChild(option);
    });
}

window.onload = function () {
    carregarBancos();
};


// Função para salvar o cadastro
const salvarCadastro = function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const dataNascimento = document.getElementById("dataNascimento").value.split('-').reverse().join('/');
    const cpfResponsavel = document.getElementById("responsavelCpf").value;
    const email = document.getElementById("email").value;
    const celular = document.getElementById("telefone").value;
    const cep = document.getElementById("cep").value;
    const endereco = document.getElementById("logradouro").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const uf = document.getElementById("uf").value;
    const banco = document.getElementById("banco").value;

    if (nome && cpf && dataNascimento && cep && endereco && numero && bairro && cidade && uf && banco) {
        const objetoCadastro = {
            nome,
            cpf,
            dataNascimento,
            cpfResponsavel,
            email,
            celular,
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            uf,
            banco
        };

        console.log(objetoCadastro)

        let cadastros = JSON.parse(sessionStorage.getItem("cadastros")) || [];
        cadastros.push(objetoCadastro);
        sessionStorage.setItem("cadastros", JSON.stringify(cadastros));

        mensagem.classList.remove('none');
        mensagem.innerText = "Cadastro realizado com sucesso!";
        mensagem.style.color = "green";


        form.reset();
    } else {
        mensagem.classList.remove('none');
        mensagem.innerText = "Por favor, preencha todos os campos obrigatórios!";
        mensagem.style.color = "red";

    }
}
btnSave.addEventListener("click", salvarCadastro);

btnVizualizarCadastros.addEventListener('click', () => {
    window.location.href = "./pages/cadastros.html";
})