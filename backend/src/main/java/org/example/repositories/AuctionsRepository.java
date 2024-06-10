package org.example.project00.repositories;

import org.example.project00.entities.Auction;
import org.springframework.data.repository.CrudRepository;

import java.util.List;


public interface AuctionsRepository extends CrudRepository<Auction, Long>{
    List<Auction> findAuctionsByIsClosedFalse();
    Auction findAuctionByItemFk(java.lang.Long id);
    Auction findAuctionByIsClosedFalseAndItemFk(java.lang.Long id);

}