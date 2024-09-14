import { useEffect, useState } from "react";
import { Cow } from "./types";
import axios from "axios";
import * as fs from 'fs';

export function useGetCows() {
  const [cows, setCows] = useState<Cow[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cowsData: Cow[] = (await axios.get("./cows.json")).data;
        setCows(cowsData);
      }
      catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [])

  return cows;
}

export function useGetCowsID(id: number) {
  const [cow, setCow] = useState<Cow | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cowsData: Cow[] = (await axios.get("./cows.json")).data;
        setCow(cowsData.find((cow) => cow.id === id)!);
      }
      catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [id])

  return cow;
}

export async function feedLime(id: number) {
  try {
    let cowsData: Cow[] = (await axios.get("./cows.json")).data;
    const toEditCow = cowsData.find((cow) => cow.id === id);
    cowsData = cowsData.filter((cow) => cow.id !== toEditCow!.id);
    
    if (toEditCow) {
      toEditCow.got_lime = true;
      const newCowsData = [ ...cowsData, toEditCow ];

      fs.writeFileSync("./cows2.json", JSON.stringify(newCowsData));
    }
  }
  catch (err) {
    console.error(err);
  }
}