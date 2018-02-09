/*
Autor: Alberto Díaz Arenas
Módulo: Desarrollo de Interfaces
Grado: Desarrollo de Aplicaciones Multiplataforma
Instituto: IES Virgen de la Paloma
*/

function iniciarJuego() { 
	/* 	este método es usado para inicializar tanto las variables que contienen las referencias
	*	a los distintos elementos del HTML como las propias variables de control que uso para 
	* 	iniciar el juego
	*/
	
	campo = document.getElementById("campo");	// obtengo todas las referencias posibles del campo de juego
	anchoCampo = parseInt(campo.offsetWidth);
	altoCampo = parseInt(campo.offsetHeight);
	bordeIzqCampo = parseInt(campo.offsetLeft);
	bordeDerCampo = bordeIzqCampo + anchoCampo;
	
	barra = document.getElementById("barra"); // obtengo las referencias de la barra y la posiciono en mitad del campo
	anchoBarra = parseInt(barra.offsetWidth);
	posicionXbarra = parseInt((bordeDerCampo-bordeIzqCampo)/2 - Math.floor(anchoBarra/2));
	posicionYbarra = altoCampo - 30;
	barra.style.top = posicionYbarra + "px";
	barra.style.left = posicionXbarra + "px";
	
	pelota = document.getElementById("pelota"); // obtengo las referencias de la pelota y la posiciono en mitad de la barra y encima de esta
	anchoPelota = parseInt(pelota.offsetWidth);
	posicionXpelota = (bordeDerCampo-bordeIzqCampo)/2 - Math.floor(anchoPelota/2);
	posicionYpelota = posicionYbarra - anchoPelota - 10;	
	pelota.style.top = posicionYpelota + "px";
	pelota.style.left = posicionXpelota + "px";	
	movimientos = [-1,1];
	indiceX = (Math.random() < 0.5) ? 0 : 1;
	movimientoX = movimientos[indiceX]; // movimiento de la pelota hacia la izquierda o hacia la derecha alatoriamente
	movimientoY = -1; // la pelota siempre se moverá hacia arriba cuando empiece el juego
	
	datos = document.getElementById("datos"); // posiciono el div de los datos relativos al juego a la derecha del campo
	datos.style.top = 50 + "px";
	datos.style.left = bordeDerCampo + 20 + "px";	
	
	// declaración de variables globales
	numVidas = 3;
	numBloques = 3; // todo el juego se basa en la eliminación de 3 bloques
	puntuacion = 0;
	empezarJuego = false;
	juegoConRaton = false;
	
	document.getElementById("campo").onmousemove = coordenadasRaton; // con este método controlo en todo momento la posición del ratón
	document.getElementById("numVidas").innerHTML = numVidas; // muestro el número de vidas
	document.getElementById("puntuacion").innerHTML = puntuacion;	// muestro la puntuación
	
	// carga de sonidos del juego
	sonidoChoqueBarra = document.getElementById("sonidoChoqueBarra");
	sonidoRomperBloque = document.getElementById("sonidoRomperBloque");
	sonidoVictoria = document.getElementById("sonidoVictoria");
	sonidoDerrota = document.getElementById("sonidoDerrota");
	sonidoDerrota1 = document.getElementById("sonidoDerrota1");	
}

