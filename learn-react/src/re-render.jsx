import {useEffect, useState} from "react";

export default function RerenderExample() {
    const [state, setState] = useState(false)
    console.log('component body')
    useEffect(() => {
        console.log('useEffect')
        setState(!state)
    }, [])
    const fn=()=>{
        console.log('render')
        return 1
    }
    return <div>{fn()}</div>
}