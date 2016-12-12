var ejs = require("ejs");
var soap = require('soap');
var baseURL = "http://localhost:8080/WebServices_Calculator/services";

function showCalci(req, res) {
	
	res.render('home',{ data: "" });
}

function performOperation (req,res){
		var total ;
		var operation = req.param("operation");
		console.log("selected operation is:"+operation);
		var number1 = parseFloat(req.param("number1"));
		console.log("number1:"+number1);
		var number2 = parseFloat(req.param("number2"));
		console.log("number2:"+number2);
		
		if(operation == "noOperation"){
			res.render('home',{ data: "Please select an operation to be performed!" });
			res.end(); 
		}
		
			//total = number1 + number2;
			var args = {number1:number1 , number2:number2};
			var option = {
					ignoredNamespaces : true	
				};
			var url = baseURL+"/ValidateCalci?wsdl";
			if(operation == "add"){
			soap.createClient(url,option, function(err, client) {
			      client.addNumbers(args, function(err, result) {
			    	  if(result.addNumbersReturn && result.addNumbersReturn.length>2){
			    		  console.log(result.addNumbersReturn);
			    		  var jsonParse = JSON.parse(result.addNumbersReturn);
			    		  console.log(jsonParse);
			    		  total = jsonParse.total;
			    		  total = parseFloat(total);
			    	  }
			      });
			  });
		}
		if(operation == "substract"){	
			soap.createClient(url,option, function(err, client) {
			      client.subTract(args, function(err, result) {
			    	  if(result.subTractReturn && result.subTractReturn.length>2){
			    		  var jsonParse = JSON.parse(result.subTractReturn);
			    		  console.log(jsonParse);
			    		  total = jsonParse.total;
			    		  total = parseFloat(total);
			    	  }
			      });
			  });
		}
		if(operation == "multiply"){	
			soap.createClient(url,option, function(err, client) {
			      client.multiply(args, function(err, result) {
			    	  if(result.multiplyReturn && result.multiplyReturn.length>2){
			    		  //console.log(result.addNumbersReturn);
			    		  var jsonParse = JSON.parse(result.multiplyReturn);
			    		  console.log(jsonParse);
			    		  total = jsonParse.total;
			    		  total = parseFloat(total);
			    	  }
			      });
			  });
		}
		if(operation == "divide"){
			if(number2==0){
				total = "You cannot divide by zero.!!!!";
			}
			else{
				soap.createClient(url,option, function(err, client) {
				      client.divide(args, function(err, result) {
				    	  if(result.divideReturn && result.divideReturn.length>2){
				    		  var jsonParse = JSON.parse(result.divideReturn);
				    		  console.log(jsonParse);
				    		  total = jsonParse.total;
				    		  total = parseFloat(total);
				    	  }
				      });
				  });
			}
		}
	
	res.render('home',{ data: "Your result is : "+total });
	res.end();
}


exports.showCalci = showCalci;
exports.performOperation = performOperation;