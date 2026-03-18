"use client"

import Link from "next/link"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowLeft,
  Clock,
  Eye,
  Tag,
  Star,
  MessageSquare,
  CheckCircle,
  Share2,
  Flag,
  Calendar,
  DollarSign,
} from "lucide-react"

const request = {
  id: "1",
  title: "Custom Logo Design for Tech Startup",
  description: `Looking for a talented designer to create a modern, minimal logo for my tech startup. The company is in the AI/machine learning space, so the logo should convey innovation, intelligence, and trust.

Key requirements:
- Modern and minimal design
- Should work well in both light and dark modes
- Scalable for various use cases (website, app, business cards, etc.)
- Color palette: preferably blues and teals, but open to suggestions
- Must include both a logomark and wordmark version

The company name is "NeuraTech" and our tagline is "Intelligence Amplified".

I'd like to receive:
- 3 initial concept options
- Unlimited revisions on the chosen concept
- Final files in AI, SVG, PNG, and PDF formats
- Brand guidelines document

Looking forward to seeing your creative proposals!`,
  category: "Design & Creative",
  status: "open",
  budget: "$200 - $500",
  urgency: "Normal",
  posted: "2 hours ago",
  postedDate: "March 18, 2026",
  views: 124,
  offersCount: 5,
  buyer: {
    name: "John Doe",
    avatar: "JD",
    memberSince: "Jan 2025",
    requestsPosted: 12,
    rating: 4.8,
  },
}

const offers = [
  {
    id: "1",
    seller: {
      name: "DesignPro Studio",
      avatar: "DP",
      rating: 4.9,
      reviews: 127,
      verified: true,
      responseTime: "< 1 hour",
    },
    price: "$350",
    deliveryTime: "3 days",
    message:
      "Hi John! I'd love to work on your NeuraTech logo. I specialize in modern, minimal designs for tech companies and have created logos for several AI startups. I'll provide 4 initial concepts (one extra!) and include animated versions as a bonus. Check out my portfolio for similar work.",
    sentAt: "2 hours ago",
  },
  {
    id: "2",
    seller: {
      name: "Creative Works",
      avatar: "CW",
      rating: 4.7,
      reviews: 89,
      verified: true,
      responseTime: "< 2 hours",
    },
    price: "$280",
    deliveryTime: "5 days",
    message:
      "Hello! Your project sounds exciting. I have extensive experience with startup branding and understand the importance of conveying trust and innovation. I'll provide 3 concepts with unlimited revisions, plus a comprehensive brand guide.",
    sentAt: "4 hours ago",
  },
  {
    id: "3",
    seller: {
      name: "Visual Identity Co",
      avatar: "VI",
      rating: 5.0,
      reviews: 45,
      verified: true,
      responseTime: "< 30 min",
    },
    price: "$450",
    deliveryTime: "2 days",
    message:
      "I'm a brand identity specialist with a focus on tech and AI companies. I can deliver premium quality within 48 hours. My process includes in-depth research, mood board creation, and strategic design choices that align with your brand values.",
    sentAt: "5 hours ago",
  },
  {
    id: "4",
    seller: {
      name: "Design Masters",
      avatar: "DM",
      rating: 4.6,
      reviews: 234,
      verified: true,
      responseTime: "< 3 hours",
    },
    price: "$200",
    deliveryTime: "7 days",
    message:
      "Great project! I can create a professional logo that meets all your requirements. My rate is competitive and I guarantee quality work with fast revisions.",
    sentAt: "1 day ago",
  },
  {
    id: "5",
    seller: {
      name: "Brand Studio X",
      avatar: "BS",
      rating: 4.8,
      reviews: 156,
      verified: true,
      responseTime: "< 1 hour",
    },
    price: "$380",
    deliveryTime: "4 days",
    message:
      "Your AI startup sounds fascinating! I specialize in creating logos that communicate complex technological concepts through simple, elegant visuals. Let's create something memorable for NeuraTech!",
    sentAt: "1 day ago",
  },
]

