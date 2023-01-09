import { Monster, nameGenerator, choose, randomInt } from './classes.mjs'; // importar clase
import fs from "fs"; // imports imports
import { exit } from 'process'; // salir es un import, increible

const prompt = msg => { // magia negra para pedir input
	fs.writeSync(1, String(msg));
	let s = '', buf = Buffer.alloc(1);
	while (buf[0] - 10 && buf[0] - 13)
		s += buf, fs.readSync(0, buf, 0, 1, 0);
	return s.slice(1);
}

function wait() { // esto se reutiliza bastante
	prompt("\nPresiona ENTER para continuar...\n"); prompt("");
}

// esta funcción toma como inputs a un monstruo tuyo y uno salvaje
// y una de las 4 acciones y hace que el enemigo las realize
function enemyMove(myself, enemy, choice) {
	switch (choice) {
		case 1:
			console.log(enemy.getName() + " usa ATAQUE DEBIL");
			enemy.weakAttack(myself);
			wait()
			break;
		case 2:
			console.log(enemy.getName() + " usa ATAQUE FUERTE");
			enemy.strongAttack(myself);
			wait()
			break;
		case 3:
			console.log(enemy.getName() + " intenta BLOQUEAR");
			enemy.block();
			wait()
			break;
		case 4:
			console.log(enemy.getName() + " se pone a DESCANSAR");
			enemy.rest();
			wait()
			break;
	}
}

// listas de cosas importantes
const BIOMES = ["DESIERTO", "PANTANO", "BOSQUE"];
const TARGETS = ["TEMPLO", "CASTILLO"];
const ELEMENTS = ["FUEGO", "AGUA", "PLANTA"];

// esta funcción toma uno de tus monstruos y un monstruo salvaje y te deja pelear
function battle(myself, enemy) {
	let won = false; // si se ganó, este es el valor que esta funcción va a retornar
	let ended = false; // si se terminó, para terminar el while
	while (!ended) {
		console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
		// info de los participantes
		console.log(myself.getName() + "\n HP: " + myself.getHP() + "\n STAMINA: " + myself.getStamina());
		console.log(enemy.getName() + "\n HP: " + enemy.getHP() + "\n STAMINA: " + enemy.getStamina());
		console.log("\nTus posibles acciones son:");
		// parseInt convierte strings a enteros
		let option = parseInt(prompt("1. Ataque debil\n2. Ataque fuerte\n3. Bloquear ataque\n4. Descansar\n5. Info\n > ")); prompt("");
		// opción tiene que ser un numero entre 1 y 5
		if (isNaN(option)) option = 1; // convierte a numero si se ingresó basura
		option = Math.max(1, Math.min(5, option)); // limita entre 1 y 5
		let enemyChoice; // valor random que representa la acción del oponente
		switch (option) {
			case 1:
				console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
				console.log(myself.getName() + " usa ATAQUE DEBIL");
				myself.weakAttack(enemy);
				wait();
				enemyChoice = randomInt(1, 4);
				enemyMove(myself, enemy, enemyChoice)
				break;
			case 2:
				console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
				console.log(myself.getName() + " usa ATAQUE FUERTE");
				myself.strongAttack(enemy);
				wait();
				enemyChoice = randomInt(1, 4);
				enemyMove(myself, enemy, enemyChoice)
				break;
			case 3:
				console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
				console.log(myself.getName() + " intenta BLOQUEAR");
				myself.block();
				wait();
				enemyChoice = randomInt(1, 4);
				enemyMove(myself, enemy, enemyChoice)
				break;
			case 4:
				console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
				console.log(myself.getName() + " se pone a DESCANSAR");
				myself.rest();
				wait();
				enemyChoice = randomInt(1, 4);
				enemyMove(myself, enemy, enemyChoice)
				break;
			case 5:
				console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
				console.log("Mi monstruo:");
				myself.status();
				console.log("\nMonstruo salvaje:");
				enemy.status();
				wait();
				break;
		}
		if (myself.isDefeated()) {
			won = false;
			ended = true;
			console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
			console.log("Has perdido :(");
		}
		if (enemy.isDefeated()) {
			won = true;
			ended = true;
			console.log("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n");
			console.log("Has ganado :)");
			myself.rest(5);
		}
	}
	return won;
}

console.log("\x1b[96m");
console.log("██╗   ██╗███╗  ██╗███╗  ██╗ █████╗ ███╗   ███╗███████╗██████╗ ");
console.log("██║   ██║████╗ ██║████╗ ██║██╔══██╗████╗ ████║██╔════╝██╔══██╗");
console.log("██║   ██║██╔██╗██║██╔██╗██║███████║██╔████╔██║█████╗  ██║  ██║");
console.log("██║   ██║██║╚████║██║╚████║██╔══██║██║╚██╔╝██║██╔══╝  ██║  ██║");
console.log("╚██████╔╝██║ ╚███║██║ ╚███║██║  ██║██║ ╚═╝ ██║███████╗██████╔╝");
console.log(" ╚═════╝ ╚═╝  ╚══╝╚═╝  ╚══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═════╝ ");
console.log("\x1b[0m\nUNNAMED es un juego de peleas por turnos donde controlas");
console.log("un equipo de 4 monstruos contra una serie de monstruos");
console.log("salvajes camino a tu destino.\n");
console.log("Tu objetivo como su guía es darle ordenes a tus monstruos");
console.log("para poder derrotar a cada monstruo salvaje.\n");

