"use client";

import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useReservation } from "./ReservationContext";
import { useEffect, useState } from "react";

function isAlreadyBooked(range, datesArr) {
  return (
    range?.from &&
    range?.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    console.log("range:", range);
  }, [range]);

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;

  const { regularPrice, discount } = cabin;
  const numNights =
    displayRange?.from && displayRange?.to
      ? differenceInDays(displayRange.to, displayRange.from)
      : 0;
  const cabinPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between w-full">
      <div className="overflow-x-auto">
        <DayPicker
          mode="range"
          min={minBookingLength}
          max={maxBookingLength}
          selected={displayRange}
          onSelect={setRange}
          fromYear={new Date().getFullYear()}
          fromDate={new Date()}
          toYear={new Date().getFullYear() + 5}
          captionLayout="dropdown"
          numberOfMonths={isMobile ? 1 : 2}
          disabled={(date) =>
            isPast(date) || bookedDates.some((b) => isSameDay(b, date))
          }
          modifiers={{
            booked: (date) => bookedDates.some((b) => isSameDay(b, date)),
          }}
          navLayout="disabled"
          classNames={{
            years_dropdown: "bg-accent-400 text-accent-900",
            months_dropdown: "bg-accent-400 text-accent-900",
            root: "rdp-root pt-1 place-self-center px-2 w-full",
            months: "flex flex-col md:flex-row gap-4 md:gap-6",
            month: "space-y-2",
            caption: "flex justify-center mb-2",
            nav: "flex items-center gap-2",
            table: "border-collapse w-full",
            head_row: "flex justify-around",
            head_cell:
              "text-xs sm:text-sm font-semibold text-gray-600 w-8 h-8 sm:w-9 sm:h-9 text-center",
            row: "flex justify-around",
            cell: "text-center w-8 h-8 sm:w-9 sm:h-9",
            day_button:
              "w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full focus:outline-none text-sm sm:text-base",
            today: "bg-accent-200 font-semibold rounded-2xl text-accent-900",
            disabled: "opacity-30 cursor-not-allowed text-gray-400",
            booked: "opacity-40 line-through text-gray-400",
            selected:
              "bg-accent-600 text-accent-900 hover:bg-accent-700 focus:bg-accent-700",
            range_start:
              "bg-accent-600 text-accent-900 rounded-l-full hover:bg-accent-700",
            range_middle:
              "bg-accent-300 text-accent-900 hover:bg-accent-400 rounded-none",
            range_end:
              "bg-accent-600 text-accent-900 rounded-r-full hover:bg-accent-700",
          }}
          modifiersClassNames={{
            booked: "text-gray-400 line-through opacity-50",
          }}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 sm:px-6 md:px-8 py-4 sm:py-0 bg-accent-500 text-primary-800 sm:h-[72px] gap-3 sm:gap-0">
        <div className="flex flex-wrap items-baseline w-full gap-3 sm:gap-4 md:gap-6 sm:w-auto">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-xl sm:text-2xl">
                  ${regularPrice - discount}
                </span>
                <span className="text-sm font-semibold line-through sm:text-base text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-xl sm:text-2xl">${regularPrice}</span>
            )}
            <span className="text-sm sm:text-base">/night</span>
          </p>

          {numNights ? (
            <>
              <p className="px-2 py-1 text-xl text-white sm:px-3 sm:py-2 sm:text-2xl bg-accent-600">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p className="flex items-baseline gap-2">
                <span className="text-sm font-bold uppercase sm:text-lg">
                  Total
                </span>{" "}
                <span className="text-xl font-semibold sm:text-2xl">
                  ${cabinPrice}
                </span>
              </p>
            </>
          ) : null}
        </div>

        {range?.from || range?.to ? (
          <button
            className="w-full px-4 py-2 mt-2 text-sm font-semibold border border-primary-800 sm:w-auto sm:mt-0"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
