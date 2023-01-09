import {Monster, nameGenerator, choose} from './classes.mjs'; // importar clase
import fs from "fs"
import { exit } from 'process';

const delay = ms => new Promise(res => setTimeout(res, ms));

const prompt = msg => { // magia negra para pedir input
	fs.writeSync(1, String(msg));
	let s = '', buf = Buffer.alloc(1);
	while (buf[0] - 10 && buf[0] - 13)
	s += buf, fs.readSync(0, buf, 0, 1, 0);
	return s.slice(1);
}

let team = [];
team.push(new Monster(nameGenerator(), "FUEGO"));
team.push(new Monster(nameGenerator(), "AGUA"));
team.push(new Monster(nameGenerator(), "PLANTA"));
team.push(new Monster(nameGenerator(), choose(["FUEGO", "AGUA", "PLANTA"])));

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

let option = parseInt(prompt("1. Modo historia\n2. Modo arena\n3. Sobre el juego\n4. Salir\n > "));

switch (option) {
	case 1:
		console.log("\nTu equipo consiste de:")
		for (let i = 0; i < team.length; i++) {
			team[i].status();
		}
		break;
	case 2:
		break;
	case 3:
		break;
	case 4:
		exit();
	default:
	console.log("Opción invalida");
}

console.log("jiru jaru");