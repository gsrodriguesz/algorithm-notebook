# Não finalizado

nComp = int(input())
competidor = []
pontos = []

for comp in range(nComp):
    competidor.append(input())
    aux = input()
    aux2 = []
    for k in range(len(aux)):
        aux2.append(aux[k])
    pontos.append(aux2)

for i in range(nComp):
    total = 0
    competidor[i] += ' : '
    for k in range(0, len(pontos[i]),2):
        
        # strike
        if pontos[i][k] == 'X' or pontos[i][k+1] == 'X':
            if pontos[i][k] == 'X':
                total += 10 + int(pontos[i][k+1])
            else:
                total += 10 + int(pontos[i][k])
            
        # spare
        elif int(pontos[i][k]) + int(pontos[i][k+1]) == 10:
            total += int(pontos[i][k]) + int(pontos[i][k+1]) + int(pontos[i][k+2])
        
        # comum
        else:
            total += int(pontos[i][k])+int(pontos[i][k+1])

            competidor[i] += f'|{total}'

    competidor[i] += f' Total = {total}\n'

print(*competidor)


# 10 frames
# em cada frame, até 2 tentativas, para derrubar 10 pinos

# 10 pinos na 1° = strike
# 10 pinos na 2° = spare

# se não strike nem spare, pontuação = pinos derrubados
