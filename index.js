const youtubeApi= 'AIzaSyDdUGDSs5Dp-Z4ZtRGyKv8IenmvXxfV-wI'

const endPointYou = 'https://www.googleapis.com/youtube/v3/search'

// const shoppingApi = '92d3xtd3zfkxhac2d9cuty2b'


// const urlshop = `http://api.walmartlabs.com/v1/search?query=${query}&format=json&apiKey=92d3xtd3zfkxhac2d9cuty2b`

const endPointWiki ='https://en.wikipedia.org/w/api.php' 



//click submit button, to recognize search results
$(function(){
$("form").submit('submit',function(event){
  event.preventDefault();
  console.log('first tier click')
  let queryTarget= $(event.currentTarget).find('#js-query');
  let findings = queryTarget.val();
  let final = "teach me " + findings
  
  queryTarget.val(" ");
 


 
  getWikiData(findings);
  getYoutubeData(final);
  getGoogleBookData(findings);
  // ajaxTestWiki(findings);
   })


// console.log('click submit baby')
})





//retrieve youtube Data
function getYoutubeData(searchTerms){
  let objTubeFunct = {
      part: "snippet",
      type: "video",
      q: searchTerms,
      maxResults: 5,
      order: "viewCount",
     key: youtubeApi,
     url:endPointYou,
}
   
  $.getJSON(endPointYou,objTubeFunct, function(data){
  //  console.log(data)
  
  renderTubeData(data.items);

})
}



//retrieve Google Book Data
function getGoogleBookData(searchTerm3){
  $.ajax({
      dataType: "json",
    //  key:youtubeApi ,
     url:'https://www.googleapis.com/books/v1/volumes?q=' + searchTerm3,
     success: function(data){
       renderGoogleBookData(data.items);
     },
     type: "GET"
})
// $.getJSON(url,objGoogFunct, function(data){
//   console.log(data)

}





//test wiki ajax
function ajaxTestWiki(search1){
  $.ajax({
    dataType: "json",
    url:`https://en.wikipedia.org/w/api.php?action=opensearch&search=${search1}&format=json&callback=?`,
    success: function(data){
      // console.log(data[0])
    },
    type: "GET"
  })
}

//retrieve Wiki Data
function getWikiData(searchTerm2){
  let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm2}&format=json&callback=?`

  let objWikiFunct = {
    format: JSON,
    query: searchTerm2,
    url: endPointWiki,
    maxResults:1,
    piprop: 'name|thumbnail|original',
    pithumbsize: 250
  }
  console.log('wiki you there')
  $.getJSON(url,objWikiFunct, function(data){
   $("#wikicontent").html(" ");
    // console.log('wiki api do you exist')

    // console.log(data[1][0])
    // console.log(data[2][2])
    let html = 
      `<h1 class="wikiTitle">${data[1][0]}</h2>
        <p>${data[2][0]}</p>`
    $("#wikicontent").append(html);
    // console.log(data[2][3])
    // console.log(data)
    
    // renderWikiData(data);
  })

}


//retrieve Map Data (optional)
function getMapData(){


}

function renderGoogleBookData(results){
  $(".bookcls").html("");
  $(".bookcls").html(`<h1 class="conHead">Books</h1>`);
  results.forEach(function(value){
    //  console.log(value)
    
     let html = `
      <li class="book-cls">
        <h1 id="booktitle">${value.volumeInfo.title}</h1>
          <img src ="${value.volumeInfo.imageLinks.thumbnail}">
        </a>
        <p class="bkdes">${value.volumeInfo.description}</p>
        <a href="${value.selfLink}" target="_blank"> See Book Here</a>
      </li>
    `

    $(".bookcls").append(html);
    // $(".bookcls").fadeIn(html);

  })
  
  

}




//Render and Display Youtube Data
function renderTubeData(results){
 
  
  $(".youtube").html(" ");
  $(".youtube").html(`<h1 class="conHead">Videos</h1>`);
  results.forEach(function(value){
    //  console.log(value)
    let html = `
      <li class="youtube-cls">
        <h1 id="tubetitle">${value.snippet.title}</h1>
        <a href="https://youtube.com/watch?v=${value.id.videoId}" target="_blank">
          <img src ="${value.snippet.thumbnails.medium.url}" class="imgtube">
        </a>
        <p>${value.snippet.description}</p>
      </li>
    `
    // $(".youtube").html("<h1>Videos</h1>");
    $(".youtube").append(html);
     
}
)}

//Render and Display WikiData
function renderWikiData(results){
  results.forEach(function(value){
    console.log(results[1][0])
  
    let html = 
      `<h1>${value}</h2>`
        // <p>${value}</p>`
    $("#wikicontent").append(html);
    

      }
// results[2].forEach(function(newValue){
//   console.log(newValue)
  
  )}