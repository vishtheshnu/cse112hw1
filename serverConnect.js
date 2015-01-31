var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Database connection established!");
});

var Schema = mongoose.Schema;

var postSchema = new Schema({
	name: String,
	content: String,
	comments: [{name: String, content: String}]
});

var blogPost = mongoose.model('blogPost', postSchema);

/*Blog Post Functions*/
exports.addPost = function(nom, cnt, res){
	var post = new blogPost({name: nom, content: cnt, comments: []});
	post.save(function(err, post){
		if(err) res.json({err: "Could not post"});
		else res.json(post);
	});
}

exports.getPost = function(name, res){
	blogPost.findOne({'name': name}, 'content comments', function(err, post){
		if(err) res.json( {err: "Post not found"});
		else res.json(post);
	});
}

exports.editPost = function(nom, cnt, res){
	blogPost.update({name:nom}, {$set: { content: cnt }}, {upsert: true}, function(err){
		if(err) res.json({err: "Could not update post"});
		else res.json({msg: "Post updated"});
	});
}

exports.deletePost = function(nom, res){
	blogPost.find({name: nom}).remove(function(err){
		if(err) res.json({err: "Could not delete post"});
		else res.json({msg: "Post deleted"});
	});
}

/*Comments Functions*/
exports.addComment = function(blog, nom, cnt, res){
	//Find blog post w/ name of "blog"
	blogPost.findOne({'name': blog}, 'content comments', function(err, post){
		if(err) res.json({err: "Could not find post to add comment to"});
		post.comments.push({name: nom, content: cnt});
		blogPost.update({name:blog}, {$set: { comments: post.comments }}, {upsert: true}, function(err){
			if(err) res.json({err: "Could not add comment"});
			else res.json({msg: "Post added"});
		});
	});
	
}

exports.getComment = function(blog, nom, res){
	blogPost.findOne({'name': blog}, 'comments', function(err, post){
		if(err){
			res.json({err: "Post of comment not found"}); //post itself not found
			return;
		}
		//Blog has been found, now search for comment
		var sent = false;
		for(var i = 0; i < post.comments.length; i++){
			if(post.comments[i].name === nom){
				res.json(post.comments[i]);
				sent = true;
			}
		}
		if(!sent)
			res.json({err: "Comment not found in post"}); //comment not found in post
	});
}

exports.editComment = function(blog, nom, cnt, res){
	//Get post
	blogPost.findOne({'name': blog}, 'comments', function(err, post){
		if(err){
			res.json({err: "Post of comment not found"}); //post itself not found
			return;
		}
		//Blog has been found, now search for comment & replace it
		var sent = false;
		for(var i = 0; i < post.comments.length; i++){
			if(post.comments[i].name === nom){
				post.comments[i].content = cnt;
				sent = true;
				break;
			}
		}
		if(!sent)
			res.json({err: "Comment not found in post"}); //comment not found in post
		else{
			blogPost.update({name:nom}, {$set: { comments: post.comments }}, {upsert: true}, function(err){
				if(err) res.json({err: "Could not update comment"});
				else res.json({msg: "Comment updated"});
			});
		}
	});
}

exports.deleteComment = function(blog, nom, res){
//Get post
	blogPost.findOne({'name': blog}, 'comments', function(err, post){
		if(err){
			res.json({err: "Post of comment not found"}); //post itself not found
			return;
		}
		//Blog has been found, now search for comment & delete it
		var sent = false;
		for(var i = 0; i < post.comments.length; i++){
			if(post.comments[i].name === nom){
				post.comments.splice(i, 1);
				res.json({msg: "Comment deleted"});
				sent = true;
				break;
			}
		}
		if(!sent){
			res.json({err: "Comment not found in post"}); //comment not found in 
		}else{
			blogPost.update({name:blog}, {$set: { comments: post.comments }}, {upsert: true}, function(err){
				if(err) res.json({err: "Could not delete comment"});
				else res.json({msg: "Comment deleted"});
			});
		}
	});
}