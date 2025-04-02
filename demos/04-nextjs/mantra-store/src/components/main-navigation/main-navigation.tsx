// 'use client';

import Logo from "./logo/logo"
import MobileNavigation from "./mobile-navigation/mobile-navigation"
import DesktopNavigation from "./desktop-navigation/desktop-navigation"

export default function ResponsiveAppBar() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Logo />
        <MobileNavigation />
        <DesktopNavigation />
      </div>
    </header>
  )
}