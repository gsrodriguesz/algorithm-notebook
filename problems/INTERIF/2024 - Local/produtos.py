def isPrime(n):
    if n <= 1:
        return False
    for k in range(1, int(n**0.5), 1):
        if n//k == 0:
            return True
    return False

min, max = list(map(int, input().split()))

for i in range(max, min, -1):
    if isPrime(i):
        print(i)
        exit()