export default function RequestDetailPage() {
  const [sortBy, setSortBy] = useState("recent")

  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return (
          parseFloat(a.price.replace(/[^0-9.]/g, "")) -
          parseFloat(b.price.replace(/[^0-9.]/g, ""))
        )
      case "price_high":
        return (
          parseFloat(b.price.replace(/[^0-9.]/g, "")) -
          parseFloat(a.price.replace(/[^0-9.]/g, ""))
        )
      case "rating":
        return b.seller.rating - a.seller.rating
      default:
        return 0
    }
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Browse
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Request Header */}
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="border-accent text-accent">
                          Open
                        </Badge>
                        <Badge variant="secondary">{request.category}</Badge>
                      </div>
                      <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                        {request.title}
                      </h1>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Posted {request.posted}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {request.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Tag className="h-4 w-4" />
                          {request.offersCount} offers
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Flag className="h-4 w-4" />
                        <span className="sr-only">Report</span>
                      </Button>
                    </div>
                  </div>

                  {/* Budget & Urgency */}
                  <div className="mt-6 flex flex-wrap gap-6 rounded-lg bg-secondary/50 p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Budget</p>
                      <p className="mt-1 text-xl font-bold text-foreground">
                        {request.budget}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Urgency</p>
                      <p className="mt-1 text-xl font-bold text-foreground">
                        {request.urgency}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mt-6">
                    <h2 className="font-semibold text-foreground">Description</h2>
                    <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {request.description}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Offers Section */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-foreground">
                    Offers ({offers.length})
                  </h2>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Most Recent</SelectItem>
                      <SelectItem value="price_low">Price: Low to High</SelectItem>
                      <SelectItem value="price_high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mt-4 space-y-4">
                  {sortedOffers.map((offer) => (
                    <Card key={offer.id}>
                      <CardContent className="p-6">
                        {/* Seller Info */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-secondary text-sm">
                                {offer.seller.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-foreground">
                                  {offer.seller.name}
                                </h3>
                                {offer.seller.verified && (
                                  <CheckCircle className="h-4 w-4 text-accent" />
                                )}
                              </div>
                              <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Star className="h-3.5 w-3.5 fill-foreground text-foreground" />
                                  {offer.seller.rating}
                                </span>
                                <span>{offer.seller.reviews} reviews</span>
                                <span>Responds {offer.seller.responseTime}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">
                              {offer.price}
                            </p>
                            <p className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {offer.deliveryTime}
                            </p>
                          </div>
                        </div>

                        {/* Message */}
                        <div className="mt-4 rounded-lg bg-secondary/50 p-4">
                          <p className="text-sm text-muted-foreground">
                            {offer.message}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs text-muted-foreground">
                            Sent {offer.sentAt}
                          </span>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                            <Button size="sm">Accept Offer</Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Buyer Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Posted by</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="h-14 w-14">
                      <AvatarFallback className="bg-secondary text-lg">
                        {request.buyer.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {request.buyer.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Member since {request.buyer.memberSince}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className="text-lg font-bold text-foreground">
                        {request.buyer.requestsPosted}
                      </p>
                      <p className="text-xs text-muted-foreground">Requests</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <p className="flex items-center justify-center gap-1 text-lg font-bold text-foreground">
                        <Star className="h-4 w-4 fill-foreground" />
                        {request.buyer.rating}
                      </p>
                      <p className="text-xs text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Seller?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Interested in this request? Send your offer to the buyer.
                  </p>
                  <Link href={`/submit-offer/${request.id}`}>
                    <Button className="w-full">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Send Offer
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Similar Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Similar Requests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { title: "Brand Identity for Fintech App", budget: "$500 - $1000" },
                    { title: "Mobile App UI Design", budget: "$300 - $600" },
                    { title: "Website Redesign for SaaS", budget: "$800 - $1500" },
                  ].map((item, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="block rounded-lg border border-border p-3 transition-colors hover:bg-secondary/50"
                    >
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.budget}
                      </p>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
