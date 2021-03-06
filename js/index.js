let tests = [
"|Canvas", "treeOfLife",
"|Promises", "Promise_all",
"|Closures", "q1", "q2_1", "q2_2", "q3_1","q3_2","q4","q5_1","q5_2","q5_3","q6","q7",
"|CSS Layouts", "shapeSelector", "imageGallery", "moveImages",
"|DOM equality", "equalElements", "areEqual", 
"|Bit Manipulation", "countSetBitsInInteger", "bin2dec", "dec2bin",
"|Style Logic", "getByClassName", "eliminateInlineStyle", 
"|data sources", "cleanTree", "doBinaryTree", "doStack", "doLinkedList", "doQueue", "playHits",
"|inheritance", "inheritanceDepth", "doInheritance", 
"|basic", "defaultES6Import"
];


import {doQueue, doLinkedList, doStack, doBinaryTree, playHits} from './tests/dataStructures.js';
import {inheritanceDepth} from './tests/inheritanceDepth.js';
import {doInheritance} from './tests/protoTypeInheritance.js';
import defaultES6Import from './tests/defaultES6Import.js'; 
import {areEqual, equalElements} from './tests/domEquality.js';
import {shapeSelector} from './tests/shapeSelector.js';
import {cleanTree} from './tests/cleanTree.js';
import {eliminateInlineStyle, getByClassName} from './tests/eliminateInlineStyle.js';
import {q1,q2_1,q2_2,q3_1,q3_2,q4,q5_1,q5_2,q5_3,q6,q7} from './tests/jsClosures.js';
import {Promise_all} from './tests/promises.js';
import {imageGallery} from './tests/imageGallery.js';
import {transferUniqueImages as moveImages} from './tests/moveImages.js';
import {treeOfLife} from './tests/treeOfLife.js';
import {countSetBitsInInteger, dec2bin, bin2dec} from './tests/bitManipulation.js';




//Determine which test to run
let testsSelectEl = document.getElementById("testsSelectEl"), 
	content = document.getElementById("content"),
	desc = document.getElementById("test_description");
let goption;	
for(let test of tests){
	let option;
	if(test.startsWith("|")){
		if(goption){
			testsSelectEl.append(goption);
		}
		goption = document.createElement('optgroup');
		goption.label = test.substr(1);
	}else{
		option = document.createElement('option');
		let optionTxt = document.createTextNode(test);
	    option.appendChild(optionTxt);
	}
	if(option && goption){
	    goption.append(option);
	}
}
testsSelectEl.append(goption);
document.getElementById("justDoit").addEventListener('click', function(event){
	let testInp = document.getElementById("justDoitValue").value;
	testInp = testInp === "" ? undefined : testInp;
	let testName = testsSelectEl.value;
	window.location.hash = testName;
	content.innerHTML = "";

	runTest(testName, testInp);

});
document.getElementById("clearContent").addEventListener('click', function(event){
	content.innerHTML = "";
	desc.innerText = "";
});

function runTest (testName, testInp) {
	let output;
	initTemplate(testName);

	try{
		output = eval(testName)(testInp);
	}catch(error){
		content.insertAdjacentHTML( 'beforeend', '<p>YOU BROKE YOUR TEST!!! ' + error.message +'</p>');
	}
	
	if(output){
		if(output.description !== undefined){
			desc.innerText = output.description;
		}else{
			desc.innerText = '';
		}

		if(output.link){
			content.insertAdjacentHTML( 'beforeend', `<a href="${output.link}" class=myLink target=_blank>More Info</a>`);
		}

		let value = output.value;
		let code = output.code;
		if(code) {
			initCode(code, value);
		}
		if(value){
			if(typeof value !== 'string'){
				if(typeof value === 'object'){
					content.insertAdjacentHTML( 'beforeend', '<div id=jjson></div>');
					$("#jjson").jJsonViewer(value);
				}else{
					value = JSON.stringify(value);
			  		content.insertAdjacentHTML( 'beforeend', '<p>' + value + '</p>');
				}
	  		}else if( output.type === 'string'){
	  			content.insertAdjacentHTML( 'beforeend', '<p>' + value + '</p>');
	  		}
			window.o = value;
		}
		
	}
}
/**
 * searches for an html template with a given test name for it's id
 * clones and inserts it to #content
 * https://developer.mozilla.org/en/docs/Web/HTML/Element/template
 * @param  {[type]} testName [description]
 * @return {[type]}          [description]
 */
function initTemplate (testName){
	// Test to see if the browser supports the HTML template element by checking
	// for the presence of the template element's content attribute.
	if ('content' in document.createElement('template')) {

	  // Instantiate the table with the existing HTML tbody
	  // and the row with the template
	  var t = document.querySelector(`#${testName}Template`);
	  if(t === null) return;
	  // Clone the new row and insert it into the table
	  var tmpl = document.createElement('div');
	  tmpl.id = "template";

	  var clone = document.importNode(t.content, true);
	  tmpl.appendChild(clone);
	  content.appendChild(tmpl);

	} else {
	  // HTML template element is not supported.
	}
}

function initCode (code, silent) {
	var pre = document.createElement('pre');
	var el = document.createElement('code');
	el.innerText = code;
	pre.appendChild(el);
	content.appendChild(pre);
	hljs.highlightBlock(el);  // https://highlightjs.org
	if(!silent){
		try{
			//breakpoint here to drill down //
			new Function(code)();
			//breakpoint here to drill down //
		}catch(error){
			content.insertAdjacentHTML( 'beforeend', '<p>Exception: ' + error.message + '</p>');
		}
	}
}

// extending console.log
var console_orig = window.console.log;
window.console.log = function(msg, js, silent){
	console_orig(msg);
	if(!silent){
		if(js){
			content.insertAdjacentHTML( 'beforeend', '<p>' + msg + ' : ' + js + '</p>');
		}else{
			content.insertAdjacentHTML( 'beforeend', '<p>' + msg + '</p>');
		}
	}
};


// resolving test from hash
let testName = window.location.hash.slice(1);
if(testName){
	testsSelectEl.value = testName;
	runTest(testName, '');
}
