import { Link } from "react-router-dom"
import NavItem from "../NavItem"
import CollapseLinkItem from "../CollapseLinkItem"

function Sidebar() {
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
            title="Thêm Sinh Viên"
            url="/admin/sinh-vien/them"
          />
          <CollapseLinkItem title="Sửa Sinh Viên" url="/admin/sinh-vien/sua" />
          <CollapseLinkItem title="Xoá Sinh Viên" url="/admin/sinh-vien/xoa" />
        </NavItem>

        <NavItem
          title="Lớp"
          uniqCollapseName="collapseClass"
          fontAwesome="fas fa-users"
        >
          <CollapseLinkItem title="Thêm Lớp" url="/admin/lop/them" />
          <CollapseLinkItem title="Sửa Lớp" url="/admin/lop/sua" />
          <CollapseLinkItem title="Xoá Lớp" url="/admin/lop/xoa" />
        </NavItem>

        <NavItem
          title="Niên Khoá"
          uniqCollapseName="collapseSession"
          fontAwesome="fas fa-address-book"
        >
          <CollapseLinkItem
            title="Thêm Niên Khoá"
            url="/admin/nien-khoa/them"
          />
          <CollapseLinkItem title="Sửa Niên Khoá" url="/admin/nien-khoa/sua" />
          <CollapseLinkItem title="Xoá Niên Khoá" url="/admin/nien-khoa/xoa" />
        </NavItem>

        <NavItem
          title="Thời Khoá Biểu"
          uniqCollapseName="collapseSchedule"
          fontAwesome="fas fa-calendar-alt"
        >
          <CollapseLinkItem
            title="Thêm Thời Khoá Biểu"
            url="/admin/thoi-khoa-bieu/them"
          />
          <CollapseLinkItem
            title="Sửa Thời Khoá Biểu"
            url="/admin/thoi-khoa-bieu/sua"
          />
          <CollapseLinkItem
            title="Xoá Thời Khoá Biểu"
            url="/admin/thoi-khoa-bieu/xoa"
          />
        </NavItem>

        <NavItem
          title="Môn"
          uniqCollapseName="collapseSubject"
          fontAwesome="fas fa-book"
        >
          <CollapseLinkItem title="Thêm Môn" url="/admin/mon/them" />
          <CollapseLinkItem title="Sửa Môn" url="/admin/mon/sua" />
          <CollapseLinkItem title="Xoá Môn" url="/admin/mon/xoa" />
        </NavItem>

        <NavItem
          title="Giảng Viên"
          uniqCollapseName="collapseLecturer"
          fontAwesome="fas fa-chalkboard-teacher"
        >
          <CollapseLinkItem
            title="Thêm Giảng Viên"
            url="/admin/giang-vien/them"
          />
          <CollapseLinkItem
            title="Sửa Giảng Viên"
            url="/admin/giang-vien/sua"
          />
          <CollapseLinkItem
            title="Xoá Giảng Viên"
            url="/admin/giang-vien/xoa"
          />
        </NavItem>

        <NavItem
          title="Học kỳ"
          uniqCollapseName="collapseSemester"
          fontAwesome="fas fa-user-clock"
        >
          <CollapseLinkItem title="Thêm Học kỳ" url="/admin/hoc-ky/them" />
          <CollapseLinkItem title="Sửa Học kỳ" url="/admin/hoc-ky/sua" />
          <CollapseLinkItem title="Xoá Học kỳ" url="/admin/hoc-ky/xoa" />
        </NavItem>

        <NavItem
          title="Khoa"
          uniqCollapseName="collapseDepartment"
          fontAwesome="fas fa-building"
        >
          <CollapseLinkItem title="Thêm Khoa" url="/admin/khoa/them" />
          <CollapseLinkItem title="Sửa Khoa" url="/admin/khoa/sua" />
          <CollapseLinkItem title="Xoá Khoa" url="/admin/khoa/xoa" />
        </NavItem>

        <NavItem
          title="Giảng Đường"
          uniqCollapseName="collapseLectureHall"
          fontAwesome="fas fa-house-user"
        >
          <CollapseLinkItem
            title="Thêm Giảng Đường"
            url="/admin/giang-duong/them"
          />
          <CollapseLinkItem
            title="Sửa Giảng Đường"
            url="/admin/giang-duong/sua"
          />
          <CollapseLinkItem
            title="Xoá Giảng Đường"
            url="/admin/giang-duong/xoa"
          />
        </NavItem>

        <NavItem
          title="Phòng Học"
          uniqCollapseName="collapseClassroom"
          fontAwesome="fas fa-door-open"
        >
          <CollapseLinkItem
            title="Thêm Phòng Học"
            url="/admin/phong-hoc/them"
          />
          <CollapseLinkItem title="Sửa Phòng Học" url="/admin/phong-hoc/sua" />
          <CollapseLinkItem title="Xoá Phòng Học" url="/admin/phong-hoc/xoa" />
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
          />
        </div>
      </ul>
    </>
  )
}

export default Sidebar