function crearMenu(tipo) {	

	// aqui creo la estructura del menu que aparecerá al principio
	var menu = document.createElement("div");
	menu.setAttribute("id","menu");
	menu.style.backgroundColor = "#FFFD80";
	var altoMenu = 100;
	var anchoMenu = 350;
	menu.style.width = anchoMenu + "px";
	menu.style.height = altoMenu + "px";
	menu.style.top = 600/2 - altoMenu/2 + "px";
	menu.style.left = 420/2 - anchoMenu/2 + "px";
	menu.style.margin = "auto";
	menu.style.position = "absolute";
	menu.style.padding = "10px";
	menu.style.borderRadius = "5px";
	menu.style.border = "4px solid gray";
	
	switch(tipo) { // dependiendo del tipo crearé unas opciones u otras dentro del menu
		case "principal":
		
			// aqui creo la primera lista desplegable para elegir con qué vamos a jugar (ratón, letras o flechas)
			var opcionJuego = document.createElement("p");				
			opcionJuego.appendChild(document.createTextNode("Elige un modo de juego "));
			opcionJuego.style.margin = "10px;";
			
			var lista = document.createElement("select");
			lista.setAttribute("name","menumodojuego");
			lista.setAttribute("id","menumodojuego");
			
			var opcion1 = document.createElement("option");
			opcion1.setAttribute("value","======");
			opcion1.appendChild(document.createTextNode("======"));
			
			var opcion2 = document.createElement("option");
			opcion2.setAttribute("value","raton");
			opcion2.appendChild(document.createTextNode("RATÓN"));
			
			var opcion3 = document.createElement("option");
			opcion3.setAttribute("value","teclado_letras");
			opcion3.appendChild(document.createTextNode("TECLADO LETRAS (Z - X)"));
			
			var opcion4 = document.createElement("option");
			opcion4.setAttribute("value","teclado_flechas");
			opcion4.appendChild(document.createTextNode("TECLADO (FLECHAS)"));
			
			// añado las 4 opciones a la lista
			lista.appendChild(opcion1);
			lista.appendChild(opcion2);
			lista.appendChild(opcion3);
			lista.appendChild(opcion4);
			
			// añado la lista al menu
			opcionJuego.appendChild(lista);			
			menu.appendChild(opcionJuego);	
			
			// aqui creo la segunda lista desplegable para elegir con qué dificultad vamos a jugar (fácil, medio o difícil)
			var opcionDificultad = document.createElement("p");				
			opcionDificultad.appendChild(document.createTextNode("Elige una dificultad "));

			var listaDificultad = document.createElement("select");
			listaDificultad.setAttribute("name","menudificultad");
			listaDificultad.setAttribute("id","menudificultad");
			
			var opcion1Dificultad = document.createElement("option");
			opcion1Dificultad.setAttribute("value","======");
			opcion1Dificultad.appendChild(document.createTextNode("======"));
			
			var opcion2Dificultad = document.createElement("option");
			opcion2Dificultad.setAttribute("value","facil");
			opcion2Dificultad.appendChild(document.createTextNode("Fácil (vida bloque = 1)"));
			
			var opcion3Dificultad = document.createElement("option");
			opcion3Dificultad.setAttribute("value","medio");
			opcion3Dificultad.appendChild(document.createTextNode("Medio (vida bloque = 2)"));
			
			var opcion4Dificultad = document.createElement("option");
			opcion4Dificultad.setAttribute("value","dificil");
			opcion4Dificultad.appendChild(document.createTextNode("Difícil (vida bloque = 3)"));
			
			// añado las 4 opciones a la lista
			listaDificultad.appendChild(opcion1Dificultad);
			listaDificultad.appendChild(opcion2Dificultad);
			listaDificultad.appendChild(opcion3Dificultad);
			listaDificultad.appendChild(opcion4Dificultad);
			
			// añado la lista al menu
			opcionDificultad.appendChild(listaDificultad);			
			menu.appendChild(opcionDificultad);
			
			// aqui creo el boton para empezar el juego
			var botonStart = document.createElement("button");
			botonStart.setAttribute("type","button");
			botonStart.setAttribute("name","botonStart");
			botonStart.setAttribute("id","botonStart");
			botonStart.appendChild(document.createTextNode("START GAME"));
			var altoBoton = 40;
			var anchoBoton = 100;
			botonStart.style.position = "absolute";
			botonStart.style.top = (altoMenu - altoBoton)+"px";
			botonStart.style.left = (anchoMenu/2 - anchoBoton/2)+"px";
			botonStart.style.padding = "5px";
			botonStart.style.margin = "5px";
			botonStart.style.borderRadius = "5px";
			botonStart.style.border = "2px solid gray";
			
			menu.appendChild(botonStart);		
			break;
			
		case ("victoria"): // tanto si hemos ganado como si hemos perdido creamos las opciones correspondientes
		case ("derrota"): // lo escribo con esta sintaxis para entrar en un mismo case con dos condiciones distintas
		
			if (tipo == "victoria") {
				// aqui creo el texto de victoria
				var textoVictoria = document.createElement("h2");				
				textoVictoria.appendChild(document.createTextNode("¡Enhorabuena, has ganado!"));
				textoVictoria.style.textAlign = "center";
				menu.appendChild(textoVictoria);
			}
			
			if (tipo == "derrota") {
				// aqui creo el texto de derrota
				var textoDerrota = document.createElement("h2");				
				textoDerrota.appendChild(document.createTextNode("GAME OVER"));	
				textoDerrota.style.textAlign = "center";
				menu.appendChild(textoDerrota);
			}
			
			// aqui creo el boton para reiniciar el juego
			var botonRestart = document.createElement("button");
			botonRestart.setAttribute("type","button");
			botonRestart.setAttribute("name","botonRestart");
			botonRestart.setAttribute("id","botonRestart");
			botonRestart.appendChild(document.createTextNode("REINICIAR"));
			var altoBoton = 40;
			var anchoBoton = 100;
			botonRestart.style.position = "absolute";
			botonRestart.style.top = (altoMenu - altoBoton)+"px";
			botonRestart.style.left = (anchoMenu/4 - anchoBoton/2)+"px";
			botonRestart.style.padding = "5px";
			botonRestart.style.margin = "5px";
			botonRestart.style.borderRadius = "5px";
			botonRestart.style.border = "2px solid gray";
			
			botonRestart.onmouseover = function() {
				botonRestart.style.backgroundColor = "#00FFFF";
			}
			botonRestart.onmouseout = function() {
				botonRestart.style.backgroundColor = "#FFFFFF";
			}
			botonRestart.onclick = function() {
				document.body.removeChild(document.getElementById("menu")); // borramos el menú
				iniciarArkanoid(); // si se pulsa el botón de reiniciar se llama al método que inicia el juego entero otra vez
			}
			
			// aqui creo el boton para salir del juego
			var botonSalir = document.createElement("button");
			botonSalir.setAttribute("type","button");
			botonSalir.setAttribute("name","botonSalir");
			botonSalir.setAttribute("id","botonSalir");
			botonSalir.appendChild(document.createTextNode("SALIR"));
			var altoBoton = 40;
			var anchoBoton = 100;
			botonSalir.style.position = "absolute";
			botonSalir.style.top = (altoMenu - altoBoton)+"px";
			botonSalir.style.left = (4*anchoMenu/5 - anchoBoton/2)+"px";
			botonSalir.style.padding = "5px";
			botonSalir.style.margin = "5px";
			botonSalir.style.borderRadius = "5px";
			botonSalir.style.border = "2px solid gray";
			
			botonSalir.onmouseover = function() {
				botonSalir.style.backgroundColor = "#00FFFF";
			}
			botonSalir.onmouseout = function() {
				botonSalir.style.backgroundColor = "#FFFFFF";
			}
			botonSalir.onclick = function() {
				document.body.removeChild(document.getElementById("menu")); // borramos el menú
				window.close(); // si se pulsa el botón de salir se cierra el navegador
			}
			
			menu.appendChild(botonRestart); // añado ambos botones al menú
			menu.appendChild(botonSalir);
			
			break;		
	}	
	document.body.appendChild(menu); // agregamos el menú a la estructura DOM de la página		
}

