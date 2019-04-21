// Initial array of gifs
var gifs = ["Hunter X Hunter", "One Piece", "Seven Deadly Sins", "Halo", "The Witcher", "Fallout", "Avengers", "Coldplay", "The Wombats", "GroupLove"];

// displayGif function re-renders the HTML to display the appropriate content
function displayGif() {
    
    var numberSelect = $("#number-select").val();
    var ratingSelect = $("#rating-select").val();   
    
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=FJg7DrUcAEW9bNpFc4A1qMg8PFMWpPU9&q=" + gif + "&limit=" + numberSelect + "&offset=0&rating=" + ratingSelect + "&lang=en";
    
    // Creates AJAX call for the specific gif button being clicked
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //   $("#object").empty();
        
        var display = $("#gifs-display");
        var gifImages = response.data;
        
        //cycles through each element in the array.
        gifImages.forEach(function (currentValue) {
            
            // creates a new div with .image-display class to help with the css
            var imgDiv = $("<div>").addClass("image-display");
            
            // creates image element and assigning its src/data-alt using template literals, which makes it easier to read.
            var image = $(`<img src="${currentValue.images.fixed_width_still.url}" alt="Giphy Gif" class="gif-img" data-alt="${currentValue.images.fixed_width.url}" />`);
            
            // creates anchor element containing the link to download the gif.
            var downloadLink = $(`<a href="${currentValue.images.fixed_width.url}" download></a>`);

            // creates a button element for download
            var downloadBtn = $("<button type='button' class='btn btn-dark btn-sm'>Download</button>");

            // places the button inside the anchhor element
            downloadLink.html(downloadBtn);

            //append img element with the src: url for the gif to imgdiv
            imgDiv.append(image);

            imgDiv.append(`<h4>Rating: ${currentValue.rating}</h4>`)

            imgDiv.append(downloadLink);
            

            display.prepend(imgDiv);
        });
    });
}

// This function will switch the still image and with the gif image url.
function playGif(clickGif) {
    var static = $(clickGif).attr("src");
    var dynamic = $(clickGif).attr("data-alt");
    $(clickGif).attr("src", dynamic);
    $(clickGif).attr("data-alt", static);
}

// Function for displaying gif data
function renderButtons() {
    
    // Deletes the gifs prior to adding new gifs
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-display").empty();
    // Loops through the array of gifs
    for (var i = 0; i < gifs.length; i++) {
        
        // Then dynamicaly generates buttons for each gif in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of gif to our button
        a.addClass("gif");
        // Added a data-attribute
        a.attr("data-name", gifs[i]);
        // Provided the initial button text
        a.text(gifs[i]);
        // Added the button to the buttons-view div
        $("#buttons-display").append(a);
    }
}


// This function handles events where the add gif button is clicked
$("#search_button").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gif = $("#gif-input").val().trim();
    
    // The gif from the textbox is then added to our array
    gifs.push(gif);

    // Calling renderButtons which handles the processing of our gif array
    renderButtons();
});

$("#clear_button").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    $("#gifs-display").empty();

    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", displayGif);

// This event listener is triggered when the user clicks a gif.
$(document).on("click", ".gif-img", function () {
    playGif(this);
});

// Calling the renderButtons function to display the intial buttons
renderButtons();