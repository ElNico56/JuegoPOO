class Monsters
	attr_accessor :name
	attr_accessor :element
	
	def initialize(name, element)
		@name = name
		@element = element
		@is_blocking = false
		@hp = 100
		@attack = rand(5..15)
		@defense = rand(0..5)
		@stamina = 5
	end
	
	def weak_atack(enemy)
		if @stamina > 0
			amount = @attack + (rand(0..2) - 1)
			if (@element == "AGUA" and enemy.element == "FUEGO")
				amount += 5
			end
			if (@element == "FUEGO" and enemy.element == "PLANTA")
				amount += 5
			end
			if (@element == "PLANTA" and enemy.element == "AGUA")
				amount += 5
			end
			enemy.damage(amount)
			@stamina -= 1
		end
	end
	
	def strong_atack(enemy)
		if @stamina > 1
			amount = @attack + (rand(9..11))
			if (@element == "AGUA" and enemy.element == "FUEGO")
				amount += 10
			end
			if (@element == "FUEGO" and enemy.element == "PLANTA")
				amount += 10
			end
			if (@element == "PLANTA" and enemy.element == "AGUA")
				amount += 10
			end
			enemy.damage(amount)
			@stamina -= 2
		end
	end
	
	def damage(amount)
	end
	
	def block()
	end
	
	def rest()
	end
end
