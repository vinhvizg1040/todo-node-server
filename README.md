Express
Mysql


Route:

<br />

`GET /users/getUser` : Get all User

<br />

`POST /users/createUser` : 
+ Use with json
json format example: 
` 
{
    "username": "user",
    "password": "password"
}
`
+ Validate: with express-validator
