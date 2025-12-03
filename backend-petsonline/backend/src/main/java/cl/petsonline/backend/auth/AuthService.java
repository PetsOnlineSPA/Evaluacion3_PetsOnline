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

import java.util.HashMap;
import java.util.Map;

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

        // --- AGREGAMOS EL ROL AL TOKEN ---
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("rol", user.getRol().name());
        
        // Generamos el token con los datos extra
        var jwtToken = jwtService.generateToken(extraClaims, user);
        
        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        // Autenticamos
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // Buscamos al usuario
        var user = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow();

        // --- AGREGAMOS EL ROL AL TOKEN ---
        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("rol", user.getRol().name());

        // Generamos token con datos extra
        var jwtToken = jwtService.generateToken(extraClaims, user);

        return AuthResponse.builder()
                .token(jwtToken)
                .build();
    }
}