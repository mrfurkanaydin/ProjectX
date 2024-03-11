const axios = require("axios");
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto
export async function GET(request) {
  return Response.json({ name: "Home API route" });
}

export async function POST(request) {
  const body = await request.json();
  let data = JSON.stringify(body);

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/v1/auth/login",
    headers: {
      "Content-Type": "application/json"
    },
    data: data
  };
  try {
    const response = await axios.request(config);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(error);
  }
}
