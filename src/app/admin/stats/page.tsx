'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
}

interface StatsData {
  id?: string;
  stats: Stat[];
}

export default function StatsPage() {
  const [statsData, setStatsData] = useState<StatsData>({
    stats: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setStatsData(data);
          }
        }
      } catch (error) {
        console.error('Error fetching stats data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addStat = () => {
    setStatsData({
      ...statsData,
      stats: [...statsData.stats, { value: '', label: '' }]
    });
  };

  const removeStat = (index: number) => {
    const newStats = statsData.stats.filter((_, i) => i !== index);
    setStatsData({ ...statsData, stats: newStats });
  };

  const updateStat = (index: number, field: keyof Stat, value: string) => {
    const newStats = [...statsData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setStatsData({ ...statsData, stats: newStats });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(statsData),
      });

      if (response.ok) {
        alert('Statistics updated successfully!');
      } else {
        alert('Error updating statistics');
      }
    } catch (error) {
      console.error('Error saving statistics:', error);
      alert('Error updating statistics');
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
        <h1 className="text-3xl font-bold text-gray-900">Statistics Section</h1>
        <p className="text-gray-600">Manage company statistics and key numbers</p>
      </div>

      <Card className="bg-white">
        <CardHeader>
          <CardTitle>Statistics Management</CardTitle>
          <CardDescription>
            Add, edit, or remove company statistics. Each stat should have a value and descriptive label.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {statsData.stats.map((stat, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Statistic {index + 1}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeStat(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`value-${index}`}>Value</Label>
                    <Input
                      id={`value-${index}`}
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      placeholder="e.g., 1000+, 99%, 24/7"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor={`label-${index}`}>Label</Label>
                    <Input
                      id={`label-${index}`}
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      placeholder="e.g., Happy Customers, On-Time Delivery"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {statsData.stats.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No statistics added yet. Click "Add Statistic" to get started.
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={addStat} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Statistic
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

