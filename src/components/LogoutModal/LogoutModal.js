import { useDispatch } from "react-redux"
import { logoutSuccessAction } from "../../actions/authenticationAction"

function LogoutModal() {
  const dispatch = useDispatch()
  return (
    <>
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Chắc chắn muốn đăng xuất?
              </h5>
              <button
                className="close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              Nhấn nút đăng xuất nếu bạn muốn kết thúc phiên hiện tại.
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Không
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  document
                    .getElementsByClassName("modal-backdrop fade show")[0]
                    .remove()
                  dispatch(logoutSuccessAction())
                }}
              >
                Đăng Xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogoutModal
