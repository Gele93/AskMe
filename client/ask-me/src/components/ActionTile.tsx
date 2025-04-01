import React from 'react'

function ActionTile({ icon: Icon, title, subTitle }: { icon: React.ComponentType; title: string, subTitle: string }) {
    return (
        <div>
            <Icon />
            <p>{title}</p>
            <p>{subTitle}</p>
        </div>
    );
}

export default ActionTile