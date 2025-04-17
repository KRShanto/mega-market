import Link from "next/link"
import Image from "next/image"
import { ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-primary">
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-theme-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Mega Market</h1>
                <p className="text-muted-foreground md:text-xl">
                  Mega Market is a leading multi-vendor e-commerce platform connecting quality vendors with customers
                  worldwide. Our mission is to create a seamless shopping experience while empowering entrepreneurs to
                  grow their businesses.
                </p>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/about-hero.png"
                  alt="Mega Market Team"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Story</h2>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="order-2 lg:order-1 relative aspect-video overflow-hidden rounded-xl">
                <Image
                  src="/our-story.png"
                  alt="Our Story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="order-1 lg:order-2 space-y-4">
                <p className="text-lg">
                  Founded in 2020, Mega Market began with a simple idea: create a platform where small businesses could
                  thrive alongside established brands, giving customers access to a diverse range of quality products.
                </p>
                <p className="text-lg">
                  What started as a small team of e-commerce enthusiasts has grown into a global marketplace connecting
                  thousands of vendors with millions of customers. Our journey has been defined by our commitment to
                  quality, transparency, and innovation.
                </p>
                <p className="text-lg">
                  Today, Mega Market hosts vendors from over 30 countries, offering products across dozens of
                  categories. We continue to evolve our platform to meet the changing needs of both our vendors and
                  customers, staying true to our founding mission of empowering entrepreneurs and delighting shoppers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="w-full py-12 md:py-24 bg-theme-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Values</h2>
              <p className="text-muted-foreground md:text-xl max-w-[800px]">
                These core principles guide everything we do at Mega Market, from platform development to vendor
                relationships and customer service.
              </p>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-background p-6 rounded-lg shadow-sm border">
                  <div className="rounded-full bg-theme-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Meet Our Team</h2>
              <p className="text-muted-foreground md:text-xl max-w-[800px]">
                The passionate individuals behind Mega Market who work tirelessly to create the best multi-vendor
                marketplace experience.
              </p>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member) => (
                <div key={member.name} className="flex flex-col items-center text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="160px"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-primary">{member.position}</p>
                  <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                  <div className="flex gap-2 mt-3">
                    {member.social.map((social) => (
                      <Link
                        key={social.platform}
                        href={social.url}
                        className="text-muted-foreground hover:text-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <social.icon className="h-5 w-5" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="w-full py-12 md:py-24 bg-theme-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Journey</h2>
              <p className="text-muted-foreground md:text-xl max-w-[800px]">
                Key milestones in our growth from a small startup to a global marketplace
              </p>
              <div className="w-12 h-1 bg-primary rounded-full"></div>
            </div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4 flex flex-col items-center md:items-end">
                    <div className="text-2xl font-bold text-primary">{milestone.year}</div>
                    <div className="text-sm text-muted-foreground">{milestone.month}</div>
                  </div>
                  <div className="relative md:w-1/12 flex justify-center">
                    <div className="w-1 bg-border h-full absolute left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-4 h-4 rounded-full bg-primary relative z-10 mt-2"></div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold">{milestone.title}</h3>
                    <p className="text-muted-foreground mt-2">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat) => (
                <div key={stat.label} className="space-y-2">
                  <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Our Community</h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're a shopper looking for unique products or a vendor ready to grow your business, Mega
                  Market is the place for you.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-1 bg-white text-primary hover:bg-theme-100"
                  asChild
                >
                  <Link href="/register">Shop Now</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                  asChild
                >
                  <Link href="/register-vendor">Become a Vendor</Link>
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
import { BadgeCheck, Facebook, Globe, Instagram, Linkedin, ShieldCheck, Sparkles, Twitter, Users } from "lucide-react"

const values = [
  {
    title: "Quality First",
    description: "We maintain high standards for all products and vendors on our platform.",
    icon: BadgeCheck,
  },
  {
    title: "Transparency",
    description: "We believe in clear communication with both vendors and customers.",
    icon: ShieldCheck,
  },
  {
    title: "Community",
    description: "We foster connections between vendors and customers worldwide.",
    icon: Users,
  },
  {
    title: "Innovation",
    description: "We continuously improve our platform to enhance the shopping experience.",
    icon: Sparkles,
  },
]

const team = [
  {
    name: "Sarah Johnson",
    position: "CEO & Founder",
    bio: "With 15+ years in e-commerce, Sarah founded Mega Market to empower small businesses globally.",
    image: "/team/sarah-johnson.png",
    social: [
      { platform: "LinkedIn", url: "#", icon: Linkedin },
      { platform: "Twitter", url: "#", icon: Twitter },
    ],
  },
  {
    name: "Michael Chen",
    position: "CTO",
    bio: "Tech visionary with expertise in scalable platforms and AI-driven shopping experiences.",
    image: "/team/michael-chen.png",
    social: [
      { platform: "LinkedIn", url: "#", icon: Linkedin },
      { platform: "Twitter", url: "#", icon: Twitter },
      { platform: "GitHub", url: "#", icon: Globe },
    ],
  },
  {
    name: "Olivia Rodriguez",
    position: "Head of Vendor Relations",
    bio: "Passionate about helping businesses grow through strategic partnerships and support.",
    image: "/team/olivia-rodriguez.png",
    social: [
      { platform: "LinkedIn", url: "#", icon: Linkedin },
      { platform: "Instagram", url: "#", icon: Instagram },
    ],
  },
  {
    name: "David Okafor",
    position: "Marketing Director",
    bio: "Creative marketer with a track record of building global brands and engaging communities.",
    image: "/team/david-okafor.png",
    social: [
      { platform: "LinkedIn", url: "#", icon: Linkedin },
      { platform: "Twitter", url: "#", icon: Twitter },
      { platform: "Facebook", url: "#", icon: Facebook },
    ],
  },
]

const milestones = [
  {
    year: "2020",
    month: "January",
    title: "Mega Market Founded",
    description:
      "Sarah Johnson launches Mega Market with a small team of 5 employees, focusing initially on fashion and accessories.",
  },
  {
    year: "2020",
    month: "June",
    title: "First 100 Vendors",
    description: "Reached our first milestone of 100 active vendors and expanded into electronics and home goods.",
  },
  {
    year: "2021",
    month: "March",
    title: "International Expansion",
    description: "Expanded operations to support vendors from 10 countries, with multi-currency support.",
  },
  {
    year: "2022",
    month: "August",
    title: "1 Million Customers",
    description: "Celebrated our millionth customer and launched our mobile app for iOS and Android.",
  },
  {
    year: "2023",
    month: "February",
    title: "Vendor Success Program",
    description:
      "Introduced comprehensive training and support program to help vendors optimize their shops and increase sales.",
  },
  {
    year: "2023",
    month: "October",
    title: "Sustainability Initiative",
    description:
      "Launched our eco-friendly certification program and carbon-neutral shipping options for environmentally conscious vendors and customers.",
  },
  {
    year: "2024",
    month: "January",
    title: "Global Marketplace",
    description:
      "Reached 5,000 active vendors from 30+ countries, offering products in over 20 categories to customers worldwide.",
  },
]

const stats = [
  {
    value: "5,000+",
    label: "Active Vendors",
  },
  {
    value: "2M+",
    label: "Happy Customers",
  },
  {
    value: "30+",
    label: "Countries",
  },
  {
    value: "100K+",
    label: "Products",
  },
]
