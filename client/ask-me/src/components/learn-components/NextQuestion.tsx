import React from 'react'

function NextQuestion({ questionNumber, totalQuestionsNumber }: { questionNumber: number, totalQuestionsNumber: number }) {
    return (
        <div className='h-[15vh] flex flex-col justify-between fade-in-up text-center z-50'>
            <p className='text-4xl '>Question {questionNumber} of {totalQuestionsNumber}</p>
            <p>Click to see the question</p>
        </div>
        )
}

export default NextQuestion