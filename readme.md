Readme

Make sure you download dependencies and set up a mongodb database w/ the name of "test".

Blog Posts:
Base URL = localhost:3000/post

New Post:
	Type: post
	Variables: name - name of post/identifier, content- content of post

Get Post:
	Type: get
	Variables: name - identifier
	
Edit Post:
	Type: put
	Variables: name - identifier, content- content to update post with

Delete Post:
	Type: delete
	Variables: name- identifier
	

Post Comments:
Base URL = localhost:3000/comment

New Comment:
	Type: post
	Variables: post- name of parent post/parent identifier, name - name of comment/identifier, content- content of comment

Get Comment:
	Type: get
	Variables: post- parent identifier, name - identifier
	
Edit Comment:
	Type: put
	Variables: post- parent identifier, name - identifier, content- content to update comment with

Delete Comment:
	Type: delete
	Variables: post- parent identifier, name- identifier