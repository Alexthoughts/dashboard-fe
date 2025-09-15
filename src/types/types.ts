export type holidayObjectType = {
    id: number;
    date: string;
    localName: string;
    name: string;
    days: number; //added when counting the niarest holiday
};

export type Rate = {
    id: number;
    from: string;
    to: string;
    convertedAmount: number;
};

export type CircleNames = 'notes' | 'receipe' | 'weather';
