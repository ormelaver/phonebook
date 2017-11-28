# phonebook
A simple backend phonebook app.
Supports the following REST methods:
1. HTTP GET http://<server_address>/<id>     
 - fetch contact by id
2. HTTP POST http://<server_address>  with Body  { name: <name>, phone: <phone>, address: <address> }
 - add a contact to our book, the returned value is the id.
3. HTTP GET http://<server_address>/search?search=<search phrase>
 - performs a search within all the contacts and return all the matches.
