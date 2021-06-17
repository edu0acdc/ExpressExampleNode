# ExpressExampleNode

A simple server that handles HTTP Requests (REST API)
and use MongoDB as Database


This REST API focus on login/register service with 4 endpoints

GET URL/users -> List all users
GET URL/users/:id -> List user info
POST URL/users/login -> Login service (email/username auto-detect)
POST URL/users/register -> Register service

Passwords are salted and hashed before going to MongoDB.
A custom middleware is used to inform server manager of incoming requests.

