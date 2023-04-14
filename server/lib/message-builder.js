const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');
const { keccak256: keccak } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

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

module.exports = buildMessage;
