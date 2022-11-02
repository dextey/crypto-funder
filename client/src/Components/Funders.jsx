import { ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";

const Funders = ({ contract, transactionReceipt }) => {
  const [funders, setFunders] = useState([]);

  const getFunders = async () => {
    const data = await contract.getFunders();
    return data;
  };

  const getFundersWithValues = (_funders) => {
    let temp_funders = [];
    _funders.map(async (_funder) => {
      const amount = await contract.fundedByAddress(_funder);
      temp_funders.push({
        address: _funder,
        amount: ethers.utils.formatEther(amount),
      });
      temp_funders.sort(compare);
      setFunders([...temp_funders]);
    });
  };

  useEffect(() => {
    contract && sort();
  }, [contract, transactionReceipt]);

  function compare(a, b) {
    if (parseFloat(a.amount) < parseFloat(b.amount)) {
      return 1;
    }
    if (parseFloat(a.amount) > parseFloat(b.amount)) {
      return -1;
    }
    return 0;
  }

  const sort = () => {
    contract &&
      getFunders().then((_funders) => {
        getFundersWithValues(_funders);
      });
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
    <div className="flex flex-col w-[25%] text-[#63f7f7] shadow-xl rounded-sm border-2 border-double ">
      <div className=" flex items-center justify-between text-[2.3rem] p-3 font-extrabold  bg-yellow-100 border-2 ">
        <span className="animate-bounce text-black">Top_Funders</span>
      </div>
      {list}
    </div>
  );
};

export default Funders;
