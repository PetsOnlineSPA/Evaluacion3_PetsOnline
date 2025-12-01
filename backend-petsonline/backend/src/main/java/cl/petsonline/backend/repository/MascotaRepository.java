package cl.petsonline.backend.repository;

import cl.petsonline.backend.model.Mascota;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MascotaRepository extends JpaRepository<Mascota, Long> {
    // Buscar todas las mascotas de un usuario especifico
    List<Mascota> findByUsuarioId(Long usuarioId);
}