import Container from 'react-bootstrap/Container'
import { useState, useEffect } from 'react'
import ChildCard from './ChildCard'

function ChildContainer({user}){    

//   const kids = user.children

// if (typeof user == "undefined") {
//         return (
        
            
            
//         ) 
//     } else {
//         user.map((child) => {
//             return (
//                 <ChildCard 
//                 key={child.id} 
//                 name={child.name}
//                 dob={child.dob}
//                 gender={child.gender}
//                 notes={child.notes}
//                 pickup={child.pickup}
//                 image={child.image}

//                 />
//                 )
//             })
//     }

// const renderChildren =  user.map((child) => {
//     return (
//         <ChildCard 
//         key={child.id} 
//         name={child.name}
//         dob={child.dob}
//         gender={child.gender}
//         notes={child.notes}
//         pickup={child.pickup}
//         image={child.image}/>)})

console.log(user.children)
// console.log(user.children
    
const renderChildren = (user.acct_type === "Parent" && user.children !== "Undefined") ? 
user.children.map((child) => {
        return (
            <ChildCard 
            key={child.id} 
            name={child.name}
            dob={child.dob}
            gender={child.gender}
            notes={child.notes}
            pickup={child.pickup}
            image={child.image}/>
            )}) : null

{/* <ChildCard user={user}/> */}
// console.log(user)

    return (
    <Container>
        <button>--Add New Child--</button>
    {user ? 
       renderChildren : <h1>please sign in</h1>}
    </Container>
    )
}
export default ChildContainer