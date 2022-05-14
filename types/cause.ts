interface Recipient {
  name: string;
  address: string;
}

export interface Cause {
  title: string;
  blurb: string;
  learnMoreLink: string;
  recipient: Recipient;
}

export interface AllCauses {
  [key: string]: Cause;
}
