package cl.petsonline.backend.service;

import cl.petsonline.backend.model.Servicio;
import cl.petsonline.backend.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ServicioService {
    private final ServicioRepository repo;

    public List<Servicio> listar() { return repo.findAll(); }
    public Servicio guardar(Servicio s) { return repo.save(s); }
    public void eliminar(Long id) { repo.deleteById(id); }
    public Servicio obtener(Long id) { return repo.findById(id).orElse(null); }
}