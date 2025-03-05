package dev.swagviper.market_control.controllers;

import dev.swagviper.market_control.dto.ProductDTO;
import dev.swagviper.market_control.entity.ProductEntity;
import dev.swagviper.market_control.repositories.ProductRepository;
import dev.swagviper.market_control.services.ProductService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/")
    public ResponseEntity<Object> createProduct(@RequestBody ProductDTO productDTO) {

        var product = ProductEntity.builder()
            .name(productDTO.name())
            .description(productDTO.description())
            .price(productDTO.price())
            .quantity(productDTO.quantity())
            .category(productDTO.category())
            .createdAt(LocalDateTime.now())
            .build();

        var result = this.productService.createProduct(product);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/")
    public List<ProductEntity> listAllProducts() {
        return this.productService.listAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findById(@PathVariable(value = "id") Integer id) {
        var result = this.productService.findProductById(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateById(@PathVariable(value = "id") Integer id, @RequestBody ProductDTO productDTO) {
        var product = this.productRepository.findById(String.valueOf(id));
        product.get().setUpdatedAt(LocalDateTime.now());

        BeanUtils.copyProperties(productDTO, product.get());
        return ResponseEntity.status(HttpStatus.OK).body(this.productRepository.save(product.get()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable(value = "id") String id) {
        var product = this.productRepository.findById(id);

        this.productRepository.deleteById(String.valueOf(product.get().getId()));
        return ResponseEntity.status(HttpStatus.OK).body("Produto deletado com sucesso");
    }

}
