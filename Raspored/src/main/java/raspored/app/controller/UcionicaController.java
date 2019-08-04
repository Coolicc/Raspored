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

import raspored.app.model.Ucionica;
import raspored.app.repository.UcionicaJPARepo;

@CrossOrigin
@RestController
@RequestMapping(value="/ucionica")
public class UcionicaController {

	@Autowired
	UcionicaJPARepo ucionicaJPARepo;
	
	@GetMapping(value="/getAll")
	public List<Ucionica> getAllUcionicas() {
		return ucionicaJPARepo.getAllSorted();
	}
	
	@PostMapping(value="/new")
	public Ucionica newUcionica(@RequestBody Ucionica ucionica) {
		return ucionicaJPARepo.save(ucionica);
	}
	
	@GetMapping(value="/get")
	public Ucionica getByID(@RequestParam(name = "id") int id) {
		return ucionicaJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Ucionica sa ID: " + id + "ne postoji."));
	}
	
	@PutMapping(value="/update")
	public boolean update(@RequestBody Ucionica newUcionica) {
		ucionicaJPARepo.findById(newUcionica.getUcionicaID()).map(ucionica -> {
			ucionica.setNaziv(newUcionica.getNaziv());
			return ucionicaJPARepo.save(ucionica);
		}).orElseGet(() -> ucionicaJPARepo.save(newUcionica));
		return true;
	}
	
	@DeleteMapping(value="/delete")
	public boolean delete(@RequestParam(name = "id") int id) {
		ucionicaJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Ucionica sa ID: " + id + "ne postoji."));
		ucionicaJPARepo.deleteById(id);
		return true;
	}
	
}
