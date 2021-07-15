import { Link } from "react-router-dom"
import * as $ from "jquery"
import NavItem from "../../NavItem/NavItem"
import CollapseLinkItem from "../../CollapseLinkItem/CollapseLinkItem"

function StudentSidebar() {
  const onSidebarClick = () => {
    const bodyTag = document.querySelector("body")
    const sidebarClass = document.querySelector(".sidebar")

    bodyTag.classList.toggle("sidebar-toggled")
    sidebarClass.classList.toggle("toggled")

    if (sidebarClass.classList.contains("toggled")) {
      document.querySelector(".sidebar.collapse")
    }
    $(".sidebar .collapse").collapse("hide")
  }
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        {/* Sidebar - Brand */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-tools" />
          </div>
          <div className="sidebar-brand-text mx-3">ADMIN</div>
        </Link>

        {/* Divider */}
        <hr className="sidebar-divider my-0" />

        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            <i className="fas fa-tv" />
            <span>Bảng Điều Khiển</span>
          </Link>
        </li>

        {/* Divider */}
        <hr className="sidebar-divider" />

        {/* Heading */}
        <div className="sidebar-heading">Giao Diện</div>
        <NavItem
          title="Sinh Viên"
          uniqCollapseName="collapseStudent"
          fontAwesome="fas fa-graduation-cap"
        >
          <CollapseLinkItem
            title="Thông Tin Cá Nhân"
            url="/sinh-vien/thong-tin-ca-nhan"
          />
        </NavItem>

        <NavItem
          title="Thời Khóa Biểu"
          uniqCollapseName="collapseSchedule"
          fontAwesome="fas fa-calendar-alt"
        >
          <CollapseLinkItem
            title="Thời Khóa Biểu Hiện Tại"
            url="/sinh-vien/thoi-khoa-bieu/hien-tai"
          />
        </NavItem>

        <NavItem
          title="Điểm Thi"
          uniqCollapseName="collapseGrade"
          fontAwesome="fas fa-star-half-alt"
        >
          <CollapseLinkItem
            title="Xem Điểm Thi"
            url="/sinh-vien/diem/diem-thi"
          />
        </NavItem>

        {/* Divider */}
        <hr className="sidebar-divider d-none d-md-block" />

        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="rounded-circle border-0"
            id="sidebarToggle"
            onClick={onSidebarClick}
          />
        </div>
      </ul>
    </>
  )
}

export default StudentSidebar
