curl \
  --header "Content-Type: application/json " \
  -X POST \
  --data '{ "data"  :  { "sender" : "pepin" , "msg" : "im pepin, you kill my father, prepare to die" }  }' \
  http://localhost/api/mail2



curl -d '{"data":{ "sender" : "pepin" , "msg" : "im pepin, you kill my father, prepare to die" }}' -H "Content-Type: application/json" -X POST http://localhost/api/mail2
