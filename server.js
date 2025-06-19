require('dotenv').config();
const http = require('http');

const app = require('./app');

//normaliser le port : le mettre dans le bon format
const normalizePORT = val => {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePORT(process.env.PORT || '5000');
app.set('port', port);

//pour gerer  les erreurs courantes
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe' + address : 'port: '+ port;
  //pour intercepter les différentes erreur
  switch (error.code) {
    //pour intercepter les différentes erreur de privilège
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
      // pour intercepter les différentes erreur de droit d'accès
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
    default:
      throw error;
  }
};


const server = http.createServer(app)

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe' + address : 'port '+ port;
  console.log('Listening on ' + bind);
});

server.listen(port);
