export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
  };
  
  export type Lighthouse = {
    firstName: string;
    lastName: string;
    office: string;
    _id: string;
  };
  
  export interface Donation {
    amount: number;
    method: string;
    lighthouse: Lighthouse | string;
    donor: User | string;
    lat: number;
    lng: number;
  };

  export type Db = {
    userStore: any;
    lighthouseStore: any;
    donationStore: any;
  };