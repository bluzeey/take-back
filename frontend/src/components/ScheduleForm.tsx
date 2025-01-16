import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Appointment } from '@/app/schedule/page'

const formSchema = z.object({
  date: z.string(),
  time: z.string(),
  type: z.enum(['Pickup', 'Drop-off']),
  material: z.string().min(1, { message: 'Please select a material.' }),
  location: z.string().min(1, { message: 'Please enter a location.' }),
  status: z.enum(['Confirmed', 'Pending', 'Completed']),
  notes: z.string().optional(),
})

interface ScheduleFormProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (appointment: Appointment) => void
  initialData?: Appointment | null
}

export default function ScheduleForm({ isOpen, onClose, onSubmit, initialData }: ScheduleFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: initialData ? initialData.date.toISOString().split('T')[0] : '',
      time: initialData ? initialData.date.toTimeString().split(' ')[0].slice(0, 5) : '',
      type: initialData?.type || 'Pickup',
      material: initialData?.material || '',
      location: initialData?.location || '',
      status: initialData?.status || 'Pending',
      notes: initialData?.notes || '',
    },
  })

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const appointment: Appointment = {
      id: initialData?.id || Date.now().toString(),
      date: new Date(`${values.date}T${values.time}`),
      type: values.type,
      material: values.material,
      location: values.location,
      status: values.status,
      notes: values.notes,
    }
    onSubmit(appointment)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit Appointment' : 'Schedule New Pickup/Drop-off'}</DialogTitle>
          <DialogDescription>
            Fill out the form below to {initialData ? 'edit your' : 'schedule a new'} pickup or drop-off.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pickup">Pickup</SelectItem>
                      <SelectItem value="Drop-off">Drop-off</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Material</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormDescription>
                    Add any additional information or special instructions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              {initialData ? 'Update Appointment' : 'Schedule Appointment'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

