package pl.pw.mvc.dto;

import java.sql.Timestamp;

import pl.pw.mvc.model.Payment;

public class PaymentDTO {
	private Long id;
	private Long invoiceId;
	private Timestamp paymentDate;

	public PaymentDTO(Payment payment) {
		this.id = payment.getId();
		this.invoiceId = payment.getInvoice().getId();
		this.paymentDate = payment.getPaymentDate();
	}

	public PaymentDTO() {
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}

	public Timestamp getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Timestamp paymentDate) {
		this.paymentDate = paymentDate;
	}
}
