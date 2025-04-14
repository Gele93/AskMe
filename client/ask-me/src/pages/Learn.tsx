import React, { useState } from 'react'
import { LearnSetup, SetToLearn, User } from '../types/types'
import LearnHeader from '../components/learn-components/LearnHeader'

function Learn({ setToLearn, setup, user }: { setToLearn: SetToLearn | null, setup: LearnSetup, user: User | null }) {
    const [questionNumber, setQuestionNumber] = useState<number>(1)

    return (
        <div>
            <LearnHeader setName={setToLearn?.name} username={user?.username} totalQuestions={setup.questions} currentQuestion={questionNumber} />
        </div>
    )
}

export default Learn