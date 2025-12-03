package cl.petsonline.backend.controller;

import cl.petsonline.backend.model.Mascota;
import cl.petsonline.backend.service.MascotaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/mascotas")
@RequiredArgsConstructor
public class MascotaController {

    private final MascotaService mascotaService;

    @GetMapping
    public ResponseEntity<List<Mascota>> listarMisMascotas(Principal principal) {
        return ResponseEntity.ok(mascotaService.obtenerMisMascotas(principal.getName()));
    }

    @PostMapping
    public ResponseEntity<Mascota> crearMascota(@RequestBody Mascota mascota, Principal principal) {
        return ResponseEntity.ok(mascotaService.guardarMascota(mascota, principal.getName()));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')") 
    public ResponseEntity<Void> eliminarMascota(@PathVariable Long id) {
        mascotaService.eliminarMascota(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Mascota> obtenerPorId(@PathVariable Long id) {
        Mascota mascota = mascotaService.obtenerPorId(id);
        if (mascota != null) {
            return ResponseEntity.ok(mascota);
        }
        return ResponseEntity.notFound().build();
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Mascota> actualizarMascota(@PathVariable Long id, @RequestBody Mascota mascotaActualizada, Principal principal) {
        Mascota mascotaExistente = mascotaService.obtenerPorId(id);
        if (mascotaExistente != null) {
            mascotaExistente.setNombre(mascotaActualizada.getNombre());
            mascotaExistente.setEspecie(mascotaActualizada.getEspecie());
            mascotaExistente.setRaza(mascotaActualizada.getRaza());
            mascotaExistente.setEdad(mascotaActualizada.getEdad());
            mascotaExistente.setPeso(mascotaActualizada.getPeso());
            
            return ResponseEntity.ok(mascotaService.guardarMascota(mascotaExistente, principal.getName()));
        }
        return ResponseEntity.notFound().build();
    }
}