import { useState, useEffect } from 'react'
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
import { Material } from '@/app/materials/page'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Material name must be at least 2 characters.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  trackingId: z.string().regex(/^[A-Za-z0-9]{6}$/, { message: 'Tracking ID must be 6 alphanumeric characters.' }),
})

interface AddMaterialFormProps {
  onSubmit: (material: Material) => void
  initialData?: Material | null
}

export default function AddMaterialForm({ onSubmit, initialData }: AddMaterialFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      trackingId: '',
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset(initialData)
    }
  }, [initialData, form])

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      id: initialData?.id || Date.now().toString(),
      ...values,
      status: initialData?.status || 'In Tracking',
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Plastic Bottles" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the material and its condition" 
                  className="resize-none" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="trackingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tracking ID</FormLabel>
              <FormControl>
                <Input placeholder="e.g., ABC123" {...field} />
              </FormControl>
              <FormDescription>
                Enter a unique 6-character alphanumeric ID.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
          {initialData ? 'Update Material' : 'Add Material'}
        </Button>
      </form>
    </Form>
  )
}

