import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailForm = () => (
    <div>
      <p>{blog.url}</p>
      <div>
        likes {blog.likes}
        <button>like</button>
      </div>
      <p>{blog.user.name}</p>
    </div>
  )

  const handleButtonClick = () => {
    if (buttonText === 'view') {
      setButtonText('hide')
    } else {
      setButtonText('view')
    }
    setShowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={handleButtonClick}>{buttonText}</button>
      {showDetails && detailForm()}
    </div>
  )
}

export default Blog