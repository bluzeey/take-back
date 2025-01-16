import { Appointment } from '@/app/schedule/page'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface ListViewProps {
  appointments: Appointment[]
  onEditAppointment: (appointment: Appointment) => void
  onDeleteAppointment: (id: string) => void
}

export default function ListView({ 
  appointments, 
  onEditAppointment, 
  onDeleteAppointment 
}: ListViewProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date & Time</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Material</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.date.toLocaleString()}</TableCell>
            <TableCell>{appointment.type}</TableCell>
            <TableCell>{appointment.material}</TableCell>
            <TableCell>{appointment.location}</TableCell>
            <TableCell>{appointment.status}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button size="sm" onClick={() => onEditAppointment(appointment)}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => onDeleteAppointment(appointment.id)}>Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

