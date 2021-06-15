document.getElementById("add").onclick = () => {
	document.getElementById("addmenu").style.transform = "scale(1)"
}

function widget() {
	let e = document.createElement("wid");
	e.innerHTML = "<span class='handle' ondblclick='r(this)'>||</span>"
	return e
}
new Sortable(document.getElementById("widgets"), {
	animation: 200,
	handle: ".handle",
	ghostClass: "ghost",
	dragClass: "dragged",
	onEnd: s
})
let wid = document.getElementById("widgets")
let ws = {
	time: function() {
		let el = widget()
		if (confirm("Should the clock show seconds?")) {
			el.innerHTML += "<h1 class='time-s'></h1>"
		} else {
			el.innerHTML += "<h1 class='time'></h1>"
		}
		wid.appendChild(el)
	},
	yt: function() {
		let r = prompt("Video ID?")
		if (r !== null) {
			let x = widget()
			x.style.padding = "0"
			let e = document.createElement("iframe")
			e.src = "https://www.youtube.com/embed/" + r
			x.appendChild(e)
			wid.appendChild(x)
		}
	},
	custom: function() {
		let r = prompt("Enter HTML code")
		if (r !== null) {
			let x = widget()
			x.style.padding = 0
			let e = document.createElement("iframe")
			e.sandbox = "allow-scripts allow-popups"
			e.srcdoc = r
			x.appendChild(e)
			wid.appendChild(x)
		}
	},
	calculator: function() {
		let x = widget()
		x.style.padding = 0
		x.classList.add("calc")
		let e = document.createElement("iframe")
		e.sandbox = "allow-scripts allow-popups"
		e.src = "https://electogenius.github.io/Electogenius/projects/calc"
		x.appendChild(e)
		wid.appendChild(x)
	}
	/*weather: function(){
		//let e = widget()
		if("geolocation" in navigator){
			function getWeather(p) {
				
			}
			try{
				if(window.location.protocol=="https:"){
					window.navigator.geolocation.getCurrentPosition(getWeather)
				}else{
					alert("needs https connection")
				}
			}catch(e){
				alert("error getting location")
			}
		}else{
			alert("Oops, geolocation is not supported in this browser")
		}
	},*/
}
setInterval(() => {
	wid.querySelectorAll(".time-s").forEach(e => {
		e.innerHTML = new Date().toLocaleTimeString("en")
	})
	wid.querySelectorAll(".time").forEach(e => {
		let d = new Date()
		e.innerHTML = ((d.getHours() % 12 !== 0) ? d.getHours() % 12 : 12) + ":" + d.getMinutes() + ((d.getHours() >= 12) ? " PM" : " AM")
	})
}, 1000)

function add(w) {
	if (!(w in ws)) { alert("Oops, this widget is not implemented yet") } else { ws[w](); s()  }
	document.getElementById("addmenu").style.transform = "scale(0)"
}
function s(){
	localStorage.widgets=wid.innerHTML
}
if(localStorage.getItem("widgets")!==null){
	wid.innerHTML = localStorage.widgets
}
function r(e){
	e.parentNode.remove()
	s()
}