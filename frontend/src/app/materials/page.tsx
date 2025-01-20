"use client";

import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddMaterialForm from "@/components/materials/AddMaterialForm";
import MaterialsList from "@/components/materials/MaterialsList";
import TrackMaterial from "@/components/materials/TrackMaterial";
import { useMaterials } from "@/context/MaterialContext"; // Import the useMaterials hook
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MaterialManagementPage() {
  const {
    materials,
    loading,
    fetchMaterials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
  } = useMaterials();

  useEffect(() => {
    fetchMaterials(); // Fetch materials when the component mounts
  }, [fetchMaterials]);

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">
          Manage Your Materials
        </h1>
        <Tabs defaultValue="add" className="space-y-4">
          <TabsList>
            <TabsTrigger value="add">Add Material</TabsTrigger>
            <TabsTrigger value="list">Your Materials</TabsTrigger>
            <TabsTrigger value="track">Track Material</TabsTrigger>
          </TabsList>
          <TabsContent value="add">
            <AddMaterialForm onSubmit={addMaterial} />
          </TabsContent>
          <TabsContent value="list">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <MaterialsList
                materials={materials}
                onEdit={() => {}} // Implement edit functionality as needed
                onDelete={deleteMaterial}
              />
            )}
          </TabsContent>
          <TabsContent value="track">
            <TrackMaterial materials={materials} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}
