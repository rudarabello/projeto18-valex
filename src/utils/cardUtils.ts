import dayjs from 'dayjs';

export function cardName(nome: string) {
    const nome2 = nome.split(' ');
    const nome3: string[] = [];

    for (let i = 0; i < nome2.length; i++) {
        if (i === 0) nome3.push(nome2[i].toUpperCase())
        if (i !== 0 && i !== nome2.length - 1) {
            if (nome2[i].length >= 3) {
                nome3.push(nome2[i][0].toUpperCase())
            }
        }
        if (i === nome2.length - 1) nome3.push(nome2[i].toUpperCase())
    }
    return nome3.join(' ')
}


export function generateDate() {
    const date = dayjs(Date.now(), 'dd/mm/yyyy').format('MM/YY');
    const expireDate = (Number(date[date.length - 2] + date[date.length - 1]) + 5).toString();

    return date.slice(0, -2) + expireDate;
}