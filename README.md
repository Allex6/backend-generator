# Backend-generator

[![npm version](https://badge.fury.io/js/backend-generator.svg)](https://badge.fury.io/js/backend-generator)

A simple script to create a **structured backend** using **layered architecture**, in addition to the automatic creation of CRUD's based on pre-defined models.

The generated backend will use the `postgres` database, in addition to using `express`, and schema validations with `joi`. The use of the `Prisma` library is optional.

---

Backend-generator was created in order to facilitate the creation of new projects using NodeJs and following good practices.

As we develop our projects, some tasks may be repetitive:

- Structuring project folders;
- Creation of CRUD's for our database tables;
- Validation of data passing using middlewares;
- Between others...

These tasks become boring and end up taking a lot of time.

This library was developed to mitigate these problems. Through it, we were able to have a faster start to development, in addition to helping beginners developers to walk a path of good practices related to the architecture of a server. 

`Backend-generator` will allow your development team to focus on business rules, not repetitive tasks.

# Installation

Either through cloning with git or by using [npm](http://npmjs.org) (the recommended way):

```bash
npm install -g backend-generator
```

And backend-generator will be installed globally to your system path.

You can also install backend-generator as a development dependency:

```bash
npm install -D backend-generator 
```

With a local installation, backend-generator will not be available in your system path or you can't use it directly from the command line. Instead, the local installation of backend-generator can be run by calling it from within an npm script (such as `npm start`) or using `npx backend-generator`.

# Usage

backend-generator is a cli library, so just run the command to start the application.

```bash
backend generator
```

This will launch the library displaying a series of options for you to choose and generate your project.

1 - First you must inform a path to the file that defines the models (tables) of your application. We'll talk about this file later.

```bash
"Enter the path to read the models.json file: "
```

2 - After that, you must inform a folder where your project will be saved:

```bash
"Enter the path to the folder where the project will be saved. The name of the last folder in the path indicates the name of the project. Ex: ./../my-project "
```

3 - Select the language you want to use. You can choose between Javascript and Typescript.

```bash
"Select a programming language to use in this project: "
```

4 - Choose if you want to use the Prisma library for migrations and database management:

```bash
"Do you want to use prism for better management of your db's migrations ?"
```

5 - Choose if you want to initialize the package.json in the destination folder of your project:

```bash
"Do you want to initialize package.json in the project's destination folder? Choose 'no' if a package.json already exists in the destination folder."
```

6 - Choose if you want to install the dependencies of your new project after creating the folders and files:

```bash
"Do you want to install the dependencies after the project is created ?"
```

This is enough to generate a new project in the destination folder specified in step 2 of this tutorial. Just run `npm start` in that folder and your newest server will be online. You can test dynamically generated CRUD routes by accessing **http://localhost:[PORT]/MODEL/** using the `GET, POST, PUT, DELETE` methods.

**Please note that some Typescript type errors may be generated if you chose that language.**

## Models.json what is this ?

The models.json file (not necessarily this name) serves to indicate the format of our database tables, in addition to informing the backend-generator which validations it needs to implement with the `Joi` library.

```json
{
  "modelName": {
    "columnName": "Joi validations",
    "anotherColumn": "More Joi validations",
    ...
  }
}
```

## Example

Let's create a news blog using the `backend-generator` library.

Our project will be very simple, it will have Users, Posts and Comments.
Users make Posts, and Users can also make comments.

1 - Install the library globally:

```bash
npm install -g backend-generator
```

2 - Create a **models.json** file to store information from our tables:

```json
{
  "user": {
    "name": ".string().required()",
    "email": ".string().email().required()",
    "password": ".string().required()"
  },
  "post": {
    "title": ".string().required()",
    "content": ".string().required()",
    "authorId": ".number().required()"
  },
  "comment": {
    "content": ".string().required()",
    "authorId": ".number().required()"
  }
}
```

3 - Run the library to start the cli:

```bash
backend generator
```

4 - Enter the path to the models.json file you just created:

```bash
"Enter the path to read the models.json file: "
```

5 - Enter a folder where the project will be saved:

```bash
"Enter the path to the folder where the project will be saved. The name of the last folder in the path indicates the name of the project. Ex: ./../my-project "
```

6 - Select the Javascript language for this example.

```bash
"Select a programming language to use in this project: "
```

7 - Choose **no** to the `Prisma` library option for this example:

```bash
"Do you want to use prism for better management of your db's migrations ?"
```

8 - Choose **yes** to initialize the package.json in the destination folder of your project:

```bash
"Do you want to initialize package.json in the project's destination folder? Choose 'no' if a package.json already exists in the destination folder."
```

9 - Choose **yes** to install the dependencies of your new project after creating the folders and files:

```bash
"Do you want to install the dependencies after the project is created ?"
```

10 - That's it! The project was created in the folder you specified as the destination, and the project's dependencies are already installed. You can test the following routes:

---
- `GET` /users
- `GET` /users/:userId
- `POST` /users
- `PUT` /users/:userId
- `DELETE` /users/:userId
---
- `GET` /posts
- `GET` /posts/:postId
- `POST` /posts
- `PUT` /posts/:postId
- `DELETE` /posts/:postId
---
- `GET` /comments
- `GET` /comments/:commentId
- `POST` /comments
- `PUT` /comments/:commentId
- `DELETE` /comments/:commentId
---

Just remember that the creation and update routes (`POST` and `PUT`) expect to receive a `body` with the fields informed in our **models.json** and defined as ".required()".

```json
{
  "user": {
    "name": ".string().required()",
    "email": ".string().email().required()",
    "password": ".string().required()"
  },
  "post": {
    "title": ".string().required()",
    "content": ".string().required()",
    "authorId": ".number().required()"
  },
  "comment": {
    "content": ".string().required()",
    "authorId": ".number().required()"
  }
}
```

## Considerations

Backend-generator is far from reaching its full potential. There are still many bugs to be fixed, features and improvements to be implemented.

This little lib was created in a few hours and is in constant development and improvement process (when the dev has some time '-'). Feel free to contribute to this project.

# License

Licensed under the MIT License, Copyright © 2022-present Alex Souza.

See [LICENSE](./LICENSE) for more information.