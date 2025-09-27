/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/utils/http";


export async function PostContact(data: any) {
  try {
    const res = await http.post("/contact", data);
    return res.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Gagal post message";
    throw new Error(message);
  }
}
