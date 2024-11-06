package util;

import java.util.List;
import java.util.Map;

import jakarta.enterprise.context.Dependent;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

@Dependent
public class QueryBuilder<T> {

	@PersistenceContext
	private EntityManager entityManager;

	public List<T> findEntities(Class<T> entityClass, Map<String, Object> filters, String searchKey, String sortBy,
			boolean ascending, int firstResult, int maxResults) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<T> criteriaQuery = criteriaBuilder.createQuery(entityClass);
		Root<T> root = criteriaQuery.from(entityClass);
		criteriaQuery.select(root);

		Predicate predicate = criteriaBuilder.conjunction();
		for (Map.Entry<String, Object> filter : filters.entrySet()) {
			if (filter.getValue() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get(filter.getKey()), filter.getValue()));
			}
		}
		if (searchKey != null && !searchKey.isEmpty()) {
			predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + searchKey + "%"));
		}
		criteriaQuery.where(predicate);

		if (sortBy != null && !sortBy.isEmpty()) {
		    try {
		        root.get(sortBy); 
		        if (ascending) {
		            criteriaQuery.orderBy(criteriaBuilder.asc(root.get(sortBy)));
		        } else {
		            criteriaQuery.orderBy(criteriaBuilder.desc(root.get(sortBy)));
		        }
		    } catch (IllegalArgumentException e) {
		        throw new IllegalArgumentException("Invalid sortBy field: " + sortBy, e);
		    }
		}
		    
		TypedQuery<T> query = entityManager.createQuery(criteriaQuery);
		query.setFirstResult(firstResult);
		query.setMaxResults(maxResults);

		return query.getResultList();
	}

	public long countEntities(Class<T> entityClass, Map<String, Object> filters, String searchKey) {
		CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
		CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
		Root<T> root = countQuery.from(entityClass);
		countQuery.select(criteriaBuilder.count(root));

		Predicate predicate = criteriaBuilder.conjunction();
		for (Map.Entry<String, Object> filter : filters.entrySet()) {
			if (filter.getValue() != null) {
				predicate = criteriaBuilder.and(predicate,
						criteriaBuilder.equal(root.get(filter.getKey()), filter.getValue()));
			}
		}
		if (searchKey != null && !searchKey.isEmpty()) {
			predicate = criteriaBuilder.and(predicate, criteriaBuilder.like(root.get("name"), "%" + searchKey + "%"));
		}
		countQuery.where(predicate);

		return entityManager.createQuery(countQuery).getSingleResult();
	}

}
