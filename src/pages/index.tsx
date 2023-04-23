import Image from "next/image"
import { useRouter } from "next/router"

export default function Home({advice}: any) {
  
  const router = useRouter()

  const touchReload = () => {
    router.reload()
  }

  const onClickBan = () => {

  }

  const onClickLike = () => {

  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col justify-center items-center w-96 h-96 bg-[#F3E99F] rounded-md'>
          <div className='font-sans font-medium m-2 text-center'>
            {advice.slip.advice}
          </div>
          <div className="flex justify-center gap-4">
            <Image src="/images/svg/ban.svg" height={30} width={30} alt="ban-button" onClick={onClickBan}/>
            <Image src="/images/svg/reload.svg" height={30} width={30} alt="reload-button" onClick={touchReload}/>
            <Image src="/images/svg/heart.svg" height={30} width={30} alt="like-button" onClick={onClickLike} />
          </div>
        </div>
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
