'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LayoutDashboard, Menu, FileText, Settings, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Menu Items",
      value: "8",
      description: "Active navigation items",
      icon: Menu,
      trend: "+2 from last month"
    },
    {
      title: "Active Sections",
      value: "12",
      description: "Published content sections",
      icon: FileText,
      trend: "+3 from last month"
    },
    {
      title: "Site Configuration",
      value: "15",
      description: "Configuration entries",
      icon: Settings,
      trend: "All up to date"
    }
  ]

  const quickActions = [
    {
      title: "Add Menu Item",
      description: "Create a new navigation menu item",
      href: "/admin/menu",
      icon: Menu,
      color: "bg-blue-500"
    },
    {
      title: "Create Section",
      description: "Add a new content section",
      href: "/admin/sections",
      icon: FileText,
      color: "bg-green-500"
    },
    {
      title: "Site Settings",
      description: "Update site configuration",
      href: "/admin/config",
      icon: Settings,
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to Al Salamah Transportation CMS. Manage your website content from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-600 mt-1">
                {stat.description}
              </p>
              <p className="text-xs text-green-600 mt-2">
                {stat.trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card key={index} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <Link href={action.href}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${action.color}`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription>{action.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border border-gray-200 shadow-sm">
        <CardHeader className="bg-white border-b border-gray-100">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest changes to your website content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Menu item "Services" was updated</span>
              <span className="text-gray-400">2 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">Hero section content was modified</span>
              <span className="text-gray-400">4 hours ago</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-gray-600">New contact section was created</span>
              <span className="text-gray-400">1 day ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
