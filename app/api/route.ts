//fetch => Request => Server => Response
//GET & POST
import { NextResponse } from "next/server";
export async function GET() {
  return NextResponse.json({ data: "OK" });
}
