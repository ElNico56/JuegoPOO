require_relative "classes"

def prompt(msg)
	print(msg)
	gets
end

def wait()
	prompt("\nPresiona ENTER para continuar...\n")
end

def enemy_move(myself, enemy, choice)
	case (choice)
	when 1
		puts(enemy.get_name + " usa ATAQUE DEBIL")
		enemy.weak_attack(myself)
		wait()
	when 2
		puts(enemy.get_name + " usa ATAQUE FUERTE")
		enemy.strong_attack(myself)
		wait()
	when 3
		puts(enemy.get_name + " intenta BLOQUEAR")
		enemy.block()
		wait()
	when 4
		puts(enemy.get_name + " se pone a DESCANSAR")
		enemy.rest()
		wait()
	end
end

biomes = ["DESIERTO", "PANTANO", "BOSQUE"]
targets = ["TEMPLO", "CASTILLO"]
elements = ["FUEGO", "AGUA", "PLANTA"]

def battle(myself, enemy)
	won = false
	ended = false
	while (not ended)
		puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
		puts(myself.get_name + "\n HP: " + myself.get_hp.to_s + "\n STAMINA: " + myself.get_stamina.to_s)
		puts(enemy.get_name + "\n HP: " + enemy.get_hp.to_s + "\n STAMINA: " + enemy.get_stamina.to_s)
		puts("\nTus posibles acciones son:")
		option = prompt("1. Ataque debil\n2. Ataque fuerte\n3. Bloquear ataque\n4. Descansar\n5. Info\n > ").to_i
		enemy_choice = 0
		case (option)
		when 1
			puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
			puts(myself.get_name + " usa ATAQUE DEBIL")
			myself.weak_attack(enemy)
			wait()
			enemy_choice = rand(1..4)
			enemy_move(myself, enemy, enemy_choice)
		when 2
			puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
			puts(myself.get_name + " usa ATAQUE FUERTE")
			myself.strong_attack(enemy)
			wait()
			enemy_choice = rand(1..4)
			enemy_move(myself, enemy, enemy_choice)
		when 3
			puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
			puts(myself.get_name + " intenta BLOQUEAR")
			myself.block()
			wait()
			enemy_choice = rand(1..4)
			enemy_move(myself, enemy, enemy_choice)
		when 4
			puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
			puts(myself.get_name + " se pone a DESCANSAR")
			myself.rest()
			wait()
			enemy_choice = rand(1..4)
			enemy_move(myself, enemy, enemy_choice)
		when 5
			puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
			puts("Mi monstruo:")
			myself.status()
			puts("\nMonstruo salvaje:")
			enemy.status()
			wait()
		end
		if myself.is_defeated()
			won = false
			ended = true
			puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
			puts("Has perdido :(")
		end
		if enemy.is_defeated()
			won = true
			ended = true
			puts("\x1b[2J\x1b[1;1H--------------- BATALLA ---------------\n\n")
			puts("Has ganado :)")
			myself.rest(5)
		end
	end
	return won
end

puts("\x1b[2J\x1b[1;1H\x1b[96m")
puts("███╗   ███╗ █████╗ ███╗  ██╗ ██████╗████████╗███████╗██████╗  ██████╗██╗")
puts("████╗ ████║██╔══██╗████╗ ██║██╔════╝╚══██╔══╝██╔════╝██╔══██╗██╔════╝██║")
puts("██╔████╔██║██║  ██║██╔██╗██║╚█████╗    ██║   █████╗  ██████╔╝╚█████╗ ██║")
puts("██║╚██╔╝██║██║  ██║██║╚████║ ╚═══██╗   ██║   ██╔══╝  ██╔══██╗ ╚═══██╗╚═╝")
puts("██║ ╚═╝ ██║╚█████╔╝██║ ╚███║██████╔╝   ██║   ███████╗██║  ██║██████╔╝██╗")
puts("╚═╝     ╚═╝ ╚════╝ ╚═╝  ╚══╝╚═════╝    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝")
puts("\x1b[0m\nMONSTERS! es un juego de peleas por turnos donde controlas")
puts("un equipo de 4 monstruos contra una serie de monstruos")
puts("salvajes camino a tu destino.\n\n")
puts("Tu objetivo como su guía es darle ordenes a tus monstruos.")
puts("Atacar para debilitar a tus enemigos, bloquear sus ataques o descansar para recuperar fuerzas")
puts("para poder derrotar a cada enemigo.\n\n")

