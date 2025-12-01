package cl.petsonline.backend.auth;

import cl.petsonline.backend.model.Rol;
import cl.petsonline.backend.model.Usuario;
import cl.petsonline.backend.repository.UsuarioRepository;
import cl.petsonline.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        // Creamos el usuario
        var user = new Usuario();
        user.setNombre(request.getNombre());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword())); // ¡Password encriptada!
        user.setRol(request.getRol() != null ? request.getRol() : Rol.ROLE_USER); // Por defecto USER

        // Guardamos en BD
        usuarioRepository.save(user);

        // Generamos el token
        var jwtToken = jwtService.generateToken(user);
        
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // Autenticamos (Spring Security hace el trabajo sucio aquí)
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // Si llegamos aquí, el usuario y contraseña son correctos. Buscamos al usuario.
        var user = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow();

        // Generamos token
        var jwtToken = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
}