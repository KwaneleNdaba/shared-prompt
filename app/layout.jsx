import React, { Children } from 'react'
import "@styles/global.css"
import Nav from '@components/Nav'

export const metadata={
    title : "Prompts",
    description : "Discover and share AI Prompts"
}

function RootLayout({children}) {
  return (
    <html lang = "en">
    <body>
        <div className="main">
            <div className='gradient'/>
        </div>
        <main className='app'>
          <Nav/>
            {children}
        </main>
    </body>
    </html>
  )
}

export default RootLayout
