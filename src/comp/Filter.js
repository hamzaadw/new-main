import SortIcon from '@mui/icons-material/Sort';

import React from 'react'

function Filter() {
  return (
    <div style={{marginLeft:20, marginTop:30}} className='d-flex  '>

<button className='d-flex'>
      <SortIcon/>
      <h4 className='filter'>Filter</h4>
      </button>
    </div>
  )
}

export default Filter;
