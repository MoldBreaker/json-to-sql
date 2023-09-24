
# JSON to insert into SQL
NodeJS tool to convert json files to insert into query in SQL

## Installation
Clone repository:

    git clone https://github.com/MoldBreaker/json-to-sql.git

You need NodeJS to run this project, if dont have yet, [download here](https://nodejs.org/en/download)

## Quick Start

First, move all files need to convert to `JSON/` folder

Edit `config.js` file.

    const data = [
	    {
	        fileName: 'posts.json' // fileName is Required
	    }
    ];
    
    module.exports = data;
Multiple files.

    const data = [
	    {
	        fileName: 'posts.json'
	    },
	    {
	        fileName: 'comments.json'
	    },
	    {
	        fileName: 'users.json'
	    }
    ];
    
    module.exports = data;

 You can run the projects using the following.

    $ npm start

The results will be `[filename].sql`, with the table name `[filename]`, and the fields will be the object keys by default.

## Configurations

Table name is the name of the table you want to insert data into

    const data = [
	    {
	        fileName: 'posts.json',
	        tableName: 'posts',
	    }
    ];
    
You can also change output name and extension by 

    const data = [
	    {
	        fileName: 'posts.json',
	        outputName: 'posts.txt', //results will be posts.txt
	    }
    ];
    
You can also cutomize fields of table using the following

    const data = [
	    {
	        fileName: 'posts.json',
	        fields: ['userID', 'id', 'title', 'body'],
	    }
    ];

## Example
Full options:

    const data = [
	    {
	        fileName: 'posts.json',
	        tableName: 'posts',
	        outputName: 'posts.txt',
	        fields: ['UserID', 'ID', 'Title', 'Body'],
	    }
	];
	
	module.exports = data;
	  
Data example `posts.json`, data by https://jsonplaceholder.typicode.com/

    [
	    {
			"userId":  1,
			"id":  1,
			"title":  "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
			"body":  "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
		},
		{
			"userId":  1,
			"id":  2,
			"title":  "qui est esse",
			"body":  "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
		},
		{
			"userId":  1,
			"id":  3,
			"title":  "ea molestias quasi exercitationem repellat qui ipsa sit aut",
			"body":  "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
		}
	]
Run scripts

    npm start
Results:

    INSERT INTO posts (UserID, ID, Title, Body) VALUES (1,1,'sunt aut facere repellat provident occaecati excepturi optio reprehenderit','quia etsuscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto') 
    INSERT INTO posts (UserID, ID, Title, Body) VALUES (1,2,'qui est esse','est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla')
    INSERT INTO posts (UserID, ID, Title, Body) VALUES (1,3,'ea molestias quasi exercitationem repellat qui ipsa sit aut','et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut')

