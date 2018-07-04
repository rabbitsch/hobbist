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
  let final = "learn how to" + findings
  getBookData(findings);
  getWikiData(findings);
  getYoutubeData(final);

})
// console.log('click submit baby')
})


//retrieve Book Data
function getBookData(searchTerms1){

  let objBookFunct ={
    format: JSON,
    maxResults: 3,
    query: searchTerms1

  }
  url = `https://openlibrary.org/search.json?q=${objBookFunct.query}`

    console.log('book api')
    $.getJSON(url,function(data){
    console.log('how about now api')
    //  console.log(data.docs[0].title_suggest)
    //  console.log(data.docs)
     renderBookData(data);

  })

}


//retrieve youtube Data
function getYoutubeData(searchTerms){
  let objTubeFunct = {
      part: "snippet",
      type: "video",
      q: searchTerms,
      maxResults: 3,
      order: "viewCount",
     key: youtubeApi,
     url:endPointYou,
}
  $.getJSON(endPointYou,objTubeFunct, function(data){
  //  console.log(data)
  renderTubeData(data.items);

})
}


//retrieve Wiki Data
function getWikiData(searchTerm2){
  let url = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${searchTerm2}&format=json&callback=?`
  let objWikiFunct = {
    format: JSON,
    query: searchTerm2,
    url: endPointWiki
  }
  console.log('wiki you there')
  $.getJSON(url,objWikiFunct, function(data){
    // console.log('wiki api do you exist')
    // console.log(data[2][1])
    // console.log(data[2][2])
    // console.log(data[2][3])
    // console.log(data)
    renderWikiData(data);
  })

}


//retrieve Map Data (optional)
function getMapData(){


}


//Render and display Book Data
function renderBookData(results){
   results.forEach(function(value){
    console.log('can you hear me render book')
    console.log(results.docs[0].title_suggest)
    let html =
      `<li>
        <h1 ${results.docs[0].title_suggest}</h1>`
        $("#bookcontent").append(html);

  })

}


//Render and Display Youtube Data
function renderTubeData(results){
  results.forEach(function(value){
    //  console.log(value)
    let html = `
      <li class="youtube-cls">
        <h1 id="tubetitle">${value.snippet.title}</h1>
        <a href="https://youtube.com/watch?v=${value.id.videoId}" target="_blank">
          <img src ="${value.snippet.thumbnails.medium.url}">
        </a>
        <p>${value.snippet.description}</p>
      </li>
    `
    $(".youtube").append(html);
}
)}

//Render and Display WikiData
function renderWikiData(results){
  results.forEach(function(value){
    let html =
      `<h1>${results[1][0]}</h2>
        <p>${results[2][1]}</p>`
    $("#wikicontent").append(html);

  })


}
