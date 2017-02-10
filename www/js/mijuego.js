// ************************************
//  JuanRa's Game: "Comer Sano"
//  Funciones principales
//  Jerez, a 01 de Febrero de 2017
// ************************************
//  Todos los derechos reservados
// ***********************************************************************************************************
// - mijuego:   Se definen las variables principales del juego así como los distintos estados del mismo.
// ***********************************************************************************************************

// Variables CONSTANTES.
var ANCHO_FRUTAS = 65;
var TOTAL_IMGFRUTAS = 7;
var TOTAL_IMGOTROS = 4;
var ANCHO_CIUDAD = 767;
var ALTO_CIUDAD = 194;
var ALTO_SUELO = 10;
var LIT_PUNTOS = 'Puntos: ';
var LIT_NIVELES = 'Nivel: ';
var LIT_PUNTUACION = 'Puntuación: ';
var LIT_PAUSA = 'Pausar';
var LIT_JUGAR = 'Jugar';

// Variables propias del juego.
var game;
var alto  = document.documentElement.clientHeight;
var ancho = document.documentElement.clientWidth;
var fondo;
var nubes;
var techo;
var suelo;
var scity;
var jugador;
var fruta;
var allfrutas;
var txtfruta;
var nposX;
var nposY;
var etiseguir;
var etiayuda;
var etiajugar;
var etivolver;
var leyendo;
var avisar;
var imagenes;
var centroX;
var centroY;
var decora;
var titulo;
var titpuntua;
var imagenes1;
var imagenes2;
var imagenes3;
var imagenes4;
var txtpuntuacion;
var txtnivel;

var pause_label;
var swPausa = false;

// Variables para Juego.
var puntuacion = 0;
var swFin = false;
var posjugador = alto - 32;
var final = Math.floor(60*alto/100);
var pixdecre = 10;
var niveles = 1;
var maxpuntuacion = 0;

// Sonidos.
var sonfruta;
var sonfinal;
var sontecho;
var soncomunica2;
var sonboton;

// Estilos de letras.
var estNormal   = { font: 'bold 48px Pangolin', fill: '#fff', boundsAlignH: 'center', boundsAlignV: 'middle' };
var estBoton    = { font: 'bold 36px Revalia', fill: '#eee', boundsAlignH: 'center', boundsAlignV: 'middle' };
var estAyuda    = { font: '28px Revalia', fill: '#eee', boundsAlignH: 'left', boundsAlignV: 'middle' };
var estPuntua   = { font: '28px Revalia', fill: '#a80703', align: 'center'};
var estPuntuaR   = { font: '28px Revalia', fill: '#a80703', align: 'center', strokeThickness:5};
var estMarcador = { font: '24px Revalia', fill: '#000' };
var estPausar   = { font: '24px Revalia', fill: '#ddd', strokeThickness:5 };

// Inicio Juego.
function aJugar() {

    game = new Phaser.Game(ancho, alto, Phaser.CANVAS, 'mijuego');
    game.state.add('Arranca', arranca);
    game.state.add('PreCarga', precarga);
    game.state.add('Presenta', presenta);
    game.state.add('ElJuego', eljuego);
    game.state.add('ElFinal', elfinal);
    game.state.add('Ayuda', ayuda);
    game.state.start('Arranca');

};  // Fin Juego.

// Proceso Principal
if ('addEventListener' in document) {
    document.addEventListener('deviceready', function() {
        aJugar();
    }, false);
}  // Fin Proceso Principal
// ***********************************************************************************************************
