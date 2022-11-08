## A set of utilities to streamline configuring and running vMix broadcasts. vMix only runs on Windows platforms, but these tools were developed on MacOS.

### vMix-Scraper
Scraper copies / updates parts of the current vMix configuration to a Google spreadsheet where it information can be used for data validations and with other forulae from other spreadsheets.
### tester
Stands up a mock vMix server that can be used to test the other utilities

vmix-scraper gathers the 'input shortTitle' and 'input number' entries from the vMix configuration running on the host machine and writes them to a google spreadsheet. This provides validation data for entries from other spreadsheets and dropdown lists of the available VMIX inputs. It also provides VLOOKUP data ensuring that input numbers always matches the selected shortName. This is especially important if you move vMix inputs around, which will renumber them.

You should run vMixScraper any time you add a new vMix input, that way the google sheet will always match the names and numbers of the vMix inputs.

### Steps for using vmix-scraper
1. Make sure vMix is running
2. Find VMIX-Scraper on the desktop, and double click to run

---
## The really technical stuff

### Prereqs
1. Obivously you need Git, so make sure you have that installed.
2. Download and install npm
3. A google docs account
4. If you don't already have one, create a Google Cloud Account
5. Create Google API Service Account in the Google Cloud Console, under the APIs tab. Give it permission to read and write google sheets. Save the service account key to a text file named credentials.json


### Install
1. Clone this git repo
2. Move to the cloned folder and run npm install.
3. Move your credentials.json file to the cloned folder.
4. Copy these two google sheets to your google docs, the template and camera shot sheets.
https://drive.google.com/drive/folders/1V9hYDnMyMsQzqDJ8s7YyZgx8tdY-K2lZ?usp=sharing

### Configure
1. Grant permission for your google service account to access the reference data sheet. In a browser, open your google drive and share the reference data google sheet with this your service account's email address.
2. In a browser, open the google sheet holding the reference data, and copy (ctrl-c) its URL
3. Open <your install directory>\scraper.bat” in a text editor 
	Replace the existing document URL with the one you just copied in step3
	Close the text editor

### Configuring data validation in a Service Plan
1) Highlight all of the cells containing Camera Shot Names
2) Select Data -> Data Validation from the menu
3) For the range of values enter 'Camera Shot Pulldown'!$A:$A

### Configuring camera shot numbers in a Service Plan
1) Highlight all of the cells containing Camera Shot Numbers
2) Edit the formula to be =vlookup(C8,'Camera Shot Pulldown'!$A:$B,2,true)

### Configurating the 'Camera Shot Pulldown' to sync with reference data
1) In the 'Camera Shot Pulldown' highlight all columns and delete them
2) Enter this formulat in cell A1 =IMPORTRANGE("<URL>","$A:$B")
	where the URL is the URL of the reference data spreadsheet 

### Configuring Windows shortcut
1) Configure a windows shortcut... Normally, I create a windows shortcut of the scraper.bat file and put it on my desktop. Then any time someone wants to sync with vMix they just double click that shortcut.

# Running VixScraper

First, start vMix

vmix-scraper gathers the 'input shortTitle' and 'input number' entries from the vMix configuration running on the host machine and writes them to a local file. This provides validation data for entries from other spreadsheets and dropdown lists of the available VMIX inputs. It also provides VLOOKUP data ensuring that input numbers always matches the selected shortName. This is especially important if you move vMix inputs around, which will renumber them.

----

# tester - npm test 

Starts a simulated vMix environment on port 8088 on the host machine, making it possible to test the vmix-scraper utility without actually running vMix. vMix can only be hosted on Windows machines, whereas tester can run anywhere that runs npm. When you query the vMix API with no parameters it returns its current configuration as an XML payload. Tester simulates a connection to an actual vMix server, sending an archived vMix configuration.

