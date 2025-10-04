import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[3fr_4fr] gap-8 lg:gap-20 border border-primary-800 rounded-xl py-6 sm:py-8 lg:py-3 px-4 sm:px-6 lg:px-10 mb-12 sm:mb-16 lg:mb-24">
      <div className="relative h-64 sm:h-80 lg:h-auto lg:scale-[1.15] lg:-translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover rounded-lg lg:rounded-none"
          alt={`Cabin ${name}`}
        />
      </div>

      <div className="flex flex-col">
        <h3 className="text-accent-100 font-black text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-5 lg:translate-x-[-254px] bg-primary-950 p-4 sm:p-5 lg:p-6 lg:pb-1 w-full lg:w-[150%]">
          Cabin {name}
        </h3>

        <p className="mb-6 text-base sm:mb-8 lg:mb-10 sm:text-lg text-primary-300">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-3 mb-5 sm:gap-4 sm:mb-6 lg:mb-7">
          <li className="flex items-center gap-3">
            <UsersIcon className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex items-center gap-3">
            <MapPinIcon className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex items-center gap-3">
            <EyeSlashIcon className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
            <span className="text-base sm:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
