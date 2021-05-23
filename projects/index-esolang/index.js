this.indexlang = code => {
	let prev = ""
	let res = ""
	let c = []
	let start = code.split(";")[0].split(" ")[1]
	let limit = code.split(";")[0].split(" ")[0]
	let main = code.slice(code.indexOf(";")+1).split("")
	let str = false
	main.forEach((e, ind)=>{
		if(!str){
			if(e == "'"){
				c.push(e, "");str=true
			}else if(/[=%_]/.test(e)){
				c.push(e, "")
			}else{
				c[c.length-1]+=e
			}
		}else{
			if(e == "'"){c.push("'");c.push("");str=false}else{
				c[c.length-1]+=e
			}
		}
		prev = e
	})
	//console.log(c)
	let conditions = {
		"=": [],
		"%": [],
		"_": {}
	}
	let $in = ""
	let currcond = ""
	let currnum = 0
	prev = ""
	c.forEach((kw, ind) => {
		if (prev != "string") {
			if (/[=%_]/.test(kw) && kw.length == 1) {
				prev = "cond"
				currcond = kw
			} else if (kw == "'") {
				prev = "string"
			} else if(kw == ";" || kw == "|"){
				conditions[currcond][currnum] = conditions[currcond][currnum] ?? ""
				conditions[currcond][currnum] += $in
				if(kw == ";"){
					currnum = 0
					currcond = "="
					$in = ""
					prev = ""
				}
			}else{
				currnum = kw
			}
		} else {
			if (kw == "'") {
				prev = "'"
			} else {
				$in += kw + " "
			}
		}
	})
	function parse(text, j) {
		return text.slice(0, -1).replace(/\$i/g, j)
	}
	//loop:
	for(let j=start;j<limit;j++){
		let used = false
		if(conditions["="][j]!==undefined){
			res += conditions["="][j].trim()
			used = true
		}else{
			
		}
		conditions["%"].forEach((item, index)=>{
			if(item!==undefined && j % index === 0){
				used = true
				if(item !== "  "){
					res+=parse(item, j)
				}else{
					res+=" "
				}
			}
		})
		if(!used && conditions["_"]["!"] !== undefined)res += parse(conditions["_"]["!"], j)
		if(used && conditions["_"]["u"] !== undefined)res += parse(conditions["_"]["u"], j)
	}
	return res
}