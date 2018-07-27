import React from 'react'
import classNames from 'classnames'

import './Guide.css'

const Guide = (props) => {
  const guideClass = classNames({
    'guide': true,
    'guide--visible': props.show
  })

  return (
    <div className={guideClass}>
      <div className="guide__line guide__line--x"></div>
      <div className="guide__line guide__line--y"></div>
      <div className="guide__line guide__line--rect"></div>
    </div>
  )
}

export default Guide