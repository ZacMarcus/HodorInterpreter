
var INCREMENT_DATA_POINTER = 			'Hodor.Hodor?';		// >
var DECREMENT_DATA_POINTER = 			'Hodor?Hodor.';		// <
var INCREMENT_BYTE_AT_DATA_POINTER = 	'Hodor.Hodor.';		// +
var DECREMENT_BYTE_AT_DATA_POINTER = 	'Hodor!Hodor!';		// -
var OUTPUT_BYTE_AT_DATA_POINTER = 		'Hodor!Hodor.';		// .
var INPUT_BYTE_AT_DATA_POINTER = 		'Hodor.Hodor!';		// ,
var START_LOOP = 						'Hodor!Hodor?';		// [
var END_LOOP = 							'Hodor?Hodor!';		// ]

// Hodor. Hodor?		increment the data pointer (to point to the next cell to the right).
// Hodor? Hodor.		decrement the data pointer (to point to the next cell to the left).
// Hodor. Hodor.		increment (increase by one) the byte at the data pointer.
// Hodor! Hodor!		decrement (decrease by one) the byte at the data pointer.
// Hodor! Hodor.		output the byte at the data pointer.
// Hodor. Hodor!		accept one byte of input, storing its value in the byte at the data pointer.
// Hodor! Hodor?		if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
// Hodor? Hodor!		if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.

var CMD_LENGTH = INCREMENT_DATA_POINTER.length;

