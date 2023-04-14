// const { sha256, keccak } = require('ethereum-cryptography');
const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');
const { toHex } = require('ethereum-cryptography/utils');

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log('private:', toHex(privateKey));
console.log('public:', toHex(publicKey));
console.log('eth:', `0x${toHex(publicKey.slice(-20))}`);
