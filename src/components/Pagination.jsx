import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import "./style.css"

const Pagination = () => {

    const [state, setState] = useState([])

    const [perPage, setPerPage] = useState(10)

    const [currentPage, setCurrentPage] = useState(1)

    const indexOfLastPage = currentPage * perPage
    const indexOfFirstPage = indexOfLastPage - perPage

    const visiablePage = state.slice(indexOfFirstPage, indexOfLastPage)

    const noOfTotalPages = Math.ceil(state.length / perPage)
    // how may pages we want to dispaly perpage

    const pages = [...Array(noOfTotalPages + 1).keys()].slice(1)


    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos').then(response => {
            setState(response.data)
        }).catch(err => {
            console.log(err)
        })
    })

    const prevHandle=()=>{
        if(currentPage!==1)
        setCurrentPage(currentPage-1)
    }
    const nextHandle=()=>{
        if(currentPage!==noOfTotalPages)
        setCurrentPage(currentPage+1)
    }


    return (
        <center>
            <h1> Pagination </h1>
            <select onChange={(e)=>setPerPage(e.target.value)}>
        <option value='10'>10</option>
        <option value='30'>30</option>
        <option value='50'>50</option>
      </select>
            {visiablePage.map((ele) => (
                <h3 key={ele.id}>{ele.title}</h3>
            ))}
            <span className='btns' onClick={prevHandle}>Prev</span>
            <h4>{pages.map(ele => <span 
           
            onClick={() =>setCurrentPage(ele)}
            className={`${currentPage===ele ?"active":""}`}
           >{`${ele}  |   `}</span>)}</h4>
            <span className='btns' onClick={nextHandle}>next</span>
        </center>
    )
}

export default Pagination