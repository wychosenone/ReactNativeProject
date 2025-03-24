export interface userInput {
  text: string;
  imageUri: string;
}
export interface GoalData {
  text: string;
  warning?: boolean;
  owner: string | null;
  imageUri?: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}
export interface GoalFromDB extends GoalData {
  id: string;
}

export interface LocationData {
  latitude: number;
  longitude: number;
}