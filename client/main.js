import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';


Template.discussPost.helpers({

'posts':function(){
	return Posts.find({});
}


});


Template.commentList.helpers({

'comments':function(){
	return Comments.find({});
},
'cmtCount':function(){

    return Comments.find().count();
}


});
//categories helpers
Template.categorieList.helpers({
'categories':function() {
  return Categories.find({});
}

});

//adding a post event 

Template.addPost.events({
'click .js-add-post':function(event){
    event.preventDefault();
    var postCateg=$('[name=postCateg]').val();
    var postTitle=$('[name=postTitle]').val();
    var postContent=$('[name=postContent]').val();
     var user = 'anonymous person';
     if (Meteor.user()){
         user = Meteor.user().emails[0].address
     }
   
    var post = {

                 "categorie":postCateg,
                 "title":postTitle,
                 "text":postContent,
                 "createdOn":new Date(),
                 "createdBy":user};// create a simple object to insert to the collectoin
    Posts.insert(post);
    $('[name=postCateg]').val('');
    $('[name=postTitle]').val('');
    $('[name=postContent]').val('');
    
     return false;
}

});

Template.addCommentForm.events({
    // this runs when they click the add button... you need to compete it
 'click .js-add-comment':function(event){
     var comment_text = $('#comment_input').val();// get the form value using jquery...
     var user = 'anonymous person';
     // the 'this' variable contains
     // the data that this template is displaying
     // which is the Website item
     var site = this;
     if (Meteor.user()){
         user = Meteor.user().emails[0].address
     }
     var comment = {"text":comment_text,
                    "siteId":site._id,
                 "createdOn":new Date(),
                 "createdBy":user};// create a simple object to insert to the collectoin
    Comments.insert(comment);
   event.target.commentContent.value = "";
     return false;
 }
});

//addCategorie events

Template.addCategorie.events({
'submit form':function(event){

event.preventDefault();
var categName=$('[name=categName]').val();
Categories.insert({

    name:categName
});
}


});


/// infiniscroll

Session.set("commentsLimit", 5);
lastScrollTop = 0; 
$(window).scroll(function(event){
// test if we are near the bottom of the window
if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  // where are we in the page? 
  var scrollTop = $(this).scrollTop();
  // test if we are going down
  if (scrollTop > lastScrollTop){
    // yes we are heading down...
   Session.set("commentsLimit", Session.get("commentsLimit") + 2);
  }

  lastScrollTop = scrollTop;
}
})
