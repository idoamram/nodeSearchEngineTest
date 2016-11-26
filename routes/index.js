var express = require('express');
var router = express.Router();
const es = require( 'elasticsearch' );
const httpAwsEs = require( 'http-aws-es' );
var config = require('../config/config_aws');

const esClient = es.Client( { 
  hosts: 'search-betterworld-elasticsearch-cbwswve7dk5cjvosxquimn2opm.us-east-1.es.amazonaws.com',
  connectionClass: httpAwsEs,
  amazonES: {
    region: 'us-east-1',
    accessKey: config.AWS_accessKey,
    secretKey: config.AWS_secretKey
  }
} );

/* GET home page. */
router.get('/test', function(req, res, next) {
  esClient.ping({
    requestTimeout: 30000,

    // undocumented params are appended to the query string
    hello: "elasticsearch"
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
      res.json({message:"elasticsearch cluster is down!"});
    } else {
      console.log('All is well');
      res.json({message:"All is well"});
    }
  });

});

module.exports = router;
