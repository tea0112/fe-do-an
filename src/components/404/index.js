import { Link } from "react-router-dom"

function NotFound() {
  return (
    <>
      <div className="container-fluid">
        <div className="text-center">
          <div className="error mx-auto" data-text="404">
            404
          </div>
          <p className="lead text-gray-800 mb-5">Đường Dẫn Không Tồn Tại</p>
          <button
            className="btn btn-success m-1"
            type="button"
            onClick={() => {
              window.history.back()
            }}
          >
            &larr; Quay Lại
          </button>
          <Link className="btn btn-primary m-1" to="/">
            Trang Chủ &rarr;
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound
