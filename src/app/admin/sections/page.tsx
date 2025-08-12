'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, FileText, Eye, EyeOff } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Switch from '@radix-ui/react-switch'
import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

interface Section {
  id: string
  name: string
  title: string
  subtitle: string | null
  content: string | null
  isActive: boolean
  order: number
  sectionType: string
  data: string | null
}

const sectionTypes = [
  { value: 'hero', label: 'Hero Section' },
  { value: 'services', label: 'Services' },
  { value: 'about', label: 'About' },
  { value: 'contact', label: 'Contact' },
  { value: 'features', label: 'Features' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'gallery', label: 'Gallery' },
  { value: 'custom', label: 'Custom' }
]

export default function SectionsManagement() {
  const [sections, setSections] = useState<Section[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<Section | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    subtitle: '',
    content: '',
    isActive: true,
    order: 0,
    sectionType: 'custom',
    data: ''
  })

  // Mock data for development
  useEffect(() => {
    setTimeout(() => {
      setSections([
        {
          id: '1',
          name: 'hero',
          title: 'Welcome to Al Salamah',
          subtitle: 'Driving Reliable Distribution',
          content: 'For over 30 years, we have been delivering excellence...',
          isActive: true,
          order: 1,
          sectionType: 'hero',
          data: null
        },
        {
          id: '2',
          name: 'services',
          title: 'Our Services',
          subtitle: 'Comprehensive logistics solutions',
          content: 'We offer a wide range of transportation services...',
          isActive: true,
          order: 2,
          sectionType: 'services',
          data: null
        },
        {
          id: '3',
          name: 'about',
          title: 'About Al Salamah',
          subtitle: 'Trusted partner since 1990',
          content: 'Al Salamah Transportation has been serving Saudi Arabia...',
          isActive: true,
          order: 3,
          sectionType: 'about',
          data: null
        },
        {
          id: '4',
          name: 'contact',
          title: 'Contact Us',
          subtitle: 'Get in touch with our team',
          content: 'Ready to start your logistics journey with us?',
          isActive: false,
          order: 4,
          sectionType: 'contact',
          data: null
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Submitting:', formData)
    
    if (editingSection) {
      setSections(prev => prev.map(section => 
        section.id === editingSection.id 
          ? { 
              ...section, 
              ...formData, 
              subtitle: formData.subtitle || null,
              content: formData.content || null,
              data: formData.data || null
            }
          : section
      ))
    } else {
      const newSection: Section = {
        id: Date.now().toString(),
        ...formData,
        subtitle: formData.subtitle || null,
        content: formData.content || null,
        data: formData.data || null
      }
      setSections(prev => [...prev, newSection])
    }
    
    resetForm()
  }

  const handleEdit = (section: Section) => {
    setEditingSection(section)
    setFormData({
      name: section.name,
      title: section.title,
      subtitle: section.subtitle || '',
      content: section.content || '',
      isActive: section.isActive,
      order: section.order,
      sectionType: section.sectionType,
      data: section.data || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this section?')) {
      setSections(prev => prev.filter(section => section.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      subtitle: '',
      content: '',
      isActive: true,
      order: 0,
      sectionType: 'custom',
      data: ''
    })
    setEditingSection(null)
    setIsDialogOpen(false)
  }

  const toggleActive = async (id: string) => {
    setSections(prev => prev.map(section => 
      section.id === id ? { ...section, isActive: !section.isActive } : section
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sections Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your website content sections and their display order
          </p>
        </div>
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <Button onClick={() => setEditingSection(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto">
              <Dialog.Title className="text-lg font-semibold mb-4">
                {editingSection ? 'Edit Section' : 'Add New Section'}
              </Dialog.Title>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Section Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="hero, services, about..."
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="sectionType">Section Type</Label>
                    <Select.Root value={formData.sectionType} onValueChange={(value) => setFormData(prev => ({ ...prev, sectionType: value }))}>
                      <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <Select.Value placeholder="Select section type" />
                        <Select.Icon>
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Select.Icon>
                      </Select.Trigger>
                      <Select.Portal>
                        <Select.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
                          <Select.Viewport className="p-1">
                            {sectionTypes.map((type) => (
                              <Select.Item
                                key={type.value}
                                value={type.value}
                                className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                              >
                                <Select.ItemText>{type.label}</Select.ItemText>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Section title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Section subtitle (optional)"
                  />
                </div>
                
                <div>
                  <Label htmlFor="content">Content</Label>
                  <textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Section content..."
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    placeholder="1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="data">Additional Data (JSON)</Label>
                  <textarea
                    id="data"
                    value={formData.data}
                    onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                    placeholder='{"key": "value", "items": []}'
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono"
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch.Root
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                    className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                  <Label>Active</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Dialog.Close asChild>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button type="submit">
                    {editingSection ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Sections Grid */}
      <div className="grid grid-cols-1 gap-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          sections.map((section) => (
            <Card key={section.id} className={`bg-white border border-gray-200 shadow-sm ${!section.isActive ? 'opacity-60' : ''}`}>
              <CardHeader className="bg-white border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{section.title}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          section.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {section.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {sectionTypes.find(t => t.value === section.sectionType)?.label || section.sectionType}
                        </span>
                      </CardTitle>
                      <CardDescription>
                        {section.subtitle || 'No subtitle'}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch.Root
                      checked={section.isActive}
                      onCheckedChange={() => toggleActive(section.id)}
                      className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(section)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(section.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {section.content && (
                <CardContent>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {section.content}
                  </p>
                  <div className="mt-2 text-xs text-gray-500">
                    Order: {section.order} • Name: {section.name}
                  </div>
                </CardContent>
              )}
            </Card>
          ))
        )}
        
        {!isLoading && sections.length === 0 && (
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardContent className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                No sections found. Create your first section to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
