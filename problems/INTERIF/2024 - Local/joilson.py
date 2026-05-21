linhas, colunas = list(map(int, input().split()))
matriz = []

matriz.append([0 for _ in range(colunas+2)])

for _ in range(linhas):
    aux = list(map(int, input().split()))
    aux.append(0)
    aux.insert(0, 0)
    matriz.append(aux)

matriz.append([0 for _ in range(colunas+2)])

vazios = []
for i in range(1, len(matriz)-1):
    for k in range(1, len(matriz[i])-1):
        if matriz[i][k] == 0:
            vazios.append([i-1, k-1])


vaziosC = []

for i in range(len(vazios)):
    x, y = vazios[i]
    x+=1
    y+=1
    print(x,y)
    contador = 0
    
    contador += 1 if matriz[x-1][y-1] == 1 else 0
    contador += 1 if matriz[x-1][y] == 1 else 0
    contador += 1 if matriz[x-1][y+1] == 1 else 0
    contador += 1 if matriz[x][y-1] == 1 else 0
    contador += 1 if matriz[x][y+1] == 1 else 0
    contador += 1 if matriz[x+1][y-1] == 1 else 0
    contador += 1 if matriz[x+1][y] == 1 else 0
    contador += 1 if matriz[x+1][y+1] == 1 else 0

    vaziosC.append(contador)

print(vazios)
print(vaziosC)

print(min(vaziosC))
for k in range(len(vaziosC)):
    if vaziosC[k] == min(vaziosC):
        print((vazios[k][0]*colunas)+(vazios[k][1]+1))