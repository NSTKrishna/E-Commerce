import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Send,
  CheckCircle,
  DollarSign,
  Clock,
  ArrowRight,
  TrendingUp,
  Star,
  Eye,
} from "lucide-react"

const stats = [
  {
    title: "Active Offers",
    value: "8",
    change: "+3 this week",
    icon: Send,
    trend: "up",
  },
  {
    title: "Accepted Offers",
    value: "23",
    change: "85% acceptance rate",
    icon: CheckCircle,
    trend: "up",
  },
  {
    title: "Total Earnings",
    value: "$4,250",
    change: "+$1,200 this month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Avg. Response Time",
    value: "< 1hr",
    change: "Top 10% sellers",
    icon: Clock,
    trend: "up",
  },
]

const activeOffers = [
  {
    id: "1",
    requestTitle: "Custom Logo Design for Tech Startup",
    buyer: "John D.",
    yourPrice: "$350",
    budget: "$200 - $500",
    status: "pending",
    sentAt: "2 hours ago",
  },
  {
    id: "2",
    requestTitle: "Website Development - E-commerce",
    buyer: "Sarah M.",
    yourPrice: "$3,500",
    budget: "$2000 - $5000",
    status: "pending",
    sentAt: "1 day ago",
  },
  {
    id: "3",
    requestTitle: "Brand Identity Package",
    buyer: "Mike R.",
    yourPrice: "$800",
    budget: "$500 - $1000",
    status: "accepted",
    sentAt: "2 days ago",
  },
]

const recentRequests = [
  {
    id: "1",
    title: "Mobile App UI Design for Fitness App",
    budget: "$500 - $1000",
    category: "Design & Creative",
    urgency: "Urgent",
    posted: "10 min ago",
  },
  {
    id: "2",
    title: "Product Photography - 20 Items",
    budget: "$300 - $500",
    category: "Photography",
    urgency: "Normal",
    posted: "25 min ago",
  },
  {
    id: "3",
    title: "Social Media Graphics Package",
    budget: "$150 - $300",
    category: "Design & Creative",
    urgency: "Flexible",
    posted: "1 hour ago",
  },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "pending":
      return <Badge variant="outline" className="border-warning text-foreground">Pending</Badge>
    case "accepted":
      return <Badge className="bg-foreground text-background">Accepted</Badge>
    case "declined":
      return <Badge variant="destructive">Declined</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Welcome back, DesignPro!</h2>
          <p className="text-muted-foreground">
            {"Here's your performance overview"}
          </p>
        </div>
        <Link href="/browse">
          <Button>
            <Eye className="mr-2 h-4 w-4" />
            Browse Requests
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    {stat.trend === "up" && (
                      <TrendingUp className="h-3 w-3 text-foreground" />
                    )}
                    {stat.change}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                  <stat.icon className="h-6 w-6 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Response Rate</span>
                <span className="font-medium text-foreground">95%</span>
              </div>
              <Progress value={95} className="mt-2 h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion Rate</span>
                <span className="font-medium text-foreground">98%</span>
              </div>
              <Progress value={98} className="mt-2 h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Rating</span>
                <span className="flex items-center gap-1 font-medium text-foreground">
                  <Star className="h-3.5 w-3.5 fill-foreground" />
                  4.9/5.0
                </span>
              </div>
              <Progress value={98} className="mt-2 h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Offers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Active Offers</CardTitle>
            <Link
              href="/seller/offers"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeOffers.map((offer) => (
              <div
                key={offer.id}
                className="rounded-lg border border-border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-medium text-foreground">
                      {offer.requestTitle}
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Buyer: {offer.buyer}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-sm">
                      <span className="font-semibold text-foreground">
                        {offer.yourPrice}
                      </span>
                      <span className="text-muted-foreground">
                        Budget: {offer.budget}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(offer.status)}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Requests in Your Category */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">New Requests for You</CardTitle>
            <Link
              href="/browse"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentRequests.map((request) => (
              <Link
                key={request.id}
                href={`/request/${request.id}`}
                className="block rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-medium text-foreground">
                      {request.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <Badge variant="secondary">{request.category}</Badge>
                      <Badge
                        variant="outline"
                        className={
                          request.urgency === "Urgent"
                            ? "border-destructive text-destructive"
                            : ""
                        }
                      >
                        {request.urgency}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {request.budget}
                      </span>
                      <span>{request.posted}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Send Offer
                  </Button>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
