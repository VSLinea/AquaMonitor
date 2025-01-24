import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function PoolTable() {
  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-4 mb-6">
        <div>
          <label className="block text-sm mb-1">Pool name</label>
          <Input placeholder="Pool name" className="w-48" />
        </div>
        <div>
          <label className="block text-sm mb-1">Pool type</label>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select pool type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="olympic">Olympic</SelectItem>
              <SelectItem value="diving">Diving</SelectItem>
              <SelectItem value="training">Training</SelectItem>
              <SelectItem value="kids">Kids</SelectItem>
              <SelectItem value="therapy">Therapy</SelectItem>
              <SelectItem value="leisure">Leisure</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm mb-1">Status</label>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="optimal">Optimal</SelectItem>
              <SelectItem value="needs-attention">Needs Attention</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Search</Button>
        <Button variant="outline">Reset</Button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Pool Name</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Chlorine (ppm)</th>
            <th className="text-left p-2">pH</th>
            <th className="text-left p-2">Temperature (°C)</th>
            <th className="text-left p-2">Turbidity (NTU)</th>
            <th className="text-left p-2">TDS (ppm)</th>
            <th className="text-left p-2">Filter Pressure (PSI)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </td>
            <td className="p-2 text-blue-500">Olympic Pool</td>
            <td className="p-2">Olympic</td>
            <td className="p-2">1.5</td>
            <td className="p-2">7.2</td>
            <td className="p-2">28</td>
            <td className="p-2">0.5</td>
            <td className="p-2">300</td>
            <td className="p-2">15</td>
          </tr>
          <tr className="border-b hover:bg-gray-50">
            <td className="p-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            </td>
            <td className="p-2 text-blue-500">Diving Pool</td>
            <td className="p-2">Diving</td>
            <td className="p-2">1.2</td>
            <td className="p-2">7.4</td>
            <td className="p-2">27</td>
            <td className="p-2">0.6</td>
            <td className="p-2">320</td>
            <td className="p-2">16</td>
          </tr>
          {/* Add more rows for other pools */}
        </tbody>
      </table>
    </div>
  )
}

