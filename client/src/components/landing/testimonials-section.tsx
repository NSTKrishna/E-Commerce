import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Buyer",
    avatar: "SC",
    rating: 5,
    content:
      "I needed a custom logo design and received 12 offers within hours. The competition between sellers meant I got amazing quality at a great price.",
  },
  {
    name: "Marcus Johnson",
    role: "Seller",
    avatar: "MJ",
    rating: 5,
    content:
      "As a freelance developer, BidBoard brings qualified leads directly to me. No more cold outreach - buyers already know what they want.",
  },
  {
    name: "Emily Rodriguez",
    role: "Buyer",
    avatar: "ER",
    rating: 5,
    content:
      "Found the perfect wedding photographer through BidBoard. Being able to compare offers and reviews made the decision so much easier.",
  },
  {
    name: "David Park",
    role: "Seller",
    avatar: "DP",
    rating: 5,
    content:
      "The platform is incredibly fair. Buyers can see my work history and reviews, which helps me win more jobs based on quality, not just price.",
  },
  {
    name: "Lisa Thompson",
    role: "Buyer",
    avatar: "LT",
    rating: 5,
    content:
      "Saved over $500 on my home renovation project. Multiple contractors bid on my request, and I could negotiate in real-time.",
  },
  {
    name: "James Wilson",
    role: "Seller",
    avatar: "JW",
    rating: 5,
    content:
      "BidBoard has transformed my consulting business. The quality of leads is excellent, and the messaging system makes negotiations smooth.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by Buyers and Sellers
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join thousands of satisfied users who have transformed how they buy
            and sell.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-foreground text-foreground"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm leading-relaxed text-muted-foreground">
                {`"${testimonial.content}"`}
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-secondary text-sm font-medium">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
