package org.example.project00.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class Auction {

    @Id
    @GeneratedValue
    private Long id;
    private Long itemFk;
    private String highestBidder;
    private Double startingPrice;
    private Double currentPrice;
    private Integer itemOffersCount;
    private Date auctionStartDate;
    private Date auctionEndDate;
    private Boolean isClosed;

    public Auction(Long itemFk, String highestBidder, Double startingPrice, Double currentPrice,
                   Integer itemOffersCount, Date auctionStart, Date auctionEnd)
    {
        this.itemFk = itemFk;
        this.highestBidder = highestBidder;
        this.startingPrice = startingPrice;
        this.currentPrice = currentPrice;
        this.itemOffersCount = itemOffersCount;
        this.auctionStartDate = auctionStart;
        this.auctionEndDate = auctionEnd;
        this.isClosed = false;
    }

    public Auction() {

    }


    public Long getId() {
        return id;
    }

    public Long getItemFk() {
        return itemFk;
    }

    public void setItemFk(Long itemFk) {
        this.itemFk = itemFk;
    }

    public String getHighestBidder() {
        return highestBidder;
    }

    public void setHighestBidder(String highestBidder) {
        this.highestBidder = highestBidder;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Double getCurrentPrice() {
        return currentPrice;
    }

    public void setCurrentPrice(Double currentPrice) {
        this.currentPrice = currentPrice;
    }

    public Integer getItemOffersCount() {
        return itemOffersCount;
    }

    public void increaseItemOffersCount() {
        this.itemOffersCount++;
    }

    public Date getAuctionStartDate() {
        return auctionStartDate;
    }

    public void setAuctionStartDate(Date bidStart) {
        this.auctionStartDate = bidStart;
    }

    public Date getAuctionEndDate() {
        return auctionEndDate;
    }

    public void setAuctionEndDate(Date bidEnd) {
        this.auctionEndDate = bidEnd;
    }

    public Boolean getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(Boolean isClosed) {
        this.isClosed = isClosed;
    }

}
