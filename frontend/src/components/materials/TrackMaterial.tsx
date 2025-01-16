import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Material } from '@/app/materials/page'

interface TrackMaterialProps {
  materials: Material[]
}

export default function TrackMaterial({ materials }: TrackMaterialProps) {
  const [trackingId, setTrackingId] = useState('')
  const [trackedMaterial, setTrackedMaterial] = useState<Material | null>(null)

  const handleTrack = () => {
    const material = materials.find(m => m.trackingId === trackingId)
    setTrackedMaterial(material || null)
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
        />
        <Button onClick={handleTrack}>Track</Button>
      </div>
      {trackedMaterial && (
        <Card>
          <CardHeader>
            <CardTitle>{trackedMaterial.name}</CardTitle>
            <CardDescription>Tracking ID: {trackedMaterial.trackingId}</CardDescription>
          </CardHeader>
          <CardContent>
            <p><strong>Description:</strong> {trackedMaterial.description}</p>
            <p><strong>Status:</strong> {trackedMaterial.status}</p>
            {/* Add more detailed tracking information here */}
          </CardContent>
        </Card>
      )}
      {trackingId && !trackedMaterial && (
        <p className="text-red-500">No material found with the given tracking ID.</p>
      )}
    </div>
  )
}

