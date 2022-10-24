import { useEffect, useState } from "react";
import Funders from "./Components/Funders";
import Main from "./Components/Main";
import Navbar from "./Components/Navbar";

import { ethers } from "ethers";
import { ABI, contractAddress } from "./Constants";

function App() {
  const [wallet, setWallet] = useState(null);

  const [contract, setContract] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (provider) {
        const signer = provider.getSigner();

        const contract = new ethers.Contract(contractAddress, ABI, signer);

        setContract(contract);
      }
    }
  }, []);

  return (
    <div className="h-screen w-full p-3 bg-gradient-to-br from-[#131130] via-[#171368dd] to-[#00ffff] flex flex-col">
      <Navbar wallet={wallet} setWallet={setWallet} />
      <div className="flex h-full py-4 justify-between">
        <Funders />
        <Main contract={contract} wallet={wallet} />
      </div>
    </div>
  );
}

export default App;
