package raspored.app.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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

import raspored.app.beans.PredavacProfesorBean;
import raspored.app.beans.PredmetBean;
import raspored.app.model.Predavac;
import raspored.app.model.Predmet;
import raspored.app.model.Profesor;
import raspored.app.repository.PredavacJPARepo;
import raspored.app.repository.PredmetJPARepo;
import raspored.app.repository.ProfesorJPARepo;

@CrossOrigin
@RestController
@RequestMapping(value="/predmet")
public class PredmetController {

	@Autowired
	PredmetJPARepo predmetJPARepo;
	
	@Autowired
	PredavacJPARepo predavacJPARepo;
	
	@Autowired
	ProfesorJPARepo profesorJPARepo;
	
	@GetMapping(value="/getAll")
	public List<Predmet> getAllPredmets() {
		return predmetJPARepo.findAll();
	}
	
	@PostMapping(value="/new")
	public Predmet newPredmet(@RequestBody Predmet predmet) {
		return predmetJPARepo.save(predmet);
	}
	
	@GetMapping(value="/get")
	public Predmet getByID(@RequestParam(name = "id") int id) {
		return predmetJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Predmet sa ID: " + id + "ne postoji."));
	}
	
	@PutMapping(value="/update")
	public boolean update(@RequestBody Predmet newPredmet) {
		predmetJPARepo.findById(newPredmet.getPredmetID()).map(predmet -> {
			predmet.setGodina(newPredmet.getGodina());
			predmet.setNaziv(newPredmet.getNaziv());
			predmet.setObavezan(newPredmet.getObavezan());
			return predmetJPARepo.save(predmet);
		}).orElseGet(() -> predmetJPARepo.save(newPredmet));
		return true;
	}
	
	@DeleteMapping(value="/delete")
	public boolean delete(@RequestParam(name = "id") int id) {
		predmetJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Predmet sa ID: " + id + "ne postoji."));
		predmetJPARepo.deleteById(id);
		return true;
	}
	
	@GetMapping(value="/getAllWithPredavacs")
	public List<PredmetBean> getAllPredmetsWithPredavacs() {
		return predmetJPARepo.findAll().stream().map(predmet -> {
			PredmetBean predmetBean = new PredmetBean();
			predmetBean.setPredmetID(predmet.getPredmetID());
			predmetBean.setNaziv(predmet.getNaziv());
			predmetBean.setGodina(predmet.getGodina());
			predmetBean.setObavezan(predmet.getObavezan() == 0 ? false : true);
			predmetBean.setPredavaci(predavacJPARepo.getPredavacsForPredmet(predmet).stream()
					.map(predavac -> {
						PredavacProfesorBean predavacBean = new PredavacProfesorBean();
						predavacBean.setPredavacID(predavac.getPredavacID());
						predavacBean.setProfesor(predavac.getProfesorBean());
						predavacBean.setTip(predavac.getTip());
						return predavacBean;
					}).collect(Collectors.toList()));
			return predmetBean;
		}).collect(Collectors.toList());
	}
	
