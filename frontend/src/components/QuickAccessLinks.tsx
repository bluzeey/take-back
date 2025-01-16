import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Calendar, ShoppingBag, Gift } from 'lucide-react'

const quickLinks = [
  { title: 'Manage Your Materials', icon: Package, href: '/materials' },
  { title: 'Schedule a Pickup', icon: Calendar, href: '/schedule' },
  { title: 'View Marketplace Listings', icon: ShoppingBag, href: '/marketplace' },
  { title: 'View Rewards', icon: Gift, href: '/rewards' },
]

export default function QuickAccessLinks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {quickLinks.map((link, index) => (
          <Button key={index} variant="outline" className="h-20 flex flex-col items-center justify-center" asChild>
            <a href={link.href}>
              <link.icon className="h-6 w-6 mb-2" />
              {link.title}
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}

