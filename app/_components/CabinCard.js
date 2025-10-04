import Image from "next/image";
import { UsersIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <div className="flex flex-col overflow-hidden border rounded-lg md:flex-row border-primary-800">
      <div className="relative flex-1 md:w-1/2 aspect-[4/3]">
        <Image
          src={image}
          alt={`Cabin ${name}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="mb-3 text-2xl font-semibold text-accent-500">
            Cabin {name}
          </h3>

          <div className="flex items-center gap-3 mb-2">
            <UsersIcon className="w-5 h-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>

          <p className="flex items-baseline justify-end gap-3">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350] text-accent-500">
                  ${regularPrice - discount}
                </span>
                <span className="font-semibold line-through text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-300">/ night</span>
          </p>
        </div>

        <div className="text-right border-t bg-primary-950 border-t-primary-800">
          <Link
            href={`/cabins/${id}`}
            className="inline-block w-full px-6 py-3 font-medium text-center transition-all md:w-auto bg-accent-600 text-primary-950 hover:bg-accent-500"
          >
            Details & reservation →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
