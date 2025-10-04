"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useReservation } from "./ReservationContext";
import { motion, AnimatePresence } from "framer-motion";

function ReservationReminder() {
  const { range, resetRange }  = useReservation();

  // Don’t render if no dates are selected
  if (!range.from || !range.to) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="fixed left-0 right-0 flex items-center justify-between max-w-md gap-4 px-4 py-3 mx-auto font-semibold shadow-xl bottom-4 md:bottom-6 md:max-w-lg lg:max-w-xl bg-accent-500 text-primary-800 rounded-xl"
      >
        <p className="flex-grow text-sm text-center md:text-base">
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          Don&apos;t forget to reserve your dates from{" "}
          <strong>{format(new Date(range.from), "MMM dd yyyy")}</strong> to{" "}
          <strong>{format(new Date(range.to), "MMM dd yyyy")}</strong>
        </p>
        <button
          onClick={resetRange}
          aria-label="Dismiss reservation reminder"
          className="p-1 transition-colors rounded-full hover:bg-accent-600 md:p-2"
        >
          <XMarkIcon className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}

export default ReservationReminder;