
Express
Mysql
JWT

Route:

`GET /admin/getUser` : Get all User

`POST /users/createUser` : 
+ Use with json
json format example: `{ "username": "user","password": "password" }`
+ Validate: with express-validator
+ Return: `{ "token": "token" }`

`POST /users/register` :
+ Use with json
json format example: `{ "username": "user","password": "password" }`
+ Validate: with express-validator
+ Return: `{ "token": "token" }`

`POST /users/login`:
+ Use with json
json format example: `{ "username": "user","password": "password" }`
+ Validate: with express-validator
+ Return: `{ "token": "token" }`

`POST /users/logout`:
+ Remove `token`
