import SpinnerMini from "@/app/_components/SpinnerMini";
import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page(props) {
  const params = await props.params;
  const { bookingId } = params;
  const { numGuests, observations, cabinId } = await getBooking(bookingId);
  const { maxCapacity } = await getCabin(cabinId);

  return (
    <div className="max-w-4xl">
      <h2 className="mb-5 text-xl font-semibold sm:text-2xl text-accent-400 sm:mb-7">
        Edit Reservation #{bookingId}
      </h2>

      <form
        action={updateBooking}
        className="flex flex-col gap-4 px-4 py-6 text-base sm:gap-6 sm:px-8 lg:px-12 sm:py-8 sm:text-lg bg-primary-900"
      >
        <input type="hidden" name="bookingId" value={bookingId ?? ""} />

        <div className="space-y-2">
          <label htmlFor="numGuests" className="text-sm sm:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
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
            defaultValue={observations}
            name="observations"
            className="w-full px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base rounded-sm shadow-sm bg-primary-200 text-primary-800 min-h-[120px]"
          />
        </div>

        <div className="flex items-center justify-end gap-4 sm:gap-6">
          <SubmitButton pendingLabel={<SpinnerMini />}>
            Update Profile
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
