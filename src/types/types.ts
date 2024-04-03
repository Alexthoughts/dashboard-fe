export type holidayObjectType = {
  countries?: any;
  countryCode: string;
  date: string;
  fixed: boolean;
  global: boolean;
  launchYear?: any;
  localName: string;
  name: string;
  type: string;
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
