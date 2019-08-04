package raspored.app.beans;

import java.util.Date;

public class PredavanjeReportBean {

	private String raspored;
	private String predmet;
	private String sala;
	private String predavac;
	private String tip;
	private String dan;
	private int danRedniBr;
	private Date pocetak;
	private Date kraj;
	private String vreme;
	
	public PredavanjeReportBean() {
		super();
	}
	
	
	
	public String getVreme() {
		return vreme;
	}



	public void setVreme(String vreme) {
		this.vreme = vreme;
	}



	public String getRaspored() {
		return raspored;
	}

	public void setRaspored(String raspored) {
		this.raspored = raspored;
	}

	public String getPredmet() {
		return predmet;
	}
	public void setPredmet(String predmet) {
		this.predmet = predmet;
	}
	public String getSala() {
		return sala;
	}
	public void setSala(String sala) {
		this.sala = sala;
	}
	public String getPredavac() {
		return predavac;
	}
	public void setPredavac(String predavac) {
		this.predavac = predavac;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	public String getDan() {
		return dan;
	}
	public void setDan(String dan) {
		this.dan = dan;
	}
	public int getDanRedniBr() {
		return danRedniBr;
	}
	public void setDanRedniBr(int danRedniBr) {
		this.danRedniBr = danRedniBr;
	}
	public Date getPocetak() {
		return pocetak;
	}
	public void setPocetak(Date pocetak) {
		this.pocetak = pocetak;
	}
	public Date getKraj() {
		return kraj;
	}
	public void setKraj(Date kraj) {
		this.kraj = kraj;
	}
	
}
