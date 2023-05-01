import { useRouter } from "next/router";

interface TabsInterface {
    title: string,
    pathName: string
}

const Tabs = ({ title, pathName } : TabsInterface) => {
    const router = useRouter()
    return (
        <div 
            onClick={() => router.push(pathName)}
            className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active"
        >
            {title}
        </div>
    )
}

export default Tabs;