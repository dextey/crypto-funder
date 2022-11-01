import { useEffect, useState } from "react";
import Funders from "./Components/Funders";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";

import { ethers } from "ethers";
import { CONTRACT } from "./contracts/contract";

function App() {
  const [wallet, setWallet] = useState(null);

  const [contract, setContract] = useState("");

  const [transactionReceipt, setTransactionReceipt] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (provider) {
        const signer = provider.getSigner();

        const fundMe = new ethers.Contract(
          CONTRACT.address,
          CONTRACT.abi,
          signer
        );

        setContract(fundMe);
      }
    }
  }, []);

  return (
    <div className="h-screen w-full p-3 bg-gradient-to-br from-[#1f1a2e] via-[#15141cdd] to-[#000000] flex flex-col ">
      <Navbar wallet={wallet} setWallet={setWallet} />
      <div className="flex h-[89%] py-4 justify-between">
        <Funders contract={contract} transactionReceipt={transactionReceipt} />
        <Main
          contract={contract}
          wallet={wallet}
          transactionReceipt={transactionReceipt}
          setTransactionReceipt={setTransactionReceipt}
        />
      </div>
    </div>
  );
}

export default App;
