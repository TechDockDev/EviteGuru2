import React from 'react'

const Data = () => {

    const mata = [ 
        {id:"1",name:"nazir",email:"asddf123@gmasil.com"},
        {id:"2",name:"naz",email:"asdf123@gmasil.com"},
        {id:"3",name:"nazi",email:"addf123@gmasil.com"},
        {id:"4",name:"nazip",email:"asdd123@gmasil.com"},
        {id:"5",name:"nazio",email:"asf123@gmasil.com"},
    ]

  return (
    <div>
        {/* <h1>My List</h1> */}
        <ul>
            {mata.map((val) => {
                <li key={val.id}>{val.name}</li>
            })}
        </ul>
    </div>
  )
}

export default Data