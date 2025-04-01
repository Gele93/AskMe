import React from 'react'
import ActionTile from '../ActionTile'

function DashboardBody() {
    return (
        <div className='grid grid-cols-[75vw_20vw] gap-4 auto-rows-auto'>
            <section className='border'>
            <p className='ml-40'>Welcome ProfileName!</p>
            </section>
            <section className='border'>Content for column 2</section>
        </div>
    )
}

export default DashboardBody