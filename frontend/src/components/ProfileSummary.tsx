import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/definitions";

interface ProfileSummaryProps {
  user: User;
}

export default function ProfileSummary({ user }: ProfileSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src="/placeholder.svg"
            alt={user.username ?? user.email}
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-green-600 font-semibold">
            Points Balance: {user.points ?? 1250}
          </p>
          <Button variant="outline">Edit Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
}
