export type holidayObjectType = {
  id: number;
  date: string;
  localName: string;
  name: string;
  days: number; //added when counting the niarest holiday
};

export type Rate = {
  from: string;
  to: string;
  amountToConvert: number;
  convertedAmount: number;
  id: string;
};

export type CircleNames = "notes" | "receipe" | "weather";
