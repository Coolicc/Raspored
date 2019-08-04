package raspored.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import raspored.app.model.Raspored;

public interface RasporedJPARepo extends JpaRepository<Raspored, Integer> {

	@Query("SELECT r FROM Raspored r ORDER BY r.prioritet")
	public List<Raspored> getAllByPriority();
	
}