function crearMensajeError(tipo) { // este método crea un div alertándonos si no hemos escogido un modo de juego o una dificultad
	
	var menu = document.createElement("div");
	menu.setAttribute("id","menuError"+tipo);
	menu.style.backgroundColor = "#FFFD80";
	var altoMenu = 40;
	var anchoMenu = 350;
	menu.style.width = anchoMenu + "px";
	menu.style.height = altoMenu + "px";
	menu.style.top = 150 - altoMenu/2 + "px";
	menu.style.left = 420/2 - anchoMenu/2 + "px";
	menu.style.margin = "auto";
	menu.style.position = "absolute";
	menu.style.padding = "10px";
	menu.style.borderRadius = "5px";
	menu.style.border = "4px solid red";
	
	switch (tipo) {
		
		case "modo":
			var textoModo = document.createElement("h2");				
			textoModo.appendChild(document.createTextNode("Falta el modo de juego"));
			textoModo.style.textAlign = "center";
			menu.appendChild(textoModo);
			break;
			
		case "dificultad":
			var textoDif = document.createElement("h2");				
			textoDif.appendChild(document.createTextNode("Falta la dificultad"));
			textoDif.style.textAlign = "center";
			menu.appendChild(textoDif);
			break;
		
		case "ambos":
			var textoModo = document.createElement("h3");				
			textoModo.appendChild(document.createTextNode("Falta el modo de juego"));
			textoModo.style.textAlign = "center";
			menu.appendChild(textoModo);
			var textoDif = document.createElement("h3");				
			textoDif.appendChild(document.createTextNode("Falta la dificultad"));
			textoDif.style.textAlign = "center";
			menu.appendChild(textoDif);
			break;
	}
	document.body.appendChild(menu); // agregamos el mensaje de error a la estructura DOM de la página
	
	setTimeout(function(){document.body.removeChild(menu)},2500); // a los dos segundos y medio desaparece el div de alerta
}

