package raspored.app.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the ucionica database table.
 * 
 */
@Entity
@NamedQuery(name="Ucionica.findAll", query="SELECT u FROM Ucionica u")
public class Ucionica implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int ucionicaID;

	private String naziv;

	//bi-directional many-to-one association to Predavanje
	@OneToMany(mappedBy="ucionicaBean")
	@JsonIgnore
	private List<Predavanje> predavanjes;

	public Ucionica() {
	}

	public int getUcionicaID() {
		return this.ucionicaID;
	}

	public void setUcionicaID(int ucionicaID) {
		this.ucionicaID = ucionicaID;
	}

	public String getNaziv() {
		return this.naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public List<Predavanje> getPredavanjes() {
		return this.predavanjes;
	}

	public void setPredavanjes(List<Predavanje> predavanjes) {
		this.predavanjes = predavanjes;
	}

	public Predavanje addPredavanje(Predavanje predavanje) {
		getPredavanjes().add(predavanje);
		predavanje.setUcionicaBean(this);

		return predavanje;
	}

	public Predavanje removePredavanje(Predavanje predavanje) {
		getPredavanjes().remove(predavanje);
		predavanje.setUcionicaBean(null);

		return predavanje;
	}

}