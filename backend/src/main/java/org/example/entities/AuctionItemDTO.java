package org.example.project00.entities;

public class AuctionItemDTO {
    private Long auctionId;
    private Double startingPrice;
    private Double currentPrice;
    private Long itemId;
    private String name;
    private String description;
    private String category;
    private String sellerUser;
    private String auctionStartDate;
    private String auctionEndDate;
    private String highestBidder;
    private Integer itemOffersCount;
    private Boolean isClosed;

    public AuctionItemDTO(Auction auction, Item item) {
        this.auctionId = auction.getId();
        this.startingPrice = auction.getStartingPrice();
        this.currentPrice = auction.getCurrentPrice();
        this.itemId = item.getId();
        this.name = item.getName();
        this.description = item.getDescription();
        this.category = item.getCategory();
        this.sellerUser = item.getSellerUser();
        this.auctionStartDate = auction.getAuctionStartDate().toInstant().toString();
        this.auctionEndDate = auction.getAuctionEndDate().toInstant().toString();
        this.highestBidder = auction.getHighestBidder();
        this.itemOffersCount = auction.getItemOffersCount();
        this.isClosed = auction.getIsClosed();

    }

    public Long getAuctionId() {
        return auctionId;
    }

    public void setAuctionId(Long auctionId) {
        this.auctionId = auctionId;
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

    public Long getItemId() {
        return itemId;
    }

    public void setItemId(Long itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAuctionStartDate() {
        return auctionStartDate;
    }

    public void setAuctionStartDate(String auctionStartDate) {
        this.auctionStartDate = auctionStartDate;
    }

    public String getAuctionEndDate() {
        return auctionEndDate;
    }

    public void setAuctionEndDate(String auctionEndDate) {
        this.auctionEndDate = auctionEndDate;
    }

    public String getHighestBidder() {
        return highestBidder;
    }

    public void setHighestBidder(String highestBidder) {
        this.highestBidder = highestBidder;
    }

    public Integer getItemOffersCount() {
        return itemOffersCount;
    }

    public void setItemOffersCount(Integer itemOffersCount) {
        this.itemOffersCount = itemOffersCount;
    }

    public String getSellerUser() {
        return sellerUser;
    }

    public void setSellerUser(String sellerUser) {
        this.sellerUser = sellerUser;
    }

    public Boolean getIsClosed() {
        return isClosed;
    }

    public void setIsClosed(Boolean closed) {
        isClosed = closed;
    }
}