function elegirOpciones() { // este método crea el menú que aparecerá al principio de la ejecución del juego

	var sonidoMenu = document.getElementById("sonidoMenu");
	playSonido(sonidoMenu);

	crearMenu("principal");
	var menu = document.getElementById("menu");
	var boton = document.getElementById("botonStart");
	boton.onmouseover = function() {
		boton.style.backgroundColor = "#00FFFF";
	}
	boton.onmouseout = function() {
		boton.style.backgroundColor = "#FFFFFF";
	}
	boton.onclick = pulsadoBotonStart;
}

function playSonido(sonido) { // método para reproducir los sonidos del juego
	sonido.play();
}

function stopSonido(sonido) { // método para pausar los sonidos del juego
	sonido.pause();
}

function dibujarBloques(dificultad) { // este bloque dibuja los bloques en el campo de juego

	var minBloque1 = 4;
	var topeBloque1 = 80;
	var minBloque2 = 150;
	var topeBloque2 = 230;
	var minBloque3 = 300;
	var topeBloque3 = 380;
	
	for (var i = 1; i <= 3; i++) {
		var bloque = document.createElement("div");
		bloque.setAttribute("id", "bloque" + i);
		document.getElementById("campo").appendChild(bloque);
		switch (dificultad) { // dependiendo de la dificultad tendrán un color u otro
			case "facil":
				document.getElementById("bloque"+i).style.backgroundColor = "rgb(0, 255, 0)"; // color verde
				break;
			case "medio":
				document.getElementById("bloque"+i).style.backgroundColor = "rgb(85, 26, 139)"; // color morado
				break;
			case "dificil":
				document.getElementById("bloque"+i).style.backgroundColor = "rgb(255, 165, 0)"; // color naranja
				break;
		}
		document.getElementById("bloque"+i).style.position = "absolute";
		document.getElementById("bloque"+i).style.width = "70px";
		document.getElementById("bloque"+i).style.height = "20px";
		var topAleatorio = Math.floor(Math.random() * (180 - 40)) + 40;
		var leftAleatorio;
		switch(i) { // genero las posiciones automáticamente
			case 1:
				leftAleatorio = Math.floor(Math.random() * (topeBloque1 - minBloque1)) + minBloque1;
				break;
			case 2:
				leftAleatorio = Math.floor(Math.random() * (topeBloque2 - minBloque2)) + minBloque2;
				break;
			case 3:
				leftAleatorio = Math.floor(Math.random() * (topeBloque3 - minBloque3)) + minBloque3;
				break;
		}
		
		// por decisión propia me aseguro que tanto el top como el left estén en posiciones pares
		
		if (topAleatorio%2 != 0) {
			topAleatorio--;
		}
		
		if (leftAleatorio%2 != 0) {
			leftAleatorio--;
		}
		
		document.getElementById("bloque"+i).style.top = topAleatorio+"px";
		document.getElementById("bloque"+i).style.left = leftAleatorio+"px";		
	}
}

function pulsadoBotonStart() { // método que controla que se ha pulsado el boton start del menú principal

	stopSonido(sonidoMenu); // pausamos el sonido del menú principal

	var listaModoJuego = document.getElementById("menumodojuego"); // cargo la lista desplegable del modo de juego
	var modoSeleccionado = listaModoJuego.options[listaModoJuego.selectedIndex].value; // cargo el elemento seleccionado 
	var modoCorrecto = modoSeleccionado != listaModoJuego.options[0].value; // veo si es un elemento correcto comparándolo 
																			// con el valor por defecto
	
	var listaDificultad = document.getElementById("menudificultad");
	var dificultadElegida = listaDificultad.options[listaDificultad.selectedIndex].value; // cargo el elemento seleccionado 
	var dificultadCorrecta = dificultadElegida != listaDificultad.options[0].value; // veo si es un elemento correcto 
																					// comparándolo con el valor por defecto
	
	if (modoCorrecto && dificultadCorrecta) { // si se han elegido bien ambos campos
		empezarJuego = true; 					// empieza el juego
		dibujarBloques(dificultadElegida);		// dibujamos los bloques con la dificultad elegida
		document.body.removeChild(document.getElementById("menu")); // borramos el menú principal
		idIntervalPelota = setInterval(moverPelota, 8); // movemos la pelota cada 8 milésimas
		idIntervalPuntuacion = setInterval(incrementarPuntuacion, 5000); // cada 5 segundos se incrementará la puntuación
		switch(modoSeleccionado) {
			case "raton":
				juegoConRaton = true; // para evitar que la barra se mueva sin haber empezado el juego
				break;
			case "teclado_letras":
				document.onkeydown = moverBarraConLetras;
				break;
			case "teclado_flechas":
				document.onkeydown = moverBarraConFlechas;
				break;
		}
	}
	else { // muestro mensajes de error dependiendo del caso
		if (!modoCorrecto && dificultadCorrecta) {
			crearMensajeError("modo");
		}
		else if (modoCorrecto && !dificultadCorrecta) {
			crearMensajeError("dificultad");
		}
		else {
			crearMensajeError("ambos");
		}
	}
}

