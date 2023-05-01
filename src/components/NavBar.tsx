import useSession from "@/hooks/useSession"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const NavBar = () => {
    const router = useRouter()
    const { session } = useSession()
    return (
        <nav className="w-auto h-14 flex justify-between items-center">
            <span className="text-lg font-sans ml-5 uppercase hover:cursor-pointer" onClick={() => router.push('/')}>logo</span>
            { session?.id === null ?
            <ul className="flex list-none laptop:text-lg laptop:font-semibold tablet:text-xs font-sans uppercase">
                <li className="mr-5 hover:text-[#F7D060] cursor-pointer" onClick={() => router.push('/auth/login')}>
                    login
                </li>
                <li className="hover:text-[#F7D060] cursor-pointer mr-5" onClick={() => router.push('/auth/register')}>
                    register
                </li>
            </ul>
            : 
            <ul>
                <li>
                    <Image src="/images/svg/account.svg" alt="profile-img" width={30} height={30} className="mr-5 hover:cursor-pointer" onClick={() => router.push('/account')} />
                </li>
            </ul>
            }
        </nav>
    )
}

export default NavBar