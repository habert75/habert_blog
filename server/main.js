Meteor.startup(function(){
	if (!Posts.findOne()){// nothing in the database yet
		var post = {
                    title:"Meteor js",
			        text:"http:What do you guys think about Meteor js?",
					createdOn:new Date(),
					createdBy:"Bertrand"};// create a simple object to insert to the collectoin
		Posts.insert(post);
		post = {    
                    title:"I love travelling",
			        text:"I am also planning to be posting about the places i travel to",
					createdOn:new Date(),
					createdBy:"Bertrand"};// create a simple object to insert to the collectoin
		Posts.insert(post);
	}
});
