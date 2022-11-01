import { useEffect } from "react";

const Navbar = ({ wallet, setWallet }) => {
  const connectWallet = async () => {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      account.length && setWallet(account[0]);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      if (window.ethereum.isConnected()) connectWallet();
    }
  }, []);

  return (
    <div className="flex items-center justify-between width-full h-[10%]  backdrop-blur-sm-10 ">
      <div className="text-[2rem] text-white title">CRYPO-FUNDER</div>
      <div className="flex items-center justify-center">
        <div className="">
          {!wallet && (
            <button
              onClick={connectWallet}
              className="p-3 px-6 bg-gradient-to-tr from-blue-400 to-cyan-300 rounded-md hover:from-yellow-200 hover:to-yellow-100"
            >
              Connect Wallet
            </button>
          )}
        </div>
        <span className="mx-3 font-bold text-[1.2rem] text-white">
          {wallet}
        </span>
        <span className="p-5 bg-slate-300 rounded-full"></span>
      </div>
    </div>
  );
};

export default Navbar;
