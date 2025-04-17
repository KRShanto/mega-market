import Link from "next/link"
import { ShoppingBag, User, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  getServerUser,
  getServerProfile,
  isRootAdmin,
  isShopAdmin,
  hasShop,
  hasPendingShopRequest,
} from "@/lib/server-auth"
import { SignOutButton } from "@/components/auth/sign-out-button"

export async function Navbar() {
  const user = await getServerUser()
  const profile = user ? await getServerProfile() : null
  const userIsRootAdmin = user ? await isRootAdmin() : false
  const userIsShopAdmin = user ? await isShopAdmin() : false
  const userHasShop = user ? await hasShop() : false
  const userHasPendingShopRequest = user ? await hasPendingShopRequest() : false

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <ShoppingBag className="h-6 w-6 text-primary" />
          <span className="text-primary">Mega Market</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Categories
          </Link>
          <Link href="/shops" className="text-sm font-medium transition-colors hover:text-primary">
            Shops
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{profile?.display_name || user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem asChild>
                    <Link href="/account">Account Settings</Link>
                  </DropdownMenuItem>

                  {userIsRootAdmin && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/seller-applications">Seller Applications</Link>
                    </DropdownMenuItem>
                  )}

                  {userIsShopAdmin && userHasShop && (
                    <DropdownMenuItem asChild>
                      <Link href="/seller/dashboard">Seller Dashboard</Link>
                    </DropdownMenuItem>
                  )}

                  {!userIsShopAdmin && !userHasPendingShopRequest && (
                    <DropdownMenuItem asChild>
                      <Link href="/become-seller">Become a Seller</Link>
                    </DropdownMenuItem>
                  )}

                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <SignOutButton />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-sm font-medium transition-colors hover:text-primary">
                Login
              </Link>
              <Button asChild>
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
