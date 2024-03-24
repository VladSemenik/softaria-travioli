export interface Destination {
  id: number;
  name: string;
}

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string | null;
  country_code: string;
  hotel_rating: number | null;
  phone_number: string | null;
  website: string | null;
}
