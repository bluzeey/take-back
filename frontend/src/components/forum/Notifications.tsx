import { Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Notifications() {
  // This would typically come from a notifications context or prop
  const notifications = [
    { id: 1, message: 'New reply to your thread "Best ways to recycle plastic"' },
    { id: 2, message: 'Your post was upvoted 5 times' },
    { id: 3, message: 'New event in your area: Local Recycling Drive' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2" />
          Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li key={notification.id} className="text-sm">
              {notification.message}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

