import { Link } from "react-router-dom"

function NavAlertItem({ time, title, fontawesomeIcon, iconBackground }) {
  return (
    <Link className="dropdown-item d-flex align-items-center" href="#">
      <div className="mr-3">
        <div className={iconBackground}>
          <i className={fontawesomeIcon} />
        </div>
      </div>
      <div>
        <div className="small text-gray-500">{time}</div>
        <span className="font-weight-bold">{title}</span>
      </div>
    </Link>
  )
}

export default NavAlertItem
