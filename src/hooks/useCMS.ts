import { useState, useEffect } from 'react'

interface Section {
  id: string
  name: string
  title: string
  subtitle: string | null
  content: string | null
  sectionType: string
  data: any
  isActive: boolean
  order: number
}

interface SiteConfig {
  [key: string]: string
}

interface MenuItem {
  id: string
  title: string
  href: string | null
  order: number
  children?: MenuItem[]
}

export function useSection(name: string) {
  const [section, setSection] = useState<Section | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSection() {
      try {
        setLoading(true)
        const response = await fetch(`/api/cms/sections?name=${name}&active=true`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch section')
        }
        
        const sections = await response.json()
        setSection(sections[0] || null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSection()
  }, [name])

  return { section, loading, error }
}

export function useSections(sectionType?: string) {
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSections() {
      try {
        setLoading(true)
        let url = '/api/cms/sections?active=true'
        if (sectionType) {
          url += `&type=${sectionType}`
        }
        
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('Failed to fetch sections')
        }
        
        const data = await response.json()
        setSections(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchSections()
  }, [sectionType])

  return { sections, loading, error }
}

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchConfig() {
      try {
        setLoading(true)
        const response = await fetch('/api/cms/config')
        
        if (!response.ok) {
          throw new Error('Failed to fetch site configuration')
        }
        
        const data = await response.json()
        setConfig(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchConfig()
  }, [])

  return { config, loading, error }
}

export function useMenu() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMenu() {
      try {
        setLoading(true)
        const response = await fetch('/api/cms/menu')
        
        if (!response.ok) {
          throw new Error('Failed to fetch menu items')
        }
        
        const data = await response.json()
        setMenuItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchMenu()
  }, [])

  return { menuItems, loading, error }
}
