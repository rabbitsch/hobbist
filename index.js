const youtubeApi= 'AIzaSyDdUGDSs5Dp-Z4ZtRGyKv8IenmvXxfV-wI'

const endPointYou = 'https://www.googleapis.com/youtube/v3/search'

const shoppingApi = '92d3xtd3zfkxhac2d9cuty2b'

const endPointShop = 'http://api.walmartlabs.com/v1/search?query=ipod&format=json&apiKey=92d3xtd3zfkxhac2d9cuty2b'

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
  getShoppingData(findings);
  getWikiData(findings);
  getYoutubeData(final);

})
// console.log('click submit baby')
})


//retrieve shopping Data
function getShoppingData(searchTerms1){
  // url = 'http://api.walmartlabs.com/v1/search?query=${objShopFunct.query}&format=json&apiKey=${objShopFunct.apiKey}';
  let objShopFunct ={
    apiKey: shoppingApi,
    format: JSON,
    maxResults: 3,
    query: searchTerms1

  }
  url = `https://api.walmartlabs.com/v1/search?query=${objShopFunct.query}&format=json&apiKey=92d3xtd3zfkxhac2d9cuty2b`
  // let urlshop = `http://api.walmartlabs.com/v1/search?query=${objShopFunct.query}&format=json&apiKey=92d3xtd3zfkxhac2d9cuty2b`
    console.log('shop api')
    $.getJSON(url,objShopFunct,function(data){
    console.log('how about now api')
    console.log(data)
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
    console.log('wiki api do you exist')
    console.log(data)
  })

}


//retrieve Map Data (optional)
function getMapData(){


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

  })


}