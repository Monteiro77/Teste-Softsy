'use strict'

export const pesquisarCep = async function(cepPesquisa){
    const url = `https://viacep.com.br/ws/${cepPesquisa}/json/`
    const response = await fetch(url)
    const data = await response.json()

    return {
        logradouro: data.logradouro,
        bairro: data.bairro,
        municipio: data.localidade,
        estado: data.uf
    }
}
