package raspored.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import raspored.app.model.Profesor;

public interface ProfesorJPARepo extends JpaRepository<Profesor, Integer> {

	@Query("SELECT p FROM Profesor p ORDER BY p.prezime, p.ime")
	public List<Profesor> getAllSorted();
	
}
