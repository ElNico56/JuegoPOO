require_relative "classes" # importar del archivo classes.rb

objeto = Ejemplo.new("a", "b") # instancia
objeto.print # metodo
puts objeto.atributo_publico # accesible porque es publico
puts objeto.atributo_privado # ERROR porque es privado