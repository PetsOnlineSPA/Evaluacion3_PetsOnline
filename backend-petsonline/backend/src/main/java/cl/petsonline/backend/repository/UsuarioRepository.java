package cl.petsonline.backend.repository;

import cl.petsonline.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    // Método mágico de JPA para buscar por email (usado para el login)
    Optional<Usuario> findByEmail(String email);
    
    // Para validar si existe antes de registrar
    boolean existsByEmail(String email);
}