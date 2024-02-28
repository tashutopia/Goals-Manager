# Goals-Manager

raw-testing:

- made the html, css, js files
- got the CORS error and fixing with node express server

node-testing:

- created server.js
- created public folder and added raw files there
- ran `npm install express`
- ran `node server.js`
- tried to edit goals.csv from server but can't be done with client-side js
- created a mongodb cluster
- ran `npm install mongodb`
- ran `npm install mongoose`
- added code to connect to the cluster

MongoDB nuaces learned:

- make sure in the uri to specify the collection with `/collection` or it will default to a collection called `test`
- specify the collection within that further with `{ collection: 'Goals' }`
- the String should be the same as the collection here `const Data = mongoose.model('Goals', dataSchema);`
