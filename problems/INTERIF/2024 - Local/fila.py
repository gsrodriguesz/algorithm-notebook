normal =[]
prioritario = []

run = 0
while True:
    if run > 0 and (len(normal) + len(prioritario) == 0):
        exit()
    comando = input().split()

    if comando[0] == 'CHEGADA':
        if int(comando[2]) > 54:
            prioritario.append(comando[1])
        else:
            normal.append(comando[1])
    elif comando[0] == 'ATENDIMENTO':
        if len(prioritario) > 0:
            print(prioritario[0])
            prioritario.pop(0)
        else:
            print(normal[0])
            normal.pop(0)
    run += 1
