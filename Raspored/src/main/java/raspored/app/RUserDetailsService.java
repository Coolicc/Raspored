package raspored.app;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import raspored.app.model.Ruser;
import raspored.app.repository.RUserJPARepo;

@Service
public class RUserDetailsService implements UserDetailsService {

	@Autowired
	private RUserJPARepo ruserJPARepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Ruser user = ruserJPARepo.findByUsername(username);
		if (user == null) {	
			throw new UsernameNotFoundException(username);
		}
		ArrayList<GrantedAuthority> authoroty = new ArrayList<GrantedAuthority>();
		authoroty.add(new SimpleGrantedAuthority("User"));
		return new User(user.getUsername(), user.getPassword(), authoroty);
	}

}
