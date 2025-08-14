'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: string;
}

interface ServicesData {
  id?: string;
  services: Service[];
}

export default function ServicesPage() {
  const [servicesData, setServicesData] = useState<ServicesData>({
    services: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/services');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setServicesData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching services data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addService = () => {
    setServicesData({
      ...servicesData,
      services: [...servicesData.services, { title: '', description: '', icon: '' }]
    });
  };

  const removeService = (index: number) => {
    const newServices = servicesData.services.filter((_, i) => i !== index);
    setServicesData({ ...servicesData, services: newServices });
  };

  const updateService = (index: number, field: keyof Service, value: string) => {
    const newServices = [...servicesData.services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServicesData({ ...servicesData, services: newServices });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(servicesData),
      });

      if (response.ok) {
        alert('Services updated successfully!');
      } else {
        alert('Error updating services');
      }
    } catch (error) {
      console.error('Error saving services:', error);
      alert('Error updating services');
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
        <h1 className="text-3xl font-bold text-gray-900">Services Section</h1>
        <p className="text-gray-600">Manage the services offered by your company</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Services Management</CardTitle>
          <CardDescription>
            Add, edit, or remove services. Each service should have a title, description, and icon name.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {servicesData.services.map((service, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Service {index + 1}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeService(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <Input
                      id={`title-${index}`}
                      value={service.title}
                      onChange={(e) => updateService(index, 'title', e.target.value)}
                      placeholder="Service title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`icon-${index}`}>Icon Name</Label>
                    <Input
                      id={`icon-${index}`}
                      value={service.icon}
                      onChange={(e) => updateService(index, 'icon', e.target.value)}
                      placeholder="e.g., truck, package, globe"
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="md:col-span-1">
                    <Label htmlFor={`description-${index}`}>Description</Label>
                    <Input
                      id={`description-${index}`}
                      value={service.description}
                      onChange={(e) => updateService(index, 'description', e.target.value)}
                      placeholder="Service description"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {servicesData.services.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No services added yet. Click "Add Service" to get started.
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={addService} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Service
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

