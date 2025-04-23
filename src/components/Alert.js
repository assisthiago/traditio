import { Alert as ReactAlert } from "react-bootstrap"
import { CheckCircleFill, ExclamationOctagonFill, ExclamationTriangleFill, InfoCircleFill } from "react-bootstrap-icons"


export default function Alert({ options, setOptions }) {

  const { title, message, variant, show } = options;

  const getIcon = (variant) => {
    switch (variant) {
      case "success":
        return <CheckCircleFill size={20} className="me-2" />
      case "danger":
        return <ExclamationOctagonFill size={20} className="me-2" />
      case "warning":
        return <ExclamationTriangleFill size={20} className="me-2" />
      case "info":
        return <InfoCircleFill size={20} className="me-2" />
      default:
        return null
    }
  }

  return (
    <ReactAlert
      show={show}
      variant={variant}
      className="position-fixed top-0 start-50 translate-middle-x w-90 shadow-lg mt-3" style={{ zIndex: 1050 }}
      onClose={() => setOptions({ ...options, show: false })}
      dismissible
    >
      <ReactAlert.Heading className="fs-6 m-0">{getIcon(variant)}{title}</ReactAlert.Heading>
      <hr className="mb-2" />
      <p className="m-0 d-flex align-items-center">{message}</p>
    </ReactAlert>
  )
}
