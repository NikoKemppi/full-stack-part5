import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [buttonText, setButtonText] = useState('view')
  // refresh trigger is used to force re-rendering the blog
  const [refreshTrigger, setRefreshTrigger] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const detailForm = () => {
    // console.log(blog)
    return (
    <div>
      <p>{blog.url}</p>
      <div>
        likes {blog.likes}
        <button onClick={handleLikeClick}>like</button>
      </div>
      <p>{blog.user.name}</p>
      {username === blog.user.name && <button onClick={handleRemove}>remove</button>}
    </div>)
  }

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
    blog.likes += 1
    const updatedBlogObject = {
      user: blog.user._id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    console.log(blog)
    blogService.update(blog.id, updatedBlogObject)
    setRefreshTrigger(!refreshTrigger)
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    const removedId = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(removedId)
      window.location.reload(false);
    }
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