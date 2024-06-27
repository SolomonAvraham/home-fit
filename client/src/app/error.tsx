"use client";

import Link from "next/link";
 
const Error = ({ reset }: { reset: () => void }) => {
  return (
    <div className=" flex h-screen flex-col items-center justify-center bg-admin font-semibold">
       <h2 className="mt-10 cursor-default rounded-2xl border-2 border-black bg-white p-3 text-3xl sAndM:text-6xl">
        משהו ישתבש
        <hr className="hrTop" />
      </h2>
      {/* <div className="my-6 flex gap-12">
        <button
          className=" rounded-2xl bg-black p-5  text-white hover:bg-slate-600 sAndM:text-xl"
          onClick={() => reset()}
        >
          נסה שנית
        </button>
        <button className=" rounded-2xl bg-black p-5 text-white hover:bg-slate-600 sAndM:text-xl">
          <Link href={"/"}>חזור לדף הבית</Link>
        </button>
      </div> */}
    </div>
  );
};

export default Error;
