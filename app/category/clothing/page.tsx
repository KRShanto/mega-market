import Link from "next/link"
import Image from "next/image"
import { ChevronDown, Filter, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

export default function ClothingCategoryPage() {
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

      <div className="container px-4 py-6 md:py-8">
        <div className="flex flex-col gap-2">
          <nav className="flex gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="#" className="hover:text-primary">
              Categories
            </Link>
            <span>/</span>
            <span className="font-medium text-foreground">Clothing</span>
          </nav>
          <h1 className="text-3xl font-bold">Clothing</h1>
        </div>
      </div>

      <div className="container px-4 pb-12">
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

              <Accordion type="multiple" defaultValue={["category", "price", "size", "color"]} className="w-full">
                <AccordionItem value="category">
                  <AccordionTrigger className="py-2">Category</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="t-shirts" checked />
                        <label htmlFor="t-shirts" className="text-sm">
                          T-Shirts
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="shirts" />
                        <label htmlFor="shirts" className="text-sm">
                          Shirts
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="jeans" />
                        <label htmlFor="jeans" className="text-sm">
                          Jeans
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="trousers" />
                        <label htmlFor="trousers" className="text-sm">
                          Trousers
                        </label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="jackets" />
                        <label htmlFor="jackets" className="text-sm">
                          Jackets
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="price">
                  <AccordionTrigger className="py-2">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider defaultValue={[0, 100]} max={200} step={1} />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">$0</span>
                        <span className="text-sm">$200+</span>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="size">
                  <AccordionTrigger className="py-2">Size</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                        <Button key={size} variant="outline" size="sm" className="h-8 text-xs">
                          {size}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="color">
                  <AccordionTrigger className="py-2">Color</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { name: "Black", class: "bg-black" },
                        { name: "White", class: "bg-white border" },
                        { name: "Red", class: "bg-red-500" },
                        { name: "Blue", class: "bg-blue-500" },
                        { name: "Green", class: "bg-green-500" },
                        { name: "Yellow", class: "bg-yellow-500" },
                      ].map((color) => (
                        <div
                          key={color.name}
                          className={`w-6 h-6 rounded-full cursor-pointer ${color.class}`}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="brand">
                  <AccordionTrigger className="py-2">Brand</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      {["Brand A", "Brand B", "Brand C", "Brand D", "Brand E"].map((brand) => (
                        <div key={brand} className="flex items-center gap-2">
                          <Checkbox id={brand.toLowerCase().replace(" ", "-")} />
                          <label htmlFor={brand.toLowerCase().replace(" ", "-")} className="text-sm">
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">Showing 1-12 of 36 products</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    Sort by: Featured <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Featured</DropdownMenuItem>
                  <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                  <DropdownMenuItem>Newest</DropdownMenuItem>
                  <DropdownMenuItem>Best Selling</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clothingProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden group">
                  <Link href={`/product/${product.id}`} className="relative block">
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    {product.isNew && (
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        New
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                  </Link>
                  <CardContent className="p-4">
                    <div className="text-sm text-muted-foreground">{product.vendor}</div>
                    <h3 className="font-medium mt-1 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold">${product.price.toFixed(2)}</span>
                      {product.originalPrice > 0 && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full" size="sm">
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full border-t py-6 md:py-0 mt-auto">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Mega Market. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Terms
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Privacy
            </Link>
            <Link href="#" className="text-sm font-medium transition-colors hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sample data for clothing products
const clothingProducts = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    image: "/classic-cotton-tee.png",
    vendor: "Fashion Forward",
    isNew: true,
    category: "T-Shirts",
    colors: ["Black", "White", "Blue"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 49.99,
    originalPrice: 0,
    discount: 0,
    image: "/folded-slim-fit-jeans.png",
    vendor: "Denim Co.",
    isNew: false,
    category: "Jeans",
    colors: ["Blue", "Black"],
    sizes: ["30", "32", "34", "36"],
  },
  {
    id: 3,
    name: "Casual Button-Up Shirt",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    image: "/relaxed-linen-shirt.png",
    vendor: "Style Hub",
    isNew: false,
    category: "Shirts",
    colors: ["White", "Blue", "Red"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    name: "Lightweight Summer Jacket",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "/woman-lightweight-jacket.png",
    vendor: "OutdoorLife",
    isNew: true,
    category: "Jackets",
    colors: ["Beige", "Navy", "Olive"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 5,
    name: "Formal Dress Shirt",
    price: 59.99,
    originalPrice: 0,
    discount: 0,
    image: "/crisp-white-shirt.png",
    vendor: "Executive Wear",
    isNew: false,
    category: "Shirts",
    colors: ["White", "Light Blue", "Pink"],
    sizes: ["15", "15.5", "16", "16.5", "17"],
  },
  {
    id: 6,
    name: "Graphic Print T-Shirt",
    price: 29.99,
    originalPrice: 34.99,
    discount: 14,
    image: "/abstract-geometric-tee.png",
    vendor: "Urban Trends",
    isNew: true,
    category: "T-Shirts",
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 7,
    name: "Chino Trousers",
    price: 44.99,
    originalPrice: 0,
    discount: 0,
    image: "/folded-chino-stack.png",
    vendor: "Casual Comfort",
    isNew: false,
    category: "Trousers",
    colors: ["Khaki", "Navy", "Olive"],
    sizes: ["30", "32", "34", "36", "38"],
  },
  {
    id: 8,
    name: "Hooded Sweatshirt",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    image: "/cozy-hoodie.png",
    vendor: "Comfort Wear",
    isNew: false,
    category: "Jackets",
    colors: ["Gray", "Black", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 9,
    name: "Polo Shirt",
    price: 32.99,
    originalPrice: 0,
    discount: 0,
    image: "/classic-navy-polo.png",
    vendor: "Classic Styles",
    isNew: false,
    category: "T-Shirts",
    colors: ["Navy", "Red", "White", "Black"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 10,
    name: "Distressed Jeans",
    price: 54.99,
    originalPrice: 64.99,
    discount: 15,
    image: "/ripped-denim-closeup.png",
    vendor: "Denim Co.",
    isNew: true,
    category: "Jeans",
    colors: ["Blue", "Light Blue"],
    sizes: ["28", "30", "32", "34", "36"],
  },
  {
    id: 11,
    name: "Linen Shirt",
    price: 49.99,
    originalPrice: 0,
    discount: 0,
    image: "/placeholder.svg?height=300&width=300&query=linen shirt",
    vendor: "Summer Essentials",
    isNew: false,
    category: "Shirts",
    colors: ["White", "Beige", "Light Blue"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 12,
    name: "Cargo Pants",
    price: 59.99,
    originalPrice: 69.99,
    discount: 14,
    image: "/placeholder.svg?height=300&width=300&query=cargo pants",
    vendor: "Outdoor Gear",
    isNew: false,
    category: "Trousers",
    colors: ["Khaki", "Olive", "Black"],
    sizes: ["30", "32", "34", "36", "38"],
  },
]
