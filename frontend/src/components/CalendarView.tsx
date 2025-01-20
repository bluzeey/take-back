import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Appointment } from '@/app/schedule/page'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface CalendarViewProps {
  appointments: Appointment[]
  onEditAppointment: (appointment: Appointment) => void
  onDeleteAppointment: (id: string) => void
}

export default function CalendarView({ 
  appointments, 
  onEditAppointment, 
  onDeleteAppointment 
}: CalendarViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const appointmentDates = appointments.map(app => app.date)

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    const appointment = appointments.find(app => 
      app.date.toDateString() === date?.toDateString()
    )
    if (appointment) {
      setSelectedAppointment(appointment)
    }
  }

  return (
    <div>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        className="rounded-md border"
        modifiers={{
          appointment: appointmentDates,
        }}
        modifiersStyles={{
          appointment: { backgroundColor: 'rgba(34, 197, 94, 0.2)' },
        }}
      />
      <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedAppointment?.type} Details</DialogTitle>
            <DialogDescription>
              Date: {selectedAppointment?.date.toLocaleDateString()}
              <br />
              Material: {selectedAppointment?.material}
              <br />
              Location: {selectedAppointment?.location}
              <br />
              Status: {selectedAppointment?.status}
              <br />
              Notes: {selectedAppointment?.notes || 'N/A'}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button onClick={() => {
              if (selectedAppointment) onEditAppointment(selectedAppointment)
              setSelectedAppointment(null)
            }}>
              Edit
            </Button>
            <Button variant="destructive" onClick={() => {
              if (selectedAppointment) onDeleteAppointment(selectedAppointment.id)
              setSelectedAppointment(null)
            }}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

