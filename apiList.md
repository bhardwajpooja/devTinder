
-- authRouter
POST /signup
POST /login
POST /logout


-- Profile Router
GET /profile/view
PATCH /profile/edit
PATCH /profile/password


-- Connection Request 
POST /request/send/interested/:userId
POST /request/send/ignored/:userId
POST /request/review/accepted/:userId
POST /request/review/rejected/:userId


GET user/connections
GET /requests/received
GET /feed -> gets the profile of other users on the platform


status: ignore/ interested, accepted, rejected

