import { Link } from "react-router-dom"

function CollapseLinkItem({ title, url }) {
  return (
    <Link className="collapse-item" to={url}>
      {title}
    </Link>
  )
}

export default CollapseLinkItem
