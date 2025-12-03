package cl.petsonline.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Entity
@Data
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "La categoría es obligatoria")
    private String categoria; // Ej: "Alimento", "Juguetes", "Accesorios"

    @Positive(message = "El precio debe ser mayor a 0")
    private int precio;

    private int stock;

    private String imagenUrl; // Para guardar la URL de la foto
}