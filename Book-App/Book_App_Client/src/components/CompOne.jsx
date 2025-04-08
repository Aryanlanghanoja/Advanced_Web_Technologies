import React from 'react'
import <CompTwo></CompTwo> from "./CompTwo";
const CompOne = ({data}) => {
  return (
    <>
        <div>
            <p>Component - One</p>
            <CompTwo/>
    </div>
    </>
  )
}

export default CompOne
