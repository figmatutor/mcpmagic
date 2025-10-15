import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      data-oid="79diqm7"
    >
      <div className="max-w-md w-full text-center space-y-8" data-oid="ei:0c3v">
        {/* Error Icon */}
        <div
          className="text-8xl font-bold text-muted-foreground/30"
          data-oid="8sgm..r"
        >
          404
        </div>

        {/* Error Card */}
        <Card data-oid="86loqf_">
          <CardHeader className="space-y-2" data-oid="lkd04c-">
            <CardTitle className="text-2xl" data-oid="9iyto2_">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-base" data-oid="tl1c_kt">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The
              prompt you&apos;re looking for might have been moved or
              doesn&apos;t exist.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4" data-oid="njeu1qx">
            <div
              className="flex flex-col sm:flex-row gap-3 justify-center"
              data-oid="uxdxfh_"
            >
              <Button asChild variant="default" data-oid="62x55oq">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                  data-oid="upo8d2x"
                >
                  <Home className="h-4 w-4" data-oid="m4wdc:t" />
                  Go Home
                </Link>
              </Button>
              <Button asChild variant="outline" data-oid=":0dztgt">
                <Link
                  href="/#prompts"
                  className="flex items-center gap-2"
                  data-oid="ft5e0x."
                >
                  <Search className="h-4 w-4" data-oid="9ocj01s" />
                  Browse Prompts
                </Link>
              </Button>
            </div>

            {/* <div className="pt-4 border-t" data-oid="fqhnzdm">
                         <p className="text-sm text-muted-foreground" data-oid="d2a:j:a">
                           Looking for a specific prompt? Try using the search function on
                           our{" "}
                           <Link
                             href="/"
                             className="text-primary hover:underline"
                             data-oid="w6h1tf0"
                           >
                             main page
                           </Link>
                           .
                         </p>
                        </div> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
