package raspored.app.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the ruser database table.
 * 
 */
@Entity
@NamedQuery(name="Ruser.findAll", query="SELECT r FROM Ruser r")
public class Ruser implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int RUserID;

	private String password;

	private String username;

	public Ruser() {
	}

	public int getRUserID() {
		return this.RUserID;
	}

	public void setRUserID(int RUserID) {
		this.RUserID = RUserID;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

}