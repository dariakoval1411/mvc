package pl.pw.mvc;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.ws.rs.ext.ContextResolver;
import jakarta.ws.rs.ext.Provider; 

@Provider
public class JacksonModuleLoader implements ContextResolver<ObjectMapper> {

	private final ObjectMapper mapper;

	public JacksonModuleLoader() {
		mapper = new ObjectMapper();
		mapper.findAndRegisterModules();
		mapper.setSerializationInclusion(Include.NON_NULL);
	}

	@Override
	public ObjectMapper getContext(Class<?> type) {
		return mapper;
	}
}