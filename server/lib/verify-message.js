const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');
const { keccak256: keccak } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

function hash(a) {
  return toHex(keccak(utf8ToBytes(a)));
}

// Server will verify (then process) the message
function verifyMessage({ sig, msg, pub }) {
  return secp.verify(sig, hash(msg), pub);
}

module.exports = verifyMessage;
