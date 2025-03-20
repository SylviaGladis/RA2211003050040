import { getTrendingPosts, getUserById } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const trendingPosts = await getTrendingPosts(5)

    // Enrich posts with user data
    const enrichedPosts = await Promise.all(
      trendingPosts.map(async (post) => {
        const user = await getUserById(post.userid.toString())
        return {
          ...post,
          user: user
            ? {
                id: user.id,
                name: user.name,
              }
            : undefined,
        }
      }),
    )

    return NextResponse.json(enrichedPosts)
  } catch (error) {
    console.error("Error in trending posts API route:", error)
    return NextResponse.json({ error: "Failed to fetch trending posts" }, { status: 500 })
  }
}

