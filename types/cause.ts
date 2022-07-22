export interface Cause {
  title: string;
  logo: string;
  description: string;
  learn_more_link: string;
  recipient_address: string;
}

export interface AllCauses {
  [key: string]: Cause;
}
