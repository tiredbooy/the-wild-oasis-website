import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, props) {
  const params = await props.params;
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, booked_dates: bookedDates });
  } catch (e) {
    return Response.json({ message: "Cabin not found." });
  }
}
