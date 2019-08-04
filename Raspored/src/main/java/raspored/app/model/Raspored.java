package raspored.app.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the raspored database table.
 * 
 */
@Entity
@NamedQuery(name="Raspored.findAll", query="SELECT r FROM Raspored r")
public class Raspored implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int rasporedID;
	
	private String naziv;

	private int godina;

	private String smer;
	
	private int prioritet;

	//bi-directional many-to-one association to Predavanje
	@OneToMany(mappedBy="rasporedBean")
	@JsonIgnore
	private List<Predavanje> predavanjes;

	public Raspored() {
	}
	
	

	public int getPrioritet() {
		return prioritet;
	}



	public void setPrioritet(int prioritet) {
		this.prioritet = prioritet;
	}



	public int getRasporedID() {
		return this.rasporedID;
	}

	public void setRasporedID(int rasporedID) {
		this.rasporedID = rasporedID;
	}

	public int getGodina() {
		return this.godina;
	}

	public void setGodina(int godina) {
		this.godina = godina;
	}

	public String getSmer() {
		return this.smer;
	}

	public void setSmer(String smer) {
		this.smer = smer;
	}

	public List<Predavanje> getPredavanjes() {
		return this.predavanjes;
	}

	public void setPredavanjes(List<Predavanje> predavanjes) {
		this.predavanjes = predavanjes;
	}

	public Predavanje addPredavanje(Predavanje predavanje) {
		getPredavanjes().add(predavanje);
		predavanje.setRasporedBean(this);

		return predavanje;
	}

	public Predavanje removePredavanje(Predavanje predavanje) {
		getPredavanjes().remove(predavanje);
		predavanje.setRasporedBean(null);

		return predavanje;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

}