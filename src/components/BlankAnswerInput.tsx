import React from 'react';
import { useMemo } from 'react';
import keyword_extractor from 'keyword-extractor';
import { set } from 'date-fns';

type Props = {
    answer: string;
    setBlankAnswer: React.Dispatch<React.SetStateAction<string>>;
}

const BLANKS = '_____';

const BlankAnswerInput = ({answer , setBlankAnswer}: Props) => {

    //might be quite expensive so we don't want to recalculate the keyword of a particular question everytime the component is rendered , so we will use useMemo 
    //useMemo will only re-render/recalculate the keyword when the answer changes 

    const keywords = useMemo(() => {
        const words = keyword_extractor.extract(answer, {
            language: "english",
            remove_digits: true,
            return_changed_case: false,
            remove_duplicates: false,
        });
        const shuffled = words.sort(() => Math.random() - 0.5);         //applied the same technique to shuffle the options in mcq question
        return shuffled.slice(0, 2);                                    //will get 2 main random keywords from the answer

    }, [answer]);


    const answerWithBlanks = React.useMemo(() => {
            return keywords.reduce((acc, keyword) => {
                return acc.replaceAll(keyword, BLANKS);
            }, answer);
    }, [answer, keywords]);

    React.useEffect(() => {
            setBlankAnswer(answerWithBlanks);
    }, [answerWithBlanks, setBlankAnswer]);


  return (
    <div className=' flex justify-start w-full mt-4'>
        <h1 className=' text-xl font-semibold'>
            {answerWithBlanks.split(BLANKS).map((part, index) => {
                return(
                    <React.Fragment key={index}>
                        {part}
                        {index === answerWithBlanks.split(BLANKS).length - 1 ? null : (
                            <input
                                id='user-blank-input'
                                className="text-center border-b-2 border-black dark:border-white w-28 focus:border-2 focus:border-b-4 focus:outline-none"
                                type="text"  
                            />
                        )}
                    </React.Fragment>
                )
            })}
        </h1>
    </div>
  )
}

export default BlankAnswerInput