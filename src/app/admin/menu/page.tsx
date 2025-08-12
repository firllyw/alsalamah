'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Menu, ExternalLink } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Switch from '@radix-ui/react-switch'

interface MenuItem {
  id: string
  title: string
  href: string | null
  order: number
  isActive: boolean
  parentId: string | null
  children?: MenuItem[]
}

export default function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    href: '',
    order: 0,
    isActive: true,
    parentId: ''
  })

  // Mock data for development
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMenuItems([
        { id: '1', title: 'Home', href: '/', order: 1, isActive: true, parentId: null },
        { id: '2', title: 'Services', href: '/services', order: 2, isActive: true, parentId: null },
        { id: '3', title: 'About', href: '/about', order: 3, isActive: true, parentId: null },
        { id: '4', title: 'Contact', href: '/contact', order: 4, isActive: true, parentId: null },
        { id: '5', title: 'Fleet', href: '/fleet', order: 5, isActive: false, parentId: null }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Here you would make API calls to create/update menu items
    console.log('Submitting:', formData)
    
    if (editingItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...formData, href: formData.href || null }
          : item
      ))
    } else {
      // Create new item
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...formData,
        href: formData.href || null
      }
      setMenuItems(prev => [...prev, newItem])
    }
    
    resetForm()
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      href: item.href || '',
      order: item.order,
      isActive: item.isActive,
      parentId: item.parentId || ''
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      href: '',
      order: 0,
      isActive: true,
      parentId: ''
    })
    setEditingItem(null)
    setIsDialogOpen(false)
  }

  const toggleActive = async (id: string) => {
    setMenuItems(prev => prev.map(item => 
      item.id === id ? { ...item, isActive: !item.isActive } : item
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Menu Management</h1>
          <p className="text-gray-600 mt-2">
            Manage your website navigation menu items
          </p>
        </div>
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <Button onClick={() => setEditingItem(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Menu Item
            </Button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
              <Dialog.Title className="text-lg font-semibold mb-4">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </Dialog.Title>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Menu item title"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="href">URL/Link</Label>
                  <Input
                    id="href"
                    value={formData.href}
                    onChange={(e) => setFormData(prev => ({ ...prev, href: e.target.value }))}
                    placeholder="/services or https://example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="order">Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                    placeholder="1"
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
                    {editingItem ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Menu Items Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle>Menu Items</CardTitle>
          <CardDescription>
            Manage your website navigation menu structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-2">
              {menuItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <Menu className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.title}</span>
                        {item.href && (
                          <ExternalLink className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        {item.href || 'No link'} • Order: {item.order}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch.Root
                      checked={item.isActive}
                      onCheckedChange={() => toggleActive(item.id)}
                      className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                    >
                      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                    </Switch.Root>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {menuItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No menu items found. Create your first menu item to get started.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
