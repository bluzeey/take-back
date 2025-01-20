import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface SearchAndFiltersProps {
  onSearch: (searchTerm: string, filters: any) => void
}

export default function SearchAndFilters({ onSearch }: SearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [condition, setCondition] = useState('')

  const handleSearch = () => {
    onSearch(searchTerm, { category, priceRange, condition })
  }

  return (
    <div className="space-y-4 mb-8">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plastics">Plastics</SelectItem>
              <SelectItem value="metals">Metals</SelectItem>
              <SelectItem value="paper">Paper</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="price-range">Price Range</Label>
          <Slider
            id="price-range"
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <div>
          <Label htmlFor="condition">Condition</Label>
          <Select value={condition} onValueChange={setCondition}>
            <SelectTrigger id="condition">
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="used">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={handleSearch} className="w-full md:w-auto">Apply Filters</Button>
    </div>
  )
}

