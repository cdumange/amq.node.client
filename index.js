var util = require('util');

var urlAMQ = '/api/message/#queue#?type=queue';

const ParentWS = require('chcn.htmlhandler');

function AMQHandler(server,port,user, mdp){
  debug('type server : ');
  debug(typeof server);
  if (typeof server == 'object'){
    this.init(server);
    this.aut = "Basic " + new Buffer(server.user + ':' + server.mdp).toString("base64");
  }else {
    this.init(server, port);
    this.aut = "Basic " + new Buffer(user + ':' + mdp).toString("base64");
  }

}

util.inherits(AMQHandler, ParentWS);

AMQHandler.prototype.SendToAMQ = function(mess, queue, next){
  var url = urlAMQ.replace('#queue#', queue);
  return new Promise((resolve) => {
      resolve(this.POST(url, mess,next));
  });
}

AMQHandler.prototype.getFromAMQ = function(queue, next){
  var url = urlAMQ.replace('#queue#', queue);
  return new Promise((resolve) => {
      resolve(this.GET(url, next));
  });
}

function debug(text){
  if (process.env.debug)
    console.log(text);
}

module.exports = AMQHandler;
