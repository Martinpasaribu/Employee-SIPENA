/* eslint-disable @typescript-eslint/no-explicit-any */
// services/customerService.ts
// src/services/order_service.ts
import http from "@/utils/http";
import { Booking, BookingApi } from "../models";

export async function AddBooking(booking: BookingApi) {
  const res = await http.post("/booking", booking); // endpoint sesuai backend
  return res.data;
}

export async function GetRoom() {
  const res = await http.get("/room"); // endpoint sesuai backend
  return res.data.data;
}