function coordenadasRaton(event) {
	var x = event.clientX;
	var y = event.clientY;
	document.getElementById("coordenadaXraton").innerHTML = x;
	document.getElementById("coordenadaYraton").innerHTML = y;	
	
	if (empezarJuego && juegoConRaton) { 	// con el control de estas variables me aseguro que la barra se mueva 
											// con el movimiento del ratón SOLO si se ha elegido esa opción
											// en el menú principal
		moverBarraConRaton(event);
	}
}

function moverBarraConRaton(event) {

	var coordx = event.clientX;
	document.getElementById("coordenadaXbarra").innerHTML = coordx;				
	posicionXbarra = coordx - anchoBarra/2; // posiciono la barra para que el puntero del ratón esté en la mitad de la barra
	
	var tamBarra = document.getElementById("barra").offsetWidth;
	
	if (bordeIzqCampo <= posicionXbarra && posicionXbarra <= bordeDerCampo - tamBarra) { // para que la barra esté dentro de los límites
																						// del campo de juego
		barra.style.left = posicionXbarra + "px";
	}
}

function moverBarraConLetras(evObject) {

	var tecla = String.fromCharCode(evObject.which); 
	var coordX = document.getElementById("barra").offsetLeft;
	var tam = document.getElementById("campo").offsetWidth;
	var tamBarra = document.getElementById("barra").offsetWidth;
	
	if (bordeIzqCampo <= coordX && coordX <= bordeDerCampo - tamBarra ) { // muevo la barra con saltos de 5 en todo el ancho del campo
	
		switch (tecla){
			case "Z" :   
				if (0 < coordX - 5) {
					posicionXbarra = coordX - 5;
					barra.style.left = posicionXbarra+"px";
				}
				break;
			case "X" : 
				if (coordX + 5 < bordeDerCampo - tamBarra) {
					posicionXbarra = coordX + 5;
					barra.style.left = posicionXbarra+"px"; 
				}
				break;
		}
	}				
}

function moverBarraConFlechas(evObject) {
			
	var tecla = evObject.which; 
	var coordX = document.getElementById("barra").offsetLeft;
	var tam = document.getElementById("campo").offsetWidth;
	var tamBarra = document.getElementById("barra").offsetWidth;
	
	if (bordeIzqCampo <= coordX && coordX <= bordeDerCampo - tamBarra ) { // muevo la barra con saltos de 5 en todo el ancho del campo
	
		switch (tecla){
			case 37 :   
				if (0 < coordX - 5) {
					posicionXbarra = coordX - 5;
					barra.style.left = posicionXbarra+"px";
				}
				break;
			case 39 : 
				if (coordX + 5 < bordeDerCampo - tamBarra) {
					posicionXbarra = coordX + 5;
					barra.style.left = posicionXbarra+"px"; 
				}
				break;
		}
	}
}

