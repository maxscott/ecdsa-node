import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import wallets from "./fakeWallets";

function App() {
  const [balance, setBalance] = useState(0);
  const [wallet, setWallet] = useState(wallets[0]);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        wallet={wallet}
        setWallet={setWallet}
      />
      <Transfer setBalance={setBalance} wallet={wallet} />
    </div>
  );
}

export default App;
