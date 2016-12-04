let tests = ["inheritanceDepth", "doInheritance", "defaultES6Import"];
import defaultES6Import from 'js/defaultES6Import.js';  //demonstrate "default" es6 import
import {doInheritance} from 'js/protoTypeInheritance.js';
import {inheritanceDepth} from 'js/inheritanceDepth.js';

//Determine which test to run
let value, 
	testsSelectEl = document.getElementById("testsSelectEl"), 
	content = document.getElementById("content");
for(let test in tests){
	let option = document.createElement('option');
	let optionTxt = document.createTextNode(tests[test]);
    option.appendChild(optionTxt);
	testsSelectEl.append(option);
}
document.getElementById("justDoit").addEventListener('click', function(event){
	value= document.getElementById("justDoitValue").value;
	value = value === "" ? undefined : value;
	let testName = testsSelectEl.value;
	let output = eval(testName)(value);
	if(output){
  		content.insertAdjacentHTML( 'beforeend', '<p>' + output + '</p>');
	}
});
document.getElementById("clearContent").addEventListener('click', function(event){
	content.innerHTML = "";
});




/*document.onreadystatechange = function () {
	if (document.readyState == "complete") {
		console.log('DOM is ready!!');
	}
 }
document.addEventListener("DOMContentLoaded", function(event) { 
	console.log('DOM is ready!!!');
});*/

