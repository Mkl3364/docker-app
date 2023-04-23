const NavBar = () => {
    return (
        <nav className="w-auto h-14 flex justify-between items-center">
            <span className="text-lg font-sans ml-5 uppercase">logo</span>
            <ul className="flex list-none laptop:text-lg laptop:font-semibold tablet:text-xs font-sans uppercase">
                <li className="mr-5 hover:text-[#F7D060] cursor-pointer">
                    login
                </li>
                <li className="hover:text-[#F7D060] cursor-pointer mr-5">
                    register
                </li>
            </ul>
        </nav>
    )
}

export default NavBar