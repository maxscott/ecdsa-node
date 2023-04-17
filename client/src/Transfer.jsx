import { useState } from "react";
import server from "./server";
import wallets from "./fakeWallets";
import { buildMessage } from './buildMessage';

function Transfer({ wallet, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();

    const message = buildMessage(recipient, sendAmount, wallet.privateKey);

    try {
      const {
        data: { balance },
      } = await server.post(`send`, message);
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }

  async function onChange(evt) {
    const newWallet = wallets[evt.target.selectedIndex-1];
    setRecipient(newWallet.publicKey);
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient Address
        <select name="Address" onInput={onChange}>
          <option key="0" id="0">--Choose--</option>
          {wallets.map((w, i) => {
            return <option key={i+1} id={i+1}
              disabled={w.publicKey === wallet.publicKey}
            >{w.publicKey.slice(0,10)}...</option>
          })}
        </select>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
