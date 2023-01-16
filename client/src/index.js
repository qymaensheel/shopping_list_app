import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'

const App=()=>{

    useEffect(
        ()=>{
            fetch('/shopping_list/hello')
                .then(response=>response.json())
                .then(data=>{console.log(data)
                setMessage(data.message)
                })
                .catch(err=>console.log(err))


        }, []
    )
    const [message, setMessage] = useState('')

    return (
        <div className="barton's app">
            {message}
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));
