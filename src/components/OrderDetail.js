import { Container, Stack } from "react-bootstrap";

export default function Order({ order }) {

  const setPaymentMethod = (paymentMethod) => {
    switch (paymentMethod) {
      case "debit":
        return "débito";
      case "credit":
        return "crédito";
      case "cash":
        return "dinheiro";
      default:
        return "PIX";
    }
  }

  return (
    <Container
      fluid
      className={"bg-body-tertiary p-3 font-monospace small shadow-lg rounded " + (order?.status === "cancelado" ? "text-decoration-line-through" : "")}
    >
      <p className="mb-0">Pedido em {order?.created_at}.</p>
      {order?.delivered_at && (
        <p className="mb-0">Entregue em {order?.delivered_at}.</p>
      )}
      <p className="mb-0">No endereço {order?.address}.</p>
      <p className="mb-0">Pagamento via {setPaymentMethod(order?.payment_method)}.</p>
      <hr />
      <Stack direction="verital" gap={1}>
        {order?.products.map((product, j, row) => (
          <div key={j} className={'mb-' + (j === row.length - 1 ? '0' : '3')}>
            <Stack direction="horizontal" gap={3} className="justify-content-between align-items-start mb-2 fw-bold">
              <p className="mb-0">{product?.quantity}x {product?.name}</p>
              <p className="mb-0">R${product?.price}</p>
            </Stack>
            {product?.additionals.map((additional, k) => (
              <Stack direction="horizontal" gap={3} className="ms-3 justify-content-between align-items-start" key={k}>
                <p className="mb-0">{additional.quantity}x {additional.name}</p>
                <p className="mb-0">R${product?.price}</p>
              </Stack>
            ))}
          </div>
        ))}
      </Stack>
      <hr />
      <p>Observação: {order?.observation}.</p>
      <hr />
      <Stack direction="horizontal" gap={3} className="justify-content-between">
        <p className="mb-0">Entrega</p>
        <p className="mb-0">R${order?.delivery_cost}</p>
      </Stack>
      <Stack direction="horizontal" gap={3} className="justify-content-between">
        <p className="mb-0">Total</p>
        <p className="mb-0">R${order?.total}</p>
      </Stack>
    </Container>
  );
}
