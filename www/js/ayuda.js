// ************************************
//  JuanRa's Game: "Comer Sano"
//  Funciones principales
//  Jerez, a 01 de Febrero de 2017
// ************************************
//  Todos los derechos reservados
// ***********************************************************************************************************
// - ayuda:     Se explica el uso del juego y el significado de cada icono.
// ***********************************************************************************************************

var ayuda = function() {};

ayuda.prototype = {

  preload: function() {
  },  // Fin Preload

  create: function() {

    // Coordenadas para la presentación de los carteles.
    centroX = this.game.world.centerX;
    centroX = centroX - Math.floor(centroX / 3 * 2);
    centroY = this.game.world.centerY;
    centroY = centroY - Math.floor(centroY / 3 * 2);

    // Pintamos el fondo.
    fondo = this.game.add.sprite(0, 0, 'fondo');
    fondo.width = ancho;
    fondo.hight = alto;

    // Pintamos el título del juego y lo adornamos.
    decora = this.game.add.graphics();
    decora.beginFill(0x000000, 0.2);
    decora.drawRect(0, centroY, ancho, 200);
    titulo = this.game.add.text(0, 0, 'Come Sano', estNormal);
    titulo.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    titulo.setTextBounds(0, centroY, ancho, 200);

    // Pintamos la ayuda del juego.
    centroY = Math.floor(alto / 2);
    imagenes1 = this.game.add.sprite(centroX, centroY , 'ifrutas');
    imagenes2 = this.game.add.sprite(centroX, centroY + 60, 'iotros');
    imagenes3 = this.game.add.sprite(centroX, centroY + 120, 'comunica2');
    imagenes4 = this.game.add.sprite(centroX, centroY + 180 + 14, 'techo');
    imagenes4.width = imagenes1.width;
    // y sus textos.
    if (ancho > (imagenes1.width * 2)) {
      textos = game.add.text(centroX + imagenes1.width + 10, centroY, '¡¡ Buena Comida !!', estAyuda);
      textos = game.add.text(centroX + imagenes1.width + 10, centroY + 60, '¡¡ Mala Comida !!', estAyuda);
      textos = game.add.text(centroX + imagenes1.width + 10, centroY + 120, '¡¡ La Mejor !!', estAyuda);
      textos = game.add.text(centroX + imagenes1.width + 10, centroY + 180, '¡¡ No Tocar !!', estAyuda);
    }
    else {
      imagenes = this.game.add.sprite(centroX + imagenes1.width + 10, centroY, 'icobien');
      imagenes = this.game.add.sprite(centroX + imagenes1.width + 10, centroY + 60, 'icomal');
      imagenes = this.game.add.sprite(centroX + imagenes1.width + 10, centroY + 120, 'icobien');
      imagenes = this.game.add.sprite(centroX + imagenes1.width + 10, centroY + 180, 'icomal');
    };

    // Añadimos un botón para volver a la pantalla principal.
    var decora1 = this.game.add.graphics();
    decora1.beginFill(0xCC00FF, 0.3);
    decora1.drawRoundedRect(this.game.world.centerX - 100, alto - 100, 40 * 5, 90);
    decora1.anchor.setTo(0.5);
    etivolver = this.game.add.text(this.game.world.centerX, alto - 50, 'Volver', estBoton);
    etivolver.inputEnabled = true;
    etivolver.anchor.setTo(0.5);
    etivolver.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
    etivolver.events.onInputUp.add(this.vamosVolver);

  },  // Fin Create

  vamosVolver: function() {

    // Pasamos a la pantalla principal de la aplicación.
    sonboton.play();
    this.game.state.start('Presenta');

  }

} // Fin prototype
// ***********************************************************************************************************
