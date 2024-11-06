package util;

import java.util.List;

public class ResultPage<T> {

	private List<T> elements;
	private long total;

	public ResultPage(List<T> elements, long total) {
        this.elements = elements;
        this.total = total;
    }

	public List<T> getElements() {
		return elements;
	}

	public void setElements(List<T> elements) {
		this.elements = elements;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}
}
