use strict";
// @Usage kick off docker for gremin server first then in terminal: node app.js
/* Docker Commands for convenience (Console is optional)
docker run -it -p 8182:8182 tinkerpop/gremlin-server
docker run -it -p 8182:8182 --network host tinkerpop/gremlin-console
*/
const Gremlin = require('gremlin');
const config = require("./config");
const jsonData= require('./metadata.json');
const fs = require('fs');
let edVarNum;
const { t: { id } } = Gremlin.process;
//*******Unused Auth because on local development********
//const authenticator = new Gremlin.driver.auth.PlainTextSaslAuthenticator(`/dbs/${config.database}/colls/${config.collection}`, config.primaryKey); //may be added for neptune connection
const client = new Gremlin.driver.Client( //TODO this will need more args for auth to Neptune
    config.endpoint,
    {
        traversalsource : "g"
    }
);
const graph = new Gremlin.structure.Graph(); //initalize the graph Graph can have configurations set on it will need more documentation for that
const g = graph.traversal().withRemote(client); // var g is the typical way to initialize the graph traversal on the remote server connection
​