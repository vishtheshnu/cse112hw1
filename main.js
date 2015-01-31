var express = require('express');
var server = require('./serverConnect');

//Set up Server
var app = express();

//Blog Posts
/* Variables:
name = name of blog post
content = the content of the blog post to add
*/
//Add a new blog post with specific name & content
app.post('/post', function(req, res){
	console.log("Name = "+req.param("name")+", content = "+req.param("content"));
	server.addPost(req.param('name'), req.param('content'), res);
});

//Get blog post with specific name
app.get('/post', function(req, res){
	server.getPost(req.param('name'), res);
});

//Update blog post with specified name
app.put('/post', function(req, res){
	server.editPost(req.param('name'), req.param('content'), res);
});

//Delete blog post with specified name
app.delete('/post', function(req, res){
	server.deletePost(req.param('name'), res);
});


/* Variables:
post = name of blog post the comment is/should be under
name = name of comment post
content = the content of the comment to add
*/

//Add a new blog comment with specific name & content
app.post('/comment', function(req, res){
	server.addComment(req.param('post'), req.param('name'), req.param('content'), res);
	//res.end();
});

//Get blog post with specific name
app.get('/comment', function(req, res){
	server.getComment(req.param('post'), req.param('name'), res);
});

//Update blog post with specified name
app.put('/comment', function(req, res){
	server.editComment(req.param('post'), req.param('name'), req.param('content'), res);
});

//Delete blog post with specified name
app.delete('/comment', function(req, res){
	server.deleteComment(req.param('post'), req.param('name'), res);
});

app.listen(3000);