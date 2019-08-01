package raspored.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import raspored.app.beans.PredavacBean;
import raspored.app.model.Predavac;
import raspored.app.model.Predmet;
import raspored.app.model.Profesor;
import raspored.app.repository.PredavacJPARepo;
import raspored.app.repository.PredmetJPARepo;
import raspored.app.repository.ProfesorJPARepo;

@RestController
@RequestMapping(value="/predavac")
public class PredavacController {

	@Autowired
	PredavacJPARepo predavacJPARepo;
	
	@Autowired
	ProfesorJPARepo profesorJPARepo;
	
	@Autowired
	PredmetJPARepo predmetJPARepo;
	
	@GetMapping(value="/getAll")
	public List<Predavac> getAllPredavacs() {
		return predavacJPARepo.findAll();
	}
	
	@PostMapping(value="/new")
	public boolean newPredavac(@RequestBody PredavacBean predavacBean) {
		Predavac predavac = new Predavac();
		Profesor profesor = profesorJPARepo.findById(predavacBean.getProfesorID()).orElseThrow(() -> new NotFoundException(""
				+ "Profesor sa ID: " + predavacBean.getProfesorID() + "ne postoji."));
		Predmet predmet = predmetJPARepo.findById(predavacBean.getPredmetID()).orElseThrow(() -> new NotFoundException(""
				+ "Predmet sa ID: " + predavacBean.getPredmetID() + "ne postoji."));
		predavac.setTip(predavacBean.getTip());
		predavac.setPredmetBean(predmet);
		predavac.setProfesorBean(profesor);
		predavacJPARepo.save(predavac);
		return true;
	}
	
	@GetMapping(value="/get")
	public Predavac getByID(@RequestParam(name = "id") int id) {
		return predavacJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Predavac sa ID: " + id + "ne postoji."));
	}
	
	@PutMapping(value="/update")
	public boolean update(@RequestBody PredavacBean newPredavacBean) {
		predavacJPARepo.findById(newPredavacBean.getPredavacID()).map(predavac -> {
			Profesor profesor = profesorJPARepo.findById(newPredavacBean.getProfesorID()).orElseThrow(() -> new NotFoundException(""
					+ "Profesor sa ID: " + newPredavacBean.getProfesorID() + "ne postoji."));
			Predmet predmet = predmetJPARepo.findById(newPredavacBean.getPredmetID()).orElseThrow(() -> new NotFoundException(""
					+ "Predmet sa ID: " + newPredavacBean.getPredmetID() + "ne postoji."));
			predavac.setTip(newPredavacBean.getTip());
			predavac.setPredmetBean(predmet);
			predavac.setProfesorBean(profesor);
			return predavacJPARepo.save(predavac);
		}).orElseGet(() -> {
			Predavac predavac = new Predavac();
			Profesor profesor = profesorJPARepo.findById(newPredavacBean.getProfesorID()).orElseThrow(() -> new NotFoundException(""
					+ "Profesor sa ID: " + newPredavacBean.getProfesorID() + "ne postoji."));
			Predmet predmet = predmetJPARepo.findById(newPredavacBean.getPredmetID()).orElseThrow(() -> new NotFoundException(""
					+ "Predmet sa ID: " + newPredavacBean.getPredmetID() + "ne postoji."));
			predavac.setTip(newPredavacBean.getTip());
			predavac.setPredmetBean(predmet);
			predavac.setProfesorBean(profesor);
			return predavacJPARepo.save(predavac);
		});
		return true;
	}
	
	@DeleteMapping(value="/delete")
	public boolean delete(@RequestParam(name = "id") int id) {
		predavacJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Predavac sa ID: " + id + "ne postoji."));
		predavacJPARepo.deleteById(id);
		return true;
	}
	
}
