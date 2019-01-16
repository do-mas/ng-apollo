var express = require('express');
var express_graphql = require('express-graphql');
const cors = require('cors');
var {buildSchema} = require('graphql');
var faker = require('faker');

console.log("starting up");
// STUB DATA
var authors = [];
for (let index = 0; index < 4; index++) {
  console.log("adding author:" + index);
  authors.push(
    {
      id: index + 1,
      name: faker.name.findName(),
      year: new Date(faker.date.between('1988', '1991')).getFullYear()
    }
  );
}

// QUERY METHODS
var getAuthor = function (args) {
  const id = args.id;
  console.log("getting author:" + id);
  return authors.filter(author => {
    return author.id == id;
  })[0];
};

var updateAuthor = function ({id, name}) {
  authors.filter(author => {
    if (author.id == id) {
      author.name = name;
    }
  });
  return authors.filter((a) => a.id == id)[0];
};

var getAuthors = function (args) {
  let authorsResponse = authors;
  if (args.name) {
    const name = args.name;
    authorsResponse = authorsResponse.filter(author => author.name === name);
  }
  if (args.year) {
    const year = args.year;
    authorsResponse = authorsResponse.filter(author => author.year === year);
  }
  return authorsResponse;
};

var root = {
  author: getAuthor,
  authors: getAuthors,
  updateAuthor: updateAuthor
};

// GraphQL APP CONFIG
var app = express();
app.use(cors());
app.use('/graphql', express_graphql({
  schema: buildSchema(`
        type Query {
            author(id: Int!): Author
            authors(name: String, year: Int): [Author]
        },
        type Mutation {
            updateAuthor(id: Int!, name: String!): Author
        },
        type Author {
            id: Int
            name: String
            year: Int
        }
    `),
  rootValue: root,
  graphiql: true

}));

app.listen(4000, () => console.log('GraphQL running on localhost:4000/graphql'));
