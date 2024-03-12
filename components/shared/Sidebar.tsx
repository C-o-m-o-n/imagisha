"use client"

import { navLinks } from '@/constants'
import React from 'react'
import  Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'

function Sidebar() {

const pathname = usePathname();
  return (
  <aside className='sidebar'>
  <div className='flex size-full flex-col gap-4'>
  <Link href='/' className='sidebar-logo'>
	<Image src='/assets/imagisha-h-crop.png' alt='logo' width={250} height={200} />
  </Link>

  <nav className='sidebar-nav'>
	 <SignedIn>

	 <ul className='sidebar-nav_elements'>
		{navLinks.slice(0,6).map((link)=>{
	const isActive = link.route == pathname
	return (
	<li key={link.route} className={`sidebar-nav_element group ${
		isActive ? 'bg-[#007d20] text-white' : 'text-gray-700'
	}`}>
	<Link className='sidebar-link' href={link.route} >
		<Image src={link.icon} 
		       alt='link icon'
		       width={24} height={24}
		       className={`${isActive && 'brightness-200'}`}/>
	{link.label}
	</Link>
	</li>
)

})}
</ul>

<ul>
{navLinks.slice(6).map((link)=>{
	const isActive = link.route == pathname
	return (
	<li key={link.route} className={`sidebar-nav_element group ${
		isActive ? 'bg-[#007d20] text-white' : 'text-gray-700'
	}`}>
	<Link className='sidebar-link' href={link.route} >
		<Image src={link.icon} 
		       alt='link icon'
		       width={24} height={24}
		       className={`${isActive && 'brightness-200'}`}/>
	{link.label}
	</Link>
	</li>
)

})}


<UserButton afterSignOutUrl='/' showName />
	 </ul>
	 </SignedIn>

	 <SignedOut>

	 </SignedOut>
  </nav>

  </div>
  </aside>
  )
}

export default Sidebar
