import React from 'react'
import { BrowserRouter, Link, Routes, Route} from 'react-router-dom'

import { Home, CreatePost } from './pages'
import { logo } from './assets'

const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center border-b border-[#e6ebf4] sm:px-8 px-4 py-4'>
        <Link to='/'>
          <img src={logo} alt="logo" className='w-28 object-contain' />
        </Link>

        <Link to='/create-post' className='bg-[#6469ff] rounded-md font-medium text-white px-4 py-2 font-inter'>
          Create
        </Link>
      </header>
      <main className='bg-[#f9fafe] min-h-[calc(100vh-73px)] sm:p-8 px-4 py-8'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App