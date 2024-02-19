import  Sidebar from '../../components/shared/Sidebar'
import MobileNav  from '../../components/shared/MobileNav'
import React, { Children } from 'react'

function Layout({children}: {children: React.ReactNode}) {
  return (
    <main className='root' >
	{/** sidebar **/}
	<Sidebar />
	{/** mobile navigation **/}

	<MobileNav />
<div className='root-container'>
        <div className='wrapper'>

      { children }

        </div>
      </div>
    </main>
  )
}

export default Layout
