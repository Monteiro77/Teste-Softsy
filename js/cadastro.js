'use strict'

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


const getIdade = async function () {
    const anoNascimento = document.getElementById('dataNascimento').value

    const idade = parseInt(getAge(anoNascimento));


    if (idade < 18) {
        const divResponsavelCpf = document.getElementById('responsavelCpf')
        const labelResponsavelCpf = document.getElementById('labelResponsavelCpf')
        const inputResponsavelCpf = document.getElementById('inputResponsavelCpf')
        divResponsavelCpf.classList.remove('none')
        labelResponsavelCpf.classList.remove('none')
        inputResponsavelCpf.classList.remove('none')
    }

    return idade

}

document.getElementById('dataNascimento').addEventListener('blur', getIdade)

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

document.getElementById('telefone').addEventListener('keyup', handlePhone)
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



//Funç~]ao para carregar os bancos
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
const form = document.getElementById("cadastroForm")
const btnSave = document.getElementById("salvar");
const btnVizualizarCadastros = document.getElementById("vizualizarCadastros");
const mensagem = document.getElementById("mensagem");

  btnSave.addEventListener("click", function(event) {
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

    // Validar campos obrigatórios
    if (nome && cpf && dataNascimento && cep && endereco && numero && bairro && cidade && uf) {
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

      // Salvar objeto na sessão do navegador
      let cadastros = JSON.parse(sessionStorage.getItem("cadastros")) || [];
      cadastros.push(objetoCadastro);
      sessionStorage.setItem("cadastros", JSON.stringify(cadastros));

      mensagem.innerText = "Cadastro realizado com sucesso!";
      mensagem.style.color = "green";

      // Limpar campos do formulário
      form.reset();
    } else {
      mensagem.innerText = "Por favor, preencha todos os campos obrigatórios!";
      mensagem.style.color = "red";
    }
  });

  btnVizualizarCadastros.addEventListener('click', () =>{
    window.location.href = "./pages/cadastros.html";
  })