"use client";

import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddMaterialForm from "@/components/materials/AddMaterialForm";
import MaterialsList from "@/components/materials/MaterialsList";
import TrackMaterial from "@/components/materials/TrackMaterial";
import { useAuth } from "@/context/AuthContext"; // Assuming this is where you manage authentication tokens.
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface Material {
  id: string;
  name: string;
  description: string;
  trackingId: string;
  status: "In Tracking" | "Recycled" | "Pending Pickup";
}

export default function MaterialManagementPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const { authTokens } = useAuth(); // Fetch the authentication tokens for making API requests

  const fetchMaterials = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/materials/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`, // Include the access token for authorization
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch materials");
      }

      const data = await response.json();
      setMaterials(data); // Set the materials state with the fetched data
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const addMaterial = (material: Material) => {
    setMaterials((prev) => [...prev, material]);
  };

  const updateMaterial = (updatedMaterial: Material) => {
    setMaterials(
      materials.map((m) => (m.id === updatedMaterial.id ? updatedMaterial : m))
    );
    setEditingMaterial(null);
  };

  const deleteMaterial = async (id: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/materials/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authTokens.access}`, // Include the access token for authorization
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete material");
      }

      // Remove deleted material from state
      setMaterials(materials.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  useEffect(() => {
    fetchMaterials(); // Fetch materials when the component mounts
  }, [authTokens]);

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
  );
}
