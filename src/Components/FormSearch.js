import React, { useRef } from 'react';


import { useGlobalContext } from '../Context'

function FormSearch() {
    const keyWord = useRef('')
    const { setPlayerSearchTerm } = useGlobalContext()

    const handleSearch = () => {
        setPlayerSearchTerm(keyWord.current.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <>
            <form action="" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='e.g. Stephen Curry'
                    ref={keyWord}
                    onChange={handleSearch}
                />
            </form>
        </>
    );
}

export default FormSearch;