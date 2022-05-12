interface Recipient {
  name: string;
  address: string;
}

export interface CauseData {
  title: string;
  blurb: string;
  learnMoreLink: string;
  recipient: Recipient;
}

export interface AllCauses {
  [key: string]: CauseData;
}
