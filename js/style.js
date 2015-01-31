window.onload = function(){
	var box = document.getElementById('box');
	var graphBox = document.getElementById('graphBox');
	var canvas = document.getElementsByTagName('canvas')[0];
	var context = canvas.getContext('2d');

	box.style.width = (6*(window.innerWidth)/7).toString()+'px';
	box.style.height = (6*(window.innerHeight)/7).toString()+'px';
	graphBox.style.width = (6*(window.innerWidth)/7).toString()+'px';
	graphBox.style.height = (6*(window.innerHeight)/7).toString()+'px';
	box.style.top = (1*(window.innerHeight)/14).toString()+'px';
	box.style.left = (1*(window.innerWidth)/14).toString()+'px';
	canvas.width  = 6*(window.innerWidth)/7;
	canvas.height = 6*(window.innerHeight)/7;	
	context.lineWidth = 3;


	for(i=1;i<=numberOfPoints;i++){
		id = ""+i;
		var a = document.getElementById(id);
		a.setAttribute("r", "10");
		var cx = pointCoordiantes[i-1]['X']-1*(window.innerWidth)/14;
		var cy = pointCoordiantes[i-1]['Y']-1*(window.innerHeight)/14;
		cx = cx + "";
		cy = cy + "";
		a.setAttribute("cx", cx);
		a.setAttribute("cy", cy);
	}

	treeEdges(numberOfPoints);
	console.log(edges);
	for(i=0;i<edges.length;i++){
		var t1 = edges[i];
		while(t1!=0){
			var p = t1%10;
			if(1){
				//connect i and p;
				context.beginPath();
				context.moveTo(pointCoordiantes[i]['X']-1*(window.innerWidth)/14, pointCoordiantes[i]['Y']-1*(window.innerHeight)/14);
				context.lineTo(pointCoordiantes[p]['X']-1*(window.innerWidth)/14, pointCoordiantes[p]['Y']-1*(window.innerHeight)/14);
				context.stroke();
			}
			t1 = Math.floor(t1/10);
		}
	}
}
