package raspored.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import raspored.app.model.Predmet;

public interface PredmetJPARepo extends JpaRepository<Predmet, Integer> {

}
