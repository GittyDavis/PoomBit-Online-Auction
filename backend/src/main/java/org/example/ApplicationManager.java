package org.example.project00;

import org.example.project00.entities.*;
import org.example.project00.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/auth")
public class ApplicationManager {

    private final AuctionsRepository auctionsRepository;
    private final UserRepository usersRepository;
    private final ItemRepository itemsRepository;

    @Autowired
    public ApplicationManager(AuctionsRepository auctions, UserRepository users,
                              ItemRepository items) {
        this.auctionsRepository = auctions;
        this.usersRepository = users;
        this.itemsRepository = items;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody AuctionUser user) {
        if (usersRepository.findAuctionUserByUserName(user.getUserName()).isEmpty()) {
            usersRepository.save(user);
            return ResponseEntity.ok("Account created");
        } else
            return ResponseEntity.status(409).body("Username already exists!");
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Map<String, String> details) {
        String userName = details.get("userName");
        String password = details.get("password");

        AuctionUser currentUser = usersRepository.findAuctionUserByUserNameAndPassword(userName, password);

        if (currentUser != null) {
            System.out.println("Logged in as: " + currentUser.getUserName());
            currentUser.setLoggedIn(true);
            usersRepository.save(currentUser); // Update the user's logged-in status
            return ResponseEntity.ok("Logged in as: " + currentUser.getUserName());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect details, try again");
        }
    }


    @GetMapping("/browseItems")
    public ResponseEntity<List<AuctionItemDTO>> browseItems() {
        checkDates();
        List<AuctionItemDTO> auctionItemDTOs = new ArrayList<>();
        for (Auction auction : auctionsRepository.findAll()) {
            Item item = itemsRepository.getItemById(auction.getItemFk());
            auctionItemDTOs.add(new AuctionItemDTO(auction, item));
        }
        return new ResponseEntity<>(auctionItemDTOs, HttpStatus.OK);
    }


    @PostMapping("/getItemById")
    private ResponseEntity<Item> viewDetails(@RequestBody Long itemFk) {
        return new ResponseEntity<>(itemsRepository.getItemById(itemFk), HttpStatus.OK);
    }

    @PostMapping("/placebid")
    public ResponseEntity<String> placeBid(@RequestBody Map<String, String > bidRequest) {
        String bidderName = (String)bidRequest.get("userName");
        Long auctionItemId = Long.valueOf(bidRequest.get("auctionItemId"));
        Double newPrice = Double.valueOf(bidRequest.get("newPrice"));

        Auction auction = auctionsRepository.findById(auctionItemId).orElse(null);
        if (auction == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Auction not found");
        }

        //Checking whether the new price is at least 5% higher than the current price:
        if (auction.getCurrentPrice() + auction.getCurrentPrice()/20 > newPrice) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("New price must be greater than current price");
        } else {
            auction.setCurrentPrice(Double.valueOf(newPrice));
            auction.setHighestBidder(bidderName);
            auction.increaseItemOffersCount();
            auctionsRepository.save(auction);
            return ResponseEntity.ok("Bid placed successfully");
        }
    }


    @PostMapping("/sellitem")
    public ResponseEntity<String> setupAuction(@RequestBody Map<String, Object> requestData) {
        try {
            // Extract item details from requestData
            String itemName = (String) requestData.get("itemName");
            String itemDescription = (String) requestData.get("itemDescription");
            String itemCategory = (String) requestData.get("itemCategory");
            Double startingPrice = Double.parseDouble(requestData.get("startingPrice").toString());
            Integer numOfDays = Integer.parseInt(requestData.get("numOfDays").toString());
            String sellerUserId = (String)requestData.get("sellerUserId");


            // Create and save item
            Item item = new Item(itemName, itemDescription, itemCategory, sellerUserId, null);
            itemsRepository.save(item);

            // Calculate auction end date
            Date auctionEndDate = new Date(System.currentTimeMillis() + (numOfDays * 24 * 60 * 60 * 1000L));

            // Create and save auction
            Auction auction = new Auction(item.getId(), "No Bids", startingPrice, startingPrice, 0, new Date(), auctionEndDate);
            auctionsRepository.save(auction);

            return new ResponseEntity<>("Item added successfully", HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error processing request: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/getItemsByCategory")
    private ResponseEntity<List<AuctionItemDTO>> getItemsByCategory(@RequestBody String categoryName) {
        List<AuctionItemDTO> auctionItemDTOs = new ArrayList<>();
        for (Item item : itemsRepository.getItemsByCategory(categoryName)) {
            Auction auction = auctionsRepository.findAuctionByIsClosedFalseAndItemFk(item.getId());
            auctionItemDTOs.add(new AuctionItemDTO(auction, item));
        }
        return new ResponseEntity<>(auctionItemDTOs, HttpStatus.OK);
    }

    @PostMapping("/getUserSales")
    private ResponseEntity<List<AuctionItemDTO>> getUserSales(@RequestBody String sellerName) {
        List<AuctionItemDTO> auctionItemDTOs = new ArrayList<>();
        for (Item item : itemsRepository.findItemsBySellerUser(sellerName)) {
            Auction auction = auctionsRepository.findAuctionByItemFk(item.getId());
            auctionItemDTOs.add(new AuctionItemDTO(auction, item));
        }
        return new ResponseEntity<>(auctionItemDTOs, HttpStatus.OK);
    }

    @GetMapping("/getCategories")
    public ResponseEntity<List<String>> getCategories() {
        // Implement logic to fetch category names from your database
        List<String> categoryNames = Arrays.asList("Technology", "Judaica", "Antiques", "Artworks", "Fashion", "Collectibles", "Various");
        return new ResponseEntity<>(categoryNames, HttpStatus.OK);
    }

    @PutMapping("/logout/{userName}")
    public void updateUser(@PathVariable("userName") String userName) {
        AuctionUser user = usersRepository.findByUserName(userName);
        user.setLoggedIn(false);
        usersRepository.save(user);
    }

    @GetMapping("/getbiderdetails/{bidderName}")
    public ResponseEntity<AuctionUser> getBidderDetails(@PathVariable String bidderName)
    {
        return new ResponseEntity<>(usersRepository.findByUserName(bidderName), HttpStatus.OK);
    }


    private void checkDates() {
        Iterable<Auction> it = auctionsRepository.findAll();
        Date today = new Date();
        for (Auction auction : it) {
            if (!auction.getAuctionEndDate().after(today))
                auction.setIsClosed(true);
            auctionsRepository.save(auction);
        }
    }
}
