import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

const Funders = ({ contract, transactionReceipt }) => {
  const [funders, setFunders] = useState([
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
  ]);

  const getFunders = async () => {
    const data = await contract.getFunders();
    return data;
  };

  useEffect(() => {
    contract &&
      getFunders().then((_funders) => {
        _funders.map(async (_funder) => {
          const amount = await contract.fundedByAddress(_funder);
          setFunders((prev) => [
            ...prev,
            { address: _funder, amount: ethers.utils.formatEther(amount) },
          ]);
        });
      });
  }, [contract, transactionReceipt]);

  const sort = () => {
    function compare(a, b) {
      if (parseFloat(a.amount) < parseFloat(b.amount)) {
        return 1;
      }
      if (parseFloat(a.amount) > parseFloat(b.amount)) {
        return -1;
      }
      return 0;
    }

    setFunders(() => [...funders.sort(compare)]);
  };

  const list = useMemo(() => {
    return (
      <div className="flex  flex-col overflow-y-scroll overflow-x-hidden h-full  ">
        {funders.map((funder, index) => {
          return (
            <div
              key={index}
              className="flex  text-[1.2rem]   mb-1 w-full items-center"
            >
              <div className="flex  w-8/12 font-extrabold my-2  p-2 items-center">
                <span>
                  {funder.address.slice(0, 9) +
                    "...." +
                    funder.address.slice(33, 42)}
                </span>
              </div>

              <div className="flex my-2 text-1xl w-4/12 items-center mx-3 justify-center bg-yellow-200 text-black rounded-full  py-2">
                {funder.amount} ETH
              </div>
            </div>
          );
        })}
      </div>
    );
  }, [funders]);

  return (
    <div className="flex flex-col w-[25%] text-[#0ff] shadow-xl rounded-sm border-2 border-double ">
      <div className=" text-[2.3rem] p-3 font-extrabold  bg-yellow-100 border-2 ">
        <span className="animate-bounce text-black">Top_Funders</span>
        <button className="p-4 " onClick={sort}>
          Sort
        </button>
      </div>
      {list}
    </div>
  );
};

export default Funders;
