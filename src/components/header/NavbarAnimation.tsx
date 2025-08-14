import { useState, useEffect } from 'react'
import Navigation from './Navigation'

interface NavbarAnimationProps {
  isVisible: boolean
}

export default function NavbarAnimation({ isVisible }: NavbarAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible) {
      // Start animation after a small delay
      setTimeout(() => {
        setIsAnimating(true)
      }, 500)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className={`transition-opacity duration-1000 ease-out ${
      isAnimating 
        ? 'opacity-100' 
        : 'opacity-0'
    }`}>
      <Navigation />
    </div>
  )
}