while true
	team = []
	team.push(Monster.new(name_generator(), "FUEGO"))
	team.push(Monster.new(name_generator(), "AGUA"))
	team.push(Monster.new(name_generator(), "PLANTA"))
	team.push(Monster.new(name_generator(), choose(elements)))
	biome = choose(biomes)
	target = choose(targets) + " DE " + name_generator
	enemies_left = 0
	chosen = 0
	
	option = prompt("1. Modo historia\n2. Modo arena\n3. Sobre el juego\n4. Salir\n > ").to_i
	
	case (option)
	when 1
		puts("\x1b[2J\x1b[1;1HElige la dificultad:")
		enemies_left = prompt("\n1. Facil\n2. Dificil\n > ").to_i
		if enemies_left.to_f.nan?
			enemies_left = 1
		end
		option = [1, option].max
		enemies_left *= 5
		
		puts("\x1b[2J\x1b[1;1HTu equipo consiste de:")
		for monster in team
			monster.status()
		end
		
		puts("\nEstás en un " + biome + ", tienes un largo camino por delante.")
		puts("Tu destino es el " + target + ", donde se rumorea está escondido un gran tesoro.")
		wait()
		
		while enemies_left > 0
			wild_element = choose(elements)
			if rand() > 0.25
				if biome == "DESERT"
					wild_element = "FUEGO"
				end
				if biome == "BOSQUE"
					wild_element = "PLANTA"
				end
				if biome == "PANTANO"
					wild_element = "AGUA"
				end
			end
			wild_monster = Monster.new(name_generator(), wild_element)
			puts("\x1b[2J\x1b[1;1HSe te acerca un monstruo salvaje:")
			wild_monster.status()
			
			puts("\nElige cual de tus monstruos vas a usar contra el (1-" + team.length().to_s + "):")
			for monster in team
				monster.status()
			end
			chosen = prompt("\n > ").to_i
			if chosen.to_f.nan?
				chosen = 1
			end
			chosen = [1, [team.length(), chosen].min].max
			chosen -= 1
			
			outcome = battle(team[chosen], wild_monster)
			if (not outcome)
				puts("\nLamentablemente, " + team[chosen].get_name() + " ya no está con nosotros.")
				team.delete_at(chosen)
			end
			
			wait()
			if (team.length() == 0)
				puts("\nSin tus monstruos, acabas sucumbiendo a los monstruos salvajes.")
				enemies_left = 0
				exit
			end
			enemies_left -= 1
		end
		puts("\x1b[2J\x1b[1;1HFinalmente, lograste llegar a tu objetivo, y el tesoro resultó ser " + choose(["una completa mentira\n", "totalmente real\n"]))
		exit
	when 2
		enemies_left = 0
		puts("\x1b[2J\x1b[1;1HTu equipo consiste de:")
		for monster in team
			monster.status()
		end
		puts("\nEstás en un " + biome + ", tienes un largo camino por delante.")
		puts("Rodeado de una horda interminable de monstruos, solo te queda sobrevivir.")
		wait()
		
		while true
			wild_monster = Monster.new(name_generator(), choose(elements))
			puts("\x1b[2J\x1b[1;1HSe te acerca un monstruo salvaje:")
			wild_monster.status()
			
			puts("\nElige cual de tus monstruos vas a usar contra el (1-" + team.length().to_s + "):")
			for monster in team
				monster.status()
			end
			chosen = prompt("\n > ").to_i
			if chosen.to_f.nan?
				chosen = 1
			end
			chosen = [1, [team.length(), chosen].min].max
			chosen -= 1
			
			outcome = battle(team[chosen], wild_monster)
			if (not outcome)
				puts("\nLamentablemente, " + team[chosen].getName() + " ya no está con nosotros.")
				team.delete_at(chosen)
			end
			
			enemies_left += 1
			puts("\nHas enfrentado a " + enemies_left.to_s + " monstruos")
			wait()
			if (team.length == 0)
				puts("\nSin tus monstruos, acabas sucumbiendo a los monstruos salvajes.")
				enemies_left = 0
				exit
			end
			if (enemies_left % 5 == 0)
				puts("\nUn monstruo salvaje se une a tu equipo.")
				team.push(Monster.new(name_generator(), choose(elements)))
				team[team.length - 1].status()
				wait()
			end
		end
	when 3
		puts("\x1b[2J\x1b[1;1H--- CREDITOS ---\n")
		puts("Codigo: Gohan Vergara")
		puts("Diseño: Nicolas Espejo, Gohan Vergara")
		wait()
	when 4
		puts("\x1b[2J\x1b[1;1HFIN\n")
		exit
	end
end
