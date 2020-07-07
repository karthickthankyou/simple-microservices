import React from 'react'

export default ({ comments }) => {
  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{comment.text}</li>
  })

  return <ul>{renderedComments}</ul>
}
