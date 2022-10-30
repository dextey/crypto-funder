import { ethers } from "ethers";
import { useRef } from "react";

const Main = ({ contract, wallet }) => {
  const value = useRef();

  const fund = async () => {
    const ethAmount = value.current.value;

    try {
      const transaction = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      const transactionReceipt = await transaction.wait(1);
      console.log(transactionReceipt);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const res = await contract.s_addressFunded(wallet);
    const response = await provider.getBalance(contract.address);
    console.log(
      ethers.utils.formatEther(response)
      //   "ete " + ethers.utils.formatEther(res)
    );
  };

  return (
    <div className="flex w-[73%] bg-white bg-opacity-20  text-white backdrop-blur-sm">
      <div className="flex flex-col font-bold px-6 pt-5">
        <div className="text-[3rem]">Welcome cypto_funders</div>
        <div className="mt-6 w-6/12 text-[1.3rem]">
          This is place where you can fund you ETH's to me.
          <br />
          Hoooraay!!!
          <br />
          Connect your wallet and make your first transaction through ethereum
          blockchain
          <br />
          If you are already a part of blockchain, then be a part of top Funders
        </div>

        <div className="mt-4 py-3 flex gap-4">
          <input
            className="backdrop-blur-lg bg-opacity-10 bg-white outline-none px-3 placeholder-slate-50/[0.5]"
            type="text"
            ref={value}
            placeholder="add your eth amount"
          />
          <button
            onClick={fund}
            className="p-3 bg-gradient-to-tr from-green-400 to-blue-500 rounded-md"
          >
            send
          </button>
          <button
            onClick={getBalance}
            className="p-3 bg-gradient-to-tr from-green-400 to-blue-500 rounded-md"
          >
            show
          </button>
        </div>
      </div>
      <div className=" flex justify-center items-center ">
        <img
          src="eth.png"
          style={{ width: 700, height: 500 }}
          className="animate-pulse"
        />
      </div>
    </div>
  );
};

export default Main;
