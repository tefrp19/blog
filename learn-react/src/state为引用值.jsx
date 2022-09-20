import {useState} from "react";

export default function Example() {
    const [data, setData] = useState([])


    return <>
        <button onClick={() => {
            data.push(Math.floor(Math.random() * 10))
            // setData(data) // wrong
            setData([...data]) // right
        }
        }>数据+1
        </button>
        <ul>
            {
                data.map((item,index) => <li key={index}>{item}</li>)
            }

        </ul>
    </>
}