package raspored.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import raspored.app.model.Ruser;

public interface RUserJPARepo extends JpaRepository<Ruser, Integer> {
	
	public Ruser findByUsername(String username);

}
