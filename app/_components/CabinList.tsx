import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";
import { Cabin } from "../_lib/types";

import { CabinFilter } from "../_lib/types";



async function CabinList({ filter }: CabinFilter) {
  // noStore();
  const cabins: Cabin[] = await getCabins();
  if (!cabins.length) return null;

  let displayedCabins: Cabin[];
  if (filter === "all") displayedCabins = cabins;

  if (filter === "small")
    displayedCabins = cabins?.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins?.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins?.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
