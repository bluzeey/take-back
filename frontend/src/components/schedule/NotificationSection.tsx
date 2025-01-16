import { Appointment } from '@/app/schedule/page'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Bell } from 'lucide-react'

interface NotificationSectionProps {
  appointments: Appointment[]
}

export default function NotificationSection({ appointments }: NotificationSectionProps) {
  const upcomingAppointments = appointments
    .filter(app => app.date > new Date() && app.status !== 'Completed')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bell className="mr-2" />
          Upcoming Events
        </CardTitle>
        <CardDescription>Your next scheduled pickups and drop-offs</CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingAppointments.length > 0 ? (
          <ul className="space-y-2">
            {upcomingAppointments.map(appointment => (
              <li key={appointment.id} className="flex justify-between items-center">
                <span>
                  {appointment.type} - {appointment.material}
                </span>
                <span className="text-sm text-gray-500">
                  {appointment.date.toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming appointments scheduled.</p>
        )}
      </CardContent>
    </Card>
  )
}

