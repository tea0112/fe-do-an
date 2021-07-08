function BasicButton({ type, className, onClick, disabled, children }) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={className}
      onClick={onClick || null}
      disabled={disabled || false}
    >
      {children}
    </button>
  )
}

export default BasicButton
