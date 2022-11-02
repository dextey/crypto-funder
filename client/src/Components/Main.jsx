import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";

const Main = ({ contract, transactionReceipt, setTransactionReceipt }) => {
  const value = useRef();

  const [contractBalance, setContractBalance] = useState(0);
  const [isloading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const fund = async () => {
    const ethAmount = value.current.value;
    setIsloading(true);
    try {
      if (!ethAmount) throw new Error("no value");
      const transaction = await contract.fund({
        value: ethers.utils.parseEther(ethAmount),
      });
      const receipt = await transaction.wait(1);

      setTransactionReceipt(receipt);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      console.log(error);
      if (error.message.slice(0, 40).includes("user rejected transaction ")) {
        setError("user rejected transaction");
      } else if (error.message.slice(0, 40).includes("no value")) {
        setError("please enter a value");
      } else if (error.message.slice(0, 40).includes("invalid decimal value")) {
        setError("Please enter a numeric value");
      } else if (error.message.slice(0, 40).includes("cannot estimate gas")) {
        setError("eth value must be minimum 50$ worthy");
      } else if (error.message.slice(0, 40).includes("insufficient funds")) {
        setError("you have insufficient funds ");
      } else {
        setError("Error : transaction failed");
      }
    }
    setIsloading(false);
    setTimeout(() => {
      setError("");
    }, 4500);
  };

  const withdraw = async () => {
    try {
      const transaction = await contract.withDraw();
      const receipt = await transaction.wait(1);
      setTransactionReceipt(receipt);
      console.log(receipt);
    } catch (error) {
      if (error.error.message.includes("execution reverted"))
        setError("Haha I am still worthy ,<br/> You cannot withdraw fund");
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
          <div className="text-[2rem] mx-2 flex items-center">
            <span> Balance : {contractBalance} ETH</span>
            <button
              onClick={withdraw}
              className="mx-4  p-4 bg-gradient-to-r text-[1rem] rounded-md from-yellow-200 to-green-300 hover:text-black"
            >
              withdraw
            </button>
          </div>
        </div>
        <div className="flex ">
          <div className="flex flex-col w-8/12  ">
            <div className="flex flex-col h-full justify-around ">
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
              {error && (
                <div className=" flex mt-5 justify-center bg-red-200 text-red-500 p-3 rounded">
                  {error}
                </div>
              )}
              <div className="mt-4 w-full p-2 py-3 flex gap-4">
                <input
                  className="backdrop-blur-lg w-8/12 bg-opacity-10 bg-white outline-none p-4 text-2xl placeholder-slate-50/[0.5]"
                  type="text"
                  ref={value}
                  placeholder="add your eth amount"
                />
                {isloading ? (
                  <div className="flex  justify-center items-center p-3 w-4/12 bg-gradient-to-tr text-1xl from-yellow-200 to-rose-500  rounded-md ">
                    <div className="animate-bounce text-black text-[2rem]">
                      ...
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={fund}
                    className="p-3 w-4/12 bg-gradient-to-tr text-1xl from-green-400 to-blue-500 rounded-md hover:from-yellow-200 hover:to-rose-400 hover:text-black"
                  >
                    SEND
                  </button>
                )}
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
