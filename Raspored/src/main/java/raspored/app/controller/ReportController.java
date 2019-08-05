package raspored.app.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.util.JRLoader;
import raspored.app.reports.PredavanjeReportDataSource;
import raspored.app.repository.PredavanjeJPARepo;

@CrossOrigin
@RestController
@RequestMapping(value="/export")
public class ReportController {
	
	@Autowired
	PredavanjeJPARepo predavanjeJPARepo;
	
	@GetMapping(value="/getAll", produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<byte[]> getAllReport() {
		byte[] bytes = null;
		JasperReport jasperReport = null;
		try (ByteArrayOutputStream byteArray = new ByteArrayOutputStream()) {
			jasperReport = (JasperReport) JRLoader.loadObject(ResourceUtils.getFile("classpath:jasperreports/rpt_raspored.jasper"));
			PredavanjeReportDataSource dataSource = new PredavanjeReportDataSource(predavanjeJPARepo, 0);
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap<String, Object>(), dataSource.create(null));
			bytes = JasperExportManager.exportReportToPdf(jasperPrint);
		} catch (IOException | JRException e) {
			e.printStackTrace();
		}
		return ResponseEntity
				.ok()
				.header("Content-Type", "application/pdf; charset=UTF-8")
				.header("Content-Disposition", "inline; filename=\"raspored.pdf\"")
			    .body(bytes);
	}
	
	@GetMapping(value="/get", produces = MediaType.APPLICATION_PDF_VALUE)
	public ResponseEntity<byte[]> getReport(@RequestParam(name = "id") int id) {
		byte[] bytes = null;
		JasperReport jasperReport = null;
		try (ByteArrayOutputStream byteArray = new ByteArrayOutputStream()) {
			jasperReport = (JasperReport) JRLoader.loadObject(ResourceUtils.getFile("classpath:jasperreports/rpt_raspored.jasper"));
			PredavanjeReportDataSource dataSource = new PredavanjeReportDataSource(predavanjeJPARepo, id);
			JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, new HashMap<String, Object>(), dataSource.create(null));
			bytes = JasperExportManager.exportReportToPdf(jasperPrint);
		} catch (IOException | JRException e) {
			e.printStackTrace();
		}
		return ResponseEntity
				.ok()
				.header("Content-Type", "application/pdf; charset=UTF-8")
				.header("Content-Disposition", "inline; filename=\"raspored.pdf\"")
			    .body(bytes);
	}

}
