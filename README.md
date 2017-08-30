# errand-file
> [errand](https://github.com/errandjs/errand) worker component for working with files

## Usage

```

npm install errand-file

```

Notes:

1. For dependencies and suggested usage of errand worker components refer to [errand](https://github.com/errandjs/errand)
2. Set environment variables:
  2.1 ERRAND_MONGODB_URL with connection string for mongodb server, if not set module will default to `mongodb://localhost:27017`


## Example

```

{
	"tasks": [

		{
			"task": "errand-file",
			"data": {
				"description": "replace-with-task-description",
				"request": {
					"database": "replace-with-mongodb-database-name",
					"collection": "replace-with-name-of-collection",
					"method": "write",
					"parameters": {
						...
					}
				}
			}
		}

	]
}

```

Notes:

* **tasks** - [errand](https://github.com/errandjs/errand) task list
* **tasks[].task** - required `errand-file` task name
* **tasks[].data.description** - optional task description
* **tasks[].data.request.database** - required mongodb database name
* **tasks[].data.request.collection** - required mongodb collection name
* **tasks[].data.request.method** - required file method
* **tasks[].data.request.parameters** - required method parameters, the parameter payload will vary depending on method

### Write Example 

```

{
	"tasks": [

		{
			"task": "errand-file",
			"data": {
				"description": "replace-with-task-description",
				"request": {
					"database": "replace-with-mongodb-database-name",
					"collection": "replace-with-name-of-collection",
					"method": "write",
					"parameters": {
						"file": "replace-with-location-and-name-of-file"
						"template": "replace-with-handlebars-template-name",
						"partialsDir": "replace-with-partials-directory-name",
						"context": {
							"firstname": "Sam",
							"lastname": "Sample"
						}						
					}
				}
			}
		}

	]
}

```

Notes:

* **tasks[].data.request.parameters.template** - required location and file name for output file, file location is relative to current directory
* **tasks[].data.request.parameters.template** - required handlebars template name, for example `/views/document`, refer to [errand usage notes](https://github.com/errandjs/errand#usage) for how to pass directory location for templates files names to component
* **tasks[].data.request.parameters.partialsDir** - required location of partial files, file location is relative to current directory
* **tasks[].data.request.parameters.context** - optional variables that can be used in the body of the document

