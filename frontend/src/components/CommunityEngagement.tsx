import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const communityTopics = [
  { title: 'Best practices for plastic recycling', href: '/forum/plastic-recycling' },
  { title: 'Local recycling events this month', href: '/forum/local-events' },
  { title: 'Tips for reducing household waste', href: '/forum/waste-reduction' },
]

export default function CommunityEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Engagement</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {communityTopics.map((topic, index) => (
            <li key={index}>
              <Link href={topic.href} className="text-green-600 hover:underline">
                {topic.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

