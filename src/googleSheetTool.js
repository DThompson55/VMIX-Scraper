const { GoogleSpreadsheet } = require('google-spreadsheet');
const secrets = require('../credentials.json')
const vMix = require('./vMixHelper.js')

//
// https://docs.google.com/spreadsheets/d/1Os6rYbRHxcZH28VbXHibOhYAwsQ-j6630tCd1Mc0tYU
//

async function updateGSheet(sheetGUID,  vMixCfg, callback){
const gSheet = new GoogleSpreadsheet(sheetGUID);

	await gSheet.useServiceAccountAuth({
	  // env var values are copied from service account credentials generated by google
	  // see "Authentication" section in docs for more info
	  client_email: secrets.client_email,
	  private_key: secrets.private_key
	});

	console.log("Connecting to google sheet",sheetGUID)
	try {
	await gSheet.loadInfo(); // loads document properties and worksheets
	} catch (e) {
		console.log("error:",e.response.data.error)
		if (e.response.data.error.code == 403){
			console.log ("Make sure you share your google sheet with this email address");
			console.log("\t"+secrets.client_email)
		}
		if (e.response.data.error.code == 404){
			console.log ("Make sure you share you copied the URL of your google-spreadsheet as the last commandline argument")
	    console.log ("Open your google sheet in a browser")
			console.log ("Copy the entire URL from the browser")
			console.log ("Paste the URL on the commandline after 'npm start '")
		}
		return
	}

	const vmixcfgSheet = gSheet.sheetsByIndex[0];
	console.log("Connected to google sheet")
	console.log("Sheet name is ",vmixcfgSheet.title)

  var shortTitleList = [];
  for (var i = 0; i < vMixCfg.vmix.inputs[0].input.length; i++) {
      let row = vMixCfg.vmix.inputs[0].input[i].$;
      if (vMixCfg.vmix.inputs[0].input[i].$.type != "Audio")
      shortTitleList.push([vMixCfg.vmix.inputs[0].input[i].$.shortTitle,row.number])
  }

  var sortedList = shortTitleList.sort();

  var max = vMixCfg.vmix.inputs[0].input.length
  var range ='A1:B'+(vmixcfgSheet.rowCount)
	//console.log("Availble cells for '",vmixcfgSheet.title,"' is",range)
	vmixcfgSheet.clear(range) 

	await vmixcfgSheet.loadCells(range); // loads range of cells into local cache - DOES NOT RETURN THE CELLS

	for (i = 0 ; i < max ; i++){
		const a = vmixcfgSheet.getCell(i, 0); // access cells using a zero-based index
		const b = vmixcfgSheet.getCell(i, 1); // access cells using a zero-based index
//		console.log(i,a.value, b.value, sortedList[i] )
		a.value = sortedList[i][0]
		b.value = sortedList[i][1]
		process.stdout.write(".");
	}

	await vmixcfgSheet.saveUpdatedCells(); // save all updates in one call
	console.log("\n"+max,"rows updated.")
}

function selfTest(){
	var wordArg = 2;
	if (process.argv.length == 4){
		wordArg = 3;
	} else
	if (process.argv.length != 3){
		console.log ("Usage: npm start <URL of your vMix spreadsheet>")
		console.log ("Your google sheet must be 'shared' with the following email address:");
		console.log ("\t"+secrets.client_email)
		return;
	}
	const words = process.argv[wordArg].split('/');
	if (words.length < 6){
		console.log ("Did not recognize that URL. Copy/Paste it from your browser. It should look similar to this");
		console.log ("https://https://docs.google.com/spreadsheets/d/1Os6rYbRHxcZH28VbXHibOhYAwsQ-j6630tCd1Mc0tYU/edit#gid=0");
		return;
	}

	var sheetID = words[5];
	console.log("Connecting to vMix...");
	vMix.connect( (err,ctx)=> {
		if (err){
			console.log(ctx.vMixStatus);
			console.log("Make sure you started VMIX before running this app")

		} else {
			console.log("vMix is",ctx.vMixStatus);
			updateGSheet(sheetID, ctx.vMixCfg)
		}
	})
}

selfTest()


module.exports = {load:updateGSheet}
