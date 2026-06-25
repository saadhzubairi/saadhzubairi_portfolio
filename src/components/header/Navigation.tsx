import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Menu, Home, ArrowLeft } from 'lucide-react'
import { ModeToggle } from './DarkModeToggle'
import './navigation.css'

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Home')
  const [mounted, setMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  const isPortfolioRoute = location.pathname.startsWith('/portfolio')
  const isProjectPage = location.pathname.startsWith('/portfolio/')

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

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return

    const hash = location.hash.slice(1)
    setActiveSection(hash)

    const timeoutId = window.setTimeout(() => {
      const element = document.getElementById(hash)
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)

    return () => window.clearTimeout(timeoutId)
  }, [location.pathname, location.hash])

  const navigationItems = [
    { name: 'About', href: '/#AtAGlance', hash: 'AtAGlance' },
    { name: 'Featured', href: '/#Featured', hash: 'Featured' },
    { name: 'Connect', href: '/#Contact', hash: 'Contact' },
  ]

  const handleNavClick = (hash: string) => {
    setActiveSection(hash)
    setIsOpen(false)

    if (location.pathname === '/') {
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      navigate(`/#${hash}`)
    }
  }

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <header className="site-nav-wrap">
        <nav className="site-nav site-nav-loading">
          <div className="site-nav-brand">
            <Home className="h-5 w-5" />
            <span className="site-nav-brand-name">Saad</span>
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
      <header className="site-nav-wrap">
        <nav className={`site-nav ${isScrolled ? 'site-nav-scrolled' : ''}`}>
          <div onClick={() => handleNavClick('Home')} className="site-nav-brand">
            <Home className="h-5 w-5" />
            <span className="site-nav-brand-name">Saad</span>
          </div>

          <div className="site-nav-menu">
            {navigationItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                className={`site-nav-link ${isHomePage && activeSection === item.hash ? 'site-nav-link-active' : ''}`}
                onClick={() => handleNavClick(item.hash)}
              >
                <span>{item.name}</span>
              </Button>
            ))}

            <Link to="/portfolio">
              <Button className={`site-nav-link site-nav-portfolio ${isPortfolioRoute ? 'site-nav-link-active' : ''}`}>
                {isProjectPage && <ArrowLeft className="h-4 w-4" />}
                <span>Portfolio</span>
              </Button>
            </Link>
          </div>

          <div className="site-nav-actions">
            <ModeToggle />
            <div className="site-nav-mobile">
              <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="sm" className="site-nav-icon-button">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="site-nav-drawer">
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Navigation</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-4">
                    <div className="flex flex-col space-y-2">
                      {navigationItems.map((item) => (
                        <Button
                          key={item.name}
                          variant="ghost"
                          className={`site-nav-drawer-link ${isHomePage && activeSection === item.hash ? 'site-nav-drawer-link-active' : ''}`}
                          onClick={() => handleNavClick(item.hash)}
                        >
                          <span>{item.name}</span>
                        </Button>
                      ))}

                      {/* Portfolio Button in Mobile */}
                      <Link to="/portfolio" className="w-full">
                        <Button
                          className={`site-nav-drawer-link site-nav-drawer-portfolio ${isPortfolioRoute ? 'site-nav-drawer-link-active' : ''}`}
                          onClick={() => setIsOpen(false)}
                        >
                          {isProjectPage && <ArrowLeft className="mr-2 h-4 w-4" />}
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
