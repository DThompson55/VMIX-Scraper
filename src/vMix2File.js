'use strict';
var fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const axios = require('axios').default;

const vMix = require('./vMixHelper.js')

function VMIX_XMLtoFile(path, vMixCfg){
    var keyBag = [];
    var numberBag = [];
    var shortTitleBag = [];
    var shortTitleList = [];
    for (var i = 0; i < vMixCfg.vmix.inputs[0].input.length; i++) {
        let row = vMixCfg.vmix.inputs[0].input[i].$;
        if (keyBag[row.key]){if (verbose) console.log("Duplcate key from vMix at row:",i,"key:",row.key);mismatch=true;}
        if (numberBag[row.number]){if (verbose) console.log("Duplicate INPUT number from vMix at row:",i,"key:",row.key);mismatch=true;}
        if (shortTitleBag[row.shortTitle]){if (verbose) console.log("Duplcate INPUT shortTitle from vMix at row:",i,"key:",row.key);mismatch=true;}
        keyBag[vMixCfg.vmix.inputs[0].input[i].$.key] = row;
        numberBag[vMixCfg.vmix.inputs[0].input[i].$.number] = "OK";
        shortTitleBag[vMixCfg.vmix.inputs[0].input[i].$.shortTitle] = row.number;
        shortTitleList.push([vMixCfg.vmix.inputs[0].input[i].$.shortTitle,row.number])
    }

    var csv = shortTitleList.sort();

        fs.writeFile(path, "", function (err) {
        if (err) {
          console.log(err)
        }
        else {
          for (let i of csv){
              var value = '"'+i[0]+'", '+i[1]+"\n";
                fs.appendFile(path, value, function (err) {
                })
              }
              console.log("Done!")
        }}) 
      }

function selfTest(){
  if (process.argv.length != 3){
    console.log ("Usage: npm start <Path to your output file>")
    return;
  }

  var path = process.argv[2];
  console.log("Connecting to vMix...");
  vMix.connect( (err,ctx)=> {
    if (err){
      console.log(ctx.vMixStatus);
      console.log("Make sure you started VMIX before running this app")

    } else {
      console.log("vMix is",ctx.vMixStatus);
      VMIX_XMLtoFile(path, ctx.vMixCfg)
    }
  })
}

selfTest()

