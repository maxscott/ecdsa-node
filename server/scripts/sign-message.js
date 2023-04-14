const buildMessage = require('../lib/message-builder');
const verifyMessage = require('../lib/verify-message');

function log(a) {
  console.log(a);
  return a;
}

const message = process.argv[2];
const privateKey = process.argv[3];

const output = log(buildMessage(message, privateKey));

if (!verifyMessage(output)) {
  throw new Error('Invalid message!')
}
