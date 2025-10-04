"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

interface SessionUser {
  guestId?: number | string | null;
  [key: string]: any;
}

interface Session {
  user?: SessionUser;
  [key: string]: any;
}

interface BookingData {
  startDate: string | number;
  endDate: string | number;
  numNights: number;
  cabinPrice: number;
  cabinId: number;
}

function getStringFromForm(
  formData: FormData,
  key: string,
  defaultValue = ""
): string {
  const val = formData.get(key);
  if (val == null) return defaultValue;
  if (typeof val === "string") return val;
  // if it's a File or other type, fall back to default
  return defaultValue;
}

function getNumberFromForm(
  formData: FormData,
  key: string,
  defaultValue = 0
): number {
  const str = getStringFromForm(formData, key, "").trim();
  if (str === "") return defaultValue;
  const n = Number(str);
  return Number.isFinite(n) ? n : defaultValue;
}

export async function updateGuest(formData: FormData): Promise<void> {
  const session = (await auth()) as Session | null;
  if (!session) throw new Error("You must be logged in");

  const nationalID = getStringFromForm(formData, "nationalID").trim();
  const nationalityRaw = getStringFromForm(formData, "nationality");
  if (!nationalityRaw) throw new Error("Nationality is required");
  const [nationality = "", countryFlag = ""] = nationalityRaw.split("%");

  if (!/^[A-Za-z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please Provide a valid national ID");

  const updateData = {
    nationality,
    countryFlag,
    nationalID,
  } as const;

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}

export async function createBooking(
  bookingData: BookingData,
  formData: FormData
): Promise<void> {
  const session = (await auth()) as Session | null;
  if (!session) throw new Error("You must be logged in");

  const numGuests = getNumberFromForm(formData, "numGuests");
  const observations = getStringFromForm(formData, "observations").slice(
    0,
    1000
  );

  const newBooking = {
    ...bookingData,
    guestId: session.user?.guestId,
    numGuests,
    observations,
    extrasPrice: 0,
    totalPrice: bookingData?.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  } as const;

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}

export async function deleteBooking(bookingId: number) {
  const session = (await auth()) as Session | null;
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user?.guestId);
  const guestBookingIds = guestBookings?.map(
    (booking: any) => booking.id
  ) as Array<number>;
  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking.");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservation");
}

export async function updateBooking(formData: FormData): Promise<void> {
  // 1) Authentication
  const session = (await auth()) as Session | null;
  if (!session) throw new Error("You must be logged in");

  const bookingId = Number(getStringFromForm(formData, "bookingId"));
  if (Number.isNaN(bookingId)) throw new Error("Invalid Bookind Id");

  // 2) Authorization
  const guestBookings = await getBookings(session.user?.guestId);
  const guestBookingsIds = guestBookings?.map(
    (booking: any) => booking?.id
  ) as Array<number>;

  if (!guestBookingsIds.includes(bookingId))
    throw new Error("You are not allowed to Edit this booking.");

  // 3) Building Update Data
  const updateData = {
    numGuests: getNumberFromForm(formData, "numGuests"),
    observations: getStringFromForm(formData, "observations").slice(0, 1000),
  } as const;

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error Handeling
  if (error) throw new Error("Booking could not be updated");

  // 6) Redirecting And Revalidating
  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations");
}

export async function signInAction(formData: FormData): Promise<void> {
  const provider = getStringFromForm(formData, "provider", "google");
  await signIn(provider, { redirectTo: "/account" });
}

export async function signOutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}
