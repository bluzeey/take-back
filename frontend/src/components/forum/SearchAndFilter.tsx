import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

interface SearchAndFilterProps {
  onSearch: (term: string) => void
  onFilter: (category: string | null) => void
}

export default function SearchAndFilter({ onSearch, onFilter }: SearchAndFilterProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  return (
    <div className="flex space-x-2">
      <div className="relative flex-grow">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search threads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  )
}

