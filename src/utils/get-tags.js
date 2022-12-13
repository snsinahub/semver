'use strict';


const _ = require('lodash');
const { graphql } = require("@octokit/graphql");


module.exports = class GetReleaseTags {

    constructor() {

    }
 

    getTags(jsonObj) {
        console.log("JSON OBJ: ", JSON.stringify(jsonObj))
        // return jsonObj['refs']['nodes'][0]['repository']['releases']['nodes'];
        return jsonObj['releases']['nodes'][0];
    }

    async getAllTags(owner, repo, myToken) {
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${myToken}`,
            },
        });

        console.log(`Owner: ${owner} - Repo: ${repo}`)

        // return await graphqlWithAuth(
        //     `
        //       {
                
        //         repository(owner: "${owner}", name: "${repo}") {
        //             refs(refPrefix: "refs/tags/", first: 1, query: "v3.0.0") {
        //                 nodes {
        //                   repository {
        //                     releases(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
        //                       nodes {
        //                         name
        //                         createdAt
        //                         tagName
                                
        //                       }
        //                     }
        //                   }
        //                 }
        //               }
        //         }
        //       }
        //     `
            
        // );       
        return await graphqlWithAuth(
            `
              {
                
                repository(owner: "${owner}", name: "${repo}") {
                    
                            releases(first: 100, orderBy: {field: CREATED_AT, direction: DESC}) {
                              nodes {
                                name
                                createdAt
                                tagName
                                
                              
                        }
                      }
                }
              }
            `
            
        );       
        
    }
}