(function musicDB(){



    this.init = function(){
        this.search();
    };

    this.search = function(){

        var form = document.querySelector("#form");

        form.addEventListener("submit", function(e){  // e for events object

          /**
          * Cancels the event if it is cancelable, meaning that
          * the default action that belongs to the event will not occur.
          */
          e.preventDefault();
          var input = document.querySelector('#input_search').value;
          form.reset();

          getData(input.split(' ').join("+"));

        }); // End of form.addEventListener();
    }; // End of search()

    this.getData = function(artist){

      var http = new XMLHttpRequest();
      var url = "https://itunes.apple.com/search?term="+ artist +"&entity=album";
      var method = "GET"; //fetch data
      var container = document.querySelector("#album_list_container");
      container.innerHTML = "";

      http.open(method,url);
      http.onreadystatechange = function(){

          if (http.readyState == 4 && http.status === 200){
              showArtist(JSON.parse(http.response)); //Converts the response into a JSON format

          }
          else if (http.readyState == XMLHttpRequest.DONE && http.status !== 200){
          }

      }; //End of http.onreadystatechange();
      http.send();
    }; //End of getData();

    this.showArtist = function(obj){

      var container = document.querySelector("#album_list_container");

      var template  = '';


      console.log(obj.results[0]);

      if (obj.results.length > 0){

        document.querySelector("#not_match").style.display = "none";

        for (var i=0; i < obj.results.length; i++){

          template += '<div class="col-sm-3 album_item">';
          template +=     '<div class="item_thmb" style="background: url('+ obj.results[i].artworkUrl100 +')"></div>';
          template +=     '<div class="item_title" >'+ obj.results[i].collectionName +'</div>';
          template +=     '<div class="item_price"><span>Price:'+ obj.results[i].collectionPrice +'</span> USD</div>';
          template +=     '<a href="'+ obj.results[i].collectionViewUrl +' USD" target="_blank">Buy Now</a>';
          template += '</div>';
        }

        container.innerHTML = '';
        container.insertAdjacentHTML('afterbegin', template);

      }
      else {
        document.querySelector("#not_match").style.display = "block";
      }

    }; // Enf of showArtist();

  this.init();

})();
