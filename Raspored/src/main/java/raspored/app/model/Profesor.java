package raspored.app.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the profesor database table.
 * 
 */
@Entity
@NamedQuery(name="Profesor.findAll", query="SELECT p FROM Profesor p")
public class Profesor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int profesorID;

	private String ime;

	private String prezime;

	//bi-directional many-to-one association to Predavac
	@JsonIgnore
	@OneToMany(mappedBy="profesorBean")
	private List<Predavac> predavacs;

	public Profesor() {
	}

	public int getProfesorID() {
		return this.profesorID;
	}

	public void setProfesorID(int profesorID) {
		this.profesorID = profesorID;
	}

	public String getIme() {
		return this.ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return this.prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public List<Predavac> getPredavacs() {
		return this.predavacs;
	}

	public void setPredavacs(List<Predavac> predavacs) {
		this.predavacs = predavacs;
	}

	public Predavac addPredavac(Predavac predavac) {
		getPredavacs().add(predavac);
		predavac.setProfesorBean(this);

		return predavac;
	}

	public Predavac removePredavac(Predavac predavac) {
		getPredavacs().remove(predavac);
		predavac.setProfesorBean(null);

		return predavac;
	}

}