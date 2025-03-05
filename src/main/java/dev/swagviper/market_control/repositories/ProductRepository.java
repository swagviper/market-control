package dev.swagviper.market_control.repositories;

import dev.swagviper.market_control.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, String> {

    Optional<ProductEntity> findByName(String name);
}
