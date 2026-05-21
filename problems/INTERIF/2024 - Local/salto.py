ncomps = int(input())
nsaltos = int(input())

comps = []
saltos = []

for i in range(ncomps):
    comps.append(input())
    compSaltos = []
    for k in range(nsaltos):
        aux = input()
        if len(aux.split()) == 1:
            compSaltos.append(float(aux.split()[0]))
        else:
            compSaltos.append(0)
    saltos.append(max(compSaltos))

maxS = saltos.index(max(saltos))
print(comps[maxS])
print(f'{saltos[maxS]:.2f}')