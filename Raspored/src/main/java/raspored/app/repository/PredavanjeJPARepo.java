package raspored.app.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import raspored.app.model.Predavanje;
import raspored.app.model.Predmet;
import raspored.app.model.Profesor;
import raspored.app.model.Ucionica;

public interface PredavanjeJPARepo extends JpaRepository<Predavanje, Integer> {

	@Query("SELECT p FROM Predavanje p WHERE (p.predavacBean.profesorBean = :profesor "
			+ "OR p.ucionicaBean = :ucionica) AND p.predavanjeID != :predavanjeID "
			+ "AND :end > p.od AND p.do_ > :start")
	public List<Predavanje> getOverlappingPredavanjas(@Param("start") Date start,
			@Param("end") Date end, @Param("profesor") Profesor profesor, 
			@Param("ucionica") Ucionica ucionica, @Param("predavanjeID") int predavanjeID);
	
	@Query("SELECT p FROM Predavanje p WHERE p.rasporedBean.rasporedID = :scheduleID")
	public List<Predavanje> getPredavanjesForSchedule(@Param("scheduleID") int scheduleID);
	
}
