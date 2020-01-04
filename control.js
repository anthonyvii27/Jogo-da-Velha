var rodada = 1;
var matriz_jogo = Array(3);

matriz_jogo['a']=Array(3);
matriz_jogo['b']=Array(3);
matriz_jogo['c']=Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;

$(document).ready(function(){
    $('#btn_iniciar').click(function(){
        //Pegar os apelidos digitados
        var apelido_jogador_1 = $('#apelido_jogador_1').val();
        var apelido_jogador_2 = $('#apelido_jogador_2').val();

        if(apelido_jogador_1 == ''){
            alert('Insira um apelido válido para o Jogador 1');
            return false;
        }else if(apelido_jogador_2 == ''){
            alert('Insira um apelido válido para o Jogador 2');
            return false;
        }

        //Colocar os apelidos digitados
        $('#mostrar_apelido_jogador_1').html(apelido_jogador_1);
        $('#mostrar_apelido_jogador_2').html(apelido_jogador_2);

        //Controle de telas
        $('#initial_screen').hide();
        $('#game_screen').show();

        //Configuração inicial
        $('#contador_rodada').html('Rodada: '+ rodada);
        var apelido = $("#apelido_jogador_1").val();
        $('#vez_de').html('Vez de: ' + apelido);
    })    

    $('.posicao').click(function(){
        var id_posicao = this.id;
        $('#'+id_posicao).off();
        jogada(id_posicao);
    })

    function jogada(id){;
        var icone = '';
        var coordenada = id.split('-');
        if((rodada + 1) <= 9){
            $('#contador_rodada').html('Rodada: '+ (rodada + 1));
        }else{
            $('#contador_rodada').html('Fim do jogo!');
        }
        
        if((rodada % 2) == 1){
            var apelido = $("#apelido_jogador_2").val();
            $('#vez_de').html('Vez de: ' + apelido);
            matriz_jogo[coordenada[0]][coordenada[1]] = -1;
            icone = 'url("images/marcacao_1.png")';
        }else{
            var apelido = $("#apelido_jogador_1").val();
            $('#vez_de').html('Vez de: ' + apelido);
            matriz_jogo[coordenada[0]][coordenada[1]] = 1;
            icone = 'url("images/marcacao_2.png")';
        }

        $('#'+id).css('background-image', icone);
        rodada++;
        verificaCombinacao();
    }

    function verificaCombinacao(){
        //Horizontal
        var pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['a'][i];
        }
        ganhador(pontos);
        
        pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['b'][i];
        }
        ganhador(pontos);
        
        pontos = 0;
        for(var i = 1; i <= 3; i++){
            pontos = pontos + matriz_jogo['c'][i];
        }
        ganhador(pontos);
        
        //Vertical
        for(var l = 1; l <= 3; l++){
            pontos = 0;
            pontos += matriz_jogo['a'][l];
            pontos += matriz_jogo['b'][l];
            pontos += matriz_jogo['c'][l];
            ganhador(pontos);
        }
        
        //Diagonal
        pontos = 0;
        pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
        ganhador(pontos);   
        
        pontos = 0;
        pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
        ganhador(pontos);
    }

    function ganhador(pontos){
        if(pontos == 3){
            var apelido_vencedor = $("#apelido_jogador_2").val();
            alert("O jogador " + apelido_vencedor + " venceu o jogo!");
            $('#contador_rodada').html('Fim do jogo!');
            $('#vez_de').html(apelido_vencedor + ' venceu o jogo!');
            $('.posicao').off();
        }else if(pontos == -3){
            var apelido_vencedor = $("#apelido_jogador_1").val();
            alert("O jogador " + apelido_vencedor + " venceu o jogo!");
            $('#contador_rodada').html('Fim do jogo!');
            $('#vez_de').html(apelido_vencedor + ' venceu o jogo!');
            $('.posicao').off();
        } 
    }
})