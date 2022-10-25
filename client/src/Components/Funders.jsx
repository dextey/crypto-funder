import { ethers } from "ethers";
import { useEffect, useState } from "react";

const Funders = ({ contract }) => {
  const [funders, setFunders] = useState([
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
    { address: "0xf39Fd6kljsdlkansfdgsdfgwsrg79cffFb92266", amount: "10" },
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
  }, [contract]);

  funders.length && console.log(funders);

  return (
    <div className="flex flex-col w-[25%] text-[#0ff] shadow-xl rounded-sm shadow-[#1e2546]">
      <div className=" text-[2.3rem] p-3 font-extrabold   animate-bounce ">
        <span>Top_Funders</span>
      </div>

      <div className="flex  flex-col overflow-y-scroll overflow-x-hidden h-full  ">
        {funders.map((funder, index) => {
          return (
            <div
              key={index}
              className="flex text-[1.3rem] my-1 bg-[#00ffff28] items-center"
            >
              <span>
                {funder.address.slice(0, 8) +
                  "...." +
                  funder.address.slice(30, 42)}
              </span>
              <span className="mx-2 font-extrabold bg-white rounded-full p-1 px-3">
                {funder.amount}ETH
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Funders;
