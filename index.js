const express = require('express')
const app = express()
const PORT = 6969
const { graphqlHTTP } = require('express-graphql')

const rootQuery = require('./Schemas/RootQuery')
const schema = require('./Schemas/Schema')

/* Single route for graphQL */
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: rootQuery,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log('Server running.')
})
