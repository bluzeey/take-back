import { Thread } from '@/app/community-forum/page'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpCircle, MessageCircle } from 'lucide-react'

interface ThreadListProps {
  threads: Thread[]
  onUpvote: (threadId: string) => void
}

export default function ThreadList({ threads, onUpvote }: ThreadListProps) {
  return (
    <div className="space-y-4">
      {threads.map((thread) => (
        <Card key={thread.id}>
          <CardHeader>
            <CardTitle>{thread.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Posted by {thread.author} in {thread.category} • {thread.createdAt.toLocaleDateString()}
            </p>
            <p className="mt-2">{thread.content.slice(0, 150)}...</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" onClick={() => onUpvote(thread.id)}>
              <ArrowUpCircle className="mr-2 h-4 w-4" />
              {thread.upvotes} Upvotes
            </Button>
            <Button variant="ghost">
              <MessageCircle className="mr-2 h-4 w-4" />
              {thread.replies} Replies
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

