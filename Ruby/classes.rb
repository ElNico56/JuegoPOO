def choose(list)
    return list[rand(1..list.length) - 1]
end

def name_generator()
    consonants = ["M", "N", "P", "T", "K", "S", "W", "L", "J", "CH", "R", "TR", "PR"]
    vowels = ["A", "E", "I", "O", "U", "AI", "EI", "OU", "OI"]
    name = ""
    for i in 0..rand(2..3) do
        name += choose(consonants) + choose(vowels)
    end
    return name
end 

class Monster

    def initialize(name, element, level = 0)
        @name = name
        @element = element
        @is_blocking = false
        @hp = 100 + 25 * level
        @max_hp = 100 + 25 * level
        @attack = rand(5..15) + level
        @defense = rand(0..5) + level
        @stamina = 5
        @max_stamina = 10
    end

    def get_name()
        color = ""
        if @element == 'FUEGO'
            color = "\x1b[91m"
        elsif @element == 'PLANTA'
            color = "\x1b[92m"
        elsif @element == 'AGUA'
            color = "\x1b[94m"
        end
        return color + @name + "\x1b[0m"
    end

    def get_element()
        return @element
    end

    def get_hp()
        return @hp
    end

    def get_stamina()
        return @stamina
    end

    def is_defeated()
        return @hp <= 0
    end

    def weak_attack(enemy)
        if @stamina > 0
            amount = @attack + rand(-1..1)
            if (@element == 'AGUA' and enemy.get_element == 'FUEGO')
                amount += 5
            end
            if (@element == 'FUEGO' and enemy.get_element == 'PLANTA')
                amount += 5
            end    
            if (@element == 'PLANTA' and enemy.get_element == 'AGUA')
                amount += 5
            end
            enemy.damage(amount)
            @stamina -= 1   
        end
        @is_blocking = false
    end

    def strong_attack(enemy)
        if @stamina > 1
            amount = @attack + rand(9..11)
            if (@element == 'AGUA' and enemy.get_element == 'FUEGO')
                amount += 10
            end
            if (@element == 'FUEGO' and enemy.get_element == 'PLANTA')
                amount += 10
            end    
            if (@element == 'PLANTA' and enemy.get_element == 'AGUA')
                amount += 10
            end
            enemy.damage(amount)
            @stamina -= 2
        end
        @is_blocking = false
    end

    def damage(amount)
        if not @is_blocking
            @hp -= amount
            if @hp < 0
                @hp = 0
            end
        else
            @hp -= amount - @defense
            if @hp < 0
                @hp = 0
            end
        end 
    end

    def block()
        if @stamina > 0
            @is_blocking = true
            @stamina -= 1
        end 
    end

    def rest(multiplier = 1)
        @stamina += 1 * multiplier
        @hp += 2 * multiplier
        if @stamina > @max_stamina
            @stamina = @max_stamina
        end
        if @hp > @max_hp
            @hp = @max_hp
        end
        @is_blocking = false
    end

    def status()
        color = ""
        if @element == 'FUEGO'
            color = "\x1b[91m"
        elsif @element == 'PLANTA'
            color = "\x1b[92m"
        elsif @element == 'AGUA'
            color = "\x1b[94m"
        end
        puts("\n~+~ " + @name + " ~+~")
        puts(" - Elemento: " + color + @element + "\x1b[0m")
        puts(" - Ataque: " + @attack.to_s)
        puts(" - Defensa: " + @defense.to_s)
    end
end