function interpret(idIn, idOut) 
{
	//clear output
	document.getElementById(idOut).value = "";
	document.getElementById("errorAlert").style.display = 'none';
	
	var memoryField = new Array();
	var pointer = 0;
	
	var input = document.getElementById("input").value;
	var inputPosition = 0;
	
	var code = document.getElementById(idIn).value;
	
	//remove comments #
	code = code.replace(/#.*/g, "");
	
	//remove whitespace
	code = code.replace(/\s/g, "");
	
	for(var i = 0; i < code.length; i += CMD_LENGTH) 
	{
		var cmd = code.substr(i, CMD_LENGTH);

		if (pointer == memoryField.length)
		{
			memoryField[pointer] = 0;
		}

		if (cmd == INCREMENT_DATA_POINTER)
		{
			pointer++;
		}
		else if (cmd == DECREMENT_DATA_POINTER)
		{
			pointer--;
		}
		else if (cmd == INCREMENT_BYTE_AT_DATA_POINTER)
		{
			memoryField[pointer]++;
		} 
		else if (cmd == DECREMENT_BYTE_AT_DATA_POINTER) 
		{
			memoryField[pointer]--;
		} 
		else if (cmd == OUTPUT_BYTE_AT_DATA_POINTER) 
		{
			document.getElementById(idOut).value += String.fromCharCode(memoryField[pointer]);
		} 
		else if (cmd == INPUT_BYTE_AT_DATA_POINTER) 
		{
			if(inputPosition == input.length)
			{
				return;
			}

			// var c = prompt("Input:", "").charCodeAt(0);			
			var c = input.charCodeAt(inputPosition);

			memoryField[pointer] = c;
			inputPosition++;
 		}
		  
		else if (cmd == START_LOOP) 
		{
			if (memoryField[pointer] == 0) 
			{
				i = getLoopEndPosition(i, code);
			}
		} 
		else if (cmd == END_LOOP) 
		{
			i = getLoopStartPosition(i, code);
			i -= CMD_LENGTH;
		}
		else
		{
			//alert("\'" + cmd + "\' is not a valid command");
			document.getElementById("errorAlert").innerHTML = "<strong>" + cmd + "</strong> is not a valid Hodor. Hodor a few things up and try Hodoring again.";
			document.getElementById("errorAlert").style.display = 'block';
			return;
		}
		
	}
}

function getLoopEndPosition(i, code) 
{
	var found = false;
	var openBraces = 0;
	var j = i;

	while (!found) 
	{
		j += CMD_LENGTH;
		var cmd = code.substr(j, CMD_LENGTH);

		if (cmd == START_LOOP) 
		{
			openBraces++;
		} 
		else if (cmd == END_LOOP) 
		{
			if (openBraces == 0) 
			{
				found = true;
			} else 
			{
				openBraces--;
			}
		}
	}

	return j;
}

function getLoopStartPosition(i, code) 
{
	var found = false;
	var closingBraces = 0;
	var j = i;

	while (!found) 
	{
		j -= CMD_LENGTH;
		var cmd = code.substr(j, CMD_LENGTH);

		if (cmd == END_LOOP) 
		{
			closingBraces++;
		} 
		else if (cmd == START_LOOP) 
		{
			if (closingBraces == 0) 
			{
				found = true;
			} else 
			{
				closingBraces--;
			}
		}
	}

	return j;
}

function enableInputBox() 
{
	var code = document.getElementById("source").value;
	
	//remove comments #
	code = code.replace(/#.*/g, "");
	
	//remove whitespace
	code = code.replace(/\s/g, "");
	
	for(var i = 0; i < code.length; i += CMD_LENGTH) 
	{
		var cmd = code.substr(i, CMD_LENGTH);
		
		if (cmd == INPUT_BYTE_AT_DATA_POINTER) 
		{
			document.getElementById("inputDiv").style.display = 'block';
			document.getElementById("input").style.display = 'block';
			return;
		}
	}
	
	document.getElementById("inputDiv").style.display = 'none';
	document.getElementById("input").style.display = 'none';
}

function insertHelloWorld()
{
	document.getElementById("source").value = "Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor! Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor! Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor? Hodor. Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor. Hodor. Hodor? Hodor. Hodor. Hodor. Hodor? Hodor! Hodor! Hodor. Hodor? Hodor. Hodor? Hodor. Hodor. Hodor! Hodor? Hodor? Hodor. Hodor? Hodor! Hodor? Hodor. Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor? Hodor! Hodor. Hodor. Hodor? Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor! Hodor. Hodor! Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor! Hodor. Hodor. Hodor? Hodor. Hodor? Hodor! Hodor. Hodor? Hodor. Hodor! Hodor! Hodor! Hodor. Hodor? Hodor. Hodor! Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor! Hodor. Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor. Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor! Hodor. Hodor. Hodor? Hodor. Hodor? Hodor. Hodor. Hodor! Hodor. Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor! Hodor. ";
	enableInputBox();
}

function insertRot13()
{
	document.getElementById("source").value = "Hodor! Hodor! Hodor. Hodor! Hodor. Hodor. Hodor! Hodor? Hodor! Hodor! Hodor! Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor! Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor? Hodor. Hodor! Hodor! Hodor? Hodor! Hodor? Hodor. Hodor. Hodor. Hodor? Hodor. Hodor! Hodor! Hodor! Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor? Hodor. Hodor. Hodor. Hodor? Hodor! Hodor! Hodor! Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor? Hodor! Hodor? Hodor. Hodor! Hodor? Hodor! Hodor? Hodor. Hodor? Hodor. Hodor. Hodor? Hodor. Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor? Hodor? Hodor! Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor! Hodor! Hodor? Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor! Hodor? Hodor! Hodor! Hodor? Hodor! Hodor. Hodor. Hodor. Hodor? Hodor! Hodor! Hodor! Hodor! Hodor! Hodor? Hodor! Hodor! Hodor! Hodor? Hodor? Hodor. Hodor! Hodor! Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor! Hodor? Hodor! Hodor! Hodor? Hodor! Hodor? Hodor! Hodor? Hodor! Hodor? Hodor. Hodor! Hodor? Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor. Hodor? Hodor. Hodor! Hodor? Hodor. Hodor? Hodor! Hodor! Hodor! Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor? Hodor. Hodor? Hodor? Hodor! Hodor. Hodor? Hodor! Hodor? Hodor. Hodor. Hodor! Hodor? Hodor? Hodor. Hodor. Hodor. Hodor. Hodor? Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor. Hodor. Hodor? Hodor. Hodor? Hodor? Hodor! Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor? Hodor. Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor? Hodor! Hodor? Hodor? Hodor. Hodor. Hodor. Hodor. Hodor? Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor! Hodor? Hodor! Hodor! Hodor! Hodor? Hodor! Hodor! Hodor? Hodor. Hodor? Hodor. Hodor! Hodor? Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor? Hodor? Hodor! Hodor? Hodor. Hodor? Hodor. Hodor! Hodor? Hodor? Hodor. Hodor? Hodor. Hodor! Hodor! Hodor. Hodor? Hodor. Hodor? Hodor! Hodor! Hodor? Hodor! Hodor. Hodor? Hodor. Hodor? Hodor? Hodor! Hodor? Hodor. Hodor? Hodor. Hodor! Hodor? Hodor? Hodor. Hodor? Hodor. Hodor. Hodor. Hodor. Hodor? Hodor. Hodor? Hodor! Hodor! Hodor? Hodor! Hodor? Hodor! Hodor? Hodor. Hodor! Hodor? Hodor! Hodor! Hodor? Hodor! Hodor? Hodor. Hodor! Hodor. Hodor! Hodor? Hodor! Hodor! Hodor? Hodor! Hodor? Hodor. Hodor! Hodor! Hodor. Hodor! Hodor. Hodor. Hodor? Hodor! ";
	enableInputBox();
}
