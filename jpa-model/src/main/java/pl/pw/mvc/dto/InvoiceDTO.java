package pl.pw.mvc.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;

import pl.pw.mvc.model.Invoice;

public class InvoiceDTO {
	private long id;
	private String invoiceNumber;
	private Timestamp issueDate;
	private Timestamp dueDate;
	private BigDecimal grossPrice;
	private Timestamp paymentDate;
	private String paymentStatus;

	public InvoiceDTO(Invoice invoice) {
		this.id = invoice.getId();
		this.invoiceNumber = invoice.getInvoiceNumber();
		this.issueDate = invoice.getIssueDate();
		this.dueDate = invoice.getDueDate();
		this.grossPrice = invoice.getGrossPrice();
		if (invoice.getPayment() != null) {
			paymentDate = invoice.getPayment().getPaymentDate();
			paymentStatus = "P";
		} else {
			paymentStatus = "U";
		}
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public Timestamp getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Timestamp issueDate) {
		this.issueDate = issueDate;
	}

	public Timestamp getDueDate() {
		return dueDate;
	}

	public void setDueDate(Timestamp dueDate) {
		this.dueDate = dueDate;
	}

	public Timestamp getPaymentDate() {
		return paymentDate;
	}

	public void setPaymentDate(Timestamp paymentDate) {
		this.paymentDate = paymentDate;
	}

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public BigDecimal getGrossPrice() {
		return grossPrice;
	}

	public void setGrossPrice(BigDecimal grossPrice) {
		this.grossPrice = grossPrice;
	}
}
