# Endpoints Wallet-Backend

### Create a new client

```http
[POST] /api/v1/client
```

request [body]:

```
	{
		"fullName": "New Client",
		"email": "client.new@mail.com",
		"phone": "3216549870",
		"photo":"https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
	}
```

response [201] :

```
	{
		"id": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"fullName": "New Client",
		"email": "client.new@mail.com",
		"phone": "3216549870",
		"photo":"https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
	}
```

#### [pipe]

ValidationPipe / class-validator [CreateClientDTO]

#### [services]

ClientService / createNewClient(newClientData: CreateClientDTO)

### Get Client Info by Email

```http
  [GET] /api/v1/client/:email
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [200] :

```
	{
		"id": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"fullName": "New Client",
		"email": "client.new@mail.com",
		"phone": "3216549870",
		"photo":"https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
		"appColor":'#1554F6'
	}
```

#### [guard]

ClientTokenGuard / email [ClientDTO] token [bearrer token]

#### [services]

ClientService / getClientByEmail(email: string)
AppService / getColorByClientId(cliId: UUID)

### Get account info (Balance and last 10 movements) by client id

```http
  [GET] /api/v1/account/:clientId
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

```
response [200] :
{
	"balance": 123000000,
	"credit": 50000000,
	"id":"b146b149-bd56-4877-a518-5abbdac01557",
	"cliId":"f3689626-8b1d-439c-9696-5bcad7e5fe75",
	"movements":[
		{
			"id": "b146b149-bd56-4877-a518-5abbdac01557",
			"idIncome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
			"idOutcome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
			"reason": "this is the reason",
			"amount": 10000,
			"fees": 1,
			"dateTime": "22/06/2022 13:55"
		},
		{
			"id": "8fd1a8e3-5147-473f-840f-62981b808a0c",
			"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
			"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
			"reason": "this is other reason",
			"amount": 10000,
			"fees": 1,
			"dateTime": "22/10/2022 13:55"
		}
	]
}
```

#### [guard]

ClientTokenGuard / email [ClientDTO] token [bearrer token]

#### [services]

AccountService / getAcountByClientId(clientId: string)

MovementService / getMovements(accId: UUID)

### Create a new Movement-Loan

```http
[POST] /api/v1/loan
```

request [body]:

```
	{
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"reason": "Loan",
		"amount": 1
		"fees": 60
	}
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [201] :

```
	{
		"id": "8fd1a8e3-5147-473f-840f-62981b808a0c",
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
		"reason": "Loan",
		"amount": 1
		"fees": 60
		"dateTime": "22/10/2022 13:55"
	}
```

#### [pipe]

ValidationPipe / class-validator [CreateMovementDTO]

#### [services]

MovementService / createNewMovement(newMovementData: CreateMovementDTO)

AccountService / updateBalance(idIncome: string, idOutcome: string, amount: number)

### Create a new Movement-Payment

```http
[POST] /api/v1/payment
```

request [body]:

```
	{
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
		"reason": "Payment",
		"amount": 1
		"fees": 1
	}
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [201] :

```
	{
		"id": "8fd1a8e3-5147-473f-840f-62981b808a0c",
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
		"reason": "Loan",
		"amount": 1
		"fees": 60
		"dateTime": "22/10/2022 13:55"
	}
```

#### [pipe]

ValidationPipe / class-validator [CreateMovementDTO]

#### [services]

MovementService / createNewMovement(newClientData: CreateMovementDTO)

AccountService / updateBalance(idIncome: string, idOutcome: string, amount: number)

### Change App´s Theme Color

```http
  [PUT] /api/v1/client/theme
```

request [body]:

```
	{
		"cliId":
		"color": "Updated Patch"
	}
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [200] :

```
	{
		"cliId":
		"color": "Updated Patch"
	}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

# Endpoints Wallet-Backend

### Create a new customer

```http
[POST] /api/v1/client
```

request [body]:

```
	{
		"fullName": "New Client",
		"email": "client.new@mail.com",
		"phone": "3216549870",
		"photo":"https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
	}
```

response [201] :

```
	{
		"id": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"fullName": "New Client",
		"email": "client.new@mail.com",
		"phone": "3216549870",
		"photo":"https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
	}
```

#### [pipe]

ValidationPipe / class-validator [CreateClientDTO]

#### [services]

ClientService / createNewClient(newClientData: CreateClientDTO)

### Get Client Info by Email

```http
  [GET] /api/v1/client/:email
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [200] :

```
	{
		"id": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"fullName": "New Client",
		"email": "client.new@mail.com",
		"phone": "3216549870",
		"photo":"https://s.gravatar.com/avatar/875605e74d1bad33faa12f1e7ae1b155?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fju.png"
		"appColor":'#1554F6'
	}
```

#### [guard]

ClientTokenGuard / email [ClientDTO] token [bearrer token]

#### [services]

ClientService / getClientByEmail(email: string)
AppService / getColorByClientId(cliId: UUID)

### Get account info (Balance and last 10 movements) by client id

```http
  [GET] /api/v1/account/:clientId
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

