// ************************************
//  JuanRa's Game: "Comer Sano"
//  Funciones principales
//  Jerez, a 01 de Febrero de 2017
// ************************************
//  Todos los derechos reservados
// ***********************************************************************************************************
// - elfinal:   Cuando concluye el juego porque has llegado hasta el techo serrado, y tras un breve momento,
//              se presentará esta pantalla donde se informa de la putuación obtenida.
//              Si pulsamos sobre el botón que se muestra, podremos volver a jugar, pasando al estado de
//              presentación.
// ***********************************************************************************************************

var elfinal = function() {};

elfinal.prototype = {

  preload: function() {
  },  // Fin Preload

  create: function() {

    // Coordenadas para la presentación de los carteles.
    centroX = this.game.world.centerX;
    centroY = this.game.world.centerY - 150;

    // Pintamos el fondo.
    fondo = this.game.add.sprite(0, 0, 'fondo');
    fondo.width = ancho;
    fondo.hight = alto;

    // Pintamos el título del juego y lo adornamos.
    decora = this.game.add.graphics();
    decora.beginFill(0x000000, 0.2);
    decora.drawRect(0, centroY, ancho, 200);
    titulo = this.game.add.text(0, 0, 'Game\nOver', estNormal);
    titulo.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    titulo.setTextBounds(0, centroY, ancho, 200);

    // Pintamos la puntuación obtenida.
    titpuntua = this.game.add.text(centroX, centroY + 240, LIT_PUNTUACION + puntuacion, estPuntua);
    titpuntua.anchor.setTo(0.5);

    // Añadimos un botón para volver a la pantalla principal.
    var decora1 = this.game.add.graphics();
    decora1.beginFill(0xCC00FF, 0.3);
    decora1.drawRoundedRect(this.game.world.centerX - 160, alto - 100, 40 * 8, 90);
    decora1.anchor.setTo(0.5);
    etivolver = this.game.add.text(this.game.world.centerX, alto - 50, 'Continuar', estBoton);
    etivolver.inputEnabled = true;
    etivolver.anchor.setTo(0.5);
    etivolver.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
    etivolver.events.onInputUp.add(this.vamosContinuar);

  },  // Fin Create

  vamosContinuar: function() {

    // Inicializamos algunas varialbes básicas.
    puntuacion = 0;
    niveles = 1;
    swFin = false;
    this.game.gravedadFrutas = 100;

    // Volvemos al comienzo del juego.
    sonboton.play();
    this.game.state.start('Presenta');
  }

} // Fin prototype
// ***********************************************************************************************************
