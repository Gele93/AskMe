import React, { Dispatch, SetStateAction, useState } from 'react'
import { ActionType, AnswerType, LearnSetup, LearnStage, Priority, QuestionWithScore } from '../../types/types'
import ActionButton from '../utilities/ActionButton'

function QuestionTile({ currentQuestion, sortedQuestions, setSortedQuestions, sortQuestionsByScore, calculateScore, updateScore, setStage, questionNumber, setQuestionNumber, totalQuestionsNumber }:
    {
        currentQuestion: QuestionWithScore | null,
        sortedQuestions: QuestionWithScore[] | null,
        setSortedQuestions: Dispatch<SetStateAction<QuestionWithScore[] | null>>,
        sortQuestionsByScore: (qs: QuestionWithScore[]) => QuestionWithScore[],
        calculateScore: (priority: Priority, answer: AnswerType) => number,
        updateScore: (answer: AnswerType) => void,
        setStage: Dispatch<SetStateAction<LearnStage>>,
        questionNumber: number, setQuestionNumber: Dispatch<SetStateAction<number>>,
        totalQuestionsNumber: number
    }) {

    const [isAnswerShown, setIsAnswerShown] = useState<boolean>(false)
    const [isHovered, setIsHovered] = useState<boolean>(true)

    const handleAnswer = (answer: AnswerType) => {
        if (currentQuestion) {
            const updatedScore = calculateScore(currentQuestion.priority, answer) + 1

            if (sortedQuestions) {
                let updatedSortedQuestion = [...sortedQuestions]
                updatedSortedQuestion = updatedSortedQuestion.map(q => q.id === currentQuestion.id ? { ...q, score: updatedScore } : q)
                updatedSortedQuestion = sortQuestionsByScore(updatedSortedQuestion)
                setSortedQuestions(updatedSortedQuestion)
            }
        }
    }

    const handleNoIdea = () => {
        handleAnswer(AnswerType.Nothing)
        updateScore(AnswerType.Nothing)
        if (questionNumber + 1 <= totalQuestionsNumber)
            setQuestionNumber(questionNumber + 1)
        setStage(questionNumber < totalQuestionsNumber ? LearnStage.Next : LearnStage.Finish)
    }
    const handleBad = () => {
        handleAnswer(AnswerType.Bad)
        updateScore(AnswerType.Bad)
        if (questionNumber + 1 <= totalQuestionsNumber)
            setQuestionNumber(questionNumber + 1)
        setStage(questionNumber < totalQuestionsNumber ? LearnStage.Next : LearnStage.Finish)
    }
    const handleGood = () => {
        handleAnswer(AnswerType.Good)
        updateScore(AnswerType.Good)
        if (questionNumber + 1 <= totalQuestionsNumber)
            setQuestionNumber(questionNumber + 1)
        setStage(questionNumber < totalQuestionsNumber ? LearnStage.Next : LearnStage.Finish)
    }
    const handlePerfect = () => {
        handleAnswer(AnswerType.Perfect)
        updateScore(AnswerType.Perfect)
        if (questionNumber + 1 <= totalQuestionsNumber)
            setQuestionNumber(questionNumber + 1)
        setStage(questionNumber < totalQuestionsNumber ? LearnStage.Next : LearnStage.Finish)
    }
    const showAnswer = () => {
        setIsAnswerShown(true)
    }

    return (
        <div className={`flip-card w-[40vw] h-[40vh] fade-in-down
            ${!isAnswerShown && "cursor-pointer "}`}
            onMouseOver={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => showAnswer()}
        >
            <div className="flip-card-inner w-full h-full"
                style={{ transform: isAnswerShown ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                <div
                    className={`w-[40vw] h-[40vh] rounded-3xl bg-primary border-6 border-secondary outline-2 outline-primary shadow-xl shadow-gray-600 p-8 flip-card-back`}>
                    <div className='h-full w-full flex flex-col items-center justify-between'>
                        <p className='h-[70%] w-[80%] overflow-y-auto basic-scrollbar'>
                            {currentQuestion?.answers.map(a => (
                                <p>{a.text}</p>
                            ))}
                        </p>
                        <div className='flex w-full items-center justify-evenly'>
                            <ActionButton text={"Terrible"} action={handleNoIdea} actionType={ActionType.Delete} />
                            <ActionButton text={"Bad"} action={handleBad} actionType={ActionType.Edit} />
                            <ActionButton text={"Good"} action={handleGood} actionType={ActionType.Neutral} />
                            <ActionButton text={"Perfect"} action={handlePerfect} actionType={ActionType.Create} />
                        </div>
                    </div>
                </div>
                <div className={`w-[40vw] h-[40vh] rounded-3xl bg-secondary border-6 border-primary outline-2 outline-secondary shadow-xl shadow-gray-600 p-8 flip-card-front`}>
                    <div className='h-full w-full flex flex-col items-center justify-between'
                        style={{
                            backfaceVisibility: 'hidden',
                            pointerEvents: isAnswerShown ? 'none' : 'auto',
                        }}>
                        <p className=''>
                            {currentQuestion?.text}
                        </p>
                        {isHovered &&
                            <button className='w-[100%] text-xl tracking-[3px] cursor-pointer fade-in'>show answer</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionTile