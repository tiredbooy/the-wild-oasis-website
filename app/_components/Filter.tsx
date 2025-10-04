"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type Capacity = "all" | "small" | "medium" | "large";

interface ButtonProps {
  filter: Capacity;
  handleFilter: (filter: Capacity) => void;
  activeFilter: Capacity;
  children: ReactNode;
}

const isValidCapacity = (v: string | null): v is Capacity =>
  v === "all" || v === "small" || v === "medium" || v === "large";

function Button({ filter, handleFilter, activeFilter, children }: ButtonProps) {
  return (
    <button
      className={`px-3 py-1 md:px-5 md:py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-50 rounded-md" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const rawCapacity = searchParams.get("capacity");
  const activeFilter: Capacity = isValidCapacity(rawCapacity)
    ? rawCapacity
    : "all";

  function handleFilter(filter: Capacity) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex mx-auto border rounded-md border-primary-800">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All Cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash; 3 Guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash; 7 Guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash; 12 Guests
      </Button>
    </div>
  );
}

export default Filter;
