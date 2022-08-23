const { GoogleSpreadsheet } = require('google-spreadsheet');

async function accessSpreadsheet() {
	const doc = new GoogleSpreadsheet('1abwU_-dk4q9w_PWe17Z87_8Tvd-c9RtQIuwJrImxNxQ');

	await doc.useServiceAccountAuth({
	  // env var values are copied from service account credentials generated by google
	  // see "Authentication" section in docs for more info
	  client_email: "vmix-scraper-account@vmix-scraper.iam.gserviceaccount.com",
	  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDaMZdJv/2gZqoL\nwrZulDTX283ySr4Dw/MNtZOjGYZEAgml3aWSiOQWYaJRudRDuDzTFtHEu06P/8rG\nJZpIJkVTK5EwAW3eAkruvu4c7PXpJ4aLccKsaXhit9Ls4S0Hm8CzYnH045vVbpQj\nCw8QiRTVybaEnAce7za9eyth0n0QcKj6M/gZkfqzpWovyFt9a+AocbSEr6nFgyId\n3A8gDXR43o6KpwA6jFJ3si9cqy7WAQKUJQF3ZDAhTXaHxYya7TtNceMPqPALbBDw\nCwvFnGFkSVvtjYLlBcZuJyDkYt+yqYFx4vToXp3fSply2Ijhsif8nUwRRyxkg3XD\nAvsQfdQTAgMBAAECggEATFP4xpXhFZGUftS4mOpDqhd8bfvziMGtbuhMI0w0ienk\nkh99Ykt87s9sxwYo2R/EN1vOOfIEQ5+JwdM5q2+n5LZi7dYyJu3KZMZp6biDNfLb\nwEAlh8bFlFMV+EO1SuoTeS1BDBfrVbh/Hdsqg/BQV5FexfkHDK1GCvbhcDEACxWY\ncXazvTn5ULKrfry7tVtoRefNgaY0fjxQJHpZTFSit7g3XzimpRlN3xnccTNJZ4LI\neD8sVVutS5Sy2sCL/L7dSjZdXWhshXq80uCpo4a+Z1nm8viaCbq2e+L8cK2QIgND\n/Nc8hgDfjuH7hEOxXXhsqQf5W6e9bmNqgXP8VlqjUQKBgQD8UPLce/mIF9hr3vuR\n/6t++cEgBDAXHCQr/n5Fdzfox/d4ylhpzwYjJej9wvnrwDJUmpKiVIo2KaVgIPea\ndi+qq3e6nNDXIJyF9S5c4QV1yxbB58MLLaTP8aN3QNWEwA0nq/XuNmR5gkJn6mC7\nUSIiFoFiV4/Vh0qHe27tGaCtpQKBgQDdYRtaJeUy/1w2BSJWuOu1kCYfr4MOImIK\nAxwnhC/Y9VHYdEOIzMLrRGOm5v0vwitQ4W8fxbOZ/Vn8MGidMp8240grwaLmzb3l\nix1ly7qb2OMduzRhZvj6s1jY4FeAhB16fUlEdCUA4SKbz8654GeISItqek0ilPG5\nXRoCMPC9VwKBgQCNVi7ksRGTWYAi1NJo8yW2x+KVs6LYnyvn9PP4p5KK89C9OeOS\nyaPvdmHwHBLxK0VGPRvckKynMGbx1SW9wWxsFwbHYuZdS2hCZZgl8OqlFDFYRyHr\nlhLXZM0jlQ7GAOqdiWcGnDNmGUBng1PSOd176M1rMA9jFhj6kXsOl6d4/QKBgAmx\n1PbPrgfbsvgSpXxSwM/Erka48u5NhymVFUiNu2Ku65SlEsgM34RaDFskxnWu9SKn\nnKwxhjn6JFSs8gfgTaSjs2dnJXEiFWzV+MWadGOazedhaVvSnJit/fgRawOPxZK1\npd2/kFdHhLJ6GT1+nEoVkzVogbQ//Y32i8sIxaIlAoGBAJc862lnGqnguqNnOfp4\nXPRaG6Q07uWGVmLr6xeFXWTYMFBgd3kPpYE1YsWEcoWSdPCcVPXoJh5cwIfPb9Jt\njIrW5HNx6IJOKnILvbT00rjvxbjUxQJJ9u3uGhSBj3ikoOxQzleNY6r8B3rMNSC1\ng46IKON/KInNYhmdZDxgC7zB\n-----END PRIVATE KEY-----\n",
	});

	await doc.loadInfo(); // loads document properties and worksheets
	console.log(doc.title);

	const sheet1 = doc.sheetsByIndex[0]; // or sheetsByIndex[] or doc.sheetsById[id] or doc.sheetsByTitle[title]
	//const sheet = doc.sheetsByTitle[""]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
	console.log(sheet1.title);
	console.log(sheet1.rowCount);
	const sheet2 = doc.sheetsByIndex[1]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
	console.log(sheet2.title);
	console.log(sheet2.rowCount);
}

accessSpreadsheet();

