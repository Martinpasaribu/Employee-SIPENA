/* eslint-disable @typescript-eslint/no-explicit-any */
// services/customerService.ts

import http from "@/utils/http";


export async function GetAdmin() {
  try {
  const res = await http.get("/admin",);
    return res.data;
  } catch (error: any) {
    // Kalau pakai axios, biasanya response error ada di error.response.data
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal fetch admin";

    // Lempar error biar ditangkap di handleSubmit
    throw new Error(message);
  }
}

export async function UpdateEmployee(_id: string, data: any) {
  try {
    const res = await http.patch(`/employee/update/${_id}`, data);
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal update admin";
    throw new Error(message);
  }
}

export async function UpdateRoleAdmin(_id: string, role: any) {
  try {
    const res = await http.patch(`/admin/update-role/${_id}`, {role});
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal update admin";
    throw new Error(message);
  }
}
