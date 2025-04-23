import { Button, Spinner } from "react-bootstrap";

export default function ButtonSpinner({
  text,
  icon = null,
  loading = false,
  customDisabled = false,
  variant = "primary",
  type = "button",
  onClick = null,
  classes = "",
}) {
  return (
    <Button
      variant={variant}
      type={type}
      className={classes}
      disabled={customDisabled || loading}
      onClick={onClick}
    >
      {loading ?
        (
          <div style={{ padding: "0.01rem 0" }}>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="me-2"
            />
          </div>
        ) : (
          <>{icon}{text}</>
        )}
    </Button>
  )
}
