package org.example.project00.repositories;

import org.example.project00.entities.AuctionUser;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<AuctionUser, Long>
{
    AuctionUser findAuctionUserByUserNameAndPassword(String userName, String password);
    AuctionUser findByUserName(String name);
    List<AuctionUser> findAuctionUserByUserName(String name);
    List<AuctionUser> findAuctionUserByLoggedInIsTrue();

}