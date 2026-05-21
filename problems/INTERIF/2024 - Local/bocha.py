entradas = [float(input()) for _ in range(3)]

if count(max(entradas)) > 1:
    print("Empatou")
    exit()

if max(entradas) == entradas[0]:
    print('Equipe A ganhou')
elif max(entradas) == entradas[1]:
    print('Equipe B ganhou')
elif max(entradas) == entradas[2]:
    print('Equipe C ganhou')