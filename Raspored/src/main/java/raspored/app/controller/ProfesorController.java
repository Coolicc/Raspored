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

import raspored.app.model.Profesor;
import raspored.app.repository.ProfesorJPARepo;

@CrossOrigin
@RestController
@RequestMapping(value="/profesor")
public class ProfesorController {

	@Autowired
	ProfesorJPARepo profesorJPARepo;
	
	@GetMapping(value="/getAll")
	public List<Profesor> getAllProfesors() {
		return profesorJPARepo.getAllSorted();
	}
	
	@PostMapping(value="/new")
	public Profesor newProfesor(@RequestBody Profesor profesor) {
		return profesorJPARepo.save(profesor);
	}
	
	@GetMapping(value="/get")
	public Profesor getByID(@RequestParam(name = "id") int id) {
		return profesorJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Profesor sa ID: " + id + "ne postoji."));
	}
	
	@PutMapping(value="/update")
	public boolean update(@RequestBody Profesor newProfesor) {
		profesorJPARepo.findById(newProfesor.getProfesorID()).map(profesor -> {
			profesor.setIme(newProfesor.getIme());
			profesor.setPrezime(newProfesor.getPrezime());
			return profesorJPARepo.save(profesor);
		}).orElseGet(() -> profesorJPARepo.save(newProfesor));
		return true;
	}
	
	@DeleteMapping(value="/delete")
	public boolean delete(@RequestParam(name = "id") int id) {
		profesorJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Profesor sa ID: " + id + "ne postoji."));
		profesorJPARepo.deleteById(id);
		return true;
	}
	
}
