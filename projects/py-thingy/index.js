let ed = ace.edit("editor", {
	value: (null === localStorage.getItem("py_thing_code")) ? "print('hello')":localStorage.py_thing_code,
	mode: "ace/mode/python",
	theme: "ace/theme/nord_dark"
})
let srcdoc = `
PyThing version ???
<head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/eruda/2.4.1/eruda.min.js" referrerpolicy="no-referrer" onload="eruda.init();eruda.show();"></script>
	<script type="text/javascript"src="https://cdn.jsdelivr.net/npm/brython@3.9.0/brython.min.js"></script>
	</head>
<body onload='brython()'>
	<style>*{color:white;background-color:black;font-family:menlo,monospace!important}</style>
	<script>
	//eruda.init()
		//console.log = document.writeln
	</script>
`
function addPropaganda(c) {
	let r="",indent=0
	c.split("\n").forEach(line=>{
		let e=0,l=line.trim(),p=indent
		if(line.trim().endsWith("{")){
			indent++
			l=line.trim().slice(0,-1)+":"
			e=1
		}
		if(line.trim().startsWith("}")&&line.trim()!="}#"){
			p--;indent--
			e=1
			l=""
		}
		if(line.trim().startsWith("}")&&line.trim().endsWith("{")){
			l=line.trim().slice(1,-1)+":"
			
			//indent++
		}
		r+="\t".repeat(Math.max(0,p))+l+"\n"
	})
	return r
}
function run() {
	console.log(addPropaganda(ed.getValue()))
	document.querySelector("iframe").srcdoc = srcdoc + `<script type=text/python>${addPropaganda(ed.getValue())}</script></body>`
}
ed.on("change",()=>{localStorage.py_thing_code = ed.getValue()})
/*
let e = document.createElement('script');
console.log("e")
alert("DBYBD HBS U SUB D ")
//e.type='text/python';
//e.innerHTML="(atob('${btoa(ed.getValue())}'))";
document.write("f")
//document.body.appendChild(e);
*/