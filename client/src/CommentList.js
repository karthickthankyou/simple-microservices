import React from 'react'

export default ({ comments }) => {
  {
    console.log(comments)
  }
  const renderedComments = comments.map(comment => {
    return <li key={comment.id}>{
      comment.status === 'approved' ?
        comment.text
        :
        comment.status === 'pending' ?
          'Approval pending' : 'Comment rejected'
    }</li>
  })

  return <ul>{renderedComments}</ul>
}
