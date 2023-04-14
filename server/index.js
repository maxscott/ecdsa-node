const express = require("express");
const { secp256k1: secp } = require('ethereum-cryptography/secp256k1');
const { toHex, hexToBytes } = require('ethereum-cryptography/utils');
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

// const privateKeys = [
//   "4aa3db328934bc2e788d4c0fe527ecf71c278e51f316137cddc92d5cbea601cc",
//   "28867fc3dcc997d3996394d72afa7b658cc14ab06354fd0b75d2322036c1f05c",
//   "4e9fcbbbbf21a81e02951b1a962e2c8e8fa039c4db7cea6dd6c63d9c0f19b75e"
// ];

const balances = {
  "02092dab5690179dade8851584c5622b981ab59739a500088277872ec4b423d2a4": 100,
  "02cb140db851fedfe84a1d34dadd2bd895198bdca9075e85d1857325a67cdf43c5": 50,
  "03f857a2cea9b02f2b4e83c19a92750a00831226bfca5c8226fc111fbe2dc09a04": 75,
};

function privateHexToPublicHex(privateHex) {
  return toHex(secp.getPublicKey(hexToBytes(privateHex)));
}

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender: privateHex, recipient, amount } = req.body;

  const sender = privateHexToPublicHex(privateHex);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
