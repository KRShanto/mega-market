import Link from "next/link"
import Image from "next/image"
import { Search, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CategoriesPage() {
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
            <Link href="/categories" className="text-sm font-medium text-primary">
              Categories
            </Link>
            <Link href="/shops" className="text-sm font-medium transition-colors hover:text-primary">
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Browse All Categories</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Explore our wide range of product categories and find exactly what you're looking for.
              </p>
              <div className="w-full max-w-md flex items-center space-x-2">
                <div className="relative w-full">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search categories..."
                    className="w-full bg-background pl-8 rounded-lg border border-input"
                  />
                </div>
                <Button type="submit">Search</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Categories */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Main Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mainCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={300}
                    height={300}
                    className="aspect-square object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-900/60 to-transparent" />
                  <div className="absolute bottom-0 w-full p-4">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <p className="text-sm text-white/80">{category.itemCount} items</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Subcategories */}
        {categoryGroups.map((group) => (
          <section key={group.id} className="w-full py-12 md:py-16 bg-theme-50 even:bg-transparent">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold mb-8">{group.name}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {group.categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="group flex flex-col items-center p-4 rounded-lg bg-background border transition-colors hover:border-primary hover:bg-theme-50"
                  >
                    <div className="relative w-16 h-16 mb-3">
                      <Image
                        src={category.icon || "/placeholder.svg"}
                        alt={category.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-center">{category.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{category.itemCount} items</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Popular Categories */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Categories</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our most popular categories with thousands of products
                </p>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularCategories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group relative overflow-hidden rounded-xl shadow-lg h-64"
                >
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-theme-900/80 via-theme-900/40 to-transparent" />
                  <div className="absolute bottom-0 w-full p-6">
                    <h3 className="text-2xl font-bold text-white">{category.name}</h3>
                    <p className="text-white/90 mt-1">{category.description}</p>
                    <Button className="mt-4" variant="secondary">
                      Explore {category.name}
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Can't Find What You Need?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Contact us and we'll help you find the right products or connect you with the right vendors
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-1 bg-white text-primary hover:bg-theme-100"
                  asChild
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/shops">Browse Shops</Link>
                </Button>
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
const mainCategories = [
  {
    id: 1,
    name: "Clothing",
    slug: "clothing",
    itemCount: 1240,
    image: "/vibrant-clothing-display.png",
  },
  {
    id: 2,
    name: "Watches",
    slug: "watches",
    itemCount: 420,
    image: "/opulent-timepieces.png",
  },
  {
    id: 3,
    name: "Eyewear",
    slug: "eyewear",
    itemCount: 310,
    image: "/eyewear-collection.png",
  },
  {
    id: 4,
    name: "Footwear",
    slug: "footwear",
    itemCount: 560,
    image: "/diverse-footwear-display.png",
  },
  {
    id: 5,
    name: "Jewelry",
    slug: "jewelry",
    itemCount: 280,
    image: "/shimmering-gems.png",
  },
  {
    id: 6,
    name: "Electronics",
    slug: "electronics",
    itemCount: 890,
    image: "/tech-lifestyle.png",
  },
  {
    id: 7,
    name: "Home Decor",
    slug: "home-decor",
    itemCount: 750,
    image: "/modern-eclectic-decor.png",
  },
  {
    id: 8,
    name: "Beauty",
    slug: "beauty",
    itemCount: 630,
    image: "/cosmetic-collection.png",
  },
]

const categoryGroups = [
  {
    id: 1,
    name: "Fashion Categories",
    categories: [
      { id: 101, name: "Men's Clothing", slug: "mens-clothing", itemCount: 450, icon: "/icons/mens-clothing.png" },
      {
        id: 102,
        name: "Women's Clothing",
        slug: "womens-clothing",
        itemCount: 620,
        icon: "/icons/womens-clothing.png",
      },
      { id: 103, name: "Kids' Clothing", slug: "kids-clothing", itemCount: 170, icon: "/icons/kids-clothing.png" },
      { id: 104, name: "Formal Wear", slug: "formal-wear", itemCount: 85, icon: "/icons/formal-wear.png" },
      { id: 105, name: "Casual Wear", slug: "casual-wear", itemCount: 320, icon: "/icons/casual-wear.png" },
      { id: 106, name: "Sportswear", slug: "sportswear", itemCount: 210, icon: "/icons/sportswear.png" },
      { id: 107, name: "Underwear", slug: "underwear", itemCount: 95, icon: "/icons/underwear.png" },
      { id: 108, name: "Sleepwear", slug: "sleepwear", itemCount: 75, icon: "/icons/sleepwear.png" },
      { id: 109, name: "Accessories", slug: "accessories", itemCount: 180, icon: "/icons/accessories.png" },
      { id: 110, name: "Bags", slug: "bags", itemCount: 140, icon: "/icons/bags.png" },
    ],
  },
  {
    id: 2,
    name: "Electronics Categories",
    categories: [
      { id: 201, name: "Smartphones", slug: "smartphones", itemCount: 210, icon: "/icons/smartphones.png" },
      { id: 202, name: "Laptops", slug: "laptops", itemCount: 175, icon: "/icons/laptops.png" },
      { id: 203, name: "Tablets", slug: "tablets", itemCount: 95, icon: "/icons/tablets.png" },
      { id: 204, name: "Headphones", slug: "headphones", itemCount: 120, icon: "/icons/headphones.png" },
      { id: 205, name: "Cameras", slug: "cameras", itemCount: 85, icon: "/icons/cameras.png" },
      { id: 206, name: "TVs", slug: "tvs", itemCount: 65, icon: "/icons/tvs.png" },
      { id: 207, name: "Gaming", slug: "gaming", itemCount: 140, icon: "/icons/gaming.png" },
      { id: 208, name: "Smart Home", slug: "smart-home", itemCount: 110, icon: "/icons/smart-home.png" },
      { id: 209, name: "Audio", slug: "audio", itemCount: 95, icon: "/icons/audio.png" },
      { id: 210, name: "Wearables", slug: "wearables", itemCount: 75, icon: "/icons/wearables.png" },
    ],
  },
  {
    id: 3,
    name: "Home & Living Categories",
    categories: [
      { id: 301, name: "Furniture", slug: "furniture", itemCount: 320, icon: "/icons/furniture.png" },
      { id: 302, name: "Kitchen", slug: "kitchen", itemCount: 280, icon: "/icons/kitchen.png" },
      { id: 303, name: "Bedding", slug: "bedding", itemCount: 150, icon: "/icons/bedding.png" },
      { id: 304, name: "Bath", slug: "bath", itemCount: 120, icon: "/icons/bath.png" },
      { id: 305, name: "Decor", slug: "decor", itemCount: 210, icon: "/icons/decor.png" },
      { id: 306, name: "Lighting", slug: "lighting", itemCount: 95, icon: "/icons/lighting.png" },
      { id: 307, name: "Storage", slug: "storage", itemCount: 85, icon: "/icons/storage.png" },
      { id: 308, name: "Garden", slug: "garden", itemCount: 110, icon: "/icons/garden.png" },
      { id: 309, name: "Appliances", slug: "appliances", itemCount: 75, icon: "/icons/appliances.png" },
      { id: 310, name: "Tools", slug: "tools", itemCount: 90, icon: "/icons/tools.png" },
    ],
  },
]

const popularCategories = [
  {
    id: 1,
    name: "Fashion",
    slug: "fashion",
    description: "Discover the latest trends in clothing, shoes, and accessories",
    image: "/category-fashion.png",
  },
  {
    id: 2,
    name: "Electronics",
    slug: "electronics",
    description: "Explore cutting-edge gadgets and tech for every need",
    image: "/tech-lifestyle.png",
  },
  {
    id: 3,
    name: "Home & Living",
    slug: "home-living",
    description: "Transform your space with stylish and functional home products",
    image: "/modern-eclectic-decor.png",
  },
]