while (true) {
	// datos de la partida
	let team = []; // equipo de monstruos, uno de cada + uno random
	team.push(new Monster(nameGenerator(), "FUEGO"));
	team.push(new Monster(nameGenerator(), "AGUA"));
	team.push(new Monster(nameGenerator(), "PLANTA"));
	team.push(new Monster(nameGenerator(), choose(ELEMENTS)));
	let biome = choose(BIOMES); // bioma, esto define que tipo sale mas
	let target = choose(TARGETS) + " DE " + nameGenerator(); // pura decoración
	let enemiesLeft; // cuantos enemigos quedan en modo historia

	let option = parseInt(prompt("1. Modo historia\n2. Modo arena\n3. Sobre el juego\n4. Salir\n > ")); prompt("");
	if (isNaN(option)) option = 1;
	option = Math.max(1, Math.min(4, option));

	switch (option) {
		case 1:
			console.log("\x1b[2J\x1b[1;1HElige la dificultad:");
			enemiesLeft = parseInt(prompt("\n1. Facil\n2. Dificil\n > ")); prompt("");
			if (isNaN(enemiesLeft)) enemiesLeft = 1;
			option = Math.max(1, option); // si quieres puedes subir la dificultad hasta infinito
			enemiesLeft *= 5; // la dificultad añade enemigos de 5 en 5

			console.log("\x1b[2J\x1b[1;1HTu equipo consiste de:");
			for (let i = 0; i < team.length; i++) team[i].status();

			console.log("\nEstás en un " + biome + ", tienes un largo camino por delante.");
			console.log("Tu destino es el " + target + ", donde se rumorea está escondido un gran tesoro.");
			wait();

			while (enemiesLeft > 0) { // mientras quedan enemigos
				let wildElement = choose(ELEMENTS);
				// dependiendo del bioma van a aparecer mas de cierto elemento
				if (Math.random() > 0.25) wildElement = ELEMENTS[BIOMES.findIndex(x => { return x == biome })];

				let wildMonster = new Monster(nameGenerator(), wildElement);
				console.log("\x1b[2J\x1b[1;1HSe te acerca un monstruo salvaje:");
				wildMonster.status();

				console.log("\nElige cual de tus monstruos vas a usar contra el (1-" + team.length + "):");
				for (let i = 0; i < team.length; i++) team[i].status();
				let chosen = parseInt(prompt("\n > ")); prompt("") - 1;
				if (isNaN(chosen)) chosen = 0;
				chosen = Math.max(0, Math.min(team.length - 1, option));

				console.log("\nElegiste a:");
				team[chosen].status();

				let outcome = battle(team[chosen], wildMonster);
				if (!outcome) {
					console.log("\nLamentablemente, " + team[chosen].getName() + " ya no está con nosotros.");
					team.splice(chosen, 1);
				} // remover el monstruo si pierdes con el

				wait();
				if (team.length == 0) {
					console.log("\nSin tus monstruos, acabas sucumbiendo a los monstruos salvajes.");
					enemiesLeft = 0;
					exit();
				}
				enemiesLeft -= 1;
			}

			console.log("\x1b[2J\x1b[1;1HFinalmente, lograste llegar a tu objetivo, y el tesoro resultó ser " + choose(["una completa mentira\n", "totalmente real\n"]));
			exit();
		case 2:
			enemiesLeft = 0; // en modo arena este valor se usa al revez, cuantos enemigos has encontrado

			console.log("\x1b[2J\x1b[1;1HTu equipo consiste de:");
			for (let i = 0; i < team.length; i++) team[i].status();

			console.log("\nEstás en un " + biome + ", tienes un largo camino por delante.");
			console.log("Rodeado de una horda interminable de monstruos, solo te queda sobrevivir.");
			wait();

			while (true) { // para siempre
				let wildMonster = new Monster(nameGenerator(), choose(ELEMENTS));
				console.log("\x1b[2J\x1b[1;1HSe te acerca un monstruo salvaje:");
				wildMonster.status();

				console.log("\nElige cual de tus monstruos vas a usar contra el (1-" + team.length + "):");
				for (let i = 0; i < team.length; i++) team[i].status();
				let chosen = parseInt(prompt("\n > ")); prompt("") - 1;
				if (isNaN(chosen)) chosen = 0;
				chosen = Math.max(0, Math.min(team.length - 1, option));

				console.log("\nElegiste a:");
				team[chosen].status();

				let outcome = battle(team[chosen], wildMonster);
				if (!outcome) {
					console.log("\nLamentablemente, " + team[chosen].getName() + " ya no está con nosotros.");
					team.splice(chosen, 1);
				} // remover el monstruo si pierdes con el

				enemiesLeft += 1;
				console.log("\nHas enfrentado a " + enemiesLeft + " monstruos");
				wait();
				if (team.length == 0) {
					console.log("\nSin tus monstruos, acabas sucumbiendo a los monstruos salvajes.");
					enemiesLeft = 0;
					exit();
				}
				if (enemiesLeft % 5 == 0) { // cada 5 monstruos derrotados se te añade uno a tu equipo
					console.log("\nUn monstruo salvaje se une a tu equipo.");
					team.push(new Monster(nameGenerator(), choose(ELEMENTS)));
					team[team.length - 1].status();
					wait();
				}
			}
		case 3:
			console.log("\x1b[2J\x1b[1;1H--- CREDITOS ---\n");
			console.log("Codigo: Nicolas Espejo");
			console.log("Diseño: Nicolas Espejo, Gohan Vergara");
			wait();
			break;
		case 4:
			console.log("\x1b[2J\x1b[1;1HFIN\n");
			exit();
		// break;
	}
}