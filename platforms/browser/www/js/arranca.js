// ************************************
//  JuanRa's Game: "Comer Sano"
//  Funciones principales
//  Jerez, a 01 de Febrero de 2017
// ************************************
//  Todos los derechos reservados
// ***********************************************************************************************************
// - arranca:   Se encarga de preparar el juego y la inclinación del disposotivo, ya que se recomienda su uso
//              en modo vertical, aunque puede jugarse en horizontal, pero el juego está pensado para un modo
//              vertical.
//              También aquí se define un evento para que cuando se gire el dispositivo y se posicione en modo
//              horizontal avise con un mensaje de advertencia al jugador.
// ***********************************************************************************************************

var arranca = function() {};

arranca.prototype = {

  preload: function() {

    // Cargamos las imágenes primeras.
    this.game.load.image('aviso', 'img/rotar.png');
    this.game.load.image('presenta', 'img/presenta.png');
    this.game.load.image('barra', 'img/plataforma.png');
    // y una música.
    this.game.load.audio('musboton','music/boton.mp3');
    this.game.load.audio('musfinal','music/final.mp3');

  },  // Fin Preload

  create: function() {

    //Pintamos el mensaje para girar la pantalla, centrada y cerca del final de la pantalla (alto).
    fondo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'aviso');
    fondo.anchor.setTo(0.5);

    // Añadimos un botón para continuar.
    etiseguir = this.game.add.text(this.game.world.centerX, alto - 150, 'Continuar', estBoton);
    etiseguir.inputEnabled = true;
    etiseguir.anchor.setTo(0.5);
    etiseguir.events.onInputUp.add(this.vamosSeguir);

    // Cargamos la música.
    sonboton = this.game.add.audio('musboton');
    
    // Por si nos cambian la orientación del dispositivo.
    window.addEventListener("orientationchange", this.orientacionCambiada, true);

  },  // Fin Create

  vamosSeguir: function() {
    sonboton.play();
    this.game.state.start('PreCarga');
  },

  orientacionCambiada: function() {

    if (Math.abs(window.orientation)===90) {
      alert('Al cambiar la orientación de la pantalla\nel juego no funcionará correctamente.\n\nPor favor, téngalo en cuenta. Gracias.');
    }
  }

} // Fin Prototype
// ***********************************************************************************************************
