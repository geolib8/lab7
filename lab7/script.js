$(document).ready(function() {
    // Start your code from here
    let animals = ["dog","cat","rabbit","hamster","frog"];
    
    $("#add-animal").click(function(e) {
      e.preventDefault();
      let valInput = $("#animal-input").val();
      let a = $("<button>");
      a.addClass("animal-button");
      a.attr("data-type",valInput);
      a.text(valInput);
      $("#animal-buttons").append(a);
      $('#animal-form')[0].reset();
    });
    
    for (let i = 0; i< animals.length;i++){
      let a = $("<button>");
      a.addClass("animal-button");
      a.attr("data-type",animals[i]);
      a.text(animals[i]);
      $("#animal-buttons").append(a);
    }
    
    $("#animal-buttons").on("click", ".animal-button", function() {
      $("#animals").empty();
      let search = $(this).attr("data-type");
      let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=enDLN46WAGzg25TulffGmAECLmHCevFv&limit=10";
      $.ajax({
        url: queryURL
      }).then (function(response) {
        let results = response.data
        for (let i = 0; i < results.length; i++) {
          let animalDiv = $("<div class= \"animal-item\">");
          let rating = results[i].rating;
          let p = $("<p>").text("Rating: " + rating);
          let animalImage = $("<img>");
          animalImage.attr("src",results[i].images.fixed_height_still.url);
          animalImage.attr("data-still",results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate",results[i].images.fixed_height.url);
          animalImage.attr("data-state","still");
          animalDiv.append(p);
          animalDiv.append(animalImage);
          $("#animals").append(animalDiv);
       }
      })
    })
    
   
  });
  
  $(document).on('click','.animal-item img',function(){
      let src = $(this).attr("src");
      let animate = $(this).attr("data-animate");
      let state =  $(this).attr("data-state");
      $(this).attr("src", animate);
      $(this).attr("data-animate", src);
  });