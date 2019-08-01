package raspored.app.beans;

import java.io.Serializable;

public class PredavacBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int predavacID;
	private String tip;
	private int predmetID;
	private int profesorID;
	
	public PredavacBean() {
		super();
	}

	public int getPredavacID() {
		return predavacID;
	}

	public void setPredavacID(int predavacID) {
		this.predavacID = predavacID;
	}

	public String getTip() {
		return tip;
	}

	public void setTip(String tip) {
		this.tip = tip;
	}

	public int getPredmetID() {
		return predmetID;
	}

	public void setPredmetID(int predmetID) {
		this.predmetID = predmetID;
	}

	public int getProfesorID() {
		return profesorID;
	}

	public void setProfesorID(int profesorID) {
		this.profesorID = profesorID;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
}
