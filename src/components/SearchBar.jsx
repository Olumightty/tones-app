import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { search } from '../redux/features/playerSlice'
import { useNavigate } from 'react-router'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchParam, setSearchParam] = useState()
  const { searchTerm } = useSelector(state => state.player)
  const dispatch = useDispatch()
  
  // function autoCompleteSearch(e) {
  //   setSearchParam(e.target.value)
  //   dispatch(search(e.target.value))
    
  //   axios.get(`https://musicautocomplete.deno.dev/search?q=${searchParam}`)
  //   .then((response) => console.log(response.data))
  //   .catch((error) => console.error(error));
  // }
  function handleSearch(e) {
    setSearchParam(e.target.value)
    dispatch(search(e.target.value))
  }

  
  return (
    <>
      <div className='p-4'>
        <div className=' ml-8 flex gap-2 px-4 items-center bg-[#433D8B] w-[540px]' >
            <Search color='#758694' size={20} />
            <input value={searchParam} onChange={handleSearch} onKeyDown={(e) => e.key == 'Enter' && navigate(`/search/${searchParam}`)} className='h-10  rounded-2xl outline-none border-none bg-transparent w-[500px]  justify-self-center  ' type="search" placeholder="'Search anything'" />
        </div>
      </div> 
    </>
  )
}

export default SearchBar