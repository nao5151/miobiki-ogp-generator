import React from 'react'

const defaultProps = {
  g: {
    style: {
      textAnchor: 'middle',
    },
  },

  text: {
    x: "50%",
    y: "48%",
    fontFamily: "Charlemagne",
    fill: "#fff",
  },
}

const Text = (props) => (
  <text {...defaultProps.text} {...props}>{props.value}</text>
)

const TitlePreview = (props) => {
  const { title, fontSize } = props
  const lines = title.split('\n')
  const firstDy = fontSize - ((fontSize / 2) * lines.length)

  const Title = lines.map((text, i) => (
    <Text key={i}
      dy={firstDy + fontSize * i}
      fontSize={fontSize}
      value={text}
    />
  ))
  
  return (
    <g {...defaultProps.g}>
      {Title}
    </g>
  )
}

export default TitlePreview