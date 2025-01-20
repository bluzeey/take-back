import { BarChart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Analytics() {
  // This would typically come from an analytics API or context
  const stats = {
    activeUsers: 1234,
    totalThreads: 567,
    totalReplies: 8901,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="mr-2" />
          Forum Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Active Users:</span>
            <span className="font-semibold">{stats.activeUsers}</span>
          </li>
          <li className="flex justify-between">
            <span>Total Threads:</span>
            <span className="font-semibold">{stats.totalThreads}</span>
          </li>
          <li className="flex justify-between">
            <span>Total Replies:</span>
            <span className="font-semibold">{stats.totalReplies}</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}

