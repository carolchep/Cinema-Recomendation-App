import { getServerAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Edit, Settings } from "lucide-react"
import Link from "next/link"

export default async function ProfilePage() {
  const session = await getServerAuthSession()

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/profile")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <Card>
                <CardHeader className="flex flex-col items-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={session.user.image || ""} alt={session.user.name || "User"} />
                    <AvatarFallback>
                      {session.user.name
                        ? session.user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase()
                        : "U"}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="mt-4">{session.user.name}</CardTitle>
                  <CardDescription>{session.user.email}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/profile/edit">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Your Activity</CardTitle>
                  <CardDescription>Your recent activity and preferences</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Recently Viewed</h3>
                      <p className="text-muted-foreground">You haven't viewed any movies yet.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Favorite Genres</h3>
                      <p className="text-muted-foreground">Start rating movies to see your favorite genres.</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Watchlist</h3>
                      <p className="text-muted-foreground">Your watchlist is empty.</p>
                      <Button className="mt-4" asChild>
                        <Link href="/search">Browse Movies</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
