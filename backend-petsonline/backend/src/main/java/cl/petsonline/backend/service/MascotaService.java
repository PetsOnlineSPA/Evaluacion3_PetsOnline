package cl.petsonline.backend.service;

import cl.petsonline.backend.model.Mascota;
import cl.petsonline.backend.model.Usuario;
import cl.petsonline.backend.repository.MascotaRepository;
import cl.petsonline.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MascotaService {

    private final MascotaRepository mascotaRepository;
    private final UsuarioRepository usuarioRepository;

    // Obtener todas las mascotas (Admin) o solo las mías (User) - Por ahora traeremos todas
    public List<Mascota> obtenerTodas() {
        return mascotaRepository.findAll();
    }

    // Obtener mascotas de un usuario especifico por su email (que viene del token)
    public List<Mascota> obtenerMisMascotas(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return usuario.getMascotas();
    }

    // Guardar una mascota vinculada al usuario logueado
    public Mascota guardarMascota(Mascota mascota, String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        
        mascota.setUsuario(usuario); // Vinculamos la mascota al dueño
        return mascotaRepository.save(mascota);
    }

    // Obtener una por ID
    public Mascota obtenerPorId(Long id) {
        return mascotaRepository.findById(id).orElse(null);
    }

    // Eliminar mascota
    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }
}