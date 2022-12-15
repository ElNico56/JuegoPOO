require "ruby2d"

set title: "Hello Triangle"
set width: 1280, height: 720

tri = Triangle.new(
  x1: 320, y1: 50,
  x2: 540, y2: 430,
  x3: 100, y3: 430,
  color: ["#ff0000", "#00ff00", "#0000ff"],
)

on :key do |event|
  # puts event.key
  case event.key
  when "up"
    tri.y1 -= 10
    tri.y2 -= 10
    tri.y3 -= 10
  when "left"
    tri.x1 -= 10
    tri.x2 -= 10
    tri.x3 -= 10
  when "down"
    tri.y1 += 10
    tri.y2 += 10
    tri.y3 += 10
  when "right"
    tri.x1 += 10
    tri.x2 += 10
    tri.x3 += 10
  else
  end
end

update do
end

show
