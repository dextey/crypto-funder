import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";

const Main = ({
  contract,
  wallet,
  transactionReceipt,
  setTransactionReceipt,
}) => {
  const value = useRef();

  const [contractBalance, setContractBalance] = useState(0);

  const fund = async () => {
    const ethAmount = value.current.value;

    try {
      const transaction = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      const receipt = await transaction.wait(1);

      setTransactionReceipt(receipt);
      console.log(JSON.stringify(receipt, null, 4));
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const res = await contract.s_addressFunded(wallet);
    const response = await provider.getBalance(contract.address);

    setContractBalance(ethers.utils.formatEther(response));
    //   "ete " + ethers.utils.formatEther(res)
  };

  useEffect(() => {
    getBalance();
  }, [transactionReceipt, contract]);

  return (
    <div className="flex w-[73%] bg-white bg-opacity-20  text-white backdrop-blur-sm overflow-y-scroll">
      <div className="flex flex-col font-bold px-6 pt-5">
        <div className="flex w-full justify-between items-center mb-2">
          <div className="text-[3rem]">Welcome cypto_funders</div>
          <div className="text-[2rem] mx-2 ">
            Balance : {contractBalance} ETH
          </div>
        </div>
        <div className="flex ">
          <div className="flex flex-col w-8/12  ">
            <div className="flex flex-col justify-around ">
              <div className="mt-6 w-10/12 text-[1.3rem]">
                This is place where you can fund your ETH's to me.
                <br />
                Hoooraay!!!
                <br />
                Connect your wallet and make your first transaction through
                ethereum blockchain
                <br />
                If you are already a part of blockchain, then be a part of top
                Funders
              </div>

              <div className="mt-4 w-full p-2 py-3 flex gap-4">
                <input
                  className="backdrop-blur-lg w-8/12 bg-opacity-10 bg-white outline-none p-4 text-2xl placeholder-slate-50/[0.5]"
                  type="text"
                  ref={value}
                  placeholder="add your eth amount"
                />
                <button
                  onClick={fund}
                  className="p-3 w-4/12 bg-gradient-to-tr text-1xl from-green-400 to-blue-500 rounded-md"
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
          <div className=" flex justify-center items-center ">
            <img
              src="eth.png"
              style={{ width: 450 }}
              className="animate-pulse"
            />
          </div>
        </div>
        <div className="flex w-full  ">
          {transactionReceipt && (
            <div className="flex flex-col text-[1rem] w-full bg-slate-500  font-mono p-4 m-3">
              <span>to:{transactionReceipt["to"]}</span>
              <span>from:{transactionReceipt["from"]}</span>
              <span>
                contractAddress:{transactionReceipt["contractAddress"]}
              </span>
              <span>
                transactionIndex:{transactionReceipt["transactionIndex"]}
              </span>
              <span>gasUsed:{transactionReceipt["gasUsed"].toString()}</span>
              <span>blockHash:{transactionReceipt["blockHash"]}</span>
              <span>
                transaction Hash:{transactionReceipt["transactionHash"]}
              </span>
              <span>blockNumber:{transactionReceipt["blockNumber"]}</span>
              <span>
                cumulativeGasUsed:
                {transactionReceipt["cumulativeGasUsed"].toString()}
              </span>
              <span>
                effectiveGasPrice:
                {transactionReceipt["effectiveGasPrice"].toString()}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
