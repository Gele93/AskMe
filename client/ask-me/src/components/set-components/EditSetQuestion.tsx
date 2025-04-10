import React, { Dispatch, SetStateAction, useState } from 'react'
import { Question, Theme } from '../../types/types'
import { MdOutlineDelete } from "react-icons/md";

function EditSetQuestion({ index, question, isEdit, updatedTheme, setUpdatedTheme }
    : { index: number, question: Question, isEdit: boolean, updatedTheme: Theme, setUpdatedTheme: Dispatch<SetStateAction<Theme>> }) {

    const [isHovered, setIsHovered] = useState<boolean>(false)

    const handleDeleteClick = () => {
        let newUpdatedTheme = { ...updatedTheme }
        newUpdatedTheme.questions = newUpdatedTheme.questions.filter(q => q.id !== question.id)
        setUpdatedTheme(newUpdatedTheme)
    }

    return (
        <div key={`q${index}`}
            className={`${isHovered && " text-fail "}`}>
            <div className='flex justify-between items-center ml-5 p-1 bg-gradient-to-r from-primary to-secondary'>
                <p>
                    {question.text}
                </p>
                {isEdit &&
                    <MdOutlineDelete className='cursor-pointer hover:text-fail text-xl'
                        onMouseOver={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => handleDeleteClick()}
                    />
                }
            </div>
            {question?.answers.map((a, i) => (
                <p key={`a${i}`} className='ml-15 font-light'>- {a.text}</p>
            ))}
        </div>
    )
}

export default EditSetQuestion