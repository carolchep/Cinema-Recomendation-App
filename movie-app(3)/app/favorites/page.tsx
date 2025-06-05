import { getServerAuthSession } from "@/lib/auth"
import { redirect } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart } from "lucide-react"

export default async function FavoritesPage() {
  const session = await getServerAuthSession()

  if (!session?.user) {
    redirect("/auth/signin?callbackUrl=/favorites")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-6 md:px-6 md:py-12">
          <div className="flex items-center gap-2 mb-8">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold">Your Favorites</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Favorite Movies</CardTitle>
              <CardDescription>Movies you've marked as favorites</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">Start exploring movies and add them to your favorites!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
