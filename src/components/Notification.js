const Notification = ({ message }) => {
    if (message === null) {
      return null
    } else if (message === "wrong username or password") {
        return (
            <div className="error">
              {message}
            </div>
          )
    } else {
        return (
            <div className="success">
              {message}
            </div>
          )
    }
  }
  
  export default Notification