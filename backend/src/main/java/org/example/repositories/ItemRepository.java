package org.example.project00.repositories;

import org.example.project00.entities.Auction;
import org.example.project00.entities.Item;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface ItemRepository extends CrudRepository<Item, Long>{
    Item getItemById(Long id);
    List<Item> findItemsBySellerUser(String Seller);
    List<Item> getItemsByCategory(String category);

}