import { Twitter, Instagram, Linkedin, TwitchIcon, Youtube } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <div className=" flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-6xl mx-auto relative">
        {/* 3D Pie Chart */}
        <div className="absolute hidden left-0 top-1/2 -translate-y-1/2 w-48 h-48 lg:flex md:w-64 md:h-64">
            <div>
          <Image src="/image/icon1.png" width={250} height={250} alt='icon'/>
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Create your account
          </h2>
          <p className="text-gray-400 mb-8">
            Start your Order
          </p>
          <Link href="/sign-up">
            <Button className="bg-primary hover:bg-red-700 text-white px-8 py-2 rounded-md">
                Signup
            </Button>
          </Link>
        </div>

        {/* 3D Gear */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 hidden lg:flex  md:w-48 md:h-48">
          <div className="relative w-full h-full animate-spin-slow">
          <Image src="/image/icon2.png" width={300} height={300} alt='icon'/>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="w-full max-w-6xl mx-auto mt-24 border-t border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-4">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Ainafi Inc. All rights reserved
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <TwitchIcon className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

