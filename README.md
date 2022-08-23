# VMIX-Scraper

A set of utilities to streamline running VMIX broadcasts
Scraper opens a google spreadsheet, and copies / update the current VMIX configuration to it's reference tab.

scraper - npm start <google spreadsheet url>
	Scraper gathers the input shortTitle and input number entries from the vMix configuration running on the host machine and writes them to the 2nd tab of the google spreadsheet. This provides validation data for entries in the first tab, dropdown lists of only the available inputs. It also provides VLOOKUP data ensuring that the input number on the first tab always matches the selected shortName. This is especially important if you move vMix inputs around, which will renumber them.

tester - npm tester 
	Starts a simulated vMix environment on port 8088 on the host machine, making it possible to test the scraper without actually running vMix. vMix can only be hosted on Windows machines, whereas tester can run anywhere that runs npm.

	

