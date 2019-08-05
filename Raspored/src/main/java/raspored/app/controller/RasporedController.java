package raspored.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import raspored.app.model.Raspored;
import raspored.app.repository.RasporedJPARepo;

@CrossOrigin
@RestController
@RequestMapping(value="/raspored")
public class RasporedController {

	@Autowired
	RasporedJPARepo rasporedJPARepo;
	
	@GetMapping(value="/getAll")
	public List<Raspored> getAllRasporeds() {
		return rasporedJPARepo.getAllByPriority();
	}
	
	@PostMapping(value="/new")
	public Raspored newRaspored(@RequestBody Raspored raspored) {
		return rasporedJPARepo.save(raspored);
	}
	
	@GetMapping(value="/get")
	public Raspored getByID(@RequestParam(name = "id") int id) {
		return rasporedJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Raspored sa ID: " + id + "ne postoji."));
	}
	
	@PutMapping(value="/update")
	public boolean update(@RequestBody Raspored newRaspored) {
		rasporedJPARepo.findById(newRaspored.getRasporedID()).map(raspored -> {
			raspored.setGodina(newRaspored.getGodina());
			raspored.setSmer(newRaspored.getSmer());
			raspored.setNaziv(newRaspored.getNaziv());
			raspored.setPrioritet(newRaspored.getPrioritet());
			return rasporedJPARepo.save(raspored);
		}).orElseGet(() -> rasporedJPARepo.save(newRaspored));
		return true;
	}
	
	@DeleteMapping(value="/delete")
	public boolean delete(@RequestParam(name = "id") int id) {
		rasporedJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Raspored sa ID: " + id + "ne postoji."));
		rasporedJPARepo.deleteById(id);
		return true;
	}
	
}
