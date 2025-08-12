'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Save, Settings, Globe, Mail, Phone, MapPin } from 'lucide-react'

interface SiteConfigItem {
  id: string
  key: string
  value: string
  description: string
}

export default function SiteConfiguration() {
  const [configs, setConfigs] = useState<SiteConfigItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Mock data for development
  useEffect(() => {
    setTimeout(() => {
      setConfigs([
        {
          id: '1',
          key: 'site_title',
          value: 'Al Salamah Transportation',
          description: 'Main website title'
        },
        {
          id: '2',
          key: 'site_tagline',
          value: 'Driving Reliable Distribution Across Saudi Arabia & Beyond',
          description: 'Website tagline/subtitle'
        },
        {
          id: '3',
          key: 'contact_email',
          value: 'alsalamahtrans@sbtcgroup.com',
          description: 'Primary contact email'
        },
        {
          id: '4',
          key: 'contact_phone',
          value: '+966 50 946 3389',
          description: 'Primary contact phone number'
        },
        {
          id: '5',
          key: 'headquarters_address',
          value: 'Jeddah, Kingdom of Saudi Arabia',
          description: 'Headquarters address'
        },
        {
          id: '6',
          key: 'company_description',
          value: 'For over 32 years, Al Salamah Transportation (AST) has been a trusted partner in the movement of goods and materials across Saudi Arabia and beyond.',
          description: 'Company description for about section'
        },
        {
          id: '7',
          key: 'linkedin_url',
          value: 'https://linkedin.com/company/alsalamah',
          description: 'LinkedIn company page URL'
        },
        {
          id: '8',
          key: 'whatsapp_number',
          value: '+966 50 946 3389',
          description: 'WhatsApp contact number'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleValueChange = (id: string, newValue: string) => {
    setConfigs(prev => prev.map(config => 
      config.id === id ? { ...config, value: newValue } : config
    ))
  }

  const handleSave = async () => {
    setIsSaving(true)
    
    // Here you would make API calls to save the configuration
    console.log('Saving configuration:', configs)
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      alert('Configuration saved successfully!')
    }, 1500)
  }

  const getConfigIcon = (key: string) => {
    if (key.includes('email')) return Mail
    if (key.includes('phone') || key.includes('whatsapp')) return Phone
    if (key.includes('address') || key.includes('headquarters')) return MapPin
    if (key.includes('url') || key.includes('linkedin')) return Globe
    return Settings
  }

  const groupedConfigs = {
    general: configs.filter(c => ['site_title', 'site_tagline', 'company_description'].includes(c.key)),
    contact: configs.filter(c => ['contact_email', 'contact_phone', 'whatsapp_number', 'headquarters_address'].includes(c.key)),
    social: configs.filter(c => ['linkedin_url'].includes(c.key))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Site Configuration</h1>
          <p className="text-gray-600 mt-2">
            Manage your website settings and contact information
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* General Settings */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="bg-white border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>General Settings</span>
              </CardTitle>
              <CardDescription>
                Basic website information and branding
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {groupedConfigs.general.map((config) => {
                const Icon = getConfigIcon(config.key)
                return (
                  <div key={config.id} className="space-y-2">
                    <Label htmlFor={config.key} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span>{config.description}</span>
                    </Label>
                    {config.key === 'company_description' ? (
                      <textarea
                        id={config.key}
                        value={config.value}
                        onChange={(e) => handleValueChange(config.id, e.target.value)}
                        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        rows={3}
                      />
                    ) : (
                      <Input
                        id={config.key}
                        value={config.value}
                        onChange={(e) => handleValueChange(config.id, e.target.value)}
                        placeholder={`Enter ${config.description.toLowerCase()}`}
                      />
                    )}
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="bg-white border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>Contact Information</span>
              </CardTitle>
              <CardDescription>
                Company contact details and location
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {groupedConfigs.contact.map((config) => {
                const Icon = getConfigIcon(config.key)
                return (
                  <div key={config.id} className="space-y-2">
                    <Label htmlFor={config.key} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span>{config.description}</span>
                    </Label>
                    <Input
                      id={config.key}
                      value={config.value}
                      onChange={(e) => handleValueChange(config.id, e.target.value)}
                      placeholder={`Enter ${config.description.toLowerCase()}`}
                      type={config.key.includes('email') ? 'email' : config.key.includes('phone') ? 'tel' : 'text'}
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Social Media */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="bg-white border-b border-gray-100">
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Social Media</span>
              </CardTitle>
              <CardDescription>
                Social media profiles and external links
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {groupedConfigs.social.map((config) => {
                const Icon = getConfigIcon(config.key)
                return (
                  <div key={config.id} className="space-y-2">
                    <Label htmlFor={config.key} className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-gray-500" />
                      <span>{config.description}</span>
                    </Label>
                    <Input
                      id={config.key}
                      value={config.value}
                      onChange={(e) => handleValueChange(config.id, e.target.value)}
                      placeholder={`Enter ${config.description.toLowerCase()}`}
                      type="url"
                    />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Save Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reset Changes
            </Button>
            <Button onClick={handleSave} disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
