// ************************************
//  JuanRa's Game: "Comer Sano"
//  Funciones principales
//  Jerez, a 01 de Febrero de 2017
// ************************************
//  Todos los derechos reservados
// ***********************************************************************************************************
// - eljuego:   Como su nombre indica es donde están definidas toda la funcionalidad del juego.
//              El juego consiste en ir recogiendo toda la comida sana que veas (frutas) las cuales te darán
//              puntos, pero si recoges mala comida (comida rápida), hará que tu suelo se vaya elevando, y si
//              llegas hasta el techo serrado, el juego concluirá.
//              Hay un icono especial, 'Comunicados' que te dará más puntos y te alejará del techo serrado.
// ***********************************************************************************************************

var eljuego = function() {};

eljuego.prototype = {

  preload: function() {
  },  // Fin Preload

  create: function()  {

    // Pintamos los distintas dibujos.
    // - fondo.
    fondo = this.game.add.sprite(0, 0, 'fondo');
    fondo.width = ancho;
    fondo.hight = alto;
    nubes = this.game.add.sprite(0, 0, 'nubes');
    // - suelo.
    suelo = this.game.add.sprite(0, alto - ALTO_SUELO, 'suelo');
    suelo.width = ancho;
    // - techo serrado.
    techo = this.game.add.sprite(0, final - 15, 'techo');
    techo.width = ancho;

    if (ancho > ANCHO_CIUDAD) {
    // skyline de la ciudad.
      nposX = Math.floor(Math.abs(ancho - ANCHO_CIUDAD) / 2);
    }
    else {
      nposX = 0;
    }
    nposY = (Math.abs(alto - ALTO_CIUDAD - ALTO_SUELO));
    scity = this.game.add.sprite( nposX, nposY, 'scity');
    // - jugador.
    jugador = this.game.add.sprite( 45, posjugador, 'jugador');
    jugador.anchor.setTo(.5,.5);
    // y lo animamos.
    jugador.animations.add('left', [0, 1, 2], 10, true);
    jugador.animations.add('right', [4, 5, 6], 10, true);
    jugador.animations.play('right');

    // - Agrupamos las frutas.
    allfrutas = this.game.add.group();

    // Añadimos la física.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    // Preparamos los colisiones estre figuras.
    this.game.physics.arcade.enable(jugador);
    this.game.physics.arcade.enable(suelo);

    // Evitamos que el jugador se nos salga por los lados.
    jugador.body.collideWorldBounds = true;

    // Y ajustamos la colisión del jugador para que sea un poco más centrado.
    jugador.body.setSize(jugador.width -10, jugador.height - 5, 0, 0);

    // Velocidad de bajada para las frutas.
    this.game.gravedadFrutas = 100;

    // Pintamos la puntuación.
    txtpuntuacion = this.game.add.text(25, 16, LIT_PUNTOS + puntuacion, estMarcador);

    // y el nivel actual.
    txtnivel = this.game.add.text(25, 40, LIT_NIVELES + niveles, estMarcador);

    // Creamos un eveto para liberar frutas.
    this.game.time.events.loop(Phaser.Timer.HALF * 2, this.creaLasFrutas, this);

    // Creamos un evento para pausar el juego.
    pause_label = this.game.add.text(ancho - 140, alto -80, LIT_PAUSA, estPausar);
    pause_label.inputEnabled = true;
    pause_label.events.onInputUp.add(this.pausarJuego);

    // Definimos los sonidos que usamos.
    sonfruta = this.game.add.audio('musfruta');
    sonfinal = this.game.add.audio('musfinal');
    sontecho = this.game.add.audio('mustecho');
    soncomunica2 = this.game.add.audio('muscomunica2');

    // Añadimos control por movimiento del dispositivo.
    window.addEventListener('deviceorientation', this.movimiento, true);

  },  // Fin Create

  pausarJuego: function () {

    if (game.paused) {
      game.paused = false;
      pause_label.text = LIT_PAUSA;
    }
    else {
      game.paused = true;
      pause_label.text = LIT_JUGAR;
      this.game.input.onTap.add(this.pausarJuego);
    }

  },

  creaLasFrutas: function () {

    //  Solo sacamos frutas mientras no haya finalizado el juego.
    if (!swFin) {
      var totfrutas = Math.floor(niveles/2) + 1;
      for (var i = 0; i < totfrutas; i++) {
        // Generamos frutas aleatorias que empiezan a caer.
        txtfruta = this.obtenerLitFrutasOtros();
        fruta = allfrutas.create(this.inicioX(), (this.numeroAleatorioHasta(100) - 200), txtfruta);
        this.game.physics.arcade.enable(fruta);
        fruta.body.gravity.y = this.game.gravedadFrutas;
      }
    };
  },

  update: function () {

    // Qué hacer cuando chocan la comida con el jugador o caen contra el suelo.
    this.game.physics.arcade.overlap(suelo, allfrutas, this.caeFruta, null, this);
    this.game.physics.arcade.overlap(jugador, allfrutas, this.cogeFruta, null, this);

  },  // Fin Update

  movimiento: function(e) {

    if (!swFin) {
      // Orientación
      var x = e.gamma; // range [-90,90], left-right
      var y = e.beta;  // range [-180,180], top-bottom
      var z = e.alpha; // range [0,360], up-down
      jugador.body.velocity.x += x;
      if (x < 0) {
        jugador.animations.play('left');
      }
      else {
        jugador.animations.play('right');
      };
    }
  },  // Fin Movimiento

  caeFruta: function(suelo, allfrutas) {

    // Desaparecemos el objeto y decrementamos el contador con el número de frutas cayendo.
    allfrutas.kill();

  },  // Fin CaeFruta

  cogeFruta: function(jugador, allfrutas) {

    // Si encuentro "frutas" incremento la puntuación porque ha cogido una fruta.
    if (this.esFruta(allfrutas.frameName) > 0) {
      // pero si además es la especial 'Comunicados', la puntuación aunmenta.
      // y alejamos al jugador del techo serrado.
      if (this.esComunica2(allfrutas.frameName) > 0) {
        puntuacion += 25;
        soncomunica2.play();
        if (jugador.y < posjugador) {
          suelo.y += pixdecre;
          scity.y += pixdecre;
          jugador.y += pixdecre;
        }
      }
      else {
        puntuacion += 5;
        sonfruta.play();
      };
      if ( puntuacion%100 < 1 ) {
        niveles += 1;
        txtnivel.setText(LIT_NIVELES + niveles);
        this.game.gravedadFrutas *= 1.2;
      };
    }
    else {
      // Si hemos tocado una comida mala, subimos al jugador-suelo-ciudad.
      sontecho.play();
      suelo.y -= pixdecre;
      scity.y -= pixdecre;
      jugador.y -= pixdecre;
      if (jugador.y < final) {
        // Ya no se va controlar nada más.
        sonfinal.play();
        swFin = true;
        jugador.body.enable = false;
        fruta.body.enable = false;
        allfrutas.body.enable = false;
        allfrutas.body.gravity.y = 0;
        jugador.animations.stop();
        jugador.frame = 3;
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.finjuego, this);
      };
    }
    allfrutas.kill();

    //contaFrutas -= 1;
    txtpuntuacion.setText(LIT_PUNTOS + puntuacion);

  },  // Fin CogeFruta

  esFruta: function(strimg) {

    var npos = strimg.indexOf('frutas');
    return(npos);

  },  // Fin esFruta

  esComunica2: function(strimg) {

    var npos = strimg.indexOf('comunica2');
    return(npos);

  },  // Fin esComunica2

  obtenerLitFrutasOtros: function() {

    var strLit = 'fruta06';
    if (this.numeroAleatorioHasta(5)>2) {
      // Fruta
       strLit = 'fruta0' + (this.numeroAleatorioHasta(TOTAL_IMGFRUTAS) + 1);
    }
    else {
      // Otro
      strLit = 'otros0' + (this.numeroAleatorioHasta(TOTAL_IMGOTROS) + 1);
    };
    return (strLit);

  },  // Fin ObtenerLitFrutasOtros

  numeroAleatorioHasta: function(limite) {

    return Math.floor(Math.random() * limite);

  },  // Fin numeroAleatorioHasta

  inicioX: function() {

    return this.numeroAleatorioHasta(ancho - ANCHO_FRUTAS );

  },  // Fin InicioX

  finjuego: function() {

    // Una vez acabado el juego, presentamos la pantalla final.
    this.game.state.start('ElFinal');

  }  // Fin finjuego

} // Fin prototype
// ***********************************************************************************************************
