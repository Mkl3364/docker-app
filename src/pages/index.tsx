import Image from "next/image"
import { useRouter } from "next/router"
import { UserSessionStorage } from "./auth/register"
import Alert from "@/components/profile/Alert"
import { useState } from "react"

export default function Home({advice}: any) {
  
  const router = useRouter()
  const [adviceSaved, setAdviceSaved] = useState<boolean>(false)

  const touchReload = () => {
    router.reload()
  }

  const onClickBan = () => {
    router.reload()
  }

  const onClickLike = async (adviceContent: string, adviceId: number) => {
    if (sessionStorage.getItem('user') === null) {
      router.push('/auth/login');
    }
    try {
      const user: UserSessionStorage = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")!) : null
      const response = await fetch("http://localhost:3001/likes", {
        method: "POST",
        body: JSON.stringify({
          id: adviceId,
          userId: user.id,
          content: adviceContent,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAdviceSaved(true)
      const result = await response.json()
      console.log('resultat',result)
    } catch (error) {
      if (error instanceof Error) {
        throw error.message
      }
    }
  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col justify-center items-center w-96 h-96 bg-[#F3E99F] rounded-md'>
          <div className='font-sans font-medium m-2 text-center'>
            {advice.slip.advice}
          </div>
          <div className="flex justify-center gap-4">
            <Image src="/images/svg/ban.svg" height={30} width={30} alt="ban-button" onClick={onClickBan}/>
            <Image src="/images/svg/reload.svg" height={30} width={30} alt="reload-button" onClick={touchReload} className="hover:cursor-pointer"/>
            <Image src="/images/svg/heart.svg" height={30} width={30} alt="like-button" onClick={() => onClickLike(advice.slip.advice, advice.slip.id)} className="hover:cursor-pointer" />
          </div>
        </div>
        { adviceSaved ? <Alert body="Advice saved in profile !" duration={3000} /> : null}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.adviceslip.com/advice')
  const advice = await res.json()

  return {
    props: {
      advice,
    },
  }
}
