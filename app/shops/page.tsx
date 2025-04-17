import Link from "next/link"
import Image from "next/image"
import { Filter, Search, ShoppingBag, Star, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"

export default function ShopsPage() {
  return (
    <div className="flex min-h-screen flex-col">
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
            <Link href="/shops" className="text-sm font-medium text-primary">
              Shops
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
              Login
            </Link>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 bg-theme-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover Our Shops</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Browse through our collection of verified vendors offering quality products across various categories.
              </p>
              <div className="w-full max-w-md flex items-center space-x-2">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search shops..."
                    className="w-full bg-background pl-8 rounded-lg border border-input"
                  />
                </div>
                <Button type="submit">Search</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Shops Listing */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Filters Sidebar */}
              <div className="w-full md:w-64 shrink-0">
                <div className="sticky top-24 border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Filters
                    </h2>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      Clear All
                    </Button>
                  </div>

                  <Accordion type="multiple" defaultValue={["category", "rating", "location"]} className="w-full">
                    <AccordionItem value="category">
                      <AccordionTrigger className="py-2">Category</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2">
                          {["Clothing", "Electronics", "Home Decor", "Beauty", "Jewelry", "Footwear"].map(
                            (category) => (
                              <div key={category} className="flex items-center gap-2">
                                <Checkbox id={category.toLowerCase().replace(" ", "-")} />
                                <label htmlFor={category.toLowerCase().replace(" ", "-")} className="text-sm">
                                  {category}
                                </label>
                              </div>
                            ),
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="rating">
                      <AccordionTrigger className="py-2">Rating</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <div key={rating} className="flex items-center gap-2">
                              <Checkbox id={`rating-${rating}`} />
                              <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                                {rating === 5 && <span className="ml-1">& up</span>}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="location">
                      <AccordionTrigger className="py-2">Location</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2">
                          {["United States", "United Kingdom", "Canada", "Australia", "Germany", "France"].map(
                            (location) => (
                              <div key={location} className="flex items-center gap-2">
                                <Checkbox id={location.toLowerCase().replace(" ", "-")} />
                                <label htmlFor={location.toLowerCase().replace(" ", "-")} className="text-sm">
                                  {location}
                                </label>
                              </div>
                            ),
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="verified">
                      <AccordionTrigger className="py-2">Verification</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <Checkbox id="verified-only" checked />
                            <label htmlFor="verified-only" className="text-sm">
                              Verified Shops Only
                            </label>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>

              {/* Shops Grid */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">Showing 1-12 of 36 shops</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8">
                      Featured
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      Newest
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8">
                      Top Rated
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {shops.map((shop) => (
                    <Card key={shop.id} className="overflow-hidden">
                      <div className="aspect-[3/1] relative bg-theme-100">
                        {shop.coverImage ? (
                          <Image
                            src={shop.coverImage || "/placeholder.svg"}
                            alt={`${shop.name} cover`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Store className="h-12 w-12 text-theme-300" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative -mt-10 h-16 w-16 overflow-hidden rounded-full border-4 border-background bg-background">
                            {shop.logo ? (
                              <Image
                                src={shop.logo || "/placeholder.svg"}
                                alt={shop.name}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-theme-100">
                                <Store className="h-8 w-8 text-primary" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 pt-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-lg">{shop.name}</h3>
                              {shop.verified && (
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{shop.category}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm line-clamp-2">{shop.description}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < shop.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                            <span className="ml-1 text-sm text-muted-foreground">({shop.reviewCount})</span>
                          </div>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="text-sm text-muted-foreground">{shop.productCount} products</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-6 pt-0">
                        <Button className="w-full" asChild>
                          <Link href={`/shop/${shop.slug}`}>Visit Shop</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-center mt-8">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" disabled>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8" disabled>
                      1
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">
                      2
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 w-8">
                      3
                    </Button>
                    <Button variant="outline" size="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Shops */}
        <section className="w-full py-12 md:py-24 bg-theme-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Featured Shops</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our top-rated vendors with exceptional products and service
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredShops.map((shop) => (
                <Card key={shop.id} className="overflow-hidden">
                  <div className="aspect-video relative">
                    {shop.featuredImage ? (
                      <Image
                        src={shop.featuredImage || "/placeholder.svg"}
                        alt={shop.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-theme-100">
                        <Store className="h-12 w-12 text-theme-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 w-full p-4">
                      <h3 className="text-xl font-bold text-white">{shop.name}</h3>
                      <p className="text-white/80 text-sm">{shop.category}</p>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <p className="line-clamp-3">{shop.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < shop.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-muted-foreground">({shop.reviewCount})</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{shop.productCount} products</span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button className="w-full" asChild>
                      <Link href={`/shop/${shop.slug}`}>Visit Shop</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Become a Vendor */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Become a Vendor</h2>
                <p className="text-muted-foreground md:text-xl">
                  Join our marketplace and start selling your products to thousands of customers. We provide all the
                  tools you need to succeed.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Easy shop setup and product listing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Powerful vendor dashboard with analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Secure payment processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span>Marketing and promotion opportunities</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Button size="lg" asChild>
                    <Link href="/register-vendor">Become a Vendor</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/vendor-info">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                {/* Use a placeholder image if vendor-dashboard.png is not available */}
                <Image
                  src="/vendor-dashboard.png"
                  alt="Vendor Dashboard"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Mega Market. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm font-medium transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data
const shops = [
  {
    id: 1,
    name: "Fashion Forward",
    slug: "fashion-forward",
    category: "Clothing",
    description:
      "Trendy and stylish clothing for all occasions. We offer the latest fashion trends at affordable prices.",
    logo: "/abstract-fashion-logo.png",
    coverImage: "/vibrant-boutique.png",
    rating: 4.8,
    reviewCount: 1245,
    productCount: 156,
    verified: true,
  },
  {
    id: 2,
    name: "Timeless Watches",
    slug: "timeless-watches",
    category: "Watches",
    description: "Luxury and affordable watches for every style. From classic to modern designs, we have it all.",
    logo: "/classic-timepiece-emblem.png",
    coverImage: "/luxury-watch-display.png",
    rating: 4.7,
    reviewCount: 850,
    productCount: 78,
    verified: true,
  },
  {
    id: 3,
    name: "Clear Vision",
    slug: "clear-vision",
    category: "Eyewear",
    description: "Premium quality eyewear for all. Sunglasses, prescription glasses, and fashion frames available.",
    logo: "/abstract-eyewear-logo.png",
    coverImage: "/placeholder.svg?height=200&width=600&query=eyewear store",
    rating: 4.5,
    reviewCount: 620,
    productCount: 94,
    verified: true,
  },
  {
    id: 4,
    name: "Step Style",
    slug: "step-style",
    category: "Footwear",
    description: "Comfortable and stylish footwear for men, women, and children. Find your perfect pair today.",
    logo: "/placeholder.svg?height=64&width=64&query=footwear logo",
    coverImage: "/placeholder.svg?height=200&width=600&query=footwear store",
    rating: 4.6,
    reviewCount: 980,
    productCount: 112,
    verified: true,
  },
  {
    id: 5,
    name: "Sparkle Jewelry",
    slug: "sparkle-jewelry",
    category: "Jewelry",
    description: "Elegant and stunning jewelry pieces for every occasion. Make a statement with our unique designs.",
    logo: "/placeholder.svg?height=64&width=64&query=jewelry logo",
    coverImage: "/placeholder.svg?height=200&width=600&query=jewelry store",
    rating: 4.9,
    reviewCount: 750,
    productCount: 86,
    verified: true,
  },
  {
    id: 6,
    name: "Tech Haven",
    slug: "tech-haven",
    category: "Electronics",
    description: "Latest gadgets and electronics at competitive prices. Stay updated with the newest technology.",
    logo: "/placeholder.svg?height=64&width=64&query=electronics logo",
    coverImage: "/placeholder.svg?height=200&width=600&query=electronics store",
    rating: 4.7,
    reviewCount: 1500,
    productCount: 210,
    verified: true,
  },
]

const featuredShops = [
  {
    id: 1,
    name: "Fashion Forward",
    slug: "fashion-forward",
    category: "Clothing",
    description:
      "Trendy and stylish clothing for all occasions. We offer the latest fashion trends at affordable prices. Our curated collection includes everything from casual wear to formal attire.",
    featuredImage: "/placeholder.svg?height=300&width=600&query=fashion store featured",
    rating: 4.8,
    reviewCount: 1245,
    productCount: 156,
  },
  {
    id: 5,
    name: "Sparkle Jewelry",
    slug: "sparkle-jewelry",
    category: "Jewelry",
    description:
      "Elegant and stunning jewelry pieces for every occasion. Make a statement with our unique designs. We source the finest materials to create timeless pieces that last a lifetime.",
    featuredImage: "/placeholder.svg?height=300&width=600&query=jewelry store featured",
    rating: 4.9,
    reviewCount: 750,
    productCount: 86,
  },
  {
    id: 6,
    name: "Tech Haven",
    slug: "tech-haven",
    category: "Electronics",
    description:
      "Latest gadgets and electronics at competitive prices. Stay updated with the newest technology. Our team tests every product to ensure quality and performance before it reaches you.",
    featuredImage: "/placeholder.svg?height=300&width=600&query=electronics store featured",
    rating: 4.7,
    reviewCount: 1500,
    productCount: 210,
  },
]