function comprobarVidaBloque(bloque) { // dependiendo de la dificultad tendrán un color u otro

	switch (bloque.style.backgroundColor) {
		case "rgb(255, 165, 0)": // color naranja
			bloque.style.backgroundColor = "rgb(85, 26, 139)";
			puntuacion = puntuacion + 14;
			break;
		case "rgb(85, 26, 139)": // color morado
			bloque.style.backgroundColor = "rgb(0, 255, 0)";
			puntuacion = puntuacion + 23;
			break;
		case "rgb(0, 255, 0)": // color verde
			puntuacion = puntuacion + 49;
			bloque.parentNode.removeChild(bloque); // si era la última vida del bloque lo borramos
			playSonido(sonidoRomperBloque);
			numBloques--;
			if (numBloques == 0) { // si hemos eliminado todos los bloques creamos un menú de victoria
				clearInterval(idIntervalPelota); // paramos la ejecución del movimiento de la pelota
				clearInterval(idIntervalPuntuacion); // paramos la ejecución del incremento de la puntuación
				juegoConRaton = false; // ponemos esta variable a false por si se estaba jugando con el ratón, para evitar 
										// que se siga moviendo
				crearMenu("victoria");
				playSonido(sonidoVictoria);
			}
			break;
	}
	document.getElementById("puntuacion").innerHTML = puntuacion;
}

// =======================================================================

function choquePorAbajo(bloque,pelota) { // método que comprueba si la pelota está chocando por abajo con el bloque en cuestión
	
	if (bloque != null) { // hacemos el control por si se llama a este método con un bloque que ya ha sido borrado
		var topBloque = Math.floor(bloque.offsetTop);
		var leftBloque = Math.floor(bloque.offsetLeft);
		var anchoBloque = Math.floor(bloque.offsetWidth);
		var altoBloque = Math.floor(bloque.offsetHeight);
		
		var topPelota = Math.floor(pelota.offsetTop);
		var leftPelota = Math.floor(pelota.offsetLeft);
		var anchoPelota = Math.floor(pelota.offsetWidth);
		
		var mismoTop = (topPelota == topBloque + altoBloque);
		var estaEnRango = (leftBloque <= leftPelota + anchoPelota && leftPelota <= leftBloque + anchoBloque);
		
		if (mismoTop && estaEnRango ) {			
			if(bloque.parentNode != null) {				
				comprobarVidaBloque(bloque);
			}
			return true; // devuelve true si la pelota ha golpeado en alguna zona de la parte inferior del bloque
		}
		else {
			return false; // devuelve false si no
		}
	}
	return false; // devuelve false el bloque pasado como argumento ya había sido eliminado
}

// =======================================================================

function choquePorArriba(bloque,pelota) { // método que comprueba si la pelota está chocando por arriba con el bloque en cuestión
	
	if (bloque != null) { // hacemos el control por si se llama a este método con un bloque que ya ha sido borrado
		var topBloque = Math.floor(bloque.offsetTop);
		var leftBloque = Math.floor(bloque.offsetLeft);
		var anchoBloque = Math.floor(bloque.offsetWidth);
		var altoBloque = Math.floor(bloque.offsetHeight);
		
		var topPelota = Math.floor(pelota.offsetTop);
		var leftPelota = Math.floor(pelota.offsetLeft);
		var anchoPelota = Math.floor(pelota.offsetWidth);
		
		var mismoTop = (topPelota + anchoPelota == topBloque);
		var estaEnRango = (leftBloque <= leftPelota + anchoPelota && leftPelota <= leftBloque + anchoBloque);
		
		if (mismoTop && estaEnRango ) {
			if(bloque.parentNode != null) {
				comprobarVidaBloque(bloque);
			}
			return true; // devuelve true si la pelota ha golpeado en alguna zona de la parte superior del bloque
		}
		else {
			return false; // devuelve false si no
		}
	}
	return false; // devuelve false el bloque pasado como argumento ya había sido eliminado
}

// =======================================================================

function choquePorDerecha(bloque,pelota) { // método que comprueba si la pelota está chocando por la derecha con el bloque en cuestión
	
	if (bloque != null) { // hacemos el control por si se llama a este método con un bloque que ya ha sido borrado
		var topBloque = Math.floor(bloque.offsetTop);
		var leftBloque = Math.floor(bloque.offsetLeft);
		var anchoBloque = Math.floor(bloque.offsetWidth);
		var altoBloque = Math.floor(bloque.offsetHeight);
		
		var topPelota = Math.floor(pelota.offsetTop);
		var leftPelota = Math.floor(pelota.offsetLeft);
		var anchoPelota = Math.floor(pelota.offsetWidth);
		
		var mismoLeft = (leftPelota == leftBloque + anchoBloque);
		var estaEnRango = (topBloque <= topPelota + anchoPelota && topPelota <= topBloque + altoBloque);
		
		if (mismoLeft && estaEnRango ) {
			if(bloque.parentNode != null) {
				comprobarVidaBloque(bloque);
			}
			return true; // devuelve true si la pelota ha golpeado en alguna zona de la parte derecha del bloque
		}
		else {
			return false; // devuelve false si no
		}
	}
	return false; // devuelve false el bloque pasado como argumento ya había sido eliminado
}

