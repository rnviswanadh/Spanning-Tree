var screenWidth = window.innerWidth;
var screenHeight = window.innerHeight;
var numberOfPoints=0;
var edges = [];
var level;
var flagForSelection = true;
level = prompt("Tell Your Level");
level = parseInt(level, 10);
if(level!=null){
	numberOfPoints = level+2;
}
var centerX = screenWidth/2;
var centerY = screenHeight/2;
if(screenHeight>=screenWidth){
	radius = screenWidth/3;
}else{
	radius = screenHeight/3;
}
var pointCoordiantes = [];
var angle = 2*Math.PI/numberOfPoints;
for(var i = 0;i<numberOfPoints;i++){
	var X = centerX + radius*Math.cos(Math.PI/2 + i*angle);
	var Y = centerY - radius*Math.sin(Math.PI/2 + i*angle);
	pointCoordiantes[i] = {title:i, 'X':X, 'Y':Y};
	// console.log(pointCoordiantes[i]['X']+' '+pointCoordiantes[i]['Y']); // prints the coordiantes of the points 
}
//This prints the treeEdges of a graph.
function treeEdges(numberOfPoints){
	console.log('a');
	var t1 = numberOfPoints;
	var t2 = 0;
	var array1 = [];
	var array2 = [];
	for(i=0;i<numberOfPoints;i++){
		array2[i] = pointCoordiantes[i];
		edges[i] = "";
	}
	while(t1>0){
		var rCount2 = Math.floor((t1)*Math.random());
		var rCount1 = Math.floor((t2)*Math.random());
		t1--;t2++;
		var removed = array2.splice(rCount2, 1);
		var a = array1.push(removed);
		if (t2>1) {
			// console.log('point '+array1[rCount1][0].title+' and '+removed[0].title);
			edges[array1[rCount1][0].title] = edges[array1[rCount1][0].title]+ "" + removed[0].title;
			edges[removed[0].title] = edges[removed[0].title] + "" + array1[rCount1][0].title;
		};
	}
	console.log(edges);
	var extraEdges = (numberOfPoints-1)*(numberOfPoints-2)/4;
	extraEdges = Math.floor(extraEdges);
	console.log(extraEdges);
	for(i=0;i<extraEdges;i++){
		flag = true;
		var z1,z2;
		while(flag){
			var p = Math.floor(numberOfPoints*Math.random());
			var q = Math.floor(numberOfPoints*Math.random());
			if(p!=q){
				var t1 = parseInt(edges[p]);
				var t2 = parseInt(edges[q]);
				while(t1!=0){
					if(q==t1%10){
						break;
						z1=0;
					}else{
						t1=Math.floor(t1/10);
					}
					z1=1;
				}
				while(t2!=0){
					if(p==t2%10){
						break;
						z2=0;
					}
					else
						t2=t2/10;
					z2=1
				}
				if(z1==1&&z2==1&&t1==0&&t2==0){
					t1=parseInt(edges[p]);
					edges[p] = edges[p]+""+q;
					edges[q] = edges[q]+""+p;
					flag = false;
					while(t1!=0){
						if(q==t1%10){
							break;
							z1=0;
						}else{
							t1=Math.floor(t1/10);
						}
						z1=1;
					}
				}
			}
		}
	}
}

var node1,node2;

document.getElementById('1')

function removeEdges(circleId){
	// alert('initialised');
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d')
	// find node2 in edges[node1] and remove it.
	// similarly for node1 in edges[node2]

	if(flagForSelection){
		node1 = circleId;
		node1 = parseInt(node1, 10)-1;
		flagForSelection = false;
		return;
	}
	else{
		node2 = circleId;
		node2 = parseInt(node2, 10)-1;
		flagForSelection = true;
	}
	if(flagForSelection){
		context.strokeStyle = '#FAFAFA';
		context.beginPath();
		context.moveTo(pointCoordiantes[node1]['X']-1*(window.innerWidth)/14, pointCoordiantes[node1]['Y']-1*(window.innerHeight)/14);
		context.lineTo(pointCoordiantes[node2]['X']-1*(window.innerWidth)/14, pointCoordiantes[node2]['Y']-1*(window.innerHeight)/14);
		context.stroke();
		context.strokeStyle = '#000000';
		var p = parseInt(edges[node1]);
		var q = parseInt(edges[node2]);
		console.log(node1+" "+node2);
		console.log(p+" "+q);
		edges[node1]='k';
		edges[node2]='k';
		var count = 0;
		while((p!=0||count==0)&&p!='k'){
			if(!((p%10)==node2)){
				if(edges[node1]!='k')
					edges[node1] = edges[node1]+""+p%10;
				else
					edges[node1] = ""+p%10;
				// console.log(edges[node1]);
			}
			p = Math.floor(p/10);
			count=1;
		}
		count = 0;
		while((q!=0||count==0)&&q!='k'){
			if(!((q%10)==node1)){
				if(edges[node2]!='k')
					edges[node2] = edges[node2]+""+q%10;
				else
					edges[node2] = ""+q%10;
			}
			q = Math.floor(q/10);
			count=1;
		}
		console.log(edges[node1]+" "+edges[node2]);
	}
	console.log(edges);
	if(!bfs(edges)){
		alert('game over');
	}
}

function bfs(edges){
	for(i=0;i<edges.length;i++){
		if(edges[i]=='k'){
			console.log('k')
			return false;
		}
	}
	var visited = [];
	var string = '';
	for(i=0;i<edges.length;i++){
		visited[i]=false;
	}
	string = ""+edges[0];
	visited[0]=true;
	var count = 0;
	while(string!=""&&count<300){
		var p = parseInt(string[0]);
		if(p==NaN)
			break;
		// console.log(p);
		if(!visited[p]){
			// console.log(p+" is now visited");
			visited[p]=true;
			string = string + edges[p];
			// console.log(p +' is not visited');
		}
		// console.log(string);
		string = string.substr(1,string.length);
		// console.log(string);
		count++;
		// p = string.splice(0,1);
	}
	for(i=0;i<edges.length;i++){
		if(!visited[i]){
			// console.log(i+" not visited");
			return false;
		}
	}
	return true;
}