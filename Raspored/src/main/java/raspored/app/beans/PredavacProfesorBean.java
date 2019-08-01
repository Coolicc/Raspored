package raspored.app.beans;

import java.io.Serializable;

import raspored.app.model.Profesor;

public class PredavacProfesorBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int predavacID;
	private Profesor profesor;
	private String tip;
	
	public PredavacProfesorBean() {
		super();
	}
	public int getPredavacID() {
		return predavacID;
	}
	public void setPredavacID(int predavacID) {
		this.predavacID = predavacID;
	}
	public Profesor getProfesor() {
		return profesor;
	}
	public void setProfesor(Profesor profesor) {
		this.profesor = profesor;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	@Override
	public String toString() {
		return "PredavacProfesorBean [predavacID=" + predavacID + ", profesor=" + profesor + ", tip=" + tip + "]";
	}
	
	
	
	
}
