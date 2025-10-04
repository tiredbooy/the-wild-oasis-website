"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import { RangeState } from "../_lib/types";

// Define the full context value
interface ReservationContextType {
  range: RangeState;
  setRange: React.Dispatch<React.SetStateAction<RangeState>>;
  resetRange: () => void;
}

// Create context with an explicit type and a default value (or null)
const ReservationContext = createContext<ReservationContextType | undefined>(
  undefined
);

// Initial state matches the RangeState interface
const initialState: RangeState = { from: undefined, to: undefined };

interface ReservationProviderProps {
  children: ReactNode;
}

function ReservationProvider({ children }: ReservationProviderProps) {
  const [range, setRange] = useState<RangeState>(initialState);

  const resetRange = () => setRange(initialState);

  const value: ReservationContextType = {
    range,
    setRange,
    resetRange,
  };

  return (
    <ReservationContext.Provider value={value}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside a provider.");

  return context;
}

export { ReservationProvider, useReservation };
