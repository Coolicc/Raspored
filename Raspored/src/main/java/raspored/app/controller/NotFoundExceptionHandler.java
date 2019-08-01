package raspored.app.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ControllerAdvice
public class NotFoundExceptionHandler {

	@ResponseBody
	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String NotFoundHandler(NotFoundException ex) {
	  return ex.getMessage();
	}
	
	@ResponseBody
	@ExceptionHandler(OverlapException.class)
	@ResponseStatus(HttpStatus.CONFLICT)
	String OverlapHandler(OverlapException ex) {
	  return ex.getMessage();
	}
	
}
