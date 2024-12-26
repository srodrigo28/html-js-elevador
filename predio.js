(function() {
    // ---------Pavimentos--------- //
    function criarTerreo(){
        const janela = document.createElement('div')
        janela.classList.add('janela')

        const terreo = document.createElement('div')
        terreo.setAttribute('andar', 't')
        terreo.classList.add('terreo')
        terreo.appendChild(janela)

        return terreo
    }

    function criarAndar(numero){
        const porta = document.createElement('div')
        porta.classList.add('porta')

        const andar = document.createElement('div')
        andar.setAttribute('andar', numero)
        andar.classList.add('andar')
        andar.appendChild(porta)

        return andar
    }

    (function criarPavimento(){
        const elementosComAndares = document.querySelectorAll('[andares]')
        elementosComAndares.forEach( elComAndares => {
            const qtde = +elComAndares.getAttribute('andares')
            for( let i=qtde;  i > 0; i-- ){
                elComAndares.appendChild(criarAndar(i))
            }
            elComAndares.appendChild(criarTerreo())
        })
    })()
    
    function obterTamanhoElevador(){
        const terreo = document.querySelector('[andar="t"]')
        // console.log(terreo.clientHeight)
        // console.log(terreo.offsetHeight)
        return terreo.offsetHeight
    }

    // ---------Elevador--------- //
    (function criarElevador(){
        const poco = document.querySelector('.poco')
        
        const elevador = document.createElement('div')
        elevador.classList.add('elevador')
        
        elevador.style.height = obterTamanhoElevador() + "px"; // PERCEBA
        poco.appendChild(elevador)
    })()
    // obterTamanhoElevador()

    function obterPosicaoAtual(){
        const elevador = document.querySelector('.elevador')
        // console.log(elevador.style.bottom.replace('px', '')) // PERCEBA
        // console.log(elevador.style.bottom.replace(/\D/g, '')) // PERCEBA
        return +elevador.style.bottom.replace(/\D/g, '') // PERCEBA
    }

    function atualizarMostrador(texto){
        const mostrador = document.querySelector('.mostrador')
        mostrador.innerHTML = texto;
    }

    function moverElevadorPara(andar){
        const numero = andar === 't' ? 0 : +andar
        const elevador = document.querySelector('.elevador')
        
        // elevador.style.bottom = obterPosicaoAtual() + 277 + 'px'
        // return elevador.style.bottom = obterPosicaoAtual() + (numero * obterTamanhoElevador()) + 'px'
        // console.log(elevador.style.bottom = obterPosicaoAtual() + 177 + 'px')
        
        const posicaoInicial = obterPosicaoAtual()
        const posicaoFinal = numero * obterTamanhoElevador()
        const subindo = posicaoFinal > posicaoInicial

        atualizarMostrador(subindo  ? 'Subindo' : `Descendo`)

        let temporizador = setInterval( () => {
            const novaPosicao = obterPosicaoAtual() + (subindo ? 15 : -15)
            const terminou = subindo ? novaPosicao >= posicaoFinal : novaPosicao <= posicaoFinal
            elevador.style.bottom = terminou ? posicaoFinal : novaPosicao + 'px'
            if(terminou){
                clearInterval(temporizador)
                atualizarMostrador(andar == 't' ? 'Térreo' : `${andar} Andar `)
            }
        }, 100)

    }
    (function aplicarControleDoElevador(){
        const botoes = document.querySelectorAll('[destino]')
        botoes.forEach( botao => {
            const destino = botao.getAttribute('destino')
            botao.onclick = function(){
                moverElevadorPara(destino)
            }
        })
    })()
})()