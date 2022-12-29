export function formataDataBanco(data) {
    //formata data de dd/mm/aaaa para aaaa-mm-dd pra enviar ao banco de dados
    if (typeof data !='undefined')
        return data.substring(6, 10)+'-'+data.substring(3, 5)+'-'+data.substring(0, 2)
}

export function formataData(data) {
    //formata data de aaaa-mm-dd para dd/mm/aaaa pra enviar ao banco de dados
    //também faz validação se a data está correta e se não é maior que a data atual
    if (data.length == 2) {
        data = data + '/'
    } else if (data.length == 5) {
        data = data + '/'
    }
    if (data.length > 10) {
        data = data.substring(0, 10)
    }
    if (data.length == 10) {
        //se o dia for maior que 28, verifica se é bissexto
        if (data.substring(0, 2) == 29) {
            if (data.substring(3, 5) == '02') {
                if (data.substring(6, 10) % 4 == 0) {
                    data = '29/02/' + data.substring(6, 10)
                } else {
                    data = '28/02/' + data.substring(6, 10)
                }
            }
        }
        //se o dia for maior que 31, verifica se o mês tem 31 dias
        if (data.substring(0, 2) > 31) {
            if (data.substring(3, 5) == '04' || data.substring(3, 5) == '06' || data.substring(3, 5) == '09' || data.substring(3, 5) == '11') {
                data = '30/' + data.substring(3, 5) + '/' + data.substring(6, 10)
            } else {
                data = '31/' + data.substring(3, 5) + '/' + data.substring(6, 10)
            }
        }
        //se o mês for maior que 12, setar o mês para 12
        if (data.substring(3, 5) > 12) {
            data = data.substring(0, 2) + '/' + '12' + '/' + data.substring(6, 10)
        }
        //se o ano for menor que 1900, setar o ano para 1900
        if (data.length == 10 && Number(data.substring(6, 10)) < 1900) {
            data = data.substring(0, 6)+'1900'
        }
        //se o ano for maior que o atual
        if (data.length == 10 && Number(data.substring(6, 10)) > new Date().getFullYear()) {
            data = data.substring(0, 6) + new Date().getFullYear()
        }
        //pegar timestamp da data
        let timestamp = new Date(formataDataBanco(data)).getTime()
        //pegar timestamp atual
        let timestampAtual = new Date().getTime()
        //verificar se a data é maior que a data atual
        if (timestamp > timestampAtual) {
            //dia atual
            let diaAtual = new Date().getDate()
            //adiciona zero a esquerda
            if (diaAtual < 10) {
                diaAtual = '0' + diaAtual
            }
            //mês atual
            let mesAtual = new Date().getMonth() + 1
            //adiciona zero a esquerda
            if (mesAtual < 10) {
                mesAtual = '0' + mesAtual
            }
            //ano atual
            let anoAtual = new Date().getFullYear()
            //formatar data atual
            data = diaAtual + '/' + mesAtual + '/' + anoAtual
        }
    }
    return data;
}


export function converterDataNascimento(data){
    data.forEach(element => {
        if (element.datanascimento!=='0000-00-00') {
            //formatar datanacimento em dd/mm/aaaa
            //verificar se a string tem -
            element.idade = 0;
            if (element.datanascimento.indexOf('-') > -1) {

                let dataNascimento=element.datanascimento

                let dia = dataNascimento.split('-')[2];
                let mes = dataNascimento.split('-')[1];
                let ano = dataNascimento.split('-')[0];
                element.datanascimento = dia + '/' + mes + '/' + ano;

                
                let anos = new Date().getFullYear() - new Date(dataNascimento).getFullYear();

                if (new Date().getMonth() < new Date(dataNascimento).getMonth()) {
                    anos--;
                } else if (new Date().getMonth() == new Date(dataNascimento).getMonth()) {
                    if (new Date().getDate() < new Date(dataNascimento).getDate()) {
                        anos--;
                    }
                }
                
                element.idade = anos;
            } else {
                element.datanascimento = 'Desconhecido';
            }

        } else {
            element.datanascimento = 'Desconhecido';
            element.idade = 0;
        }
    });
    return data;
}