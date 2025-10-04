"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { id: cabinId, maxCapacity, regularPrice, discount } = cabin;

  const startDate = range?.from;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="w-full">
      <div className="flex flex-col items-start justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center sm:px-8 md:px-16 sm:py-2 bg-primary-800 text-primary-300 sm:gap-0">
        <p className="text-sm sm:text-base">Logged in as</p>

        <div className="flex items-center gap-3 sm:gap-4">
          <img
            referrerPolicy="no-referrer"
            className="h-6 rounded-full sm:h-8"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm sm:text-base">{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await createBookingWithData(formData);
          resetRange();
        }}
        className="flex flex-col gap-4 px-4 py-6 text-base sm:gap-5 sm:px-8 md:px-16 sm:py-10 sm:text-lg h-fit bg-primary-900"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-sm sm:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full px-3 py-2 text-sm rounded-sm shadow-sm sm:px-5 sm:py-3 sm:text-base bg-primary-200 text-primary-800"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations" className="text-sm sm:text-base">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-sm shadow-sm bg-primary-200 text-primary-800 min-h-[100px]"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          {!(startDate && endDate) ? (
            <p className="text-sm sm:text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
