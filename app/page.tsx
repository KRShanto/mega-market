import Link from "next/link"
import Image from "next/image"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-theme-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Discover Unique Products from Multiple Vendors
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Shop from a variety of categories including clothes, watches, glasses, and more. All in one place.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" className="gap-1">
                    Start Shopping <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/become-seller">Become a Vendor</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/vibrant-shopping-haul.png"
                  width={550}
                  height={550}
                  alt="Hero Image"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple steps to start shopping or selling on our platform
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">For Shoppers</h3>
                <div className="space-y-4">
                  {shopperSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-8">
                <h3 className="text-2xl font-bold">For Vendors</h3>
                <div className="space-y-4">
                  {vendorSteps.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-medium">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-theme-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose Mega Market?</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer the best multi-vendor shopping experience
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex flex-col items-center text-center space-y-2 p-4">
                  <div className="rounded-full bg-theme-100 p-3">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Start Shopping?</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of satisfied customers and vendors on our platform
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-1 bg-white text-primary hover:bg-theme-100"
                  asChild
                >
                  <Link href="/auth/register">Create an Account</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/become-seller">Become a Seller</Link>
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

// Sample data
const shopperSteps = [
  {
    title: "Create an Account",
    description: "Sign up for free and set up your profile in minutes",
  },
  {
    title: "Browse Products",
    description: "Explore thousands of products from various vendors",
  },
  {
    title: "Add to Cart",
    description: "Select your favorite items and add them to your cart",
  },
  {
    title: "Checkout Securely",
    description: "Complete your purchase with our secure payment system",
  },
]

const vendorSteps = [
  {
    title: "Register as a Vendor",
    description: "Complete the vendor application and verification process",
  },
  {
    title: "Set Up Your Shop",
    description: "Customize your shop profile and showcase your brand",
  },
  {
    title: "List Your Products",
    description: "Add your products using our easy-to-use dashboard",
  },
  {
    title: "Start Selling",
    description: "Receive orders and grow your business on our platform",
  },
]

const benefits = [
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "All vendors are verified and products are reviewed for quality",
  },
  {
    icon: CheckCircle,
    title: "Secure Payments",
    description: "Multiple payment options with advanced security measures",
  },
  {
    icon: CheckCircle,
    title: "Easy Returns",
    description: "Hassle-free return policy for all purchases",
  },
]
