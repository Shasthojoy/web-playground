//class declaration done in the form of class expression 
//for es6 module loader, export function to know off class Queue, otherwize Queue would be undefined
//so classic "class Queue {" would simpy not work cause babel export support is yet experimental 
//while no js runtime yet implemented es6 modules 

// Queue is a FIFO
let Queue = class {
	constructor () {
		this.queue = [];
	}

	dequeue (){
		// pulls out the element in index 0 and moves the content by an index.
		return this.queue.shift();
	}

	enqueue (item){
		// adds to the end of the array
		this.queue.push(item);
	}

	//get the item at the front of the queue
	peek () {
		return this.queue[0];
	}

	toString() {
        return this.queue.toString();
    }
}

export function doQueue () {
	let q = new Queue ();
	q.enqueue(1);
	q.enqueue(2);
	q.enqueue(3);
	q.dequeue();
	return { value: q, 
		description: "queue implementation. enqueue 1 2 3 and then dequeue"};
};

///////////////////////////////////////////////////////////////////////////////
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
//Stack is a LIFO
let Stack = class {
	constructor () {
		this.s = [];
	}
	push (item) {
		this.s.push(item);
	}
	pop () {
		return this.s.pop();
	}
	isEmpty () {
		return this.s.length === 0;
	}
	top () {
		return this.s.slice(-1)[0];
	}
	toString () {
		return this.s.toString();
	}
}
export function doStack (){
	let stack = new Stack ();
	stack.push(1);
	stack.push(2);
	stack.push(3);
	stack.pop();

	return {
		value: stack,
		description: "Stack implementation of: push pop top isEmpty"
	};
}

///////////////////////////////////////////////////////////////////////////////

// LinkedList
let Node = class {
	constructor (item, next) {
		this.item = item;
		this.next = next && new Node(next);
	}
	appendToTail (item) {
		let n = this;
		while(n.next) { n = n.next; }
		n.next = new Node(item);
	}
	deleteNode (item) {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness
		let nn = this, n;
		while(nn.item !== item) { 
			if(nn.next !== undefined){
				n = nn;
				nn = n.next;
			} else return;
		}
		n.next = nn.next;
		delete nn.item;
	}
	toString () {
		let print = "";
		let n = this;
		while(n.next) { 
			print += n.item + ":"; 
			n = n.next; 
		}
		print += n.item; 
		return print;
	}
}
export function doLinkedList () {
	let head = new Node (1);
	head.appendToTail(2);
	head.appendToTail(3);
	head.appendToTail(4);
	head.appendToTail(5);
	head.deleteNode(3);
	return {
		value: head,
		description: "LinkedList: appendToTail 1 through 5 and deleteNode 3."
	};
}


///////////////////////////////////////////////////////////////////////////////
// Binary Whole Tree Implementation

let indentCenter = 50, indentPadding = 5;
let BinaryTreeNode = class {
	constructor (data, itemL, itemR) {
		this.data = data;
		this.add(itemL, itemR);
	}
	add (itemL, itemR) {
		if(itemL) this.lChild = new BinaryTreeNode(itemL);
		if(itemR) this.rChild = new BinaryTreeNode(itemR);
	}
	toString () {
		let pArr = this.print("0").split('\n');
		let print = this.beautify(pArr);
		return `${this.print("0")}\n${print}`;
	}
	print (i) {
		let print = `${i}:${this.data}`;
		let n = this;
		if(n.lChild || n.rChild){
			print += `\n${n.lChild.print(i+"0")}\n${n.rChild.print(i+"1")}`;
		}
		return print;
	}
	/**
	 * FIX THE MESS
	 * strategy: use a bitewize operation to exponentially find nodes on the same level
	 * Number('0b111') = 7
	 * 
	 * Example input: a structure where the last is the rightmost node
	 * 0:a
	 * 00:aa
	 * 000:aaa
	 * 001:aab
	 * 01:ab
	 * 010:aba
	 * 011:abb
	 */
	beautify (arr) {
		let str= ``;
		let len = arr.length;
		let i = len-1;
		let indent;
		
		for( ; i > -1; i--){
			let row= arr[i];
			let el = row.split(":");
			let value = el[1];
			let doBreakline = indent !== el[0].length;
			indent= el[0].length;
			
			str = `${' '.repeat(indentPadding*(len-i))}${value}${doBreakline ? '\n' : ''}${str}`;
			

		}
		return str;
	}
}
export function doBinaryTree () {
	let bt = new BinaryTreeNode ("a", "aa", "ab");
	bt.lChild.add("aaa", "aab");
	bt.rChild.add("aba", "abb");
	bt.lChild.lChild.add("aaaa", "aaab");
	bt.lChild.rChild.add("aaba", "aabb");
	bt.rChild.lChild.add("aaaa", "aaab");
	bt.rChild.rChild.add("abba", "abbb");

	return {
		value: bt,
		description: "Binary Whole Tree Implementation"
	};
}

///////////////////////////////////////////////////////////////////////////////
// Dropbox interview question
export function playHits (){	
	return {
		description: 'a service exposing log_hit and when get_hits is called returns the number of hits in the last 5 hours',
		code: `
let hits = [];
const timeframe = 1000; // in reality set to 5h= 5 * 60 * 60 * 1000;
function get_hits (){
	clean_hits();
	console.log(hits.length);
	return hits.length;
}
function log_hit () {
	hits.push(Date.now());
	clean_hits();
}
function clean_hits (){
	let from = Date.now() - timeframe;
	for(var i = 0; from > hits[i] && i < hits.length; i++) {}
	hits = hits.slice(i);	
}

//test it
for(var i = 0; i < 10; i++){
	log_hit();
}
setTimeout(log_hit, timeframe);
setTimeout(get_hits, timeframe);

		`
	}
}
