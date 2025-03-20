import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { FileText } from "lucide-react"
import { getTopUsers } from "@/lib/api"

export default async function TopUsersPage() {
  const topUsers = await getTopUsers(5)

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Top Users</h1>
        <p className="text-muted-foreground mt-2">
          The top five users with the highest number of posts on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Rankings</CardTitle>
          <CardDescription>Based on total post count</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {topUsers.length > 0 ? (
              topUsers.map((user, index) => (
                <div key={user.id} className="flex items-center">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="font-medium w-6">{index + 1}</div>
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                      <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">User ID: {user.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{user.postCount || 0}</span>
                    </div>
                    <Badge variant="secondary">Top Poster</Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <p className="text-muted-foreground">Loading user data...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

