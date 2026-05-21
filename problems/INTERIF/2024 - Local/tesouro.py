import math

def area(a,b,c):
    s = (a+b+c)/2
    return ((s-a)*(s-b)*(s-c)*s)**0.5

n = int(input())
points = []

for _ in range(n+1):
    points.append(list(map(int, input().split())))

if points.count(points[-1]) > 1:
    print('DENTRO')
else:


    area_total=0

    for i in range(0,n):
        a = math.dist(points[i], points[i+1])
        b = math.dist(points[i], points[-1])
        c = math.dist(points[i+1], points[-1])
        area_total += area(a,b,c)

    a = math.dist(points[0], points[2])
    b = math.dist(points[0], points[-1])
    c = math.dist(points[-2], points[-1])
    area_total += area(a,b,c)

    area_esperada = 0
    for i in range(1,n):
        a = math.dist(points[i], points[i+1])
        b = math.dist(points[i], points[0])
        c = math.dist(points[i+1], points[0])
        area_esperada += area(a,b,c)

    a = math.dist(points[-2], points[1])
    b = math.dist(points[-2], points[0])
    c = math.dist(points[1], points[0])
    area_esperada += area(a,b,c)

    print(area_esperada, area_total)

    if area_total > area_esperada:
        print("FORA")
    else:
        print("DENTRO")