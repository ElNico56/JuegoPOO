function randomInt(min, max) { // retorna un entero entre min y max inclusivo
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export class Monster {
	name;
	element; // uno de [fuego, agua, planta]
	#isBlocking;
	#hp;
	#attack;
	#defense;
	#stamina;
	constructor(name, element) {
		this.name = name;
		this.element = element;
		this.#isBlocking = false;
		this.#hp = 100;
		this.#attack = randomInt(5, 15);
		this.#defense = randomInt(0, 5);
		this.#stamina = 5;
	}
	weakAttack(enemy) {
		if (this.#stamina > 0) {
			ammount = this.#attack + randomInt(-1, 1);
			if (this.element == "Agua" && enemy.element == "Fuego") { // fuego <-- planta <-- agua <-- fuego
				ammount += 5;
			}
			if (this.element == "Fuego" && enemy.element == "Planta") { // fuego <-- planta <-- agua <-- fuego
				ammount += 5;
			}
			if (this.element == "Planta" && enemy.element == "Agua") { // fuego <-- planta <-- agua <-- fuego
				ammount += 5;
			}
			enemy.damage(ammount);
			this.#stamina -= 1;
		}
	}
	strongAttack(enemy) {
		if (this.#stamina > 1) {
			ammount = this.#attack + randomInt(9, 11);
			if (this.element == "Agua" && enemy.element == "Fuego") { // fuego <-- planta <-- agua <-- fuego
				ammount += 10;
			}
			if (this.element == "Fuego" && enemy.element == "Planta") { // fuego <-- planta <-- agua <-- fuego
				ammount += 10;
			}
			if (this.element == "Planta" && enemy.element == "Agua") { // fuego <-- planta <-- agua <-- fuego
				ammount += 10;
			}
			enemy.damage(ammount);
			this.#stamina -= 2;
		}
	}
	damage(amount) {
		if (!this.#isBlocking) {
			this.#hp -= amount + this.#defense;
			if (this.#hp < 0) {
				this.#hp = 0;
			}
		}
		this.#isBlocking = false;
	}
	block() {
		this.#isBlocking = true;
	}
	rest() {
		this.#stamina += 1;
		this.#hp += 5;
	}
}