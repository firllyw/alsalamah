'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface ShowcaseImage {
  src: string;
  alt: string;
}

interface ShowcaseFeature {
  title: string;
  description: string;
  icon: string;
}

interface ShowcaseData {
  id?: string;
  images: ShowcaseImage[];
  features: ShowcaseFeature[];
}

export default function ShowcasePage() {
  const [showcaseData, setShowcaseData] = useState<ShowcaseData>({
    images: [],
    features: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/showcase');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setShowcaseData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching showcase data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addImage = () => {
    setShowcaseData({
      ...showcaseData,
      images: [...showcaseData.images, { src: '', alt: '' }]
    });
  };

  const removeImage = (index: number) => {
    const newImages = showcaseData.images.filter((_, i) => i !== index);
    setShowcaseData({ ...showcaseData, images: newImages });
  };

  const updateImage = (index: number, field: keyof ShowcaseImage, value: string) => {
    const newImages = [...showcaseData.images];
    newImages[index] = { ...newImages[index], [field]: value };
    setShowcaseData({ ...showcaseData, images: newImages });
  };

  const addFeature = () => {
    setShowcaseData({
      ...showcaseData,
      features: [...showcaseData.features, { title: '', description: '', icon: '' }]
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = showcaseData.features.filter((_, i) => i !== index);
    setShowcaseData({ ...showcaseData, features: newFeatures });
  };

  const updateFeature = (index: number, field: keyof ShowcaseFeature, value: string) => {
    const newFeatures = [...showcaseData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setShowcaseData({ ...showcaseData, features: newFeatures });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/showcase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showcaseData),
      });

      if (response.ok) {
        alert('Showcase updated successfully!');
      } else {
        alert('Error updating showcase');
      }
    } catch (error) {
      console.error('Error saving showcase:', error);
      alert('Error updating showcase');
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
        <h1 className="text-3xl font-bold text-gray-900">Showcase Section</h1>
        <p className="text-gray-600">Manage gallery images and showcase features</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Gallery Images</CardTitle>
          <CardDescription>
            Add or remove images for the showcase gallery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {showcaseData.images.map((image, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Image {index + 1}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeImage(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`src-${index}`}>Image Path</Label>
                    <Input
                      id={`src-${index}`}
                      value={image.src}
                      onChange={(e) => updateImage(index, 'src', e.target.value)}
                      placeholder="/images/gallery1.jpg"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`alt-${index}`}>Alt Text</Label>
                    <Input
                      id={`alt-${index}`}
                      value={image.alt}
                      onChange={(e) => updateImage(index, 'alt', e.target.value)}
                      placeholder="Image description"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button onClick={addImage} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Image
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Showcase Features</CardTitle>
          <CardDescription>
            Add or remove features highlighted in the showcase
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {showcaseData.features.map((feature, index) => (
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`feature-title-${index}`}>Title</Label>
                    <Input
                      id={`feature-title-${index}`}
                      value={feature.title}
                      onChange={(e) => updateFeature(index, 'title', e.target.value)}
                      placeholder="Feature title"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`feature-icon-${index}`}>Icon</Label>
                    <Input
                      id={`feature-icon-${index}`}
                      value={feature.icon}
                      onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                      placeholder="icon-name"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`feature-description-${index}`}>Description</Label>
                    <Input
                      id={`feature-description-${index}`}
                      value={feature.description}
                      onChange={(e) => updateFeature(index, 'description', e.target.value)}
                      placeholder="Feature description"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
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

