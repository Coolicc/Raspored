package raspored.app.beans;

import java.io.Serializable;
import java.util.List;

public class PredmetBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private int predmetID;

	private int godina;

	private String naziv;

	private boolean obavezan;
	
	private List<PredavacProfesorBean> predavaci;

	public int getPredmetID() {
		return predmetID;
	}

	public void setPredmetID(int predmetID) {
		this.predmetID = predmetID;
	}

	public int getGodina() {
		return godina;
	}

	public void setGodina(int godina) {
		this.godina = godina;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public boolean isObavezan() {
		return obavezan;
	}

	public void setObavezan(boolean obavezan) {
		this.obavezan = obavezan;
	}

	public List<PredavacProfesorBean> getPredavaci() {
		return predavaci;
	}

	public void setPredavaci(List<PredavacProfesorBean> predavaci) {
		this.predavaci = predavaci;
	}
	
	public PredavacProfesorBean addPredavacProfesorBean(PredavacProfesorBean predavacProfesor) {
		predavaci.add(predavacProfesor);
		return predavacProfesor;
	}
	
	public PredavacProfesorBean removePredavacProfesorBean(PredavacProfesorBean predavacProfesor) {
		predavaci.remove(predavacProfesor);
		return predavacProfesor;
	}

	@Override
	public String toString() {
		return "PredmetBean [predmetID=" + predmetID + ", godina=" + godina + ", naziv=" + naziv + ", obavezan="
				+ obavezan + ", predavaci=" + predavaci + "]";
	}
	
	

}
