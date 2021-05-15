var frame = window.requestAnimationFrame ||
		    		window.mozRequestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.msRequestAnimationFrame;

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let controles = document.getElementById('controles');
let puntaje = document.getElementById('puntaje');
let next = document.getElementById('siguiente-pieza');
let pause = document.getElementById('pause');
let mejor = document.getElementById('mejorPuntaje');
let mensaje = document.getElementById('mensajeEmergente');
let gameSize = document.getElementById('gameArea');

let bucle;

let jugador = {
	nombre: 'David',
	best: 0,
	newBest: (newScore)=>{
		console.log(newScore);
		if (newScore>=jugador.best) {
			jugador.best = newScore;
		}
		mejor.innerHTML = ''+jugador.best;
	}
}
let ancho = gameSize.clientWidth*0.75;
let alto = gameSize.clientHeight;
let datos = {
	puntos: 0,
	altoCanvas : ancho*1.9,
	anchoCanvas: ancho,
	anchoFicha: ancho/10,
	altoFicha: ((ancho*1.9)/19),
	fotograma: 0,
	velocidad: 2,
	margenSuperior: 4,
	anchoTablero: 10,
	altoTablero: 20,
	pause: false
}
console.log(datos);

let colores = ['#39ff14','#c600eb', '#ffff05', '#05ffa6', '#bc13fe', '#fe0002', '#fe019a'];


let ficha = new Ficha();

let pantalla = [
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
];
let pantallaVacia = [
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
];
let graficasFichas = [
	//cuadro
	[
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [0,1,1,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [0,1,1,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [0,1,1,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [0,1,1,0],
	 	  [0,0,0,0]
		]
	],
	//linea
	[
		[
			[0,1,0,0],
	 	  [0,1,0,0],
	 	  [0,1,0,0],
	 	  [0,1,0,0]
		],
		[
			[0,0,0,0],
	 	  [1,1,1,1],
	 	  [0,0,0,0],
	 	  [0,0,0,0]
		],
		[
			[0,1,0,0],
	 	  [0,1,0,0],
	 	  [0,1,0,0],
	 	  [0,1,0,0]
		],
		[
			[0,0,0,0],
	 	  [1,1,1,1],
	 	  [0,0,0,0],
	 	  [0,0,0,0]
		]
	],
	//z
	[
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [0,0,1,1],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,0,1,0],
	 	  [0,1,1,0],
	 	  [0,1,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [0,0,1,1],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,0,1,0],
	 	  [0,1,1,0],
	 	  [0,1,0,0]
		]
	],
	//s
	[
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [1,1,0,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,0,0],
	 	  [0,1,1,0],
	 	  [0,0,1,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,1,0],
	 	  [1,1,0,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,0,0],
	 	  [0,1,1,0],
	 	  [0,0,1,0]
		]
	],
	//T
	[
		[
			[0,0,0,0],
	 	  [0,1,0,0],
	 	  [1,1,1,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,0,0],
	 	  [0,1,1,0],
	 	  [0,1,0,0]
		],
		[
			[0,0,0,0],
	 	  [1,1,1,0],
	 	  [0,1,0,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,0,0],
	 	  [1,1,0,0],
	 	  [0,1,0,0]
		]
	],
	//l
	[
		[
			[0,1,0,0],
	 	  [0,1,0,0],
	 	  [0,1,1,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [1,1,1,0],
	 	  [1,0,0,0],
	 	  [0,0,0,0]
		],
		[
			[0,1,1,0],
	 	  [0,0,1,0],
	 	  [0,0,1,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,1],
	 	  [0,1,1,1],
	 	  [0,0,0,0],
	 	  [0,0,0,0]
		]
	],
	//J
	[
		[
			[0,0,1,0],
	 	  [0,0,1,0],
	 	  [0,1,1,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,0,0],
	 	  [0,1,1,1],
	 	  [0,0,0,0]
		],
		[
			[0,1,1,0],
	 	  [0,1,0,0],
	 	  [0,1,0,0],
	 	  [0,0,0,0]
		],
		[
			[0,0,0,0],
	 	  [0,1,1,1],
	 	  [0,0,0,1],
	 	  [0,0,0,0]
		]
	],
];
let puntos = 0;
let velocidad = 0;

let juego = {
	contol: ()=>{controles.addEventListener('click', juego.presionado)},
	parar: ()=>{
		window.cancelAnimationFrame(bucle);
		datos.pause=true;
		pause.innerHTML = 'Play';
		pause.style.background = 'green';
		controles.style.background = 'rgba(255,255,255,0.4)';
		mensaje.style.display = 'block';
	},
	empieza: ()=>{
		datos.pause = false;
		juego.contol();
		juego.canvas();
		bucle = frame(juego.empieza);
		pause.innerHTML = 'Pause';
		pause.style.background = 'red';
		controles.style.background = 'rgba(255,255,255,0.0)';
		mensaje.style.display = 'none';
	},
	presionado: (e)=>{
		if (!datos.pause){
			if (e.clientY<=e.target.clientHeight*(2/3)) {
				if (e.clientX<e.target.clientWidth*1/3) {
					ficha.izquierda();
				}else if (e.clientX<e.target.clientWidth*2/3) {
					ficha.rotar();
				}
				else if (e.clientX>=e.target.clientWidth*2/3){
					ficha.derecha();
				}
			}
			else if (e.clientY>(e.target.clientHeight*(2/3))) {
				ficha.bajar();
			}
		}
	},
	canvas: ()=>{
		canvas.width = datos.anchoCanvas;
		canvas.height = datos.altoCanvas;
		ctx.clearRect(0,0,canvas.width,canvas.height);
		//dibujar tablero
		for (var py = datos.margenSuperior; py < pantalla.length; py++) {
		 	for (var px = 0; px < pantalla[px].length; px++) {
				if (pantalla[py-1][px+1]!=0) {
					switch (pantalla[py-1][px+1]) {
						case 1:
							ctx.fillStyle = colores[0];
							break;
						case 2:
							ctx.fillStyle = colores[1];
							break;
						case 3:
							ctx.fillStyle = colores[2];
							break;
						case 4:
							ctx.fillStyle = colores[3];
							break;
						case 5:
							ctx.fillStyle = colores[4];
							break;
						case 6:
							ctx.fillStyle = colores[5];
							break;
						case 7:
							ctx.fillStyle = colores[6];
							break;
						default:

					}
						ctx.fillRect((px)*datos.anchoFicha,(py-datos.margenSuperior-1)*datos.altoFicha,datos.anchoFicha-2,datos.altoFicha-2);
				}
			}
		}
		//dibujar ficha
		ficha.dibuja();
		ficha.caer();
		datos.fotograma++;
	}

};
canvas.addEventListener('click',()=>{(datos.pause) ? juego.empieza() : juego.parar()});
juego.empieza();
pause.addEventListener('click',()=>{(datos.pause) ? juego.empieza() : juego.parar()});
