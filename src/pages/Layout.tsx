import NavBar from "@/components/NavBar"

interface IChildren {
    children: React.ReactNode
}

const Layout = ({ children } : IChildren) => {
    return (
        <div>
            <NavBar />
            <main>{ children }</main>
        </div>
    )
}

export default Layout