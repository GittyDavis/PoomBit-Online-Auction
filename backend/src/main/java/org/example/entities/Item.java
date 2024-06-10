package org.example.project00.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Item {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String category;
    private String sellerUser;
    private String picture;

    public Item(String itemName, String itemDescription, String category, String sellerUser, String itemPicture)
    {
        this.name = itemName;
        this.description = itemDescription;
        this.category = category;
        this.sellerUser = sellerUser;
        this.picture = itemPicture;
    }

    public Item() {

    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setItemName(String itemName) {
        this.name = itemName;
    }

    public void setItemDescription(String itemDescription) {
        this.description = itemDescription;
    }

    public void setItemCategory(String itemCategory) {
        this.category = itemCategory;
    }

    public void setSellerUser(String sellerUser) {
        this.sellerUser = sellerUser;
    }

    public void setItemPicture(String itemPicture) {
        this.picture = itemPicture;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public String getSellerUser() {
        return sellerUser;
    }

    public String getPicture() {
        return picture;
    }
}
