package pl.pw.mvc.entity;

import java.io.Serializable;
import jakarta.persistence.*;


/**
 * The persistent class for the example database table.
 * 
 */
@Entity
@NamedQuery(name="Example.findAll", query="SELECT e FROM Example e")
public class Example implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private long id;

	private String name;

	public Example() {
	}

	public long getId() {
		return this.id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

}