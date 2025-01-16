import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const activities = [
  { type: 'Material Added', description: 'Added 5 lbs of plastic bottles', timestamp: '2 hours ago' },
  { type: 'Pickup Scheduled', description: 'Scheduled pickup for 05/15/2023', timestamp: '1 day ago' },
  { type: 'Marketplace Transaction', description: 'Sold 10 lbs of aluminum cans', timestamp: '3 days ago' },
]

export default function RecentActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={index} className="flex justify-between items-start">
              <div>
                <p className="font-semibold">{activity.type}</p>
                <p className="text-sm text-gray-500">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400">{activity.timestamp}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

