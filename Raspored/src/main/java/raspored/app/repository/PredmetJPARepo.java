package raspored.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import raspored.app.model.Predmet;

public interface PredmetJPARepo extends JpaRepository<Predmet, Integer> {
	
	@Query("SELECT p FROM Predmet p ORDER BY p.naziv")
	public List<Predmet> getAllSorted();

}
