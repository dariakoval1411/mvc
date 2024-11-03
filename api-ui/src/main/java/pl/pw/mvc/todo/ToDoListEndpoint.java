package pl.pw.mvc.todo;

import java.util.ArrayList;
import java.util.List;
import pl.pw.mvc.todo.ToDoItemDTO;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/todo")
public class ToDoListEndpoint {

	// JSON

	// Post(path param , get List , update , delete
	@Context
	private HttpServletRequest request;

	private static final String SESSION_TODO_LIST = "todoList";

	private List<ToDoItemDTO> getToDoListFromSession() {
		HttpSession session = request.getSession(); 
		List<ToDoItemDTO> todoList = (List<ToDoItemDTO>) session.getAttribute(SESSION_TODO_LIST);

		if (todoList == null) {
			todoList = new ArrayList<>();
			session.setAttribute(SESSION_TODO_LIST, todoList);
		}
		return todoList;
	}

	private Long generateNewId(List<ToDoItemDTO> todoList) {
		return todoList.stream().mapToLong(ToDoItemDTO::getId).max().orElse(0L) + 1;
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public List<ToDoItemDTO> getToDoList() {
		return getToDoListFromSession();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response addToDoItem(@PathParam("id") Long id, ToDoItemDTO dto) {
		List<ToDoItemDTO> todoList = getToDoListFromSession();
		dto.setId(generateNewId(todoList));
		todoList.add(dto);
		request.getSession().setAttribute(SESSION_TODO_LIST, todoList); 

		return Response.ok(dto).build();
	}

	@DELETE
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response deleteToDoItem(@PathParam("id") Long id) {
		List<ToDoItemDTO> todoList = getToDoListFromSession();
		boolean removed = todoList.removeIf(item -> item.getId().equals(id));
		request.getSession().setAttribute(SESSION_TODO_LIST, todoList);

		if (removed) {
			return Response.ok().build();
		} else {
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	@PUT
	@Path("/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response updateToDoItem(@PathParam("id") Long id, ToDoItemDTO updatedItem) {
		List<ToDoItemDTO> todoList = getToDoListFromSession();

		for (ToDoItemDTO item : todoList) {
			if (item.getId().equals(id)) {
				item.setName(updatedItem.getName());
				item.setDueDate(updatedItem.getDueDate());
				item.setCompleted(updatedItem.isCompleted());
				request.setAttribute(SESSION_TODO_LIST, todoList);
				return Response.ok(item).build();
			}
		}

		return Response.status(Response.Status.NOT_FOUND).build();
	}
}
