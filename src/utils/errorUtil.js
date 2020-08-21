const errorMessages = {
    429: "Muitas requisições ao servidor.",
    400: "Erro ao processar requisição.",
}

export const getErrorMessage = (code) => {
    return errorMessages[code] ? errorMessages[code] : 'Ocorreu um erro.';
}
