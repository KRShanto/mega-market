import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function ContactPage() {
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
            <Link href="/contact" className="text-sm font-medium text-primary">
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
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Have questions or feedback? We'd love to hear from you. Our team is here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                <form className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First name</Label>
                      <Input id="first-name" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last name</Label>
                      <Input id="last-name" placeholder="Enter your last name" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter the subject" />
                  </div>
                  <div className="space-y-2">
                    <Label>I am a</Label>
                    <RadioGroup defaultValue="customer" className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="customer" id="customer" />
                        <Label htmlFor="customer" className="cursor-pointer">
                          Customer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vendor" id="vendor" />
                        <Label htmlFor="vendor" className="cursor-pointer">
                          Vendor
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other" className="cursor-pointer">
                          Other
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Enter your message" className="min-h-[150px]" />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Address</h3>
                        <p className="text-muted-foreground">
                          123 Market Street, Suite 456
                          <br />
                          San Francisco, CA 94105
                          <br />
                          United States
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-muted-foreground">support@megamarket.com</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-2xl font-bold mb-6">Office Hours</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span>9:00 AM - 6:00 PM (PST)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>10:00 AM - 4:00 PM (PST)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h2 className="text-2xl font-bold mb-6">Support Options</h2>
                  <div className="grid gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">Customer Support</h3>
                        <p className="text-muted-foreground mb-4">
                          For questions about orders, returns, and general inquiries.
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="mailto:customers@megamarket.com">customers@megamarket.com</Link>
                        </Button>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="font-bold text-lg mb-2">Vendor Support</h3>
                        <p className="text-muted-foreground mb-4">
                          For questions about selling on Mega Market and vendor accounts.
                        </p>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href="mailto:vendors@megamarket.com">vendors@megamarket.com</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map */}
        <section className="w-full py-12 md:py-24 bg-theme-50">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden border">
              <Image
                src="/map.png"
                alt="Office Location Map"
                width={1200}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
              <p className="text-muted-foreground md:text-xl max-w-[800px]">
                Find quick answers to common questions about Mega Market.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-bold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">
                Can't find what you're looking for? Contact our support team for assistance.
              </p>
              <Button asChild>
                <Link href="mailto:support@megamarket.com">Email Support</Link>
              </Button>
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
const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "To place an order, browse our categories or shops, select the products you want, add them to your cart, and proceed to checkout. You'll need to create an account or log in to complete your purchase.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit cards (Visa, Mastercard, American Express), PayPal, and various local payment methods depending on your location. All payments are processed securely through our payment partners.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a confirmation email with tracking information. You can also view your order status and tracking details in your account dashboard under 'Order History'.",
  },
  {
    question: "What is your return policy?",
    answer:
      "Our return policy varies by vendor. Generally, most products can be returned within 30 days of delivery if they're in original condition. Check the specific product page or vendor policies for detailed information.",
  },
  {
    question: "How do I become a vendor?",
    answer:
      "To become a vendor, click on the 'Become a Vendor' button on our homepage or in the footer. You'll need to complete an application form, provide business details, and agree to our vendor terms. Our team will review your application within 3-5 business days.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, many of our vendors offer international shipping. Shipping options, costs, and delivery times vary by vendor and destination. You can see available shipping options during checkout.",
  },
]
