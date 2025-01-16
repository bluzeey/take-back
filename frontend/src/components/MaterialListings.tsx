import { Material } from '@/app/marketplace/page'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface MaterialListingsProps {
  materials: Material[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function MaterialListings({ 
  materials, 
  currentPage, 
  totalPages, 
  onPageChange 
}: MaterialListingsProps) {
  const [expandedMaterial, setExpandedMaterial] = useState<string | null>(null)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {materials.map((material) => (
          <Card key={material.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{material.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <Image
                  src={material.imageUrl || "/placeholder.svg"}
                  alt={material.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <p className="text-sm text-gray-500 mb-2">{material.category}</p>
              <p className="text-lg font-bold mb-2">${material.price.toFixed(2)}</p>
              <p className="text-sm mb-2">
                {expandedMaterial === material.id
                  ? material.description
                  : `${material.description.slice(0, 100)}...`}
              </p>
              <Button
                variant="link"
                onClick={() => setExpandedMaterial(expandedMaterial === material.id ? null : material.id)}
                className="p-0 h-auto font-normal text-green-600"
              >
                {expandedMaterial === material.id ? 'Show Less' : 'Show More'}
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <p className="text-sm text-gray-500">Seller: {material.sellerName}</p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Seller
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="flex items-center">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

