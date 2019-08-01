package raspored.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import raspored.app.model.Profesor;

public interface ProfesorJPARepo extends JpaRepository<Profesor, Integer> {

}
