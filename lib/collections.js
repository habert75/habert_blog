Posts=new Mongo.Collection('posts');
Comments=new Mongo.Collection('comments');
Categories=new Mongo.Collection('categories');

//Routing

Router.configure({

	layoutTemplate:'main'
});


Router.route('/', {
    name: 'home',
    template: 'home'
});


Router.route('/addPost',{

name:"addPost"
}
);

Router.route('/discussion',{

name:"discussion"
}
);

Router.route('/categorie/:_id', {
    template: 'categoriePage',
    data: function(){
        var currentCategorie = this.params._id;
        return Categories.findOne({ _id: currentCategorie });
    }
});


