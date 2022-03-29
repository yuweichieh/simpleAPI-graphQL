const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })
const http = require('http')

const personAPI = (idmuid) => {
  return new Promise((resolve, reject) => {
    const options = {
      host: 'localhost',
      port: 9090,
      path: '/api/buckeyelearn/transcript/incomplete?idmuid=' + idmuid,
      method: 'GET',
      agent: new http.Agent({ rejectUnauthorized: false })
    }
    const req = http.request(options, res => {
      console.log(`statusCode: ${res.statusCode}`)
      res.on('data', d => {
        resolve(JSON.parse(d).transcript)
      })
    })
    req.on('error', error => {
      reject(new Error('Error while API call for incomplete transcripts.'))
      console.error(error)
    })
    req.end()
  })
}

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
            const p = []
            for (let i = 0; i < resp.body.hits.hits.length; i++) {
              returnValue.push(resp.body.hits.hits[i]._source)
              p.push(returnValue[i].incomplete_transcripts = personAPI(resp.body.hits.hits[i]._source.idmuid))
            }
            Promise.all(p).then(values => {
              resolve(returnValue)
            })
          }
        }
      })
    })
  }
}

module.exports = RootQuery
