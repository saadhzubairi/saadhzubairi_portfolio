import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Menu, Home } from 'lucide-react'
import { ModeToggle } from './DarkModeToggle'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    { name: 'About', href: '/#About', hash: 'About' },
    { name: 'Featured', href: '/#Featured', hash: 'Featured' },
    { name: 'Qualifications', href: '/#Qual', hash: 'Qual' },
    { name: 'Skills', href: '/#Skills', hash: 'Skills' },
    { name: 'Connect', href: '/#Contact', hash: 'Contact' },
  ]

  const handleNavClick = (hash: string) => {
    setActiveSection(hash)
    setIsOpen(false)

    // Smooth scroll to section if on home page
    if (location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <nav className="flex h-16 items-center justify-between rounded-full glass-3d px-8 max-w-4xl w-full mx-4">
          <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white">
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Saad</span>
          </div>
          <div className="hidden lg:flex items-center space-x-1">
            {/* Placeholder for navigation items */}
          </div>
          <div className="lg:hidden flex items-center space-x-2">
            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
            <div className="w-9 h-9 bg-gray-200 dark:bg-gray-600 rounded animate-pulse" />
          </div>
        </nav>
      </header>
    )
  }

  return (
    <>
      {/* Desktop Navigation */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <nav className={`flex h-16 items-center justify-between rounded-full px-8 w-full mx-4 transition-all duration-300 ease-in-out ${isScrolled
          ? 'backdrop-blur-lg bg-white/50 dark:bg-gray-900/50 shadow-lg max-w-4xl'
          : 'bg-transparent max-w-5xl'
          }`}>
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors cursor-pointer">
            <Home className="h-5 w-5" />
            <span className="hidden sm:inline">Saad</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${activeSection === item.hash
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                onClick={() => handleNavClick(item.hash)}
              >
                <span className="text-sm font-medium">{item.name}</span>
              </Button>
            ))}

            {/* Portfolio Button */}
            <Link to="/portfolio">
              <Button className="ml-2 bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-lg cursor-pointer">
                <span className="text-sm font-medium">Portfolio</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu and Dark Mode Toggle */}
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <div className="lg:hidden">
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="sm" className="cursor-pointer">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Navigation</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-4">
                    <div className="flex flex-col space-y-2">
                      {navigationItems.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className={`justify-start cursor-pointer ${activeSection === item.hash
                            ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            }`}
                          onClick={() => handleNavClick(item.hash)}
                        >
                          <span>{item.name}</span>
                        </Button>
                      ))}

                      {/* Portfolio Button in Mobile */}
                      <Link to="/portfolio" className="w-full">
                        <Button
                          className="w-full justify-start bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 text-white cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        >
                          <span>Portfolio</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Navigation
