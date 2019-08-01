package raspored.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import raspored.app.model.Predavac;
import raspored.app.model.Predmet;

public interface PredavacJPARepo extends JpaRepository<Predavac, Integer> {

	@Query("SELECT p FROM Predavac p WHERE p.predmetBean = :predmet")
	public List<Predavac> getPredavacsForPredmet(@Param("predmet") Predmet predmet);
	
}
