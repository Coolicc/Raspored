package raspored.app.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the predmet database table.
 * 
 */
@Entity
@NamedQuery(name="Predmet.findAll", query="SELECT p FROM Predmet p")
public class Predmet implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int predmetID;

	private int godina;

	private String naziv;

	private byte obavezan;

	//bi-directional many-to-one association to Predavac
	@OneToMany(mappedBy="predmetBean")
	@JsonIgnore
	private List<Predavac> predavacs;

	public Predmet() {
	}

	public int getPredmetID() {
		return this.predmetID;
	}

	public void setPredmetID(int predmetID) {
		this.predmetID = predmetID;
	}

	public int getGodina() {
		return this.godina;
	}

	public void setGodina(int godina) {
		this.godina = godina;
	}

	public String getNaziv() {
		return this.naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public byte getObavezan() {
		return this.obavezan;
	}

	public void setObavezan(byte obavezan) {
		this.obavezan = obavezan;
	}

	public List<Predavac> getPredavacs() {
		return this.predavacs;
	}

	public void setPredavacs(List<Predavac> predavacs) {
		this.predavacs = predavacs;
	}

	public Predavac addPredavac(Predavac predavac) {
		getPredavacs().add(predavac);
		predavac.setPredmetBean(this);

		return predavac;
	}

	public Predavac removePredavac(Predavac predavac) {
		getPredavacs().remove(predavac);
		predavac.setPredmetBean(null);

		return predavac;
	}

}