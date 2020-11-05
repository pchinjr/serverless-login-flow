@app
begin-app

@events
registered

@http
get /
get /register
post /register
get /admin
get /logout
get /login
post /login
get /verify/:token
get /reset
post /reset
get /reset/:token
post /register/nuke
post /reset-password

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
