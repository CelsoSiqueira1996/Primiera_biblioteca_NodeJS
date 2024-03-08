import chalk from "chalk";

function extraiLinks(arrLinks) {
    const links = arrLinks.map((objetoLink) => Object.values(objetoLink).join());
    return links;
}

async function checaStatus(listaURLs) {
    const arrStatus = await Promise.all(
        listaURLs.map(async (url) => {
            try {
                const response = await fetch(url, {method: 'HEAD'});
                return `${response.status} - ${response.statusText}`;
            } catch(erro) {
                return manejaErros(erro);
            }
        })
    ); 
    return arrStatus;
}

function manejaErros(erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado'
    } else {
        return 'ocorreu algum erro';
    }
}

export default async function listaValidada(listaDeLinks) {
    if(listaDeLinks === 'Não existem links no arquivo.'){
        return 'Não existem links no arquivo.';
    }
    const links = extraiLinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((objeto, indice) => {
        return {
            ...objeto,
            status: status[indice]
        }
    });
}

