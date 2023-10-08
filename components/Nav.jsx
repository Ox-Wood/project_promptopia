"use client";

import Link from 'next/link'; //this import will allow us to the next page in our application
import Image from 'next/image'; // this import will automatically optimized the images
import { useState, useEffect } from 'react'; // this import will have some interaction from components
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();

  // user session or authentication usign Google Auth
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false)

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setUpProviders();
  }, [])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/images/semi-mmd-blk.png"
          alt='Promtopia Logo'
          width={50}
          height={50}
          className='object-contain'
        />
        <p className='logo_text'>devbyrems</p>
      </Link>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {/* if isuserLoggedIn is true */}
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" className='black_btn'>
              Create Post
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src= {session?.user.image}
                alt='Profile logo'
                width={50}
                height={50}
                className='rounded-full'
              />
            </Link>
          </div>
        ): (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Image
                src= {session?.user.image}
                alt='Profile logo'
                width={50}
                height={50}
                className='rounded-full'
                onClick={() => setToggleDropdown((prev) => !prev)}
              />

              {toggleDropdown && (
                <div className='dropdown'>
                  <Link 
                    href="/profile"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    href="/create-prompt"
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className='mt-5 black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ): (
          <>
            {providers && 
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className='black_btn'
                >
                  Sign In
                </button>
              ))
            }
          </>
        )}
      </div>
    </nav>
  )
}

export default Nav
