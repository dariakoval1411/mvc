package pl.pw.mvc.cc;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/calculate")
public class CalculatorEndpoint {

	@GET
	public Response calculateSum(@QueryParam("number1") int num1, @QueryParam("number2") int num2) {
		int sum = num1 + num2;
		return Response.ok(sum).build();
	}
}