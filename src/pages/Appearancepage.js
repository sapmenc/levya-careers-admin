import React from 'react'
import Appearance from '../components/Appearance';

function Appearancepage() {
    if (localStorage.getItem("auth") === null) {
        window.location.href = "/login";
    }
    return (
        <>
            <Appearance />
        </>
    )
}

export default Appearancepage