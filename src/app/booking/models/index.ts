export interface Booking {
  username: string;
  room_key: Room;
  phone: number;
  email: string;
  booking_date: Date;
}

export interface BookingApi {
  username: string;
  room_key: string;
  phone: number;
  email: string;
  booking_date: Date;
}


export interface Facility {
  name: string;
  code: string;
  status: "B" | "P" | "T" | "R";
  image: string;
}

export interface Room{
    _id:string
    name: string,
    code: string,
    price: number,
    facility: Facility[],
    status: boolean,
    customer_key: string,
    report_id: string,
    images: string[];
}