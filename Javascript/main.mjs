import { Ejemplo } from './classes.mjs'; // importar clase

let objeto = new Ejemplo("a", "b"); // instancia
objeto.print(); // metodo
console.log(objeto.atributo_publico); // accesible porque es publico
console.log(objeto.atributo_privado); // retorna undefined
