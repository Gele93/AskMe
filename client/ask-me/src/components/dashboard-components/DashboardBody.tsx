import React, { Dispatch, useState } from 'react'
import { Set } from '../../types/types';
import ActionTile from '../ActionTile'
import SetTile from './SetTile';
import { RiFolderAddFill } from "react-icons/ri";
import { AiTwotoneFolderAdd, AiFillFileAdd, AiTwotoneFileAdd, AiOutlineFileAdd } from "react-icons/ai";
import SideBanner from './SideBanner';
import { useNavigate } from 'react-router-dom';
import SetModal from './SetModal';
import { SetStateAction } from 'react';

function DashboardBody({ sets, setSets, useInfoToast, openLearnThisPreset }:
    { sets: Set[] | null, setSets: Dispatch<SetStateAction<Set[] | null>>, useInfoToast: any, openLearnThisPreset: (set: Set | null) => void }) {

    const [clickedSet, setClickedSet] = useState<Set | null>(null)

    const navigate = useNavigate()

    const handleSetCreateClick = () => navigate("/sets/create")
    const handleSetManageClick = () => navigate("/sets")
    const handleThemeCreateClick = () => navigate("/theme/create")
    const handleQuestionCreateClick = () => navigate("/question/create")
    const handleQuestionManageClick = () => navigate("/questions")

    return (
        <>
            <div className='grid grid-cols-[75%_20%] gap-4 auto-rows-auto ml-4'>
                <div className='grid h-[80vh] auto-rows-auto gap-10 overflow-y-scroll basic-scrollbar '>
                    <section className='flex flex-wrap gap-[2%] gap-y-5 w-[90%] mx-auto'>
                        <ActionTile
                            icon={RiFolderAddFill}
                            title='Create Set'
                            subTitle='Create new set from your preformated data, or use the built in AI to format into a set.'
                            action={handleSetCreateClick}
                        />
                        <ActionTile
                            icon={AiTwotoneFolderAdd}
                            title='Manage Sets'
                            subTitle='Modify or update the details of your already created sets.'
                            action={handleSetManageClick}
                        />
                        <ActionTile
                            icon={AiFillFileAdd}
                            title='Add Theme'
                            subTitle='Expand your already created sets with new themes.'
                            action={handleThemeCreateClick}
                        />
                        <ActionTile
                            icon={AiTwotoneFileAdd}
                            title='Create Questions'
                            subTitle='Create new questions in one of your sets/themes manually.'
                            action={handleQuestionCreateClick}
                        />
                        <ActionTile
                            icon={AiOutlineFileAdd}
                            title='Manage Questions'
                            subTitle='Choose a set & theme to manage / update the questions and answers.'
                            action={handleQuestionManageClick}
                        />
                    </section>
                    <div className='border-b-1 w-[80%] mx-auto text-center'>My Sets</div>
                    <section className='flex flex-wrap gap-x-[2%] gap-y-5 w-[90%] mx-auto'>
                        {
                            sets ? sets.map(s => (
                                <SetTile key={s.id} set={s} setClickedSet={setClickedSet} />
                            ))
                                :
                                <div className='set-tile-loader'></div>
                        }
                    </section>
                </div>
                <SideBanner />
            </div>
            {clickedSet !== null &&
                <SetModal set={clickedSet} setClickedSet={setClickedSet} useInfoToast={useInfoToast} setSets={setSets} sets={sets} openLearnThisPreset={openLearnThisPreset} />
            }

        </>
    )
}

export default DashboardBody