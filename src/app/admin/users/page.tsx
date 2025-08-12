'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, Users, Shield, Eye, EyeOff, Mail, Calendar } from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Switch from '@radix-ui/react-switch'
import * as Select from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'

interface User {
  id: string
  email: string
  name: string
  role: string
  isActive: boolean
  lastLogin: string | null
  createdAt: string
}

const userRoles = [
  { value: 'admin', label: 'Administrator', description: 'Full access to all features' },
  { value: 'editor', label: 'Editor', description: 'Can edit content and sections' },
  { value: 'viewer', label: 'Viewer', description: 'Read-only access' }
]

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    role: 'editor',
    isActive: true
  })

  // Mock data for development
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: '1',
          email: 'admin@alsalamah.com',
          name: 'Administrator',
          role: 'admin',
          isActive: true,
          lastLogin: '2024-01-15T10:30:00Z',
          createdAt: '2024-01-01T00:00:00Z'
        },
        {
          id: '2',
          email: 'editor@alsalamah.com',
          name: 'Content Editor',
          role: 'editor',
          isActive: true,
          lastLogin: '2024-01-14T15:45:00Z',
          createdAt: '2024-01-05T00:00:00Z'
        },
        {
          id: '3',
          email: 'viewer@alsalamah.com',
          name: 'Content Viewer',
          role: 'viewer',
          isActive: false,
          lastLogin: null,
          createdAt: '2024-01-10T00:00:00Z'
        }
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Submitting:', formData)
    
    if (editingUser) {
      setUsers(prev => prev.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ))
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
        lastLogin: null,
        createdAt: new Date().toISOString()
      }
      setUsers(prev => [...prev, newUser])
    }
    
    resetForm()
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(user => user.id !== id))
    }
  }

  const resetForm = () => {
    setFormData({
      email: '',
      name: '',
      role: 'editor',
      isActive: true
    })
    setEditingUser(null)
    setIsDialogOpen(false)
  }

  const toggleActive = async (id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, isActive: !user.isActive } : user
    ))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return Shield
      case 'editor': return Edit
      case 'viewer': return Eye
      default: return Users
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'editor': return 'bg-blue-100 text-blue-800'
      case 'viewer': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">
            Manage admin users and their access permissions
          </p>
        </div>
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Trigger asChild>
            <Button onClick={() => setEditingUser(null)}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md z-50">
              <Dialog.Title className="text-lg font-semibold mb-4">
                {editingUser ? 'Edit User' : 'Add New User'}
              </Dialog.Title>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@alsalamah.com"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select.Root value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value }))}>
                    <Select.Trigger className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <Select.Value placeholder="Select user role" />
                      <Select.Icon>
                        <ChevronDown className="h-4 w-4 opacity-50" />
                      </Select.Icon>
                    </Select.Trigger>
                    <Select.Portal>
                      <Select.Content className="relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
                        <Select.Viewport className="p-1">
                          {userRoles.map((role) => (
                            <Select.Item
                              key={role.value}
                              value={role.value}
                              className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                            >
                              <Select.ItemText>
                                <div>
                                  <div className="font-medium">{role.label}</div>
                                  <div className="text-xs text-gray-500">{role.description}</div>
                                </div>
                              </Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch.Root
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                    className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                  >
                    <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                  </Switch.Root>
                  <Label>Active User</Label>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Dialog.Close asChild>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Button type="submit">
                    {editingUser ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Users Table */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            Manage user accounts and access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="space-y-4">
              {users.map((user) => {
                const RoleIcon = getRoleIcon(user.role)
                return (
                  <div 
                    key={user.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{user.name}</span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getRoleBadgeColor(user.role)}`}>
                            {userRoles.find(r => r.value === user.role)?.label || user.role}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            user.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Last login: {formatDate(user.lastLogin)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch.Root
                        checked={user.isActive}
                        onCheckedChange={() => toggleActive(user.id)}
                        className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-600 transition-colors"
                      >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
                      </Switch.Root>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-700"
                        disabled={user.role === 'admin' && users.filter(u => u.role === 'admin' && u.isActive).length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })}
              
              {users.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No users found. Create your first user to get started.
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Role Information */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle>Role Permissions</CardTitle>
          <CardDescription>
            Understanding different user role capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userRoles.map((role) => {
              const Icon = getRoleIcon(role.value)
              return (
                <div key={role.value} className="p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon className="h-5 w-5 text-gray-600" />
                    <h3 className="font-medium text-gray-900">{role.label}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{role.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
