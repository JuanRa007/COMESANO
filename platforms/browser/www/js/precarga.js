// ************************************
//  JuanRa's Game: "Comer Sano"
//  Funciones principales
//  Jerez, a 01 de Febrero de 2017
// ************************************
//  Todos los derechos reservados
// ***********************************************************************************************************
// - precarga:  Se realiza la carga de las imágenes del juego y se muestra una pequeña barra de progreso.
// ***********************************************************************************************************

var precarga = function() {};

precarga.prototype = {

  preload: function() {

    // Presentamos una barra de carga de las imágenes: icnoco
    avisar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'presenta' );
    avisar.anchor.setTo(0.5);
    // y la barra.
    leyendo = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'barra');
    leyendo.anchor.setTo(0.5);
    this.load.setPreloadSprite(leyendo);

    // Cargamos imágenes usadas como fondo.
    this.game.load.image('fondo', 'img/cielo.png');
    this.game.load.image('nubes', 'img/nubes.png');
    this.game.load.image('scity', 'img/skyline.png');
    this.game.load.image('suelo', 'img/plataforma.png');
    this.game.load.image('techo', 'img/techo.png');

    // Cargamos las frutas.
    this.game.load.image('fruta01', 'img/frutas/manzana.png');
    this.game.load.image('fruta02', 'img/frutas/platano.png');
    this.game.load.image('fruta03', 'img/frutas/fresa.png');
    this.game.load.image('fruta04', 'img/frutas/cereza.png');
    this.game.load.image('fruta05', 'img/frutas/naranja.png');
    this.game.load.image('fruta06', 'img/frutas/pera.png');
    this.game.load.image('fruta07', 'img/frutas/comunica2.png');

    // y cargamos los otros.
    this.game.load.image('otros01', 'img/otros/hamburguesa.png');
    this.game.load.image('otros02', 'img/otros/helado.png');
    this.game.load.image('otros03', 'img/otros/pincho.png');
    this.game.load.image('otros04', 'img/otros/pizza.png');

    // y cargamos también los conjuntos.
    this.game.load.image('ifrutas', 'img/frutas/todosp.png');
    this.game.load.image('iotros', 'img/otros/todosp.png');
    this.game.load.image('comunica2', 'img/frutas/comunica2p.png');

    // y para la ayuda.
    this.game.load.image('icobien', 'img/icoBien.png');
    this.game.load.image('icomal', 'img/icoMal.png');

    // y cargamos la figura del jugador
    this.game.load.spritesheet('jugador', 'img/jugador.png', 48, 45);

    // y cargamos la música y sonidos del juego.
    this.game.load.audio('musfruta','music/fruta.wav');
    this.game.load.audio('muscomunica2','music/comunica2.wav');
    this.game.load.audio('mustecho','music/techo.wav');

  },  // Fin Preload

  create: function() {

    // Una vez cargadas las imágnes, pasamos a la pantalla principal del juego.
    this.game.state.start('Presenta');

  }  // Fin Create

} // Fin Prototype
// ***********************************************************************************************************
