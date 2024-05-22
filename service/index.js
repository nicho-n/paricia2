var {runServer, dbConnect, stopServer} = require('./server')
let port = 5000;
let server = runServer(port, true);
