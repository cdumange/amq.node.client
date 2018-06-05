const assert = require('assert');
const AMQHandler = require('../index');

const config = {
  'address' : 'chcn-amq',
  'port' : "8161",
  'user' : 'admin',
  'mdp' : 'admin'
};

const QUEUE_TEST = 'test';
process.env.debug = true;

describe('test de l\'AMQHAndler', () => {
  let amqClt = null;
  before(() => {
    amqClt = new AMQHandler(config);
  });

  it('test POST', async() => {
    let ret = await amqClt.SendToAMQ('test', QUEUE_TEST);
    console.
    assert(ret != undefined);
    assert(ret.code == 200);
  });

  it('test GET', async() => {
    let ret = await amqClt.getFromAMQ(QUEUE_TEST);
    assert(ret != undefined);
    assert(ret.code == 200);
  })
})
