package accounting;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import pl.pw.mvc.accounting.CustomerServiceImpl;
import pl.pw.mvc.dto.CustomerDTO;
import util.ResultPage;

@Path("/ac")
public class AccountingEndpoint {

	private static final Logger LOG = LoggerFactory.getLogger(AccountingEndpoint.class);

	@Inject
	private CustomerServiceImpl customerService;

	@GET
	@Path("/find")
	@Produces(MediaType.APPLICATION_JSON)
	public Response findCustomers(@QueryParam("id") Long id, @QueryParam("city") String city,
			@QueryParam("name") String name, @QueryParam("nip") String nip, @QueryParam("zipCode") String zipCode,
			@DefaultValue("0") @QueryParam("offset") Integer offset,
			@DefaultValue("20") @QueryParam("limit") Integer limit,
			@DefaultValue("-id") @QueryParam("orderBy") String orderBy) {
		try {
			ResultPage<CustomerDTO> resultList = customerService.findCustomers(id, city, name, nip, zipCode, orderBy,
					offset, limit);
			return Response.ok(resultList).build();
		} catch (Exception e) {
			LOG.error("Fetching Customer List failed", e);
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
		}
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteCustomer(@PathParam("id") Long id) {
		try {
			customerService.deleteCustomer(id);
			return Response.noContent().build();
		} catch (Exception e) {
			LOG.error("Deleting Customer failed", e);
			return Response.status(Response.Status.NOT_FOUND).entity("Customer not found or could not be deleted")
					.build();
		}
	}

	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateCustomer(@PathParam("id") Long id, CustomerDTO dto) {
		try {
			customerService.updateCustomer(id, dto);
			return Response.ok().entity("Customer updated successfully").build();
		} catch (Exception e) {
			LOG.error("Updating Customer failed", e);
			return Response.status(Response.Status.NOT_FOUND).entity("Customer not found or could not be updated")
					.build();
		}
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response createCustomer(CustomerDTO dto) {
		try {
			customerService.createCustomer(dto);
			return Response.ok().entity("Customer added successfully").build();
		} catch (Exception e) {
			LOG.error("Adding Customer failed", e);
			return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Failed to add customer").build();
		}
	}
}
