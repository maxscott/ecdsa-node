const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');
const { keccak256: keccak } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

function log(a) {
  console.log(a);
  return a;
}

function hash(a) {
  return toHex(keccak(utf8ToBytes(a)));
}

// Client will build the message
function buildMessage(message, privateKey) {
  const messageHash = hash(message);
  const sig = secp.sign(messageHash, privateKey);

  return {
    sig: sig.toCompactHex(),
    msg: message,
    pub: sig.recoverPublicKey(messageHash).toHex()
  };
}

// Server will verify (then process) the message
function verifyMessage({ sig, msg, pub }) {
  return secp.verify(sig, hash(msg), pub);
}

const message = process.argv[2];
const privateKey = process.argv[3];

const output = log(buildMessage(message, privateKey));

if (!verifyMessage(output)) {
  throw new Error('Invalid message!')
}
