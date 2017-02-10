// ************************************
//  JuanRa's Game: "Comer Sano"
//  Funciones principales
//  Jerez, a 01 de Febrero de 2017
// ************************************
//  Todos los derechos reservados
// ***********************************************************************************************************
// - presenta:  Una pequeña pantalla de presentación previa al juego. Al pulsar el el botón correspondiente,
//              el juego avanza al siguiente estado, a saber, al juego en sí.
// ***********************************************************************************************************

var presenta = function() {};

presenta.prototype = {

  preload: function() {
  },  // Fin Preload

  create: function() {

    // Coordenadas para la presentación de los carteles.
    centroX = this.game.world.centerX;
    centroY = this.game.world.centerY;
    centroY = centroY - Math.floor(centroY / 2);

    // Pintamos el fondo.
    fondo = this.game.add.sprite(0, 0, 'fondo');
    fondo.width = ancho;
    fondo.hight = alto;

    // Pintamos algunas frutas al azar.
    imagenes = this.game.add.sprite(this.game.rnd.integerInRange(0, centroX), centroY, 'fruta01');
    imagenes = this.game.add.sprite(this.game.rnd.integerInRange(centroX, ancho), centroY, 'fruta03');
    imagenes = this.game.add.sprite(this.game.rnd.integerInRange(0, centroX), centroY + 150, 'fruta04');
    imagenes = this.game.add.sprite(this.game.rnd.integerInRange(centroX, ancho), centroY + 150, 'fruta06');
    imagenes.anchor.setTo(0.5);

    // Pintamos el título del juego y lo adornamos.
    decora = this.game.add.graphics();
    decora.beginFill(0x000000, 0.2);
    decora.drawRect(0, centroY, ancho, 200);
    titulo = this.game.add.text(0, 0, 'Come Sano', estNormal);
    titulo.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    titulo.setTextBounds(0, centroY, ancho, 200);

    // Añadimos un botón de ayuda y la función a la que irá.
    var decora1 = this.game.add.graphics();
    decora1.beginFill(0xCC00FF, 0.3);
    decora1.drawRoundedRect(this.game.world.centerX - 120, alto - 250, 40 * 6, 90);
    decora1.anchor.setTo(0.5);
    etiayuda = this.game.add.text(this.game.world.centerX, alto - 200, 'Ayuda', estBoton);
    etiayuda.inputEnabled = true;
    etiayuda.anchor.setTo(0.5);
    etiayuda.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
    etiayuda.events.onInputUp.add(this.vamosAyuda);
    // Añadimos un botón para ir al juego y la función a la que irá.
    decora1.drawRoundedRect(this.game.world.centerX - 140, alto - 150, 40 * 7, 90);
    decora1.anchor.setTo(0.5);
    etiajugar = this.game.add.text(this.game.world.centerX, alto - 100, 'A Jugar', estBoton);
    etiajugar.inputEnabled = true;
    etiajugar.anchor.setTo(0.5);
    etiajugar.setShadow(5, 5, 'rgba(0,0,0,0.5)', 15);
    etiajugar.events.onInputUp.add(this.vamosAJugar);

  },  // Fin Create

  vamosAJugar: function() {

    // Pasamos al juego propiamente dicho.
    sonboton.play();
    this.game.state.start('ElJuego');

  },

  vamosAyuda: function() {

    // Pasamos a la pantalla de ayuda de la aplicación.
    sonboton.play();
    this.game.state.start('Ayuda');

  }

} // Fin prototype
// ***********************************************************************************************************
