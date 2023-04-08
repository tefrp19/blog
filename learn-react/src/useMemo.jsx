import {useEffect, useMemo, useState} from "react";


export default function UseMemoExample() {
    const [count, setCount] = useState(0);
    // 这里useMemo的依赖参数是count，因此count每次变化的时候，useMemo就会跟着变，那么如果第二个参数是一个固定值，或者其他变量的话，useMemo就不会在每次重新render的时候执行了，同理与useCallback
    const initCount = useMemo(() => {
        console.log('执行useMemo');
        return count + 1;
    }, [count]);


    useEffect(() => {
        console.log('执行useEffect');
    }, [count]);

    return (
        <div>
            <p>count {count}</p>
            <p>initCount {initCount}</p>
            <button onClick={() => setCount(count + 1)}>click</button>
        </div>
    )
}
