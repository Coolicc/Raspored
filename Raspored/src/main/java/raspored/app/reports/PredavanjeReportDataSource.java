package raspored.app.reports;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRAbstractBeanDataSourceProvider;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import raspored.app.beans.PredavanjeReportBean;
import raspored.app.model.Predavanje;
import raspored.app.repository.PredavanjeJPARepo;

public class PredavanjeReportDataSource extends JRAbstractBeanDataSourceProvider {

	List<PredavanjeReportBean> predavanjes;
	PredavanjeJPARepo pr;
	int rasporedID;
	
	public PredavanjeReportDataSource(PredavanjeJPARepo pr, int rasporedID) {
		// TODO Auto-generated constructor stub
		super(PredavanjeReportBean.class);
		this.pr = pr;
		this.rasporedID = rasporedID;
	}
	
	@Override
	public JRDataSource create(JasperReport report) throws JRException {
		// TODO Auto-generated method stub
		List<Predavanje> pList = rasporedID == 0 ? pr.getAllPredavanjesForReport() : pr.getPredavanjesForReport(rasporedID);
		predavanjes = new ArrayList<>();
		pList.stream().forEach(p -> {
			PredavanjeReportBean prb = new PredavanjeReportBean();
			prb.setDan(p.getDan());
			prb.setKraj(p.getDo_());
			prb.setPocetak(p.getOd());
			prb.setPredavac(p.getPredavacBean().getProfesorBean().getIme().charAt(0) + ". "
					+ p.getPredavacBean().getProfesorBean().getPrezime());
			prb.setPredmet(p.getPredavacBean().getPredmetBean().getNaziv());
			prb.setRaspored(p.getRasporedBean().getNaziv());
			prb.setSala(p.getUcionicaBean().getNaziv());
			prb.setTip(p.getTip());
			Calendar calendarOd = GregorianCalendar.getInstance(); // creates a new calendar instance
			calendarOd.setTime(p.getOd());
			Calendar calendarDo = GregorianCalendar.getInstance(); // creates a new calendar instance
			calendarDo.setTime(p.getDo_());
			prb.setDanRedniBr(calendarOd.get(Calendar.DAY_OF_MONTH));
			prb.setVreme(calendarOd.get(Calendar.HOUR_OF_DAY) + ":" 
					+ (calendarOd.get(Calendar.MINUTE) == 0 ? calendarOd.get(Calendar.MINUTE) + "0" : calendarOd.get(Calendar.MINUTE)) + " - " 
					+ calendarDo.get(Calendar.HOUR_OF_DAY) + ":" 
					+ (calendarDo.get(Calendar.MINUTE) == 0 ? calendarDo.get(Calendar.MINUTE) + "0" : calendarDo.get(Calendar.MINUTE)));
			predavanjes.add(prb);
		});
		return new JRBeanCollectionDataSource(predavanjes);
	}

	@Override
	public void dispose(JRDataSource dataSource) throws JRException {
		// TODO Auto-generated method stub
		predavanjes = null;
	}

}
