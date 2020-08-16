const numberFormats = {
    'pt-BR': {
        currency: {
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol"
        }
    }
}

const isCNPJ = (rule, value, callback) => {
    const digits = value.replace(/[\D]/gi, '')

    let dig1 = 0
    let dig2 = 0

    const validation = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]

    const digito = parseInt(digits.charAt(12) + digits.charAt(13))

    const getRest = dig => (((dig % 11) < 2) ? 0 : (11 - (dig % 11)))

    validation.map((v, i) => {
        dig1 += (i > 0 ? (digits.charAt(i - 1) * v) : 0)
        dig2 += digits.charAt(i) * v
    })

    dig1 = getRest(dig1)
    dig2 = getRest(dig2)

    const isValid = (((dig1 * 10) + dig2) === digito);

    if (isValid) {
        return callback();
    }
    return callback(new Error('Invalid CNPJ'));
};

const isCPF = (rule, cpf, callback) => {
    if (!cpf || cpf.length === '') callback(new Error('Invalid CPF'));

    const isInvalid = (cpf, rest, pos) => rest !== parseInt(cpf.substring(pos, pos + 1))

    const sumDigit = (cpf, digit) => 11 - (cpf.substring(0, digit).split('').reduce((acc, curr, index) => {
        acc += parseInt(curr) * ((digit + 1) - index)
        return acc
    }, 0) % 11)

    const getRest = sum => sum > 9 ? 0 : sum

    cpf = cpf.replace(/[\D]/gi, '')

    if (!cpf.match(/^\d+$/))
        return callback(new Error('Invalid CPF'));

    if (cpf === '00000000000' || cpf.length !== 11)
        return callback(new Error('Invalid CPF'));

    if (isInvalid(cpf, getRest(sumDigit(cpf, 9)), 9))
        return callback(new Error('Invalid CPF'));

    if (isInvalid(cpf, getRest(sumDigit(cpf, 10)), 10))
        return callback(new Error('Invalid CPF'));

    return callback();
};

const isCNPJorCPF = (r, v, cb) => {
    if (v === '') cb(new Error('Please input this field'));
    const cleaned = v.replace(/[\D]/gi, '');
    if (cleaned.length <= 11) {
        return isCPF(r, v, cb);
    } else {
        return isCNPJ(r, v, cb);
    }
};

export {
    numberFormats,
    isCPF,
    isCNPJ,
    isCNPJorCPF
}
