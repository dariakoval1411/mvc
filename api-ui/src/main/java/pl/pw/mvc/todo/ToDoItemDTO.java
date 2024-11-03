package pl.pw.mvc.todo;

import java.time.OffsetDateTime;

public class ToDoItemDTO {

	public Long id; 
	
	public String name;
	
	public OffsetDateTime dueDate;
	
	public boolean completed;
	

	public boolean isCompleted() {
		return completed;
	}

	public void setCompleted(boolean completed) {
		this.completed = completed;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public OffsetDateTime getDueDate() {
		return dueDate;
	}

	public void setDueDate(OffsetDateTime dueDate) {
		this.dueDate = dueDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	
}
