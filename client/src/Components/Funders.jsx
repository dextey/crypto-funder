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

  return (
    <div className="flex flex-col w-[25%] text-[#0ff] shadow-xl rounded-sm border-2 border-double ">
      <div className=" text-[2.3rem] p-3 font-extrabold  bg-yellow-100 border-2 ">
        <span className="animate-bounce text-black">Top_Funders</span>
      </div>

      <div className="flex  flex-col overflow-y-scroll overflow-x-hidden h-full  ">
        {funders.map((funder, index) => {
          return (
            <div
              key={index}
              className="flex  text-[1.2rem]   mb-1 w-full items-center"
            >
              <div className="flex  w-9/12 font-extrabold my-2  p-2 items-center">
                <span>
                  {funder.address.slice(0, 10) +
                    "...." +
                    funder.address.slice(30, 42)}
                </span>
              </div>

              <div className="flex my-2 w-3/12 items-center mx-2 justify-center bg-yellow-200 text-black rounded-full  p-2">
                {funder.amount} ETH
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Funders;
