import React, { useState } from 'react'
import CreateSetForm from './CreateSetForm'
import CreateSetToolChooser from './CreateSetToolChooser'
import CreateSetPreview from './CreateSetPreview'
import { CreateStage, Set, User } from '../../types/types'
import CreateSet from '../../pages/CreateSet'

function CreateSetBody({ user, useInfoToast }: { user: User | null, useInfoToast: any }) {

    const [stage, setStage] = useState<CreateStage>(CreateStage.Tool)
    const [isFormatedData, setIsFormatedData] = useState<boolean | null>(null)
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [file, setFile] = useState<any | null>(null)
    const [set, setSet] = useState<Set | undefined>(undefined)

    return (
        <div className='flex items-center justify-center w-[80vw] h-[80vh] mx-auto  '>
            {stage === CreateStage.Tool &&
                <CreateSetToolChooser stage={stage} setStage={setStage} user={user} isFormatedData={isFormatedData} setIsFormatedData={setIsFormatedData} />}
            {stage === CreateStage.Details &&
                <CreateSetForm stage={stage} setStage={setStage} name={name} setName={setName} description={description} setDescription={setDescription} file={file} setFile={setFile} isFormatedData={isFormatedData} set={set} setSet={setSet} />}
            {stage === CreateStage.Preview &&
                <CreateSetPreview stage={stage} setStage={setStage} set={set} useInfoToast={useInfoToast}/>}
        </div>
    )
}

export default CreateSetBody