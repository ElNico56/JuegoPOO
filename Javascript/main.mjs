import { Monster, nameGenerator, choose } from './classes.mjs'; // importar clase
import fs from "fs";
import { exit } from 'process';

const BIOMES = ["DESIERTO", "PANTANO", "BOSQUE"];
const TARGETS = ["TEMPLO", "CASTILLO"];
const ELEMENTS = ["FUEGO", "AGUA", "PLANTA"];

function battle(myself, enemy) {
	console.log("\n--------------- BATALLA ---------------\n");
	console.log("Tus posibles acciones son");
	let option = 6
	while (option > 5) {
		option = parseInt(prompt("1. Ataque debil\n2. Ataque fuerte\n3. Bloquear ataque\n4. Descansar\n5. Info\n > ")); prompt("");
	}
	switch (option) {
		case 1:
			break;
		case 2:
			break;
		case 3:
			break;
		case 4:
			break;
		case 5:
			break;
	}
}

const prompt = msg => { // magia negra para pedir input
	fs.writeSync(1, String(msg));
	let s = '', buf = Buffer.alloc(1);
	while (buf[0] - 10 && buf[0] - 13)
		s += buf, fs.readSync(0, buf, 0, 1, 0);
	return s.slice(1);
}

console.log(`\x1b[96m
██╗   ██╗███╗  ██╗███╗  ██╗ █████╗ ███╗   ███╗███████╗██████╗ 
██║   ██║████╗ ██║████╗ ██║██╔══██╗████╗ ████║██╔════╝██╔══██╗
██║   ██║██╔██╗██║██╔██╗██║███████║██╔████╔██║█████╗  ██║  ██║
██║   ██║██║╚████║██║╚████║██╔══██║██║╚██╔╝██║██╔══╝  ██║  ██║
╚██████╔╝██║ ╚███║██║ ╚███║██║  ██║██║ ╚═╝ ██║███████╗██████╔╝
 ╚═════╝ ╚═╝  ╚══╝╚═╝  ╚══╝╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚═════╝ 

\x1b[0mUNNAMED es un juego de peleas por turnos donde controlas
un equipo de 4 monstruos contra una serie de monstruos
salvajes camino a tu destino.

Tu objetivo como su guía es darle ordenes a tus monstruos
para poder derrotar a cada monstruo salvaje.
`);
while (true) {
	let option = parseInt(prompt("1. Modo historia\n2. Modo arena\n3. Sobre el juego\n4. Salir\n > ")); prompt("");

	let team = [];
	team.push(new Monster(nameGenerator(), "FUEGO"));
	team.push(new Monster(nameGenerator(), "AGUA"));
	team.push(new Monster(nameGenerator(), "PLANTA"));
	team.push(new Monster(nameGenerator(), choose(ELEMENTS)));
	let biome = choose(BIOMES);
	let target = choose(TARGETS) + " DE " + nameGenerator();
	let enemiesLeft = -1;

	switch (option) {
		case 1:
			console.log("\x1b[2J\x1b[1;1HElige la dificultad:");
			enemiesLeft = parseInt(prompt("\n1. Facil\n2. Dificil\n > ")); prompt("");

			if (isNaN(enemiesLeft)) enemiesLeft = 1; // tiene que ser un numero
			enemiesLeft *= 5; // la dificultad añade enemigos de 5 en 5

			console.log("\x1b[2J\x1b[1;1HTu equipo consiste de:");
			for (let i = 0; i < team.length; i++) team[i].status();

			console.log("\nEstás en un " + biome + ", tienes un largo camino por delante.");
			console.log("Tu destino es el " + target + ", donde se rumorea está escondido un gran tesoro.");
			prompt("\nENTER para continuar...\n"); prompt("");
			
			while (enemiesLeft > 0) { // mientras quedan enemigos
				let wildElement = choose(ELEMENTS);
				// dependiendo del bioma van a aparecer mas de cierto elemento
				if (Math.random() > 0.33) wildElement = ELEMENTS[BIOMES.findIndex(x => { return x == biome })];

				let wildMonster = new Monster(nameGenerator(), wildElement);
				console.log("\x1b[2J\x1b[1;1HSe te acerca un monstruo salvaje:");
				wildMonster.status();
				prompt("\nENTER para continuar...\n"); prompt("");
				enemiesLeft -= 1
			}

			console.log("\x1b[2J\x1b[1;1HFinalmente, lograste llegar a tu objetivo, y el tesoro resultó ser "+choose(["una completa mentira\n", "totalmente real\n"]));
			break;
		case 2:
			console.log("\x1b[2J\x1b[1;1HTu equipo consiste de:");
			for (let i = 0; i < team.length; i++) team[i].status();

			console.log("\nEstás en un " + biome + ", totalmente rodeado, no hay forma de escapar.");
			console.log("Solo queda una opción, esta es tu ultima batalla, haz que valga la pena.");
			prompt("\nENTER para continuar...\n"); prompt("");
			
			while (true) { // para siempre
				let wildElement = choose(ELEMENTS);
				// dependiendo del bioma van a aparecer mas de cierto elemento
				if (Math.random() > 0.33) wildElement = ELEMENTS[BIOMES.findIndex(x => { return x == biome })];

				let wildMonster = new Monster(nameGenerator(), wildElement);
				console.log("\x1b[2J\x1b[1;1HSe te acerca un monstruo salvaje:");
				wildMonster.status();
				prompt("\nENTER para continuar...\n"); prompt("");
			}
			break;
		case 3:
			console.log("\x1b[2J\x1b[1;1H--- CREDITOS ---\n");
			console.log("Codigo: Nicolas Espejo");
			console.log("Diseño: Nicolas Espejo, Gohan Vergara");
			console.log("\n--- CREDITOR ---");
			prompt("\nENTER para continuar...\n"); prompt("");
			break;
		case 4:
			console.log("\x1b[2J\x1b[1;1HFIN\n");
			exit();
		default:
			console.log("\x1b[2J\x1b[1;1HOpción invalida\n");
	}
}