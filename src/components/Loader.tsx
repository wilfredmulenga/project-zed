import * as React from 'react'

type Props = {
  darkSpinner?: boolean
}

const Loader = ({ darkSpinner } : Props) => {
  return (
    <div className="loader-container">
      <div className={`loader ${darkSpinner ? 'dark-spinner' : ''}`}/>
    </div>
  )
}

export default Loader
