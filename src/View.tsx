import { useState } from "react";
import { feedLime, useGetCowsID } from "./Controller";
import { Cow } from "./types";

import WhiteCowIMG from "./assets/white_cow.png"
import BrownCowIMG from "./assets/brown_cow.png"

function View() {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");
  const [cowID, setCowID] = useState<number>(0);

  const cow = useGetCowsID(cowID);

  const onSubmit = () => {
    setErrorMsg("");

    if (userInput !== "" && userInput.match(new RegExp("^(?!0)[0-9]{8}$")))
      setCowID(parseInt(userInput));
    else {
      setErrorMsg("Please fill number of length 8 and no leading 0")
    }
  };

  return (
    <main className='w-screen h-screen flex flex-col gap-5 justify-center items-center p-20'>
      <section className="flex flex-col gap-2 justify-center items-center">
        <h1 className="mb-3 text-4xl font-bold">
          Cow Milking
        </h1>

        <i>Type Cow ID</i>
        <input
          className="p-3 border border-black rounded-lg"
          type="text"
          onChange={(e) => setUserInput(e.target.value)}/>
        <button onClick={onSubmit} className="bg-slate-500 text-white p-2 rounded-md">
          Search Cow
        </button>

        { (cowID != 0 && !cow) && 
            <i className="text-red-500">
              Cow ID: {cowID} not found
            </i>
        }

        { errorMsg.length !== 0 && 
            <i className="text-red-500">
              {errorMsg}
            </i>
        }
      </section>

      <CowView cow={cow!}/>
    </main>
  )
}

function CowView({ cow }: { cow: Cow }) {
  if (!cow) return <></>;

  return (
    <section className="flex flex-col gap-2 justify-center items-center">
      <img
        className="size-72 object-contain"
        src={cow.color === "white" ? WhiteCowIMG : BrownCowIMG}
        alt="cow image"
      />

      <h1 className="text-xl font-semibold">
        {cow.id}
      </h1>

      <div className="flex gap-6 text-white">
        <button className="px-4 py-2 bg-zinc-500 rounded-md">
          Milk
        </button>

        { cow.color === "white" && 
          <button onClick={() => feedLime(cow.id)} className="px-4 py-2 bg-green-500 rounded-md">
            Feed lime
          </button>
        }
      </div>
    </section>
  )
}

export default View
