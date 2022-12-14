export class Ejemplo {
	atributo_publico;
	#atributo_privado;
	constructor(publico, privado) {
		this.atributo_publico = publico; // this es como self en python
		this.#atributo_privado = privado; // la # define la baina como privada
	} // los bloques de codigo empiezan y terminan con corchetes
	print() { // metodo
		console.log("Este atributo es publico = " + this.atributo_publico);
		console.log("Este atributo es privado = " + this.#atributo_privado);
	}
}
