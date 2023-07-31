import React from 'react'
import HrAppBar from 'erp/hr/util/HrAppBar'
import BonusRandomBoxExplanation from './BonusRandomBoxExplanation'
import BonusRandomBoxComponent from './BounsRandomBoxComponent.js'
const BonusRandomBoxContainer = () => {

    return (
        <>
            <HrAppBar title='상여금 랜덤박스'/>
            <BonusRandomBoxComponent/>
            <BonusRandomBoxExplanation/>
        </>
    )
}

export default BonusRandomBoxContainer;