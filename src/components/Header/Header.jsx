import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Container, Logout, Logo } from '..index/'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const Navigation = useNavigate()
  const NavItems = [
    {
      name: 'Home',
      slug: '/',
      active: true
    },
    {
      name: 'Login',
      slug: '/login',
      active: !authStatus
    },
    {
      name: 'Signup',
      slug: '/signup',
      active: !authStatus
    },
    {
      name: 'All Posts',
      slug: '/all-posts',
      active: authStatus
    },
    {
      name: 'Add Post',
      slug: '/add-post',
      active: authStatus
    }

  ]
  return (
    <header>
      <Container>
        <nav className='flex'>
          <div>
            <Logo />
          </div>
          <ul className='flex'>
            {NavItems.map((item) =>
            (
              item.active ? (
                <li key={item.name}>
                  <button onClick={Navigate(item.slug)}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                    {item.name}
                  </button>
                </li>
              ) : (null)
            )
            )}
            {authStatus && (
              <li>
                <Logout />
              </li> )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
