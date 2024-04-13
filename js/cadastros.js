document.addEventListener("DOMContentLoaded", function() {
    const tabelaCadastros = document.getElementById("tabelaCadastros");
    const botaoVoltar = document.getElementById("voltar");
  
    // Função para carregar e exibir os cadastros salvos na sessão do navegador
    function exibirCadastros() {
      const cadastros = JSON.parse(sessionStorage.getItem("cadastros")) || [];
  
      if (cadastros.length === 0) {
        const linhaVazia = tabelaCadastros.insertRow();
        const cell = linhaVazia.insertCell();
        cell.textContent = "Nenhum cadastro encontrado.";
        cell.colSpan = 10;
        return;
      }
  
      cadastros.forEach(cadastro => {
        const linha = tabelaCadastros.insertRow();
        linha.insertCell().textContent = cadastro.nome;
        linha.insertCell().textContent = cadastro.cpf;
        linha.insertCell().textContent = cadastro.dataNascimento;
        linha.insertCell().textContent = cadastro.cep;
        linha.insertCell().textContent = cadastro.endereco;
        linha.insertCell().textContent = cadastro.numero;
        linha.insertCell().textContent = cadastro.bairro;
        linha.insertCell().textContent = cadastro.cidade;
        linha.insertCell().textContent = cadastro.uf;
        linha.insertCell().textContent = cadastro.banco ;
      });
    }
  
    exibirCadastros();
  
    botaoVoltar.addEventListener("click", function() {
      window.location.href = "../index.html";
    });
  });
  