// =======================================================================

function choquePorIzquierda(bloque,pelota) { // método que comprueba si la pelota está chocando por la izquierda con el bloque en cuestión
	
	if (bloque != null) { // hacemos el control por si se llama a este método con un bloque que ya ha sido borrado
		var topBloque = Math.floor(bloque.offsetTop);
		var leftBloque = Math.floor(bloque.offsetLeft);
		var anchoBloque = Math.floor(bloque.offsetWidth);
		var altoBloque = Math.floor(bloque.offsetHeight);
		
		var topPelota = Math.floor(pelota.offsetTop);
		var leftPelota = Math.floor(pelota.offsetLeft);
		var anchoPelota = Math.floor(pelota.offsetWidth);
		
		var mismoLeft = (leftPelota + anchoPelota == leftBloque);
		var estaEnRango = (topBloque <= topPelota + anchoPelota && topPelota <= topBloque + altoBloque);
		
		if (mismoLeft && estaEnRango ) {
			if(bloque.parentNode != null) {
				comprobarVidaBloque(bloque);
			}
			return true; // devuelve true si la pelota ha golpeado en alguna zona de la parte izquierda del bloque
		}
		else {
			return false; // devuelve false si no
		}
	}
	return false; // devuelve false el bloque pasado como argumento ya había sido eliminado
}

// =======================================================================

