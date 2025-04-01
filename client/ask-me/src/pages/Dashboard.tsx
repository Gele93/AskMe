import React from 'react'
import HeaderBar from '../components/HeaderBar'
import DashboardBody from '../components/dashboard-components/DashboardBody'

function Dashboard() {
    return (
        <div className="grid grid-rows-[8vh_4vh_88vh]">
            <section className='flex justify-center items-center w-[90%] mx-auto'>
                <HeaderBar title={"Dashboard"} />
            </section>
            <div></div>
            <section className=''>
                <DashboardBody />
            </section>
        </div>
    )
}

export default Dashboard