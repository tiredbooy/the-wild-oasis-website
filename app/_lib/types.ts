export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  image: string;
}

export interface CabinFilter {
  [key : string]: "all" | "small" | "medium" | "large";
}

export interface RangeState {
  from: string | number | null | undefined;
  to: string | number | null | undefined;
}