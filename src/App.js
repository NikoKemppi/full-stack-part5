import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Error: wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (execption) {
      setMessage('Error: log out failed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (blogObject, user) => {
    noteFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    returnedBlog.user = {
      id: user.id,
      name: user.name,
      username: user.username,
    }
    console.log('modified blog: ', returnedBlog)
    setBlogs(blogs.concat(returnedBlog))
  }

  /*
  const updateBlog = async (blog) => {
    const updatedBlogObject = {
      user: blog.user._id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const updatedBlog = {
      user: {
        username: blog.user.username,
        name: blog.user.name,
        _id: blog.uset._id,
      },
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      _id: blog.id
    }
    console.log(blog)
    blogService.update(blog.id, updatedBlogObject)
    const updatedBlogs = blogs.map(b => b.id === blog.id ? updatedBlog : b)
    setBlogs(updatedBlogs)
  }

  const deleteBlog = async (blog) => {
    const removedId = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(removedId)
      setBlogs(blogs.filter(b => b.id !== removedId))
    }
  }
  */

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <Togglable buttonLabel1="create new blog" buttonLabel2="cancel" ref={noteFormRef}>
          <BlogForm createBlog={addBlog} setMessage={setMessage} user={user} />
        </Togglable>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} username={user.name} />
        )}
      </div>
    </div>
  )
}

export default App