/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/utils/http"; // axios instance kamu
import { Report, Review } from "../models";

export async function addReport(data: FormData) {
  const res = await http.post("/report", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.data;
}


export async function getReportCustomer(customer_id: string): Promise<Report[]> {
  const res = await http.get(`/report/${customer_id}`);
  return res.data.data; // sesuaikan sama struktur response backend
}

export async function updateBookingStatus(code: string, status: string) {
  const res = await http.patch(`/management-customer/status/${code}`, { status });
  return res.data.data; // balikin data updated
}


export async function GetFacilityCode(category_id: string) {
  try {
  const res = await http.get(`/facility/${category_id}`);
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch code facility";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function PostReview(_id: string, review: Review) {
  try {
  const res = await http.post(`/report/review/${_id}`, {review});
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch code facility";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function GetIFacilityOnDivisionEmployee(id_employee: string) {

  try {

  const res = await http.get(`/employee/facility-on-division/${id_employee}`);
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal GetI Facility On Divisi on Employee ";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}