function moverPelota() { // el metodo que se encarga de mover la pelota y verificar si está chocando con algún elemento

	posicionXpelota = Math.floor(posicionXpelota + movimientoX);
	posicionYpelota = Math.floor(posicionYpelota + movimientoY);
	
	document.getElementById("coordenadaXpelota").innerHTML = posicionXpelota;
	document.getElementById("coordenadaYpelota").innerHTML = posicionYpelota;	
	
	pelota.style.top = posicionYpelota + "px";
	pelota.style.left = posicionXpelota + "px";
	
	// choque con el borde izquierdo del campo de juego
	if (posicionXpelota <= 0) {
		posicionXpelota = 0;
		movimientoX = -movimientoX;
	}
	// choque con el borde derecho del campo de juego
	if (posicionXpelota + anchoPelota >= bordeDerCampo) {
		posicionXpelota = bordeDerCampo - anchoPelota;
		movimientoX = -movimientoX;
	}
	// choque con el borde superior del campo de juego
	if (posicionYpelota <= 0) {
		posicionYpelota = 0;
		movimientoY = -movimientoY;
	}
	
	// como desde esta parte del código no se sabe si un bloque ha sido borrado o no hago las siguientes comprobaciones
	var bloque1 = null;
	var bloque2 = null;
	var bloque3 = null;
	if (document.getElementById("bloque1") != null) { // si el bloque 1 no ha sido borrado
		bloque1 = document.getElementById("bloque1");
	}
	if (document.getElementById("bloque2") != null) { // si el bloque 2 no ha sido borrado
		bloque2 = document.getElementById("bloque2");
	}
	if (document.getElementById("bloque3") != null) { // si el bloque 3 no ha sido borrado
		bloque3 = document.getElementById("bloque3");
	}
	
	// las comprobaciones anteriores las hago por la lógica con la que he hecho la detección de los choques
	// ya que en un mismo if y agrupados por la dirección del choque (arriba,abajo), (derecha,izquierda)
	// compruebo a la vez todos los bloques para ahorrar líneas de código. Así controlo que si se comprueba el 
	// "choque" de la pelota con un bloque ya eliminado anteriormente, el método en cuestión devuelva false
	
	if (choquePorAbajo(bloque1,pelota) || choquePorArriba(bloque1,pelota) || 
		choquePorAbajo(bloque2,pelota) || choquePorArriba(bloque2,pelota) ||
		choquePorAbajo(bloque3,pelota) || choquePorArriba(bloque3,pelota) ) {
		
		movimientoY = -movimientoY;
	}
	
	if (choquePorIzquierda(bloque1,pelota) || choquePorDerecha(bloque1,pelota) || 
		choquePorIzquierda(bloque2,pelota) || choquePorDerecha(bloque2,pelota) ||
		choquePorIzquierda(bloque3,pelota) || choquePorDerecha(bloque3,pelota) ) {
		
		movimientoX = -movimientoX;
	}
	
	// variables boolenas con las que compruebo en que lugar de la barra rebota la pelota
	
	var choqueParteIzqBarra = (posicionXbarra < posicionXpelota + anchoPelota && 
								posicionXpelota < posicionXbarra + anchoBarra/3);
								
	var choqueParteCenBarra = (posicionXbarra + anchoBarra/3 < posicionXpelota + anchoPelota && 
								posicionXpelota < posicionXbarra + anchoBarra - anchoBarra/3);
								
	var choqueParteDerBarra = (posicionXbarra + anchoBarra - anchoBarra/3 < posicionXpelota + anchoPelota && 
								posicionXpelota < posicionXbarra + anchoBarra);
	
	
	if ( posicionYpelota + anchoPelota >= posicionYbarra ) {
	
		// choque con la barra en la parte izquierda
		if (choqueParteIzqBarra) {
			
			playSonido(sonidoChoqueBarra); // reproducimos el sonido del rebote
			posicionYpelota = posicionYbarra - anchoPelota; // nos aseguramos que ña pelota se posiciona justo encima de la barra
		
			// si la pelota viene por la derecha
			if (movimientoX < 0) {
				movimientoX = -2;
				movimientoY = -movimientoY;
			}
			
			// si la pelota viene por la izquierda
			if (movimientoX > 0) {
				movimientoX = 1;
				movimientoY = -2;
			}
		}
		
		// choque con la barra en la parte central
		if (choqueParteCenBarra) {
			playSonido(sonidoChoqueBarra);
			posicionYpelota = posicionYbarra - anchoPelota;
			movimientoY = -movimientoY;
		}
		
		// choque con la barra en la parte derecha
		if (choqueParteDerBarra) {
		
			playSonido(sonidoChoqueBarra);
			posicionYpelota = posicionYbarra - anchoPelota;
		
			// la pelota viene por la derecha
			if (movimientoX < 0) {
				movimientoX = -1;
				movimientoY = -2;
			}
			
			// la pelota viene por la izquierda
			if (movimientoX > 0) {
				movimientoX = 2;
				movimientoY = -movimientoY;
			}
			
		}	
	}
	
	if (choquePorDerecha(barra,pelota) || choquePorIzquierda(barra,pelota)) { // si la pelota rebota en la parte derecha o izquierda	
																				// de la barra invierte su dirección
		playSonido(sonidoChoqueBarra);
		movimientoX = -movimientoX;
		movimientoY = -movimientoY;
	}
	
	// choque con el borde inferior del campo de juego
	if (posicionYpelota + anchoPelota >= altoCampo) { // si la pelota golpea la parte inferior del campo se resta una vida
		numVidas--;
		document.getElementById("numVidas").innerHTML = numVidas;
		
		if (numVidas == 0) { // si ya no tenemos vidas
			clearInterval(idIntervalPelota); // paramos la ejecución del movimiento de la pelota
			clearInterval(idIntervalPuntuacion); // paramos la ejecución del incremento de la puntuación
			juegoConRaton = false;
			crearMenu("derrota"); // se muestra el menú de derrota
			sonidos = [sonidoDerrota,sonidoDerrota1];
			indiceSonido = (Math.random() < 0.5) ? 0 : 1; // reproduzco un sonido de derrota u otro aleatoriamente
			playSonido(sonidos[indiceSonido]);
			posicionYpelota = altoCampo - anchoPelota;
			pelota.style.top = posicionYpelota + "px";
		}
		else { // si aún seguimos teniendo vidas la pelota reaparece encima de la barra
			posicionXpelota = posicionXbarra + anchoBarra/2;
			posicionYpelota = posicionYbarra - anchoPelota - 2;
			pelota.style.top = posicionYpelota + "px";
			pelota.style.left = posicionXpelota + "px";
		}
	}
	
}

// =======================================================================

function incrementarPuntuacion() {
	puntuacion += 6;	
	document.getElementById("puntuacion").innerHTML = puntuacion;
}

function iniciarArkanoid() { // he desglosado así el método de iniciar el juego porque lo voy a reutilizar en caso	
								// de que al final del juego se elija reiniciar
	elegirOpciones();	
	iniciarJuego();
}

window.onload = function() {
	iniciarArkanoid();
}