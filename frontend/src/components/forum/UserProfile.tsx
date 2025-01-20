import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function UserProfile() {
  // This would typically come from a user context or prop
  const user = {
    name: 'Jane Doe',
    avatar: '/placeholder.svg',
    posts: 15,
    upvotes: 42,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">
              {user.posts} posts • {user.upvotes} upvotes received
            </p>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <Button variant="outline" className="w-full">View Profile</Button>
          <Button variant="outline" className="w-full">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  )
}

