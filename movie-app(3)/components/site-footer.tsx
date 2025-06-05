import Link from "next/link"
import { Github, Mail, Phone } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container flex items-center justify-center py-6">
        <div className="flex flex-wrap items-center justify-center gap-6">
          <p className="text-sm font-medium">Caroline Samoei</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>071134457</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <a href="mailto:carolchepsam@gmail.com" className="hover:underline">
              carolchepsam@gmail.com
            </a>
          </div>
          <Link href="https://github.com/carolchep" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
