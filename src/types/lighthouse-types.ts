export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    _id: string;
  };
  
  export type Group = {
    name: string;
    _id: string;
  };
  
  export interface Lighthouse {
    name: number;
    group: Group | string;
    user: User | string;
    lat: number;
    lng: number;
    img: String
  };

  export type Db = {
    userStore: any;
    groupStore: any;
    lighthouseStore: any;
  };