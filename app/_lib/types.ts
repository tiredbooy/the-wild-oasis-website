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