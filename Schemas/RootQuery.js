const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

const RootQuery = {
  getAllPerson: () => {
    return new Promise((resolve, reject) => {
      client.search({
        index: 'testlok',
        type: '_doc',
        body: {
          query: {
            match_all: {}
          }
        }
      }, function (err, resp, status) {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          if (!resp) {
            reject(new Error('Error while matching all.'))
          } else {
            const returnValue = []
            for (let i = 0; i < resp.body.hits.hits.length; i++) {
              returnValue.push(resp.body.hits.hits[i]._source)
            }
            resolve(returnValue)
          }
        }
      })
    })
  },

  // Enables: /idmuid, /emplid, /name_n, /deptid, /position_nbr, /reports_to, /vpcollege
  getPersonByArg: ({ argType, arg }) => {
    if (argType === 'deptid' || argType === 'poistion_nbr' || argType === 'reports_to' ||
      argType === 'vpcollege') {
      argType = 'appointments.' + argType
    }
    return new Promise((resolve, reject) => {
      client.search({
        index: 'testlok',
        type: '_doc',
        body: {
          query: {
            match: { [argType]: arg }
          }
        }
      }, function (err, resp, status) {
        if (err) {
          console.log(err)
          reject(err)
        } else {
          if (!resp) {
            reject(new Error('Error while searching for input arguments.'))
          } else {
            const returnValue = []
            for (let i = 0; i < resp.body.hits.hits.length; i++) {
              returnValue.push(resp.body.hits.hits[i]._source)
            }
            resolve(returnValue)
          }
        }
      })
    })
  }
}

module.exports = RootQuery
