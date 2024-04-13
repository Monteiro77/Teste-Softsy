'use strict'

export const getBancos = async function() {
    const url =  `https://brasilapi.com.br/api/banks/v1`;
    const response = await fetch(url);
    const data = await response.json();

    // Mapeia os dados para um array de objetos com as propriedades name e code
    const bancos = data.map(banco => ({
        name: banco.name,
        code: banco.code
    }));

    return bancos;
}
