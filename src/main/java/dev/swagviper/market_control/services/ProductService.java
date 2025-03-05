package dev.swagviper.market_control.services;

import dev.swagviper.market_control.entity.ProductEntity;
import dev.swagviper.market_control.exceptions.ProductFoundException;
import dev.swagviper.market_control.exceptions.ProductNotFoundException;
import dev.swagviper.market_control.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public ProductEntity createProduct(ProductEntity productEntity) {
        this.productRepository.findByName(productEntity.getName())
            .ifPresent((product) -> {
                throw new ProductFoundException("Este produto já existe na base de dados.");
            });

        return this.productRepository.save(productEntity);
    }

    public ProductEntity findProductById(Integer id) {
        return this.productRepository.findById(String.valueOf(id))
            .orElseThrow(() -> new ProductNotFoundException("O produto com o id " + id + " não existe na base de dados."));
    }

    public List<ProductEntity> listAllProducts() {
        return this.productRepository.findAll();
    }

}
