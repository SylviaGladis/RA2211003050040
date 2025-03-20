// API client for the social media analytics platform
const API_BASE_URL = "http://20.244.56.144/test"

export interface User {
  id: string
  name: string
}

export interface Post {
  id: number
  userid: number
  content: string
}

export interface UsersResponse {
  users: Record<string, string>
}

export interface PostsResponse {
  posts: Post[]
}

// Get all users from the API
export async function getUsers(): Promise<User[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users`)

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`)
    }

    const data: UsersResponse = await response.json()

    // Transform the response into an array of users
    return Object.entries(data.users).map(([id, name]) => ({
      id,
      name,
    }))
  } catch (error) {
    console.error("Error fetching users:", error)
    return []
  }
}

// Get top users based on post count
export async function getTopUsers(limit = 5): Promise<User[]> {
  try {
    // First get all users
    const users = await getUsers()

    // For each user, get their posts to count them
    const usersWithPostCounts = await Promise.all(
      users.map(async (user) => {
        const posts = await getUserPosts(Number.parseInt(user.id))
        return {
          ...user,
          postCount: posts.length,
        }
      }),
    )

    // Sort by post count and take the top 'limit' users
    return usersWithPostCounts.sort((a, b) => (b.postCount || 0) - (a.postCount || 0)).slice(0, limit)
  } catch (error) {
    console.error("Error fetching top users:", error)
    return []
  }
}

// Get posts for a specific user
export async function getUserPosts(userId: number): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/posts`)

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for user ${userId}: ${response.status}`)
    }

    const data: PostsResponse = await response.json()
    return data.posts || []
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error)
    return []
  }
}

// Get all posts from all users
export async function getAllPosts(): Promise<Post[]> {
  try {
    const users = await getUsers()
    const allPostsPromises = users.map((user) => getUserPosts(Number.parseInt(user.id)))
    const postsArrays = await Promise.all(allPostsPromises)

    // Flatten the array of arrays into a single array of posts
    return postsArrays.flat()
  } catch (error) {
    console.error("Error fetching all posts:", error)
    return []
  }
}

// Get trending posts (posts with most comments - simulated since we don't have comment data)
export async function getTrendingPosts(limit = 5): Promise<Post[]> {
  try {
    const allPosts = await getAllPosts()

    // Since we don't have comment data in the API, we'll simulate it
    // by using the post ID as a proxy for popularity (higher ID = newer = more trending)
    return allPosts.sort((a, b) => b.id - a.id).slice(0, limit)
  } catch (error) {
    console.error("Error fetching trending posts:", error)
    return []
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const users = await getUsers()
    return users.find((user) => user.id === userId) || null
  } catch (error) {
    console.error(`Error fetching user ${userId}:`, error)
    return null
  }
}

