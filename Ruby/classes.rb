class Ejemplo # clase
	attr_accessor :atributo_publico # convierte este atributo en publico
	def initialize(publico, privado) # constructor
		@atributo_publico = publico # el @ funciona como self en python
		@atributo_privado = privado
	end # funciones, if, for, clases y demas terminan con un "end"
	def print # metodo de instancia
		# puts es como print pero con "\n" al final
		puts "Este atributo es publico = #{@atributo_publico}"
		puts "Este atributo es privado = #{@atributo_privado}"
	end # end print
end # end Ejemplo