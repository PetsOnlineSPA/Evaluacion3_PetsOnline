package cl.petsonline.backend.repository;

import cl.petsonline.backend.model.Servicio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicioRepository extends JpaRepository<Servicio, Long> {
}