export interface Cause {
  title: string;
  blurb: string;
  learn_more_link: string;
  donation_address: string;
  donation_name: string;
}

export interface AllCauses {
  [key: string]: Cause;
}
