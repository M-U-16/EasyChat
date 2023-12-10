import { Link } from 'react-router-dom'
import "./MenuItem.css"

const MenuItem = ({path, content, icon, title, currentPage}) => {
  
  let currentClass = currentPage ? " current-Page" : ""
  return (
    <Link
      to={path}
      className={`app__menu-link${currentClass}`}
    >
      {content} {icon && <img src={icon} title={title}/>}
    </Link>
  )
}

export default MenuItem
