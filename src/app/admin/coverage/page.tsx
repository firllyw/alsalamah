'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  lat: number;
  lng: number;
  branches: number;
  subBranches: number;
  description: string;
}

interface Headquarters {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface CoverageData {
  id?: string;
  regions: Region[];
  headquarters: Headquarters;
}

export default function CoveragePage() {
  const [coverageData, setCoverageData] = useState<CoverageData>({
    regions: [],
    headquarters: { name: '', address: '', lat: 0, lng: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/coverage');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setCoverageData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching coverage data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addRegion = () => {
    const newId = `region-${Date.now()}`;
    setCoverageData({
      ...coverageData,
      regions: [...coverageData.regions, {
        id: newId,
        name: '',
        lat: 0,
        lng: 0,
        branches: 0,
        subBranches: 0,
        description: ''
      }]
    });
  };

  const removeRegion = (index: number) => {
    const newRegions = coverageData.regions.filter((_, i) => i !== index);
    setCoverageData({ ...coverageData, regions: newRegions });
  };

  const updateRegion = (index: number, field: keyof Region, value: string | number) => {
    const newRegions = [...coverageData.regions];
    newRegions[index] = { ...newRegions[index], [field]: value };
    setCoverageData({ ...coverageData, regions: newRegions });
  };

  const updateHeadquarters = (field: keyof Headquarters, value: string | number) => {
    setCoverageData({
      ...coverageData,
      headquarters: { ...coverageData.headquarters, [field]: value }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/coverage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coverageData),
      });

      if (response.ok) {
        alert('Coverage section updated successfully!');
      } else {
        alert('Error updating coverage section');
      }
    } catch (error) {
      console.error('Error saving coverage section:', error);
      alert('Error updating coverage section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Coverage Section</h1>
        <p className="text-gray-600">Manage area coverage regions and headquarters information</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Headquarters Information</CardTitle>
          <CardDescription>
            Main headquarters location and details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="hq-name">Name</Label>
              <Input
                id="hq-name"
                value={coverageData.headquarters.name}
                onChange={(e) => updateHeadquarters('name', e.target.value)}
                placeholder="Headquarters name"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="hq-address">Address</Label>
              <Input
                id="hq-address"
                value={coverageData.headquarters.address}
                onChange={(e) => updateHeadquarters('address', e.target.value)}
                placeholder="Full address"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="hq-lat">Latitude</Label>
              <Input
                id="hq-lat"
                type="number"
                step="any"
                value={coverageData.headquarters.lat}
                onChange={(e) => updateHeadquarters('lat', parseFloat(e.target.value) || 0)}
                placeholder="24.7136"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="hq-lng">Longitude</Label>
              <Input
                id="hq-lng"
                type="number"
                step="any"
                value={coverageData.headquarters.lng}
                onChange={(e) => updateHeadquarters('lng', parseFloat(e.target.value) || 0)}
                placeholder="46.6753"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Coverage Regions</CardTitle>
          <CardDescription>
            Add or remove regions covered by your services
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-6">
            {coverageData.regions.map((region, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Region {index + 1}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeRegion(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`name-${index}`}>Region Name</Label>
                    <Input
                      id={`name-${index}`}
                      value={region.name}
                      onChange={(e) => updateRegion(index, 'name', e.target.value)}
                      placeholder="e.g., Riyadh"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`lat-${index}`}>Latitude</Label>
                    <Input
                      id={`lat-${index}`}
                      type="number"
                      step="any"
                      value={region.lat}
                      onChange={(e) => updateRegion(index, 'lat', parseFloat(e.target.value) || 0)}
                      placeholder="24.7136"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`lng-${index}`}>Longitude</Label>
                    <Input
                      id={`lng-${index}`}
                      type="number"
                      step="any"
                      value={region.lng}
                      onChange={(e) => updateRegion(index, 'lng', parseFloat(e.target.value) || 0)}
                      placeholder="46.6753"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`branches-${index}`}>Branches</Label>
                    <Input
                      id={`branches-${index}`}
                      type="number"
                      value={region.branches}
                      onChange={(e) => updateRegion(index, 'branches', parseInt(e.target.value) || 0)}
                      placeholder="5"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`sub-branches-${index}`}>Sub Branches</Label>
                    <Input
                      id={`sub-branches-${index}`}
                      type="number"
                      value={region.subBranches}
                      onChange={(e) => updateRegion(index, 'subBranches', parseInt(e.target.value) || 0)}
                      placeholder="12"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Input
                      id={`description-${index}`}
                      value={region.description}
                      onChange={(e) => updateRegion(index, 'description', e.target.value)}
                      placeholder="Region description"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {coverageData.regions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No regions added yet. Click "Add Region" to get started.
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={addRegion} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Region
            </Button>
            
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

