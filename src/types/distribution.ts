export interface Distribution {
  recipient: string;
  donor: string;
  cost: number;
  transfer_amount: number;
}

export interface Distributions {
  distributions: Distribution [];
  timestamp: string;
}
