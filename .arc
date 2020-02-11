@app
tacos-y4f

@static

@http
get /
post /shorten
get /l/:id

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
