package com.back.shopback.Service;

import com.back.shopback.Entity.Favoris;
import com.back.shopback.Repository.FavorisRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FavorisService {
    private final FavorisRepository FavorisRepository;

    public FavorisService(FavorisRepository FavorisRepository) {
        this.FavorisRepository = FavorisRepository;
    }
    public void addFavoris(Favoris Favoris){
        FavorisRepository.save(Favoris);
    }
    public void updateFavoris(Favoris Favoris){
        FavorisRepository.save(Favoris);
    }
    public void deleteFavoris(Integer id){
        FavorisRepository.deleteById(id);
    }
    public List<Favoris> getAllFavoriss(){
        return FavorisRepository.findAll();
    }
    public Optional<Favoris> getFavorisById(Integer id){
        return FavorisRepository.findById(id);
    }
}