```
response [200] :
{
	"balance": 123000000,
	"credit": 50000000,
	"id":"b146b149-bd56-4877-a518-5abbdac01557",
	"cliId":"f3689626-8b1d-439c-9696-5bcad7e5fe75",
	"movements":[
		{
			"id": "b146b149-bd56-4877-a518-5abbdac01557",
			"idIncome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
			"idOutcome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
			"reason": "this is the reason",
			"amount": 10000,
			"fees": 1,
			"dateTime": "22/06/2022 13:55"
		},
		{
			"id": "8fd1a8e3-5147-473f-840f-62981b808a0c",
			"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
			"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
			"reason": "this is other reason",
			"amount": 10000,
			"fees": 1,
			"dateTime": "22/10/2022 13:55"
		}
	]
}
```

#### [guard]

ClientTokenGuard / email [ClientDTO] token [bearrer token]

#### [services]

AccountService / getAcountByClientId(clientId: string)

MovementService / getMovements(accId: UUID)

### Create a new Movement-Loan

```http
[POST] /api/v1/loan
```

request [body]:

```
	{
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"reason": "Loan",
		"amount": 1
		"fees": 60
	}
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [201] :

```
	{
		"id": "8fd1a8e3-5147-473f-840f-62981b808a0c",
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
		"reason": "Loan",
		"amount": 1
		"fees": 60
		"dateTime": "22/10/2022 13:55"
	}
```

#### [pipe]

ValidationPipe / class-validator [CreateMovementDTO]

#### [services]

MovementService / createNewMovement(newMovementData: CreateMovementDTO)

AccountService / updateBalance(idIncome: string, idOutcome: string, amount: number)

### Create a new Movement-Payment

```http
[POST] /api/v1/payment
```

request [body]:

```
	{
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
		"reason": "Payment",
		"amount": 1
		"fees": 1
	}
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [201] :

```
	{
		"id": "8fd1a8e3-5147-473f-840f-62981b808a0c",
		"idIncome": "1ddc64c0-56c0-40e0-83ee-16da62a4042f",
		"idOutcome": "f3689626-8b1d-439c-9696-5bcad7e5fe75",
		"reason": "Loan",
		"amount": 1
		"fees": 60
		"dateTime": "22/10/2022 13:55"
	}
```

#### [pipe]

ValidationPipe / class-validator [CreateMovementDTO]

#### [services]

MovementService / createNewMovement(newClientData: CreateMovementDTO)

AccountService / updateBalance(idIncome: string, idOutcome: string, amount: number)

### Change App´s Theme Color

```http
  [PUT] /api/v1/theme
```

request [body]:

```
	{
		"cliId":"8fd1a8e3-5147-473f-840f-62981b808a0c",
		"color": "#ff0000" 
	}
```

headers [bearrer token]:

```
	{
		"token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imh3NDdYeF9KSUJnamJiWUFmb1k1cSJ9.eyJuaWNrbmFtZSI6Imp1bGlhbi5sYXNzbyIsIm5hbWUiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvODc1NjA1ZTc0ZDFiYWQzM2ZhYTEyZjFlN2FlMWIxNTU_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZqdS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMi0xMS0yOFQxMzo1MTozNi4yOTFaIiwiZW1haWwiOiJqdWxpYW4ubGFzc29AcHJvdG9ubWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOi8vZGV2LTBndnBsY3VqMWd0Y3dyYXkudXMuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYzODRiY2U4Y2U1MDgyYTUwMmUwNjAxOCIsImF1ZCI6InVDMU5KNEw3S3EyNldZaGdpc1FWZHdoTHNMdDdzb2tMIiwiaWF0IjoxNjY5NjQzNDk3LCJleHAiOjE2Njk2NDcwOTcsInNpZCI6Im5HQmt4eWxMcHRRdzJEYmxIRkdPc3NrNXljR3oyMTJ0In0.bTEiCLs /
		JQYftHt8CfPQhhFeGc4lsMW5Rb-UMM3A5gKLr6hZn0OfWOc6XR2iOfQw-Mwgh74ds1O3k1_pTrtA43dCnbUuFxyOcOdyCVRQi724X_0W6pZER3p6zohxMhEc0upwhYoUa_p-Wb5VWHWQe-VUAu6qYDNbfyEnopb6_DhBdNeIPW9r52Y76dPXiubtzBNBmipssgC5AoP1yylxGh2s1CqWZHu_PDG-W-Ie1fRjEiMc2X2sFnX6Qj581zamsREGQeq-5qSqX0cBMmgssCjuksJPhDcv8mOmAD8RH6B11f4hyh4rVgyiN1ypfbnc3JkY6mFJnDePE2KMjXrhVHA",
	}
```

response [200] :

```
	{
		"cliId":"8fd1a8e3-5147-473f-840f-62981b808a0c",
		"color": "#ff0000" 
	}
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

