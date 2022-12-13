'use strict';

const _ = require('lodash');
const compareVersions = require('compare-versions');
const semverSort = require('semver/functions/sort')


module.exports = class JsonUtils {

    constructor(jsonObj) {
        this.jsonObj = jsonObj
    }

    upgradeVersion(version, type, prefix) {
        let versionObject = version.replace(prefix, '').split('.')
        let updatedVersion = ''
        let major, minor, patch = ''
        
        switch(type.toLowerCase()) {
            case 'major': 
                major = parseInt(versionObject[0]) +1
                minor = 0
                patch = 0
                updatedVersion = `${major}.${minor}.${patch}`
                break;
            case 'minor': 
                major = parseInt(versionObject[0])
                minor = parseInt(versionObject[1]) +1
                patch = 0
                updatedVersion = `${major}.${minor}.${patch}`
                break;
            case 'patch': 
                major = parseInt(versionObject[0])
                minor = parseInt(versionObject[1])
                patch = parseInt(versionObject[2]) +1
                updatedVersion = `${major}.${minor}.${patch}`
                break;
        }
        
        return `${prefix}${updatedVersion}`;

    }

    firstItem(keyName) {
        console.log("KEY NAME: ", JSON.stringify(this.jsonObj))
        let first = this.jsonObj[0][keyName]
        return first
    }

    filterByPrefix(prefix) {
        let matched = _.filter(this.jsonObj, function(obj) { 
            return obj.tagName.startsWith(prefix)
        })

        let plain = _.map(matched, function(o){
            let version = o.tagName.replace(prefix, '').split('.')
            let obj = {
                "name": o.name,
                "createdAt": o.createdAt,
                "tagName": o.tagName,
                "tag": parseInt(o.tagName.replace(prefix, '').replace(/\./g, '')),
                "major": parseInt(version[0]),
                "minor": parseInt(version[1]),
                "patch": parseInt(version[2])
            }
                        
            return obj
        })
        
        let sorted = _.orderBy(plain, ['major', 'minor', 'patch'], ['desc', 'desc', 'desc'])
        
        if(prefix != '') {
            this.jsonObj = sorted;
        }

        return sorted;
    }

    filterNoPrefix() {
        console.log("INTERNAL OBJ: ", JSON.stringify(this.jsonObj))
        let matched = _.filter(this.jsonObj, function(obj) { 
            
            let o = obj.tagName.split('.')
            if(!isNaN(o[0])){
                obj.major = parseInt(o[0])
                obj.minor = parseInt(o[1])
                obj.patch = parseInt(o[2])
                obj.tag = parseInt(obj.tagName.replace(/\./g, ''))
                return obj
            }
            
        })

        let plain = _.map(matched, function(o){
            
            let obj = {
                "name": o.name,
                "createdAt": o.createdAt,
                "tagName": o.tagName,
                "tag": parseInt(o.tagName.replace(/\./g, ''))
            }
            
            return obj
        })
        let sorted = _.orderBy(matched, ['major', 'minor', 'patch'], ['desc', 'desc', 'desc'])
       
        this.jsonObj = sorted;

        return sorted;
    }
}