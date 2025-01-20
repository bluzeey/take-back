import { Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Guidelines() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Info className="mr-2" />
          Forum Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Be respectful and constructive</li>
          <li>Stay on topic</li>
          <li>No spam or self-promotion</li>
          <li>Respect others' privacy</li>
          <li>Report inappropriate content</li>
        </ul>
      </CardContent>
    </Card>
  )
}

