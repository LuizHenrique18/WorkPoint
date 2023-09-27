function somar (valor1, valor2){
    let valorFormatado1 = String(valor1)
    let valorFormatado2 = String(valor2)

    let horasFormatados1 = valorFormatado1.slice(0, 2)
    let minutosFormatados1 = valorFormatado1.slice(3, 5)
    let segundosFormatados1 = valorFormatado1.slice(6, 8)

    let horasFormatados2 = valorFormatado2.slice(0, 2)
    let minutosFormatados2 = valorFormatado2.slice(3, 5)
    let segundosFormatado2 = valorFormatado2.slice(6, 8)

    let horasValor1 = parseInt(horasFormatados1, 10)
    let minutosValor1 = parseInt(minutosFormatados1, 10)
    let segundosValor1 = parseInt(segundosFormatados1, 10)

    let horasValor2 = parseInt(horasFormatados2, 10)
    let minutosValor2 = parseInt(minutosFormatados2, 10)
    let segundosValor2 = parseInt(segundosFormatado2, 10)

    
    let segundos = segundosValor1 + segundosValor2;
    let minutos = minutosValor1 + minutosValor2;
    let horas = horasValor1 + horasValor2;

    if(segundos > 60){
        segundos = segundos - 60;
        minutos++
    }else{
        console.log('Normal em segundos', segundos)
    }
    if(minutos > 60){
        minutos = minutos - 60
        horas++
    }else{
        console.log('Normal em minutos', minutos)
    }

    let horasFormatas = String(horas).padStart(2,'0')
    let minutosFormatados = String(minutos).padStart(2,'0')
    let segundosFormatados = String(segundos).padStart(2,'0')

    let tempoFormatado = `${horasFormatas}:${minutosFormatados}:${segundosFormatados}`
    return tempoFormatado

}

module.exports = somar