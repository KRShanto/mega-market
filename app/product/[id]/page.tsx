import Link from "next/link"
import Image from "next/image"
import {
  ChevronRight,
  Heart,
  MinusCircle,
  PlusCircle,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ProductPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the product data based on the ID
  // For now, we'll use a sample product from our static data
  const productId = Number.parseInt(params.id)
  const product = products.find((p) => p.id === productId) || products[0]

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
        {/* Breadcrumb */}
        <nav className="flex gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/category/clothing" className="hover:text-primary">
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="font-medium text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-lg border">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {product.discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 hover:bg-red-600">{product.discount}% OFF</Badge>
              )}
              {product.isNew && <Badge className="absolute top-4 left-4">New</Badge>}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.gallery?.map((img, index) => (
                <div
                  key={index}
                  className="aspect-square relative overflow-hidden rounded-md border cursor-pointer hover:border-primary"
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12vw"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Link href={`/shop/${product.vendorSlug}`} className="text-sm text-primary hover:underline">
                {product.vendor}
              </Link>
              <h1 className="text-3xl font-bold mt-1">{product.name}</h1>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice > 0 && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Color</span>
                <span className="text-sm text-muted-foreground">{product.colors[0]}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                      color === product.colors[0] ? "border-primary" : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: getColorHex(color),
                      boxShadow: color.toLowerCase() === "white" ? "0 0 0 1px #e5e7eb" : "none",
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Size</span>
                <Link href="#size-guide" className="text-sm text-primary hover:underline">
                  Size Guide
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <Button key={size} variant={size === product.sizes[1] ? "default" : "outline"} className="h-10 px-4">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <span className="font-medium">Quantity</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                  <MinusCircle className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">1</span>
                <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
                  <PlusCircle className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1 gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-start gap-2 text-sm bg-theme-50 p-3 rounded-lg">
              <Truck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Free shipping</p>
                <p className="text-muted-foreground">Free standard shipping on orders over $100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger
                value="description"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none py-3"
              >
                Reviews ({product.reviewCount})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <p>{product.description}</p>
                <ul>
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold mb-4">Product Specifications</h3>
                  <div className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 py-2 border-b">
                        <span className="text-muted-foreground">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Care Instructions</h3>
                  <ul className="space-y-2">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <ChevronRight className="h-4 w-4 mt-1 text-primary shrink-0" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="text-center p-6 border rounded-lg">
                      <div className="text-5xl font-bold">{product.rating.toFixed(1)}</div>
                      <div className="flex justify-center my-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.round(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">Based on {product.reviewCount} reviews</div>
                      <Button className="mt-4 w-full">Write a Review</Button>
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b py-4 last:border-0">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{review.author}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-muted-foreground">{review.date}</span>
                            </div>
                          </div>
                          {review.verified && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Verified Purchase
                            </Badge>
                          )}
                        </div>
                        <h5 className="font-medium mt-2">{review.title}</h5>
                        <p className="mt-1 text-muted-foreground">{review.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
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
                </Link>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground">{product.vendor}</div>
                  <h3 className="font-medium mt-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold">${product.price.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <footer className="w-full border-t py-6 md:py-0 mt-16">
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

// Helper function to convert color names to hex codes
function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    black: "#000000",
    white: "#FFFFFF",
    red: "#EF4444",
    blue: "#3B82F6",
    green: "#10B981",
    yellow: "#F59E0B",
    purple: "#8B5CF6",
    pink: "#EC4899",
    gray: "#6B7280",
    beige: "#E5D3B3",
    navy: "#1E3A8A",
    olive: "#4D7C0F",
    "light blue": "#7DD3FC",
  }

  return colorMap[colorName.toLowerCase()] || "#CCCCCC"
}

// Sample product data
const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    price: 24.99,
    originalPrice: 29.99,
    discount: 17,
    image: "/classic-cotton-tee.png",
    gallery: [
      "/classic-cotton-tee.png",
      "/plain-cotton-tee-back.png",
      "/cotton-t-shirt-texture.png",
      "/cotton-t-shirt-close-up.png",
    ],
    vendor: "Fashion Forward",
    vendorSlug: "fashion-forward",
    isNew: true,
    category: "Clothing",
    subcategory: "T-Shirts",
    colors: ["Black", "White", "Blue", "Red"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.5,
    reviewCount: 128,
    description:
      "Our Classic Cotton T-Shirt is a wardrobe essential. Made from 100% premium cotton, this t-shirt offers both comfort and durability for everyday wear. The classic fit is designed to suit all body types, while the high-quality fabric ensures it maintains its shape wash after wash.",
    features: [
      "100% premium cotton construction",
      "Classic regular fit",
      "Ribbed crew neck",
      "Pre-shrunk fabric",
      "Reinforced shoulder seams for durability",
      "Available in multiple colors and sizes",
    ],
    specifications: {
      Material: "100% Cotton",
      Fit: "Regular",
      "Neck Type": "Crew Neck",
      "Sleeve Type": "Short Sleeve",
      Care: "Machine Washable",
      "Country of Origin": "Bangladesh",
      SKU: "CT-1001-BLK",
    },
    careInstructions: [
      "Machine wash cold with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
      "Do not dry clean",
    ],
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: 49.99,
    originalPrice: 0,
    discount: 0,
    image: "/folded-slim-fit-jeans.png",
    gallery: [
      "/folded-slim-fit-jeans.png",
      "/classic-blue-jeans.png",
      "/denim-details.png",
      "/placeholder.svg?height=300&width=300&query=jeans detail",
    ],
    vendor: "Denim Co.",
    vendorSlug: "denim-co",
    isNew: false,
    category: "Clothing",
    subcategory: "Jeans",
    colors: ["Blue", "Black", "Gray"],
    sizes: ["28", "30", "32", "34", "36", "38"],
    rating: 4.2,
    reviewCount: 95,
    description:
      "These Slim Fit Jeans combine style and comfort for the modern wardrobe. The premium denim fabric has just the right amount of stretch to ensure comfort while maintaining its shape throughout the day. The slim fit design offers a contemporary silhouette without being too tight.",
    features: [
      "98% cotton, 2% elastane for comfortable stretch",
      "Slim fit design from hip to ankle",
      "Five-pocket styling",
      "Button closure with zip fly",
      "Belt loops",
      "Available in multiple washes and sizes",
    ],
    specifications: {
      Material: "98% Cotton, 2% Elastane",
      Fit: "Slim",
      Rise: "Mid-Rise",
      Closure: "Button and Zipper",
      Pockets: "5 Pockets",
      Care: "Machine Washable",
      "Country of Origin": "Turkey",
      SKU: "SJ-2002-BLU",
    },
    careInstructions: [
      "Machine wash cold inside out",
      "Wash with similar colors",
      "Do not bleach",
      "Tumble dry low",
      "Warm iron if needed",
    ],
  },
  {
    id: 3,
    name: "Casual Button-Up Shirt",
    price: 34.99,
    originalPrice: 44.99,
    discount: 22,
    image: "/relaxed-linen-shirt.png",
    gallery: [
      "/relaxed-linen-shirt.png",
      "/placeholder.svg?height=300&width=300&query=button up shirt back",
      "/placeholder.svg?height=300&width=300&query=button up shirt detail",
      "/placeholder.svg?height=300&width=300&query=button up shirt collar",
    ],
    vendor: "Style Hub",
    vendorSlug: "style-hub",
    isNew: false,
    category: "Clothing",
    subcategory: "Shirts",
    colors: ["White", "Blue", "Light Blue", "Pink"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.7,
    reviewCount: 112,
    description:
      "This Casual Button-Up Shirt is perfect for both work and weekend wear. Made from a soft cotton blend, it offers breathability and comfort throughout the day. The relaxed fit provides ease of movement while still maintaining a polished appearance.",
    features: [
      "60% cotton, 40% polyester blend",
      "Regular fit design",
      "Button-down collar",
      "Chest pocket",
      "Adjustable cuffs",
      "Available in various colors and patterns",
    ],
    specifications: {
      Material: "60% Cotton, 40% Polyester",
      Fit: "Regular",
      Collar: "Button-Down",
      "Sleeve Type": "Long Sleeve",
      Closure: "Button Front",
      Care: "Machine Washable",
      "Country of Origin": "Vietnam",
      SKU: "BS-3003-WHT",
    },
    careInstructions: ["Machine wash cold", "Do not bleach", "Tumble dry low", "Iron on low heat", "Do not dry clean"],
  },
  {
    id: 4,
    name: "Lightweight Summer Jacket",
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    image: "/woman-lightweight-jacket.png",
    gallery: [
      "/woman-lightweight-jacket.png",
      "/placeholder.svg?height=300&width=300&query=summer jacket back",
      "/placeholder.svg?height=300&width=300&query=summer jacket detail",
      "/placeholder.svg?height=300&width=300&query=summer jacket pocket",
    ],
    vendor: "OutdoorLife",
    vendorSlug: "outdoor-life",
    isNew: true,
    category: "Clothing",
    subcategory: "Jackets",
    colors: ["Beige", "Navy", "Olive", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"],
    rating: 4.8,
    reviewCount: 76,
    description:
      "Our Lightweight Summer Jacket is the perfect layering piece for mild weather. The water-resistant outer shell protects against light rain, while the breathable fabric keeps you comfortable. With multiple pockets and an adjustable hood, it combines functionality with style.",
    features: [
      "100% polyester with water-resistant coating",
      "Lightweight and breathable design",
      "Adjustable hood",
      "Four exterior pockets and one interior pocket",
      "Full-length front zipper with storm flap",
      "Adjustable cuffs with snap closures",
    ],
    specifications: {
      Material: "100% Polyester",
      "Water Resistance": "Water-Resistant",
      Lining: "Partial Mesh Lining",
      Closure: "Zipper with Snap Storm Flap",
      Pockets: "5 Pockets",
      Hood: "Adjustable, Stowable",
      Care: "Machine Washable",
      "Country of Origin": "China",
      SKU: "LJ-4004-BGE",
    },
    careInstructions: [
      "Machine wash cold on gentle cycle",
      "Do not bleach",
      "Tumble dry low",
      "Do not iron",
      "Do not dry clean",
    ],
  },
]

// Sample reviews
const reviews = [
  {
    id: 1,
    author: "Michael Johnson",
    rating: 5,
    date: "March 15, 2024",
    title: "Excellent quality and fit",
    content:
      "I've purchased many t-shirts over the years, but this one stands out for its quality. The fabric is soft yet durable, and the fit is exactly as described. I've washed it several times now and it still looks brand new. Highly recommend!",
    verified: true,
  },
  {
    id: 2,
    author: "Sarah Williams",
    rating: 4,
    date: "February 28, 2024",
    title: "Great shirt, slightly large",
    content:
      "The quality of this t-shirt is excellent and the color is exactly as shown in the pictures. My only issue is that it runs slightly larger than expected. I usually wear a medium but this fits more like a large. Still, I'm very happy with the purchase.",
    verified: true,
  },
  {
    id: 3,
    author: "David Thompson",
    rating: 5,
    date: "January 12, 2024",
    title: "Perfect everyday t-shirt",
    content:
      "This has quickly become my go-to t-shirt for everyday wear. The cotton is soft and breathable, making it comfortable for all-day wear. The stitching is solid and it washes well without shrinking. Will definitely buy more in different colors!",
    verified: false,
  },
]

// Related products
const relatedProducts = [
  {
    id: 5,
    name: "Formal Dress Shirt",
    price: 59.99,
    image: "/crisp-white-shirt.png",
    vendor: "Executive Wear",
  },
  {
    id: 6,
    name: "Graphic Print T-Shirt",
    price: 29.99,
    image: "/abstract-geometric-tee.png",
    vendor: "Urban Trends",
  },
  {
    id: 7,
    name: "Chino Trousers",
    price: 44.99,
    image: "/folded-chino-stack.png",
    vendor: "Casual Comfort",
  },
  {
    id: 8,
    name: "Hooded Sweatshirt",
    price: 39.99,
    image: "/cozy-hoodie.png",
    vendor: "Comfort Wear",
  },
]
