import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AnswerType, LearnSetup, LearnStage, Priority, QuestionWithScore, SetToLearn, SetWithScores, User } from '../types/types'
import LearnHeader from '../components/learn-components/LearnHeader'
import QuestionTile from '../components/learn-components/QuestionTile'
import NextQuestion from '../components/learn-components/NextQuestion'
import Finish from '../components/learn-components/Finish'
import { useNavigate } from 'react-router-dom'
import ConfirmModal from '../components/utilities/ConfirmModal'
import ModalWraper from '../components/utilities/ModalWraper'

function Learn({ setToLearn, setSetToLearn, setup, user }:
    { setToLearn: SetToLearn | null, setSetToLearn: Dispatch<SetStateAction<SetToLearn | null>>, setup: LearnSetup, user: User | null }) {

    const minModifier = 0.7
    const maxModifier = 1.3

    const [questionNumber, setQuestionNumber] = useState<number>(1)
    const [setWithScore, setSetWithScore] = useState<SetWithScores | null>(null)
    const [questions, setQuestions] = useState<QuestionWithScore[] | null>(null)
    const [sortedQuestions, setSortedQuestions] = useState<QuestionWithScore[] | null>(null)
    const [currentQuestion, setCurrentQuestion] = useState<QuestionWithScore | null>(null)
    const [stage, setStage] = useState<LearnStage>(LearnStage.Next)
    const [currentScore, setCurrentScore] = useState<number>(0)
    const [isConfirmExit, setIsConfirmExit] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (setToLearn) {
            let updatedSetWithScores = {
                ...setToLearn,
                themes: setToLearn.themes.map(t => {
                    return {
                        ...t,
                        questions: t.questions.map(q => {
                            return {
                                ...q,
                                score: calculateScore(t.priority, AnswerType.Nothing),
                                priority: t.priority
                            }
                        })
                    }
                })
            }
            setSetWithScore(updatedSetWithScores)
        }
    }, [setToLearn])

    useEffect(() => {
        if (setWithScore) {
            const flatThemes = setWithScore.themes.flat()
            const flatQuestions: QuestionWithScore[] = []
            flatThemes.map(t => flatQuestions.push(...t.questions.flat()))
            setQuestions(flatQuestions)
        }
    }, [setWithScore])

    useEffect(() => {
        if (questions) {
            setSortedQuestions(sortQuestionsByScore(questions))
        }
    }, [questions])

    useEffect(() => {
        if (sortedQuestions) {
            setCurrentQuestion(sortedQuestions[0])
        }
    }, [sortedQuestions])

    const sortQuestionsByScore = (qs: QuestionWithScore[]): QuestionWithScore[] => qs.sort((a, b) => a.score - b.score)

    const calculateScore = (priority: Priority, answer: AnswerType): number => {
        if (answer === AnswerType.Perfect) return 1000
        const modifier = Math.random() * (maxModifier - minModifier) + minModifier
        return modifier * (priority + 1) + answer
    }

    const updateScore = (answer: AnswerType) => {
        let answerScore = 0
        switch (answer) {
            case (AnswerType.Nothing):
                answerScore = 0
                break
            case (AnswerType.Bad):
                answerScore = 25
                break
            case (AnswerType.Good):
                answerScore = 75
                break
            case (AnswerType.Perfect):
                answerScore = 100
                break
            default:
                answerScore = 0
        }

        setCurrentScore(currentScore + answerScore)
    }

    const handleClick = () => {
        if (stage === LearnStage.Next) {
            setStage(LearnStage.Question)
        } else if (stage === LearnStage.Finish) {
            navigate("/dashboard")
        }
    }

    const handleConfirmExit = () => {
        setSetToLearn(null)
        navigate("/dashboard")
    }
    const handleCancelExit = () => {
        setIsConfirmExit(false)
    }

    return (
        <div className='w-[100vw] h-[100vh] absolute top-0 left-0'>
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-cover bg-center backdrop-blur-md filter blur-xs" style={{ backgroundImage: `url('landing-bg.jpg')` }}></div>
            <LearnHeader setName={setToLearn?.name} username={user?.username} totalQuestions={setup.questions} currentQuestion={questionNumber} setIsConfirmExit={setIsConfirmExit} />
            <section
                className="absolute top-0 left-0 w-[100vw] h-[100vh] flex justify-center items-center z-10"
                onClick={() => handleClick()}>
                {stage === LearnStage.Next &&
                    <NextQuestion questionNumber={questionNumber} totalQuestionsNumber={setup.questions} />
                }
                {stage === LearnStage.Question &&
                    <QuestionTile
                        currentQuestion={currentQuestion}
                        sortedQuestions={sortedQuestions}
                        setSortedQuestions={setSortedQuestions}
                        sortQuestionsByScore={sortQuestionsByScore}
                        calculateScore={calculateScore}
                        updateScore={updateScore}
                        setStage={setStage}
                        questionNumber={questionNumber}
                        totalQuestionsNumber={setup.questions}
                        setQuestionNumber={setQuestionNumber}
                    />
                }
                {stage === LearnStage.Finish &&
                    <Finish setup={setup} score={currentScore} />
                }
            </section>
            {isConfirmExit &&
                <ModalWraper>
                    <ConfirmModal title='Exit learning session?' leftText='Exit' leftAction={handleConfirmExit} rightText='Continue' rightAction={handleCancelExit} />
                </ModalWraper>
            }
        </div>
    )
}

export default Learn