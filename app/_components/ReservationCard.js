import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "@/app/_components/DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete }) {
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div className="flex flex-col border sm:flex-row border-primary-800">
      <div className="relative flex-shrink-0 w-full h-48 sm:h-32 sm:w-32 sm:aspect-square">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="object-cover border-b sm:border-b-0 sm:border-r border-primary-800"
        />
      </div>

      <div className="flex flex-col flex-grow px-4 py-4 sm:px-6 sm:py-3">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-0">
          <h3 className="text-lg font-semibold sm:text-xl">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="flex items-center justify-center px-3 text-xs font-bold text-yellow-200 uppercase bg-yellow-800 rounded-sm w-fit h-7">
              past
            </span>
          ) : (
            <span className="flex items-center justify-center px-3 text-xs font-bold text-green-200 uppercase bg-green-800 rounded-sm w-fit h-7">
              upcoming
            </span>
          )}
        </div>

        <p className="mt-2 text-sm sm:text-base lg:text-lg text-primary-300">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap items-baseline gap-3 pt-3 mt-auto sm:gap-5 sm:pt-0">
          <p className="text-lg font-semibold sm:text-xl text-accent-400">
            ${totalPrice}
          </p>
          <p className="hidden text-primary-300 sm:inline">&bull;</p>
          <p className="text-base sm:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="w-full mt-2 text-xs sm:text-sm text-primary-400 sm:w-auto sm:ml-auto sm:mt-0">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {!isPast(startDate) && (
        <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800 w-full sm:w-[100px]">
          <Link
            href={`/account/reservations/edit/${id}`}
            className="flex items-center justify-center flex-1 gap-2 px-3 py-3 text-xs font-bold uppercase transition-colors border-r sm:justify-start sm:flex-grow sm:py-0 sm:border-r-0 sm:border-b group text-primary-300 border-primary-800 hover:bg-accent-600 hover:text-primary-900"
          >
            <PencilSquareIcon className="w-5 h-5 transition-colors text-primary-600 group-hover:text-primary-800" />
            <span className="mt-1">Edit</span>
          </Link>
          <DeleteReservation onDelete={onDelete} bookingId={id} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
