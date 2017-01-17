'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
	'id': 'p306',
		'vehicule' : 'peugeot 306',
		'pricePerDay' : 20,
		'pricePerKm' : 0.10
}, {
	'id': 'rr-sport',
	'pricePerDay' : 60,
	'pricePerKm' : 0.30
}, {
	'id': 'p-boxster',
	'pricePerDay' : 100,
	'pricePerKm' : 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
	'id': '1-pb-92',
		'driver' : {
		'firstName': 'Paul',
			'lastName' : 'Bismuth'
	},
		'carId' : 'p306',
			'pickupDate' : '2016-01-02',
			'returnDate' : '2016-01-02',
			'distance' : 100,
			'options' : {
			'deductibleReduction': false
		},
			'price' : 0,
				'commission' : {
				'insurance': 0,
					'assistance' : 0,
					'drivy' : 0
			}
}, {
	'id': '2-rs-92',
	'driver' : {
	'firstName': 'Rebecca',
		'lastName' : 'Solanas'
},
'carId' : 'rr-sport',
'pickupDate' : '2016-01-05',
'returnDate' : '2016-01-09',
'distance' : 300,
'options' : {
		'deductibleReduction': true
	},
		'price' : 0,
			'commission' : {
			'insurance': 0,
				'assistance' : 0,
				'drivy' : 0
		}
}, {
	'id': '3-sa-92',
	'driver' : {
	'firstName': ' Sami',
		'lastName' : 'Ameziane'
},
'carId' : 'p-boxster',
'pickupDate' : '2015-12-01',
'returnDate' : '2015-12-15',
'distance' : 1000,
'options' : {
		'deductibleReduction': true
	},
		'price' : 0,
			'commission' : {
			'insurance': 0,
				'assistance' : 0,
				'drivy' : 0
		}
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
	'rentalId': '1-pb-92',
		'payment' : [{
		'who': 'driver',
			'type' : 'debit',
			'amount' : 0
	}, {
		'who': 'owner',
		'type' : 'credit',
		'amount' : 0
	}, {
		'who': 'insurance',
		'type' : 'credit',
		'amount' : 0
	}, {
		'who': 'assistance',
		'type' : 'credit',
		'amount' : 0
	}, {
		'who': 'drivy',
		'type' : 'credit',
		'amount' : 0
	}]
}, {
	'rentalId': '2-rs-92',
	'payment' : [{
			'who': 'driver',
				'type' : 'debit',
				'amount' : 0
		},{
			'who': 'owner',
			'type' : 'credit',
			'amount' : 0
		},{
			'who': 'insurance',
			'type' : 'credit',
			'amount' : 0
		},{
			'who': 'assistance',
			'type' : 'credit',
			'amount' : 0
		},{
			'who': 'drivy',
			'type' : 'credit',
			'amount' : 0
		}]
}, {
	'rentalId': '3-sa-92',
	'payment' : [{
				'who': 'driver',
					'type' : 'debit',
					'amount' : 0
			},{
				'who': 'owner',
				'type' : 'credit',
				'amount' : 0
			},{
				'who': 'insurance',
				'type' : 'credit',
				'amount' : 0
			},{
				'who': 'assistance',
				'type' : 'credit',
				'amount' : 0
			},{
				'who': 'drivy',
				'type' : 'credit',
				'amount' : 0
			}]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
	'rentalId': '1-pb-92',
		'returnDate' : '2016-01-04',
		'distance' : 150
}, {
	'rentalId': '3-sa-92',
	'pickupDate' : '2015-12-05'
}];

//EXO 1
function dateDiff(date1, date2) {
	var diff = {}                           // Initialisation du retour
	var date1 = new Date(date1);
	var date2 = new Date(date2);
	var tmp = date2 - date1;
	tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
	diff.sec = tmp % 60;                    // Extraction du nombre de secondes

	tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
	diff.min = tmp % 60;                    // Extraction du nombre de minutes

	tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
	diff.hour = tmp % 24;                   // Extraction du nombre d'heures

	tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
	diff.day = tmp;
	return diff.day;
}

//Exo2 
function price() {

	for (var i = 0; i < rentals.length; i++)
	{
		for (var j = 0; j < cars.length; j++)
		{
			if (cars[j].id == rentals[i].carId)
			{
				//Exercice 1 et 2
				var temps = dateDiff(rentals[i].pickupDate, rentals[i].returnDate);

				if (temps == 0) { rentals[i].price = rentals[i].distance*cars[j].pricePerKm + (temps + 1)*cars[j].pricePerDay; }
				else if (temps > 0 && temps <= 3) { rentals[i].price = rentals[i].distance*cars[j].pricePerKm + (temps + 1)*(cars[j].pricePerDay*0.9); }
				else if (temps > 3 && temps <= 9) { rentals[i].price = rentals[i].distance*cars[j].pricePerKm + (temps + 1)*(cars[j].pricePerDay*0.7); }
				else if (temps > 9) { rentals[i].price = rentals[i].distance*cars[j].pricePerKm + (temps + 1)*(cars[j].pricePerDay*0.5); }
				
//Exo 3
				var com = rentals[i].price*0.3;
				rentals[i].commission.insurance = com*0.5;
				rentals[i].commission.assistance = 1*temps+1;
				
//Exo 4
				var deduc = 0;
				if (rentals[i].options.deductibleReduction == true) { deduc = (temps + 1) * 4; }
				rentals[i].commission.drivy = com - rentals[i].commission.insurance - rentals[i].commission.assistance + deduc;
				rentals[i].price = rentals[i].price + deduc;
			}
		}
		
//Exo 5
		for (var k = 0; k < actors.length; k++)
		{
			if (actors[k].rentalId == rentals[i].id) {
				for (var l = 0; l < actors[k].payment.length; l++)
				{
					if (actors[k].payment[l].who == "driver") { actors[k].payment[l].amount = rentals[k].price; }
					else if (actors[k].payment[l].who == "insurance") { actors[k].payment[l].amount = rentals[k].commission.insurance; }
					else if (actors[k].payment[l].who == "assistance") { actors[k].payment[l].amount = rentals[k].commission.assistance; }
					else if (actors[k].payment[l].who == "drivy") { actors[k].payment[l].amount = rentals[k].commission.drivy; }
					else if (actors[k].payment[l].who == "owner") { actors[k].payment[l].amount = rentals[k].price-rentals[k].commission.drivy-rentals[k].commission.assistance-rentals[k].commission.insurance; }
				}
			}
		}


	}
}
price();
//slight modification
console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);