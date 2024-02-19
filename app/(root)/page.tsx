import React from 'react'
import { UserButton } from '@clerk/nextjs'

function Home() {
  return (
    <div>
	<p>Home</p>
	<UserButton afterSignOutUrl='/' />
    </div>
  )
}

export default Home
