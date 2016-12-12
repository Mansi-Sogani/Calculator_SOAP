package com.calci;

import javax.jws.WebService;


@WebService
public class ValidateCalci {

	float total;
	
	public Float addNumbers(Float number1, Float number2){
		return  total  = number1+number2;

	}
	public Float subTract(Float number1, Float number2){
		return  total  = number1-number2;

	}
	public Float multiply(Float number1, Float number2){
		return  total  = number1*number2;

	}
	public Float divide(Float number1, Float number2){
		return  total  = number1/number2;

	}
	
	
}
