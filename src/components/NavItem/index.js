function NavItem({ title, uniqCollapseName, children, fontAwesome }) {
  return (
    <li className="nav-item">
      <a
        className="nav-link collapsed"
        href="#"
        data-toggle="collapse"
        aria-expanded="true"
        data-target={`#${uniqCollapseName}`}
        aria-controls={uniqCollapseName}
        style={{ cursor: "pointer" }}
      >
        <i className={fontAwesome} style={{ width: "20px" }} />
        <span>{title}</span>
      </a>
      <div
        id={uniqCollapseName}
        className="collapse"
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Tuỳ Chọn:</h6>
          {children}
        </div>
      </div>
    </li>
  )
}

export default NavItem