	@PostMapping(value="/newWithPredavacs")
	public PredmetBean newPredmetWithPredavacs(@RequestBody PredmetBean predmetBean) {
		System.out.println(predmetBean);
		Predmet predmet = new Predmet();
		predmet.setNaziv(predmetBean.getNaziv());
		predmet.setGodina(predmetBean.getGodina());
		predmet.setObavezan((byte) (predmetBean.isObavezan() ? 1 : 0));
		Predmet savedPredmet = predmetJPARepo.save(predmet);
		predmetBean.getPredavaci().stream().map((predavacBean) -> {
			Predavac predavac = new Predavac();
			Profesor profesor = profesorJPARepo.findById(predavacBean.getProfesor().getProfesorID())
					.orElseThrow(() -> new NotFoundException("Profesor sa ID: "
					+ predavacBean.getProfesor().getProfesorID() + "ne postoji."));
			predavac.setPredmetBean(savedPredmet);
			predavac.setProfesorBean(profesor);
			predavac.setTip(predavacBean.getTip());
			return predavac;
		}).forEach(x -> predavacJPARepo.save(x));
		
		PredmetBean retPredmetBean = new PredmetBean();
		retPredmetBean.setPredmetID(savedPredmet.getPredmetID());
		retPredmetBean.setNaziv(savedPredmet.getNaziv());
		retPredmetBean.setGodina(savedPredmet.getGodina());
		retPredmetBean.setObavezan(savedPredmet.getObavezan() == 0 ? false : true);
		retPredmetBean.setPredavaci(predavacJPARepo.getPredavacsForPredmet(savedPredmet).stream()
				.map(predavac -> {
					PredavacProfesorBean predavacBean = new PredavacProfesorBean();
					predavacBean.setPredavacID(predavac.getPredavacID());
					predavacBean.setProfesor(predavac.getProfesorBean());
					predavacBean.setTip(predavac.getTip());
					return predavacBean;
				}).collect(Collectors.toList()));
		return retPredmetBean;
	}
	
	@GetMapping(value="/getWithPredavacs")
	public PredmetBean getByIDWithPredavacs(@RequestParam(name = "id") int id) {
		Predmet predmet = predmetJPARepo.findById(id).orElseThrow(() -> new NotFoundException(""
				+ "Predmet sa ID: " + id + "ne postoji."));
		PredmetBean predmetBean = new PredmetBean();
		predmetBean.setPredmetID(predmet.getPredmetID());
		predmetBean.setNaziv(predmet.getNaziv());
		predmetBean.setGodina(predmet.getGodina());
		predmetBean.setObavezan(predmet.getObavezan() == 0 ? false : true);
		predmetBean.setPredavaci(predavacJPARepo.getPredavacsForPredmet(predmet).stream()
				.map(predavac -> {
					PredavacProfesorBean predavacBean = new PredavacProfesorBean();
					predavacBean.setPredavacID(predavac.getPredavacID());
					predavacBean.setProfesor(predavac.getProfesorBean());
					predavacBean.setTip(predavac.getTip());
					return predavacBean;
				}).collect(Collectors.toList()));
		return predmetBean;
	}
	
	@PutMapping(value="/updateWithPredavacs")
	public boolean updateWithPredavacs(@RequestBody PredmetBean newPredmetBean) {
		System.out.println(newPredmetBean);
		Predmet predmet = predmetJPARepo.findById(newPredmetBean.getPredmetID()).orElseThrow(() ->
				new NotFoundException("Profesor sa ID: " + newPredmetBean.getPredmetID()
				+ "ne postoji."));
		predmet.setGodina(newPredmetBean.getGodina());
		predmet.setNaziv(newPredmetBean.getNaziv());
		predmet.setObavezan((byte) (newPredmetBean.isObavezan() ? 1 : 0));
		Predmet savedPredmet = predmetJPARepo.save(predmet);
		newPredmetBean.getPredavaci().stream().map(predavacBean -> {
			Predavac predavac;
			Profesor profesor = profesorJPARepo.findById(predavacBean.getProfesor()
					.getProfesorID()).orElseThrow(() -> new NotFoundException(
							"Profesor sa ID: "+ predavacBean.getProfesor().getProfesorID()
							+ "ne postoji."));
			if (predavacBean.getPredavacID() == 0) {
				predavac = new Predavac();
				predavac.setPredmetBean(savedPredmet);
			} else {
				predavac = predavacJPARepo.findById(predavacBean.getPredavacID())
						.orElseThrow(() -> new NotFoundException("Predavac sa ID: "
				+ predavacBean.getPredavacID() + "ne postoji."));
			}
			predavac.setProfesorBean(profesor);
			predavac.setTip(predavacBean.getTip());
			return predavac;
		}).forEach(x -> predavacJPARepo.save(x));
		return true;
	}
	
}
