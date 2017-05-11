var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var YOUTUBE_KEY = 'AIzaSyAJ7mTDVS2l94WTev--TtQ-yhJYuau2Oyo';
 
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: YOUTUBE_BASE_URL,
    data: {
      part: 'snippet',
      key: YOUTUBE_KEY,
      q: searchTerm,
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}
 
 
 
function displayYouTubeSearchData(data) {
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
      if(item.id.videoId) {
        resultElement += '<a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src="' + item.snippet.thumbnails.medium.url + '"></a><br>';
      }
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
 
  $('.js-search-results').html(resultElement);
}
 
function watchSubmit() {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    getDataFromApi(query, displayYouTubeSearchData);
  });
}
 
$(function(){watchSubmit();});