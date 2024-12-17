package pl.pw.mvc.accounting;

import java.util.List;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import pl.pw.mvc.dto.InvoiceDTO;
import pl.pw.mvc.dto.PaymentDTO;
import pl.pw.mvc.model.Invoice;
import pl.pw.mvc.model.Payment;

@Stateless
public class PaymentServiceImpl {

	@PersistenceContext(name = "postgres")
	private EntityManager entityManager;

	public List<Payment> getListPayments() {
		return entityManager.createQuery("SELECT p FROM Payment p", Payment.class).getResultList();
	}

	public List<InvoiceDTO> getListInvoices() {
		return entityManager.createQuery("SELECT p FROM Invoice p", Invoice.class).getResultList().stream()
				.map(InvoiceDTO::new).toList();
	}

	public Payment createPayment(PaymentDTO dto) throws Exception {
		Invoice invoice = entityManager.find(Invoice.class, dto.getInvoiceId());
		if (invoice == null) {
			throw new Exception("Invoice not found with ID: " + dto.getInvoiceId());
		}
		Payment payment = new Payment();
		payment.setInvoice(invoice);
		payment.setPaymentDate(dto.getPaymentDate());

		entityManager.persist(payment);
		return payment;
	}
}
