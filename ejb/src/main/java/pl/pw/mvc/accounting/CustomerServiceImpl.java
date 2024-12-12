package pl.pw.mvc.accounting;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import jakarta.ejb.Stateless;
import jakarta.ejb.TransactionAttribute;
import jakarta.ejb.TransactionAttributeType;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import pl.pw.mvc.dto.CustomerDTO;
import pl.pw.mvc.model.Customer;
import pl.pw.mvc.model.Invoice;
import util.QueryBuilder;
import util.ResultPage;

@Stateless
public class CustomerServiceImpl {

	@PersistenceContext(name = "postgres")
	private EntityManager entityManager;

	@Inject
	private QueryBuilder<Customer> queryBuilder;

	public List<Customer> getListCustomers() {
		return entityManager.createNamedQuery("Customer.findAll", Customer.class).getResultList();
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public ResultPage<CustomerDTO> findCustomers(Long id, String city, String name, String nip, String zipCode,
			String orderBy, Integer offset, Integer limit) throws Exception {

		boolean ascending = true;
		if (orderBy != null && orderBy.startsWith("-")) {
			orderBy = orderBy.substring(1);
			ascending = false;
		}

		Map<String, Object> filters = new HashMap<>();
		if (id != null)
			filters.put("id", id);
		if (city != null && !city.isEmpty())
			filters.put("city", city);
		if (name != null && !name.isEmpty())
			filters.put("name", name);
		if (nip != null && !nip.isEmpty())
			filters.put("nip", nip);
		if (zipCode != null && !zipCode.isEmpty())
			filters.put("zipCode", zipCode);

		List<Customer> customerList = queryBuilder.findEntities(Customer.class, filters, null, orderBy, true,
				offset != null ? offset : 0, limit != null ? limit : 20);
		long totalResults = queryBuilder.countEntities(Customer.class, filters, null);

		var result = new ResultPage<>(customerList.stream().map(CustomerDTO::new).collect(Collectors.toList()),
				totalResults);

		return result;
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public void deleteCustomer(Long id) throws Exception {
		Customer customer = entityManager.find(Customer.class, id);
		if (customer != null) {
			entityManager.remove(customer);
		} else {
			throw new Exception("Customer not found with id: " + id);
		}
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public CustomerDTO updateCustomer(Long id, CustomerDTO dto) throws Exception {
		Customer customer = entityManager.find(Customer.class, id);
		if (customer != null) {
			customer.setName(dto.getName());
			customer.setCity(dto.getCity());
			customer.setNip(dto.getNip());
			customer.setZipCode(dto.getZipCode());
			customer.setStreet(dto.getStreet());

			entityManager.merge(customer);
		} else {
			throw new Exception("Customer not found with id: " + dto.getId());
		}
		return dto;
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public CustomerDTO createCustomer(CustomerDTO dto) throws Exception {
		Customer customer = new Customer();
		customer.setName(dto.getName());
		customer.setCity(dto.getCity());
		customer.setNip(dto.getNip());
		customer.setZipCode(dto.getZipCode());
		customer.setStreet(dto.getStreet());

		entityManager.persist(customer);
		dto.setId(customer.getId());
		return dto;
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public Map<Integer, BigDecimal> getSalesByMonth() {
		List<Object[]> results = entityManager.createQuery("SELECT EXTRACT(MONTH FROM i.issueDate), SUM(i.grossPrice) "
				+ "FROM Invoice i GROUP BY EXTRACT(MONTH FROM i.issueDate)", Object[].class).getResultList();

		return results.stream().collect(Collectors.toMap(r -> ((Number) r[0]).intValue(), r -> (BigDecimal) r[1]));
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public Map<String, BigDecimal> getTotalSalesByCustomer() {
		List<Object[]> results = entityManager.createQuery(
				"SELECT c.name, SUM(i.grossPrice) " + "FROM Invoice i JOIN i.customer c " + "GROUP BY c.name",
				Object[].class).getResultList();

		return results.stream().collect(Collectors.toMap(r -> (String) r[0], r -> (BigDecimal) r[1]));
	}
	
	@TransactionAttribute(TransactionAttributeType.REQUIRED)
	public List<Invoice> getInvoicesByCustomerId(Long customerId) {
	    return entityManager.createQuery(
	            "SELECT i FROM Invoice i WHERE i.customer.id = :customerId", Invoice.class)
	        .setParameter("customerId", customerId)
	        .getResultList();
	}
}
