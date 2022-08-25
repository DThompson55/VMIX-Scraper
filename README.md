A set of utilities to streamline configuring and running vMix broadcasts. vMix only runs on Windows platforms, but these tools were developed on MacOS.

# vMix-Scraper
Scraper copies / updates parts of the current vMix configuration to a Google spreadsheet's 2nd (reference) tab, where it information can be used for data validations and with other forulae.

This utility requires a Google Cloud service account, as that's the only way to access Google spreadsheets. Go to your Google Cloud console https://console.cloud.google.com/
From there, create service account, enable the google-sheets API, then create and download json key file. Rename it credentials.json. Place it in the root folder of this project, at the same level as the package.json. In it, you will find the service email address that is used for sharing your google spreadsheet with these utilities.

Starting on any platform
npm start &lt;google spreadsheet url&gt;
or on MacOs
./scraper.sh &lt;google spreadsheet url&gt;
or on Windows
scraper &lt;google spreadsheet url&gt;


Scraper gathers the input shortTitle and input number entries from the vMix configuration running on the host machine and writes them to the 2nd tab of the google spreadsheet. This provides validation data for entries in the first tab, dropdown lists of only the available inputs. It also provides VLOOKUP data ensuring that the input number on the first tab always matches the selected shortName. This is especially important if you move vMix inputs around, which will renumber them.


Steps for using vmix-scraper
1. Start vMix (or alternatively the tester packaged with these utilities)
2. Open a Windows command line prompt
3. Type “cd <your install directory>”
4. In a browser, open your google drive and share the current Sunday service script with this email address vmix-scraper-service-account@vmix-scraper.iam.gserviceaccount.com 
5. In a browser, open the current Sunday service script, and copy (ctrl-c) its URL
6. Back at the Windows command prompt enter the command scraper and then paste the URL of the google sheet (ctrl-v)

Note that in step 4, your email address will be different depending on your security configuration in google cloud console





tester - npm test 

Starts a simulated vMix environment on port 8088 on the host machine, making it possible to test the vmix-scraper utility without actually running vMix. vMix can only be hosted on Windows machines, whereas tester can run anywhere that runs npm. Normally, when you queuy the vMix API with no parameters, it returns its current configuration as an XML payload. The tester sends an archived vMix configuration, simulating a connection to an actual vMix server.


TTD
- [x] 1) Test basic concept, can we save the vMix configuration to a csv file
- [x] 2) Swap out csv for a google spreadsheet
- [x] 3) Fix security hole
- [ ] 4) Make it easier to copy/paste the google sheet URL into the utility
- [ ] 5) How to provide a sample google spreadsheet in the documentation?

