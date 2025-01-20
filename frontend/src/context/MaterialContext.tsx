"use client";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Material } from "@/lib/definitions";

interface MaterialContextData {
  materials: Material[];
  loading: boolean;
  fetchMaterials: () => Promise<void>;
  addMaterial: (materialData: any) => Promise<void>;
  deleteMaterial: (materialId: string) => Promise<void>;
  updateMaterial: (
    materialId: string,
    updatedMaterialData: Material
  ) => Promise<void>;
}

const MaterialContext = createContext<MaterialContextData | null>(null);

export const MaterialProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { authTokens } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all materials
  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/materials/", {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      setMaterials(response.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  }, [authTokens]);

  // Add a new material
  const addMaterial = async (materialData: Material) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/materials/",
        materialData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      );
      setMaterials((prevMaterials) => [...prevMaterials, response.data]);
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  // Delete a material
  const deleteMaterial = async (materialId: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/materials/${materialId}/`, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`,
        },
      });
      setMaterials((prevMaterials) =>
        prevMaterials.filter((m) => m.id !== materialId)
      );
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  // Update a material
  const updateMaterial = async (
    materialId: string,
    updatedMaterialData: Material
  ) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/materials/${materialId}/`,
        updatedMaterialData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      );
      setMaterials((prevMaterials) =>
        prevMaterials.map((material) =>
          material.id === materialId ? response.data : material
        )
      );
    } catch (error) {
      console.error("Error updating material:", error);
    }
  };

  useEffect(() => {
    if (authTokens) {
      fetchMaterials();
    }
  }, [authTokens, fetchMaterials]);

  const contextData = {
    materials,
    loading,
    fetchMaterials,
    addMaterial,
    deleteMaterial,
    updateMaterial,
  };

  return (
    <MaterialContext.Provider value={contextData}>
      {children}
    </MaterialContext.Provider>
  );
};

export const useMaterials = () => useContext(MaterialContext);
