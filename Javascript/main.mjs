import { Ejemplo } from './classes.mjs'; // importar clase
import readline from './imported_modules.js' // leer linea

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

let objeto = new Ejemplo("a", "b"); // instancia
objeto.print(); // metodo
console.log(objeto.atributo_publico); // accesible porque es publico
console.log(objeto.atributo_privado); // retorna undefined

let userInput = "";
rl.question("What is your name\n", function (string) { userInput = string; rl.close(); });