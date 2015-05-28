$(document).ready(function() {
  var algolia = algoliasearch('WVCNV714O0', '943be333767d78b39d66b1ccd7c3b115');
  var index = algolia.initIndex('users');
  $('#user-search').typeahead({hint: false}, {
    source: index.ttAdapter({hitsPerPage: 5}),
    displayKey: 'firstName',
    templates: {
      suggestion: function(hit) {
          return '<div class="hit">' +
            '<div class="name">' +
              hit._highlightResult.firstName.value + ' ' +
              hit._highlightResult.lastName.value + ' - ' +
              hit._highlightResult.text.value + ' ' +
            '</div>' +
          '</div>';
      }
    }
  }).on('typeahead:selected', function (e, obj) {
    $('#algoliadiv').html('<p>'+obj.firstName+' '+ obj.lastName+': '+obj.text+'</p>')
  });
});
$('#send-data').on('click', function(){
  if( $('#first_name').val()!=='' && $('#last_name').val()!=='' && $('#text').val()!==''){
    var message = new Stamplay.Cobject('message').Model;
    message.set('firstName',$('#first_name').val())
    message.set('lastName',$('#last_name').val())
    message.set('text',$('#text').val())
    message.save().then(function(){
      $('#first_name').val('')
      $('#last_name').val('')
      $('#text').val('')
      $('.card-external').addClass('wow').addClass('pulse')
      new WOW().init();
    },function(){})
  }else{
    $('#error').html('All fields are required')
  }
})
String.prototype.trunc = String.prototype.trunc || function(n){
  return this.length>n ? this.substr(0,n-1)+'&hellip;' : this;
};
var fref = new Firebase('https://brilliant-fire-6680.firebaseio.com/message');
fref.on('child_added', function(params){
  var first = params.val().firstName.trunc(12)
  var last = params.val().lastName.trunc(12)
  var text = params.val().text.trunc(30)
  $('#firebasediv').prepend('<tr><td>'+first+'</td><td>'+last+'</td><td>'+text+'</td></tr>')
});