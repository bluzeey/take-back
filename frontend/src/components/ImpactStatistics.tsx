import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

const statistics = [
  { label: 'Total Materials Recycled', value: 500, unit: 'lbs', progress: 75 },
  { label: 'Carbon Footprint Reduced', value: 250, unit: 'kg', progress: 50 },
]

export default function ImpactStatistics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Impact</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {statistics.map((stat, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{stat.label}</span>
              <span className="text-sm font-medium">{stat.value} {stat.unit}</span>
            </div>
            <Progress value={stat.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

