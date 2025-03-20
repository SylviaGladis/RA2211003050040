import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Heart, Share2 } from "lucide-react"
import { getTrendingPosts, getUserById } from "@/lib/api"

export default async function TrendingPostsPage() {
  const trendingPosts = await getTrendingPosts(5)

  // Get user data for each post
  const postsWithUserData = await Promise.all(
    trendingPosts.map(async (post) => {
      const user = await getUserById(post.userid.toString())
      return {
        ...post,
        user: {
          name: user?.name || `User ${post.userid}`,
          id: post.userid.toString(),
        },
      }
    }),
  )

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Trending Posts</h1>
        <p className="text-muted-foreground mt-2">The most popular posts across the platform.</p>
      </div>

      <div className="grid gap-6">
        {postsWithUserData.length > 0 ? (
          postsWithUserData.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={post.user.name} />
                    <AvatarFallback>{post.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold">{post.user.name}</div>
                      <div className="text-sm text-muted-foreground">• User ID: {post.user.id}</div>
                    </div>
                    <p className="text-base">{post.content}</p>
                    <div className="flex items-center gap-6 pt-2">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 100)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 500)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Share2 className="h-4 w-4" />
                        <span>{Math.floor(Math.random() * 50)}</span>
                      </div>
                      <Badge variant="secondary">Trending</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-4">
            <p className="text-muted-foreground">Loading trending posts...</p>
          </div>
        )}
      </div>
    </div>
  )
}

