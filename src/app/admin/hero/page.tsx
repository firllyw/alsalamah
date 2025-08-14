'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HeroData {
  id?: string;
  title: string;
  subtitle: string;
  yearText: string;
  scrollText: string;
}

export default function HeroSectionPage() {
  const [heroData, setHeroData] = useState<HeroData>({
    title: '',
    subtitle: '',
    yearText: '',
    scrollText: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch current hero data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/hero');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setHeroData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroData),
      });

      if (response.ok) {
        alert('Hero section updated successfully!');
      } else {
        alert('Error updating hero section');
      }
    } catch (error) {
      console.error('Error saving hero data:', error);
      alert('Error updating hero section');
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
        <h1 className="text-3xl font-bold text-gray-900">Hero Section</h1>
        <p className="text-gray-600">Manage the main hero section content</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>
            Edit the main title, subtitle, and call-to-action text for the hero section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <Label htmlFor="title">Main Title</Label>
              <Input
                id="title"
                value={heroData.title}
                onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                placeholder="Enter main title"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={heroData.subtitle}
                onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                placeholder="Enter subtitle"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="yearText">Year Text</Label>
              <Input
                id="yearText"
                value={heroData.yearText}
                onChange={(e) => setHeroData({ ...heroData, yearText: e.target.value })}
                placeholder="e.g., IN 30 YEARS"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="scrollText">Scroll Text</Label>
              <Input
                id="scrollText"
                value={heroData.scrollText}
                onChange={(e) => setHeroData({ ...heroData, scrollText: e.target.value })}
                placeholder="e.g., SCROLL DOWN"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
