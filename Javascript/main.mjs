import {Monster, nameGenerator} from './classes.mjs'; // importar clase
import fs from "fs"

const prompt = msg => { // magia negra
	fs.writeSync(1, String(msg));
	let s = '', buf = Buffer.alloc(1);
	while (buf[0] - 10 && buf[0] - 13)
		s += buf, fs.readSync(0, buf, 0, 1, 0);
	return s.slice(1);
}

// let userinput = prompt("weas: ");

console.log()
for (let i = 0; i < 50; i++) {
	console.log("	"+nameGenerator());
}
console.log()