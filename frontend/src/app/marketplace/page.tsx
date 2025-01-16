"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchAndFilters from "@/components/SearchAndFilters";
import MaterialListings from "@/components/MaterialListings";
import CreateListingModal from "@/components/CreateListingModal";
import { Button } from "@/components/ui/button";

export interface Material {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  condition: "new" | "used";
  sellerName: string;
  imageUrl: string;
}

const ITEMS_PER_PAGE = 12;

export default function MarketplacePage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false);

  const handleSearch = (searchTerm: string, filters: any) => {
    // Implement search and filter logic here
    const filtered = materials.filter(
      (material) =>
        material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMaterials(filtered);
    setCurrentPage(1);
  };

  const handleCreateListing = (newMaterial: Material) => {
    setMaterials([...materials, newMaterial]);
    setFilteredMaterials([...filteredMaterials, newMaterial]);
    setIsCreateListingOpen(false);
  };

  const paginatedMaterials = filteredMaterials.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Marketplace</h1>
          <Button
            onClick={() => setIsCreateListingOpen(true)}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Sell Your Material
          </Button>
        </div>
        <SearchAndFilters onSearch={handleSearch} />
        <MaterialListings
          materials={paginatedMaterials}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE)}
          onPageChange={setCurrentPage}
        />
      </main>
      <Footer />
      <CreateListingModal
        isOpen={isCreateListingOpen}
        onClose={() => setIsCreateListingOpen(false)}
        onCreateListing={handleCreateListing}
      />
    </div>
  );
}
