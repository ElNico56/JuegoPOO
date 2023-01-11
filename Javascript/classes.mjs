export function randomInt(min, max) { // retorna un entero entre min y max inclusivo
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function choose(list) { // elegir un elemento random de una lista
	return list[Math.floor(Math.random() * list.length)];
}

export function nameGenerator() { // generar nombres
	const CONSONANTS = ["M", "N", "P", "T", "K", "S", "W", "L", "J", "CH", "R", "TR", "PR"];
	const VOWELS = ["A", "E", "I", "O", "U", "AI", "EI", "OU", "OI"];
	let name = "";
	for (let i = 0; i < randomInt(2, 3); i++) { // genera silabas, para asegurar que los nombres sean pronunciables
		name += choose(CONSONANTS) + choose(VOWELS);
	}
	return name;
}

export class Monster {
	#name;
	#element; // uno de [fuego, agua, planta]
	#isBlocking;
	#hp;
	#maxHp;
	#attack;
	#defense;
	#stamina;
	#maxStamina;
	constructor(name, element) {
		this.#name = name;
		this.#element = element;
		this.#isBlocking = false;
		this.#hp = 100;
		this.#maxHp = 100;
		this.#attack = randomInt(5, 10);
		this.#defense = randomInt(5, 10);
		this.#stamina = 5;
		this.#maxStamina = 10;
	}
	getName() {
		let color = "";
		if (this.#element == "FUEGO") {
			color = "\x1b[91m";
		} else if (this.#element == "PLANTA") {
			color = "\x1b[92m";
		} else {
			color = "\x1b[94m";
		}
		return color + this.#name + "\x1b[0m";
	}
	getElement() {
		return this.#element;
	}
	getHP() {
		return this.#hp;
	}
	getStamina() {
		return this.#stamina;
	}
	isDefeated() {
		return this.#hp <= 0;
	}
	weakAttack(enemy) {
		if (this.#stamina > 0) {
			let amount = this.#attack + randomInt(-1, 1);
			// fuego <-- planta <-- agua <-- fuego
			if (this.#element == "AGUA" && enemy.getElement() == "FUEGO") {
				amount += 5;
			}
			if (this.#element == "FUEGO" && enemy.getElement() == "PLANTA") {
				amount += 5;
			}
			if (this.#element == "PLANTA" && enemy.getElement() == "AGUA") {
				amount += 5;
			}
			enemy.damage(amount);
			this.#stamina -= 1;
		}
		this.#isBlocking = false;
	}
	strongAttack(enemy) {
		if (this.#stamina > 1) {
			let amount = this.#attack + randomInt(9, 11);
			// fuego <-- planta <-- agua <-- fuego
			if (this.#element == "AGUA" && enemy.getElement() == "FUEGO") {
				amount += 10;
			}
			if (this.#element == "FUEGO" && enemy.getElement() == "PLANTA") {
				amount += 10;
			}
			if (this.#element == "PLANTA" && enemy.getElement() == "AGUA") {
				amount += 10;
			}
			enemy.damage(amount);
			this.#stamina -= 2;
		}
		this.#isBlocking = false;
	}
	damage(amount) {
		if (!this.#isBlocking) {
			this.#hp -= amount;
			if (this.#hp < 0) {
				this.#hp = 0;
			}
		} else {
			this.#hp -= Math.max(0, amount - this.#defense);
			if (this.#hp < 0) {
				this.#hp = 0;
			}
		}
		this.#isBlocking = false;
	}
	block() {
		if (this.#stamina > 0) {
			this.#isBlocking = true;
			this.#stamina -= 1;
		}
	}
	rest(multiplier = 1) {
		this.#stamina += 1 * multiplier;
		this.#hp += 2 * multiplier;
		if (this.#stamina > this.#maxStamina) {
			this.#stamina = this.#maxStamina;
		}
		if (this.#hp > this.#maxHp) {
			this.#hp = this.#maxHp;
		}
		this.#isBlocking = false;
	}
	status() {
		let color = "";
		if (this.#element == "FUEGO") {
			color = "\x1b[91m";
		} else if (this.#element == "PLANTA") {
			color = "\x1b[92m";
		} else {
			color = "\x1b[94m";
		}
		console.log("\n~+~ " + this.#name + " ~+~");
		console.log(" - Elemento: " + color + this.#element + "\x1b[0m");
		console.log(" - Ataque: " + this.#attack);
		console.log(" - Defensa: " + this.#defense);
	}
}
