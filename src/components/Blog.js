import { useState } from 'react'
import blogService from '../services/blogs'

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
        <button onClick={handleLikeClick}>like</button>
      </div>
      <p>{blog.user.name}</p>
      <button onClick={handleRemove}>remove</button>
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

  const handleLikeClick = (event) => {
    event.preventDefault()
    const updatedBlogObject = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log(blog)
    blogService.update(blog.id, updatedBlogObject)
  }

  const handleRemove = () => {
    // blogService.remove(blog.id)
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