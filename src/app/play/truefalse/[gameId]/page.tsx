import { getAuthSession } from '@/lib/next-auth'
import { redirect } from 'next/navigation'
import {prisma} from '@/lib/db'
import TrueFalse from '@/components/TrueFalse'

type Props = {
    params:{
        gameId: string
    }
}

const MCQPage = async({params: {gameId}} : Props) => {

    const session = await getAuthSession();
    if(!session?.user) {
        redirect("/")
    }

    const game = await prisma.game.findUnique({               //2:31  , we are getting the game here but how to get the questions array stored in that game
        where: {                                              //for that we will use 'include' in order to get the questions array , a game will have an array of questions and a 'Question' is a table in itself and there is a 1-to-many relationship between 'Game' and 'Question' ,
            id: gameId
        }, 
        include: {
            // questions: true         commenting this out because we don't need to show the answer in the frontend at the time questions is asked, so have to use 'select' to select the fields we want to show
            questions: {
                select: {
                    id: true,
                    question: true,
                    options: true,
                }
            }
        }
    });

    if(!game || game.gameType !== 'truefalse') {
        redirect('/quiz')
    }

  return (
    // <div><pre>{JSON.stringify(game, null, 2)}</pre></div>            
    <div><TrueFalse game={game}/></div>
  )
}

export default MCQPage