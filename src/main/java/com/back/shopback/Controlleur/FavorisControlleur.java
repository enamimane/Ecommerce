package com.back.shopback.Controlleur;



import com.back.shopback.Entity.Favoris;
import com.back.shopback.Service.FavorisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FavorisControlleur {
    @Autowired
    FavorisService FavorisService;

    @PostMapping("/api/Favoris/add")

    public void addFavoris(@RequestBody Favoris Favoris) {
        FavorisService.addFavoris(Favoris);
    }

    @PutMapping("/api/Favoris/update/{id}")

    public void updateFavoris(@RequestBody Favoris Favoris) {
        FavorisService.updateFavoris(Favoris);
    }

    @DeleteMapping("/api/Favoris/delete/{id}")

    public void deleteFavoris(@PathVariable Integer id) {
        FavorisService.deleteFavoris(id);
    }

    @GetMapping("/api/Favoris/AllFavoriss")

    public List<Favoris> getAllFavoris() {
        return FavorisService.getAllFavoriss();
    }

    @GetMapping("/api/Favoris/{id}")

    public Optional<Favoris> getFavorisById(@PathVariable Integer id) {
        return FavorisService.getFavorisById(id);
    }
}