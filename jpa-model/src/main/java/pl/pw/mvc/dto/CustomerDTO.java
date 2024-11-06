package pl.pw.mvc.dto;

import java.util.List;
import java.util.stream.Collectors;

import pl.pw.mvc.entity.Customer;
import pl.pw.mvc.entity.Invoice;

public class CustomerDTO {
	private long id;
	private String city;
	private String name;
	private String nip;
	private String street;
	private String zipCode;

	public CustomerDTO(Customer customer) {
		this.id = customer.getId();
		this.city = customer.getCity();
		this.name = customer.getName();
		this.nip = customer.getNip();
		this.street = customer.getStreet();
		this.zipCode = customer.getZipCode();
	}

	public CustomerDTO() {
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNip() {
		return nip;
	}

	public void setNip(String nip) {
		this.nip = nip;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

}