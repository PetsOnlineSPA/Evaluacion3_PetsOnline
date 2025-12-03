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

    public List<Mascota> obtenerTodas() {
        return mascotaRepository.findAll();
    }

    public List<Mascota> obtenerMisMascotas(String email) {
        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        return usuario.getMascotas();
    }

    public Mascota guardarMascota(Mascota mascota, String emailUsuario) {
        Usuario usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        
        mascota.setUsuario(usuario); 
        return mascotaRepository.save(mascota);
    }

    public Mascota obtenerPorId(Long id) {
        return mascotaRepository.findById(id).orElse(null);
    }

    public void eliminarMascota(Long id) {
        mascotaRepository.deleteById(id);
    }
}