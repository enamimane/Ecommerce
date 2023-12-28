package com.back.shopback.Controlleur;

import com.back.shopback.Entity.Panier;
import com.back.shopback.Entity.Produit;
import com.back.shopback.Service.PanierService;
import com.back.shopback.Service.ProduitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
public class PanierControlleur {
    @Autowired
    PanierService panierService;

    @PostMapping("/api/panier/add")
    public int addPanier(@RequestBody Panier panier) {
        // Vérifiez si un panier existe déjà
        List<Panier> paniers = panierService.getAllPanier();
        if (paniers.isEmpty()) {
            // Si aucun panier n'existe, créez-en un nouveau
            return panierService.addPanier(panier);
        } else {
            // S'il existe un panier, retournez l'ID du premier panier (vous pouvez ajuster cela en fonction de votre logique)
            return paniers.get(0).getId();
        }
    }


    @PutMapping("/api/panier/update/{id}")

    public void updatepanier(@RequestBody Panier panier) {
        panierService.updatePanier(panier);
    }

    @DeleteMapping("/api/panier/delete/{id}")

    public void deletepanier(@PathVariable Integer id) {
        panierService.deletePanier(id);
    }

    @GetMapping("/api/panier/Allpaniers")

    public List<Panier> getAllpanier() {
        return panierService.getAllPanier();
    }

    @GetMapping("/api/panier/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')")
    public Optional<Panier> getpanierById(@PathVariable Integer id) {
        return panierService.getPanierById(id);
    }
}
