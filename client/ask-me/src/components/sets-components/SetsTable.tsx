import React, { Dispatch, SetStateAction, useState } from 'react'
import { Set } from '../../types/types'
import { CiEdit } from 'react-icons/ci'

function SetsTable({ sets, setEditSet }: { sets: Set[] | null, setEditSet: Dispatch<SetStateAction<Set | null>> }) {
    const [hoverId, setHoverId] = useState<number>(0)

    return (
        <table className="w-[80%] mx-auto bg-secondary text-left">
            <thead className='bg-primary'>
                <tr className=''>
                    <th className='p-2 rounded-tl-3xl'>Name</th>
                    <th className='p-2'>Description</th>
                    <th className='p-2 rounded-tr-3xl'>Themes</th>
                </tr>
            </thead>
            <tbody >
                {sets?.map(s => (
                    <tr
                        key={s.id}
                        className='bg-secondary w-full cursor-pointer transform hover:bg-primary hover:scale-102 transition duration-300 ease-in-out'
                        onMouseOver={() => setHoverId(s.id)}
                        onClick={() => setEditSet(s)}>
                        <td className='p-1 '>{s.name}</td>
                        <td className='p-1 '>{s.description}</td>
                        <td className='p-1 '>
                            <div className='flex justify-between items-center '>
                                <p >{s.themes.length}</p>
                                {hoverId === s.id &&
                                    <CiEdit className='text-[2rem]' />
                                }
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>)
}

export default SetsTable