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

import raspored.app.model.Predavanje;
import raspored.app.repository.PredavanjeJPARepo;

@CrossOrigin
@RestController
@RequestMapping(value="/predavanje")
public class PredavanjeController {

	@Autowired
	PredavanjeJPARepo predavanjeJPARepo;
	
	@GetMapping(value="/getAll")
	public List<Predavanje> getAllPredavanjes() {
		return predavanjeJPARepo.findAll();
	}
	
	@GetMapping(value="/getAllFor")
	public List<Predavanje> getAllPredavanjesForSchedule(@RequestParam(name = "id") int id) {
		return predavanjeJPARepo.getPredavanjesForSchedule(id);
	}
	
	@PostMapping(value="/new")
	public Predavanje newPredavanje(@RequestBody Predavanje predavanje) {
		if (!predavanjeJPARepo.getOverlappingPredavanjas(predavanje.getOd(),
				predavanje.getDo_(), predavanje.getPredavacBean().getProfesorBean(),
				predavanje.getUcionicaBean(), 0)
				.isEmpty()) {
			throw new OverlapException("Profesor ili učionica se preklapaju u"
					+ " tom terminu.");
		}
		return predavanjeJPARepo.save(predavanje);
	}
	
	@GetMapping(value="/get")
	public Predavanje getByID(@RequestParam(name = "id") int id) {
		return predavanjeJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Predavanje sa ID: " + id + "ne postoji."));
	}
	
	@PutMapping(value="/update")
	public boolean update(@RequestBody Predavanje newPredavanje) {
		if (!predavanjeJPARepo.getOverlappingPredavanjas(newPredavanje.getOd(),
				newPredavanje.getDo_(), newPredavanje.getPredavacBean().getProfesorBean(),
				newPredavanje.getUcionicaBean(), newPredavanje.getPredavanjeID())
				.isEmpty()) {
			throw new OverlapException("Profesor ili ucionica se preklapaju u"
					+ " tom terminu.");
		}
		predavanjeJPARepo.findById(newPredavanje.getPredavanjeID()).map(predavanje -> {
			predavanje.setDan(newPredavanje.getDan());
			predavanje.setDo_(newPredavanje.getDo_());
			predavanje.setOd(newPredavanje.getOd());
			predavanje.setPredavacBean(newPredavanje.getPredavacBean());
			predavanje.setRasporedBean(newPredavanje.getRasporedBean());
			predavanje.setTip(newPredavanje.getTip());
			predavanje.setUcionicaBean(newPredavanje.getUcionicaBean());
			return predavanjeJPARepo.save(predavanje);
		}).orElseGet(() -> predavanjeJPARepo.save(newPredavanje));
		return true;
	}
	
	@DeleteMapping(value="/delete")
	public boolean delete(@RequestParam(name = "id") int id) {
		predavanjeJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Predavanje sa ID: " + id + "ne postoji."));
		predavanjeJPARepo.deleteById(id);
		return true;
	}
	
}
