import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest Area",
};

export default async function Page() {
  const session = await auth();
  const firstname = session?.user?.name.split(" ").at(0);
  return (
    <h2 className="text-xl font-semibold sm:text-2xl text-accent-400 mb-7">
      Welcome, {firstname}
    </h2>
  );
}