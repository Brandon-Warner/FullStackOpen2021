NEW NOTE:
browser --> user: browser contains a form element for new note input

user --> browser: user inputs information to form and clicks submit

browser --> server: user input event is, first, an HTTP POST request to server address 'new_note'

server --> browser: new HTTP GET requesting address to 'notes' (address defined in header)

notes on browser: browser reloads note page

browser --> server: HTTP GET fetches the main.css, main.js, and data.json files now with the form data that was submitted

server --> browser: main.css, main.js, data.json

note on browser: form tag has attribute so when form is submitted, it is done as an HTTP Post to 'new_note'

browser to server: HTTP Post to 'new_note'

note on server: server code POST to the array note displaying content and date

server --> browser: 'new_note' object is added to array 'notes'

//

SINGLE PAGE APP:
browser --> server: HTTP GET request URL for /exampleapp/spa
server --> browser: /exampleapp/spa

browser --> server: HTTP GET request for /exampleapp/main.css
server --> browser: main.css

browser --> server: HTTP GET request for /exampleapp/spa.js
server --> browser: spa.js

browser --> server: HTTP GET request for /exampleapp/data.json
server --> browser: data.json

browser --> server: HTTP GET request for /exampleapp/favicon.ico
server --> browser: favicon.ico

//

SPA NEW NOTE:
browser --> user: browser contains a form element for new note input

user --> browser: user inputs information to form and clicks submit

broswer --> server: POST request to address 'new_note_spa' which includes date and content as elements of object (JSON)

note on server: no further redirect, browser stays on the same page

note on browser: JavaScript code in browser via event handler pushed the 'note' to the end of the array 'notes' and is then displayed as the last list item on the page
