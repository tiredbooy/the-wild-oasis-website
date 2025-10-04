import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export async function generateMetadata(props) {
  const params = await props.params;
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page(props) {
  const params = await props.params;
  const cabinId = params?.cabinId;
  const cabin = await getCabin?.(cabinId);

  return (
    <div className="max-w-6xl px-4 mx-auto mt-4 sm:mt-6 lg:mt-8 sm:px-6 lg:px-0">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="px-4 mb-6 text-3xl font-semibold text-center sm:mb-8 lg:mb-10 sm:text-4xl lg:text-5xl text-accent-400">
          Reserve Cabin {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
