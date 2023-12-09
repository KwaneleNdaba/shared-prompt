"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";

function Nav() {
  const isUserLoggedIn = true;
  const {data: session} = useSession()//getting the current data of the logged in user

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToogleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log("Provie",response); // Check the response in the console
      setProviders(response);
    };
    setUpProviders();
  }, []);

  const router = useRouter()

  const logout = () => {
    setToogleDropdown(false)
  
    router.push("/")
  }

  return (
    <nav className="flex-between w-full mb-16 pt-13">
      <Link href="/" className="flex gap-2 flex-center/">
        <Image
          src="/assets/images/logo.svg"
          alt="logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Powered Prompt</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gad-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                </>
              ))}
          </>
        )}
      </div>

      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative">
        {session?.user? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              alt="profile"
              onClick={() => setToogleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  onClick={() => setToogleDropdown(false)}
                  href="/profile"
                  className="dropdown_link"
                >
                  My Profile
                </Link>

                <Link
                  onClick={() => setToogleDropdown(false)}
                  href="/profile"
                  className="dropdown_link"
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <>
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="black_btn"
                  >
                    Sign In
                  </button>
                </>
              ))}
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
