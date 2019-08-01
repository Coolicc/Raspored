package raspored.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import raspored.app.model.Raspored;

public interface RasporedJPARepo extends JpaRepository<Raspored, Integer> {

}
