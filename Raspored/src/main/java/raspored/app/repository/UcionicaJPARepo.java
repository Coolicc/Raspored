package raspored.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import raspored.app.model.Ucionica;

public interface UcionicaJPARepo extends JpaRepository<Ucionica, Integer> {

	@Query("SELECT u FROM Ucionica u ORDER BY u.naziv")
	public List<Ucionica> getAllSorted();
	
}
