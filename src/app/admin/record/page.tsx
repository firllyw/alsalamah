'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface RecordFeature {
  title: string;
  icon: string;
}

interface RecordData {
  id?: string;
  features: RecordFeature[];
}

export default function RecordPage() {
  const [recordData, setRecordData] = useState<RecordData>({
    features: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/record');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setRecordData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching record data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addFeature = () => {
    setRecordData({
      ...recordData,
      features: [...recordData.features, { title: '', icon: '' }]
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = recordData.features.filter((_, i) => i !== index);
    setRecordData({ ...recordData, features: newFeatures });
  };

  const updateFeature = (index: number, field: keyof RecordFeature, value: string) => {
    const newFeatures = [...recordData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setRecordData({ ...recordData, features: newFeatures });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordData),
      });

      if (response.ok) {
        alert('Record section updated successfully!');
      } else {
        alert('Error updating record section');
      }
    } catch (error) {
      console.error('Error saving record section:', error);
      alert('Error updating record section');
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
        <h1 className="text-3xl font-bold text-gray-900">Record Section</h1>
        <p className="text-gray-600">Manage the proven track record features and highlights</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Track Record Features</CardTitle>
          <CardDescription>
            Add or remove features that showcase your company's proven track record
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {recordData.features.map((feature, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Feature {index + 1}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`title-${index}`}>Title</Label>
                    <Input
                      id={`title-${index}`}
                      value={feature.title}
                      onChange={(e) => updateFeature(index, 'title', e.target.value)}
                      placeholder="e.g., On Time Delivery, Quality Service"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`icon-${index}`}>Icon Name</Label>
                    <Input
                      id={`icon-${index}`}
                      value={feature.icon}
                      onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                      placeholder="e.g., clock, shield, check"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {recordData.features.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No features added yet. Click "Add Feature" to get started.
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={addFeature} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Feature
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

