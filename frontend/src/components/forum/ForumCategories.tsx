import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const categories = [
  'Best Practices for Recycling',
  'Local Recycling Events',
  'Tips for Reducing Waste',
  'Innovations in Sustainability',
]

interface ForumCategoriesProps {
  onSelectCategory: (category: string) => void
}

export default function ForumCategories({ onSelectCategory }: ForumCategoriesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              className="justify-start"
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

