package raspored.app.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;


/**
 * The persistent class for the predavac database table.
 * 
 */
@Entity
@NamedQuery(name="Predavac.findAll", query="SELECT p FROM Predavac p")
public class Predavac implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int predavacID;

	private String tip;

	//bi-directional many-to-one association to Predmet
	@ManyToOne
	@JoinColumn(name="Predmet")
	private Predmet predmetBean;

	//bi-directional many-to-one association to Profesor
	@ManyToOne
	@JoinColumn(name="Profesor")
	private Profesor profesorBean;

	//bi-directional many-to-one association to Predavanje
	@OneToMany(mappedBy="predavacBean")
	@JsonIgnore
	private List<Predavanje> predavanjes;

	public Predavac() {
	}

	public int getPredavacID() {
		return this.predavacID;
	}

	public void setPredavacID(int predavacID) {
		this.predavacID = predavacID;
	}

	public String getTip() {
		return this.tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public Predmet getPredmetBean() {
		return this.predmetBean;
	}

	public void setPredmetBean(Predmet predmetBean) {
		this.predmetBean = predmetBean;
	}

	public Profesor getProfesorBean() {
		return this.profesorBean;
	}

	public void setProfesorBean(Profesor profesorBean) {
		this.profesorBean = profesorBean;
	}

	public List<Predavanje> getPredavanjes() {
		return this.predavanjes;
	}

	public void setPredavanjes(List<Predavanje> predavanjes) {
		this.predavanjes = predavanjes;
	}

	public Predavanje addPredavanje(Predavanje predavanje) {
		getPredavanjes().add(predavanje);
		predavanje.setPredavacBean(this);

		return predavanje;
	}

	public Predavanje removePredavanje(Predavanje predavanje) {
		getPredavanjes().remove(predavanje);
		predavanje.setPredavacBean(null);

		return predavanje;
	}

}