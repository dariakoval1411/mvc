package accounting;

import java.util.List;
import java.util.stream.Collectors;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import pl.pw.mvc.accounting.PaymentServiceImpl;
import pl.pw.mvc.dto.PaymentDTO;
import pl.pw.mvc.model.Payment;

@Path("fi")
public class PaymentEndpoint {
	@Inject
	private PaymentServiceImpl paymentService;

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public Response getListPayments() {
		List<Payment> payments = paymentService.getListPayments();
		List<PaymentDTO> paymentDTOs = payments.stream().map(PaymentDTO::new).collect(Collectors.toList());
		return Response.ok(paymentDTOs).build();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response createPayment(PaymentDTO dto) {
		try {
			Payment payment = paymentService.createPayment(dto);
			PaymentDTO paymentNotification = new PaymentDTO(payment);

			PaymentWebSocketEndpoint.broadcast("New payment created: " + paymentNotification.getInvoiceId()
					+ ", Status: " + paymentNotification.getStatus());

			return Response.ok(new PaymentDTO(payment)).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity("Error creating payment: " + e.getMessage()).build();
		}
	}

	@PUT
	@Path("/{paymentId}")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Response updatePayment(@PathParam("paymentId") Long paymentId, PaymentDTO dto) {
		try {
			Payment updatePay = paymentService.updatePayment(paymentId, dto.getStatus());
			PaymentDTO paymentNotification = new PaymentDTO(updatePay);
			PaymentWebSocketEndpoint.broadcast("Payment status updated: ID " + paymentNotification.getId()
					+ ", Status: " + paymentNotification.getStatus());
			return Response.ok(new PaymentDTO(updatePay)).build();
		} catch (Exception e) {
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
					.entity("Error updating payment: " + e.getMessage()).build();
		}
	}
	@GET
	@Path("/invoice")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getListInvoices() {
		return Response.ok(paymentService.getListInvoices()).build();
	}
}
