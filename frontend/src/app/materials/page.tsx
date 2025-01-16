'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddMaterialForm from '@/components/AddMaterialForm'
import MaterialsList from '@/components/MaterialsList'
import TrackMaterial from '@/components/TrackMaterial'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export interface Material {
  id: string
  name: string
  description: string
  trackingId: string
  status: 'In Tracking' | 'Recycled' | 'Pending Pickup'
}

export default function MaterialManagementPage() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null)

  const addMaterial = (material: Material) => {
    setMaterials([...materials, material])
  }

  const updateMaterial = (updatedMaterial: Material) => {
    setMaterials(materials.map(m => m.id === updatedMaterial.id ? updatedMaterial : m))
    setEditingMaterial(null)
  }

  const deleteMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Manage Your Materials</h1>
        <Tabs defaultValue="add" className="space-y-4">
          <TabsList>
            <TabsTrigger value="add">Add Material</TabsTrigger>
            <TabsTrigger value="list">Your Materials</TabsTrigger>
            <TabsTrigger value="track">Track Material</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <AddMaterialForm 
              onSubmit={editingMaterial ? updateMaterial : addMaterial} 
              initialData={editingMaterial}
            />
          </TabsContent>
          <TabsContent value="list">
            <MaterialsList 
              materials={materials} 
              onEdit={setEditingMaterial} 
              onDelete={deleteMaterial}
            />
          </TabsContent>
          <TabsContent value="track">
            <TrackMaterial materials={materials} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}

