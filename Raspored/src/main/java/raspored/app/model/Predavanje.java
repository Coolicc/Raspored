package raspored.app.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.Date;


/**
 * The persistent class for the predavanje database table.
 * 
 */
@Entity
@NamedQuery(name="Predavanje.findAll", query="SELECT p FROM Predavanje p")
public class Predavanje implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int predavanjeID;

	private String dan;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name="Do")
	private Date do_;

	@Temporal(TemporalType.TIMESTAMP)
	private Date od;

	private String tip;

	//bi-directional many-to-one association to Predavac
	@ManyToOne
	@JoinColumn(name="Predavac")
	private Predavac predavacBean;

	//bi-directional many-to-one association to Raspored
	@ManyToOne
	@JoinColumn(name="Raspored")
	private Raspored rasporedBean;

	//bi-directional many-to-one association to Ucionica
	@ManyToOne
	@JoinColumn(name="Ucionica")
	private Ucionica ucionicaBean;

	public Predavanje() {
	}

	public int getPredavanjeID() {
		return this.predavanjeID;
	}

	public void setPredavanjeID(int predavanjeID) {
		this.predavanjeID = predavanjeID;
	}

	public String getDan() {
		return this.dan;
	}

	public void setDan(String dan) {
		this.dan = dan;
	}

	public Date getDo_() {
		return this.do_;
	}

	public void setDo_(Date do_) {
		this.do_ = do_;
	}

	public Date getOd() {
		return this.od;
	}

	public void setOd(Date od) {
		this.od = od;
	}

	public String getTip() {
		return this.tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public Predavac getPredavacBean() {
		return this.predavacBean;
	}

	public void setPredavacBean(Predavac predavacBean) {
		this.predavacBean = predavacBean;
	}

	public Raspored getRasporedBean() {
		return this.rasporedBean;
	}

	public void setRasporedBean(Raspored rasporedBean) {
		this.rasporedBean = rasporedBean;
	}

	public Ucionica getUcionicaBean() {
		return this.ucionicaBean;
	}

	public void setUcionicaBean(Ucionica ucionicaBean) {
		this.ucionicaBean = ucionicaBean;
	}

}