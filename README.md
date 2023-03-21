Express
Mysql


Route:
`GET /users/getUser` : Get all User

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
