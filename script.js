function trim(str){
  return str.replace(/^ +/, '').replace(/ +$/, '');
}

function parseQuote(data){
    var sbSpan = $('.speech_body span');
  var qArea = $('.quote_area');
  if (!data.quoteAuthor)
    data.quoteAuthor = 'Anon';
  
//  data.quoteAuthor = 'Johann Wolfgang von Goethe';
      var author = getFormattedAuthor(trim(data.quoteAuthor));
  
    var quote = data.quoteText;
  
  sbSpan.attr('orig_author', data.quoteAuthor);
  
    sbSpan.html(author);
    qArea.html(quote);
  
  var ww = $("#hidden").html(author).width() + 16;
  var hh = $("#hidden").height() + 17;

    var width = sbSpan.width();
    var height = sbSpan.height();
    
    $('.speech_body').animate({
      width: ww,
      height: hh
    }, animTime, function() {
      sbSpan.fadeIn(animTime, function (){
      qArea.fadeTo(190, 1,
                   function(){
         $('.uil-cube-css').fadeOut(0.1, function(){ $('.container').animate({opacity: 1}, 500);
                                                   });
        });
      });
    });
    };

var animTime = 300;

function getFormattedAuthor(author) {
  var authorFormatted = author;
  var index;
  if ((index = author.lastIndexOf(' ')) != -1) {
    var strArr = author.split('');
    strArr[index] = ' <br>';
    authorFormatted = strArr.join('');
  }
  return authorFormatted;
}
  
function animSetQuote() {
  // fade out quote and shrink/grow speech bubble at the same time

  // get new width
  // to do: reuse element


  // fade out, set width, fade in.
  var sbSpan = $('.speech_body span');
  var qArea = $('.quote_area');

  qArea.fadeTo(animTime, 0, function(){
  sbSpan.fadeOut(animTime, function() {
    
    var url = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote&lang=en';

  $.getJSON( url + '&callback=?');
    
    
    
  });
  });
}

var app = angular.module('app', []);

app.controller('QuoteController', function($scope) {
  
  /*
  var cpl60= '';
  for (var i=0; i<600;i++){
    if (i % 6 == 0)
      cpl60 += ' ';
    else
      cpl60+='*';
  }
  $scope.quotes.push({quote:cpl60, author:'admin'});
  */
  
  $scope.tweet = function(){
    var sbSpan = $('.speech_body span');
    var qArea = $('.quote_area');
    var quote = trim(qArea.html());
    var author = sbSpan.attr('orig_author');
    var quoteStr = '"'+quote+'" - '+author+' #quotes';
    
    var url = 'https://twitter.com/intent/tweet?text='+encodeURI(quoteStr);
    window.open(url);
  }

  $scope.clickNewQuote = function(){
    animSetQuote($scope);
  }

  function init() {
    animSetQuote();
  }

  init();

});