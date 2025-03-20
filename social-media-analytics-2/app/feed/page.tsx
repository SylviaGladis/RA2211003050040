"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Share2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Types for our feed data
interface User {
  id: string
  name: string
}

interface Post {
  id: number
  userid: number
  content: string
  user?: User
}

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // Fetch all posts for the feed
  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/posts")
      if (!response.ok) {
        throw new Error("Failed to fetch posts")
      }
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setLoading(false)
    }
  }

  // Refresh the feed with new posts
  const refreshFeed = async () => {
    setRefreshing(true)
    await fetchPosts()
    setRefreshing(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
          <p className="text-muted-foreground mt-2">Real-time updates of the newest posts on the platform.</p>
        </div>
        <Button onClick={refreshFeed} disabled={refreshing || loading} className="flex items-center gap-2">
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-6">
        {(loading || refreshing) && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                  <Skeleton className="h-20 w-full" />
                  <div className="flex gap-4 pt-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!loading && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No posts available. Try refreshing.</p>
          </div>
        )}

        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={`/placeholder.svg?height=40&width=40`}
                    alt={post.user?.name || `User ${post.userid}`}
                  />
                  <AvatarFallback>{post.user?.name?.substring(0, 2).toUpperCase() || `U${post.userid}`}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{post.user?.name || `User ${post.userid}`}</div>
                    <div className="text-sm text-muted-foreground">• User ID: {post.userid}</div>
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
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

