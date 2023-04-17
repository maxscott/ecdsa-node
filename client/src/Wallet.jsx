import server from "./server";
import wallets from "./fakeWallets";
import {useEffect} from "react";

function Wallet({ wallet, setWallet, balance, setBalance }) {
  async function updateBalance({ publicKey: address }) {
    if (address) {
      const { data: { balance } } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onChange(evt) {
    const wallet = wallets[evt.target.selectedIndex];
    setWallet(wallet);
    await updateBalance(wallet);
  }

  useEffect(() => (() => updateBalance(wallet)), []);

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      <label>
        Wallet Address
        <select name="Address" onChange={onChange}>
          {wallets.map((w, i) => {
            return <option key={i} id={i}>{w.publicKey.slice(0,10)}...</option>
          })}
        </select>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
