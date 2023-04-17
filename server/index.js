const express = require("express");
const verifyMessage = require('./lib/verify-message');
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "02092dab5690179dade8851584c5622b981ab59739a500088277872ec4b423d2a4": 100,
  "02cb140db851fedfe84a1d34dadd2bd895198bdca9075e85d1857325a67cdf43c5": 50,
  "03f857a2cea9b02f2b4e83c19a92750a00831226bfca5c8226fc111fbe2dc09a04": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const {
    publicKey: pub,
    message: msg,
    signature: sig
  } = req.body;
  const sender = pub;

  if (!verifyMessage({ pub, msg, sig })) {
    res.status(401).send({ message: "Couldn't verify the message" });
    return;
  }

  const { recipient, amount: amountString } = JSON.parse(msg);
  const amount = parseInt(amountString);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (amount < 1) {
    res.status(400).send({ message: "*Too* small." });
  }
  else if (balances[sender] < amount) {
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
