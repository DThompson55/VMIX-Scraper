A set of utilities to streamline configuring and running vMix broadcasts. vMix only runs on Windows platforms, but these tools were developed on MacOS.

### vMix-Scraper
Scraper copies / updates parts of the current vMix configuration to a Google spreadsheet where it information can be used for data validations and with other forulae from other spreadsheets.
### vMix2File
vMix2File copies parts of the current vMix configuration to a file in CSV format, where you can copy it to any other workbook, providing information can be used for data validations and with other forulae from other spreadsheets.
### tester
stands up a mock vMix server that can be used to test the other utilities

# mVixScraper

vmix-scraper gathers the 'input shortTitle' and 'input number' entries from the vMix configuration running on the host machine and writes them to a google spreadsheet. This provides validation data for entries from other spreadsheets and dropdown lists of the available VMIX inputs. It also provides VLOOKUP data ensuring that input numbers always matches the selected shortName. This is especially important if you move vMix inputs around, which will renumber them.

### Steps for using vmix-scraper
1. Make sure vMix is running
2. Find VMIX-Scraper on the desktop, and double click to run

### Alternative Steps for using vmix-scraper
1. Make sure vMix is running
2. Open a Windows command line prompt (cmd)
3. Type “cd <your install directory>” (cd \users\VirtualTeam\vmix-scraper)
4. Type scrape 
or 
4. Type npm run 2googlesheet <url of your google sheet>

---
## Advanced

### Steps for configuring vmix-scraper
1. Start vMix (or alternatively the tester packaged with these utilities)
2. In a browser, open your google drive and share the reference data google sheet with this email address vmix-scraper-service-account@vmix-scraper.iam.gserviceaccount.com
3. In a browser, open the current google sheet holding the reference data, and copy (ctrl-c) its URL
4. Open <your install directory>\scraper.bat” in a text editor 
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
2) Enter this formulat in cell A1 =IMPORTRANGE("https://docs.google.com/spreadsheets/d/1Os6rYbRHxcZH28VbXHibOhYAwsQ-j6630tCd1Mc0tYU","$A:$B")
	where the URL is the URL of the reference data spreadsheet (see step 3 of Steps for configuring vmix-scraper)

### Configuring Windows shortcut
1) Configure a windows shortcut...


# mVixScraper

First, start vMix

vmix-scraper gathers the 'input shortTitle' and 'input number' entries from the vMix configuration running on the host machine and writes them to a local file. This provides validation data for entries from other spreadsheets and dropdown lists of the available VMIX inputs. It also provides VLOOKUP data ensuring that input numbers always matches the selected shortName. This is especially important if you move vMix inputs around, which will renumber them.

### Steps for using vmix2file
1. Make sure vMix is running
2. Find VMIX-2File on the desktop, and double click to run

### Alternative Steps for using vmix-scraper
1. Make sure vMix is running
2. Open a Windows command line prompt (cmd)
3. Type “cd <your install directory>” (cd \users\VirtualTeam\vmix-scraper)
4. Type vmix2file <filename>
	where filename is the output file where you want to store vMix data in CSV format
alternatively
4. Type npm run 2file <filename>
	
---
## Advanced

### Steps for configuring vmix2File
1. Start vMix (or alternatively the tester packaged with these utilities)
4. Open <your install directory>\scrape2File.bat” in a text editor, change the output file name to one of your choosing
	Close the text editor

### Configuring data validation in a Service Plan
see instructions for vmix-scraper

### Configuring camera shot numbers in a Service Plan
see instructions for vmix-scraper

### Configurating the 'Camera Shot Pulldown' to sync with reference data
see instructions for vmix-scraper

### Configuring Windows shortcut
Configure a windows shortcut...

----


# tester - npm test 

Starts a simulated vMix environment on port 8088 on the host machine, making it possible to test the vmix-scraper utility without actually running vMix. vMix can only be hosted on Windows machines, whereas tester can run anywhere that runs npm. When you query the vMix API with no parameters it returns its current configuration as an XML payload. Tester simulates a connection to an actual vMix server, sending an archived vMix configuration.

