import { getTopUsers } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const topUsers = await getTopUsers(5)
    return NextResponse.json(topUsers)
  } catch (error) {
    console.error("Error in top users API route:", error)
    return NextResponse.json({ error: "Failed to fetch top users" }, { status: 500 })
  }
}

