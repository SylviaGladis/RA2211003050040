import { getAllPosts, getUserById } from "@/lib/api"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get all posts
    const posts = await getAllPosts()

    // Enrich posts with user data
    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {
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

    // Sort posts by ID in descending order (newest first)
    const sortedPosts = enrichedPosts.sort((a, b) => b.id - a.id)

    return NextResponse.json(sortedPosts)
  } catch (error) {
    console.error("Error in posts API route:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

