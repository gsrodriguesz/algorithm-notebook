entrada = input().split('/')

out = ''

for i in range(len(entrada)):
    line = ''
    for k in range(len(entrada[i])):
        if entrada[i][k].isdecimal():
            for j in range(int(entrada[i][k])):
                line += '| '
        else:
            line += f'|{entrada[i][k]}'
    
    line += '|\n'
    out += line

print(out)