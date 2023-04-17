import { secp256k1 as secp } from 'ethereum-cryptography/secp256k1';
import { keccak256 as keccak } from 'ethereum-cryptography/keccak';
import { utf8ToBytes, toHex } from 'ethereum-cryptography/utils';

function hash(a) {
  return toHex(keccak(utf8ToBytes(a)));
}

// Client will build the message
export function buildMessage(recipient, amount, privateKey) {
  if (!recipient || recipient === "") {
    throw new Error('No recipient still');
  }
  
  const message = JSON.stringify({ recipient, amount });
  const messageHash = hash(message);
  const sig = secp.sign(messageHash, privateKey);

  return {
    signature: sig.toCompactHex(),
    publicKey: sig.recoverPublicKey(messageHash).toHex(),
    message,
  };
}
