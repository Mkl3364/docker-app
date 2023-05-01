import useSession from "@/hooks/useSession";
import { useEffect, useState } from "react";

interface AccountInterface {
    id: number
    userId: number
    content: string
}

const Account = () => {
  const { session } = useSession();
  const [likes, setLikes] = useState<AccountInterface[]>([]);

  const fetchLikes = async (id: number | undefined) => {
    try {
        // if (session?.id === undefined) return
        const response = await fetch(
          `http://localhost:3001/likes/${id}`
        );
        const result = await response.json();
        console.log(result)
        setLikes(result);
      } catch (error) {
        if (error instanceof Error) {
          throw error.message;
        }
      }
  }
  useEffect(() => {
    fetchLikes(16)
  }, []);


  return (
    <div>
      {likes.map((like) => {
        return (
          <div key={1} className="bg-white rounded-lg text-center mx-60 h-32 flex justify-center items-center">
            { like.content }
          </div>
        )
      })}
    </div>
  );
};

export default Account;
