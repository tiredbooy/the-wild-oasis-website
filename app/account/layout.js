import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[4rem_1fr] lg:grid-cols-[16rem_1fr] h-full gap-0 lg:gap-12">
      <SideNavigation />
      <div className="px-4 py-1 sm:px-6 lg:px-0">{children}</div>
    </div>
  );
}
