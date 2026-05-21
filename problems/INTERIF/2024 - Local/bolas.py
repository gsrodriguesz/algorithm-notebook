k = int(input())
dp = [0]*(k+1)

dp[1] = 1
dp[2] = 2
dp[3] = 4

def calculo(n):
    if dp[n] == 0:
        return  dp[n-1] + dp[n-2] + dp[n-3]
    else:
        return dp[n]

for i in range(1, k+1):
    dp[i] = calculo(i)

print(dp[k])