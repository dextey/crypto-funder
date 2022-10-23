const Main = () => {
  return (
    <div className="flex flex-col font-bold px-6 pt-5 w-[73%] bg-white bg-opacity-20  text-white backdrop-blur-sm">
      <div className="text-3xl">Welcome cypto_funders</div>
      <div className="mt-6 w-6/12">
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
          placeholder="add your eth amount"
        />
        <button className="p-3 bg-gradient-to-tr from-green-400 to-blue-500 rounded-md">
          send
        </button>
      </div>
    </div>
  );
};

export default Main;
