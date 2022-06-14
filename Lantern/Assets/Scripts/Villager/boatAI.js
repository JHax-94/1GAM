#pragma strict

var Task : String = "None";
var TargetEdge : int;
var Target : Vector3;

var villagerStats : float[];
var villagerAge : float;

var faceScript : faceInfo;

function Initialise()
{
	faceScript = transform.parent.GetComponent(faceInfo);
}

function Embark(newStats : float[], newAge : float)
{
	villagerAge = newAge;
	villagerStats = new float[6];
	Debug.Log("New Stats: " + newStats);
	
	for(var i : int = 0; i < 6; i ++)
	{
		Debug.Log("Index: " + i+ "\nNewStats: " + newStats[i]);
	
		villagerStats[i] = newStats[i];
		
		Debug.Log("villagerStats[" + i + "] = " + villagerStats[i]);
	}
}

function align(newForward : Vector3)
{
	Debug.Log("Vector: " + newForward);

	var angle : float = Vector3.Angle(transform.forward, newForward);
	//var sign : int = 1;
	
	Debug.Log("Angle: " + angle);
	
	if(Vector3.Dot(transform.right, newForward) < 0)
	{
		angle = 360 - angle;
		
		
	}
	
	Debug.Log("Adjusted Angle: " + angle);
	
	transform.Rotate(faceScript.Normal, angle, Space.World);
	 
}

function nearTarget(radius : float)
{
	var near : boolean = false;
	
 	var Dist : float = (transform.position - Target).magnitude;
	
	if(Dist < radius)
	{
		near = true;
	}
	
	return near;
	
}

function RandomDestination()
{
	giveTask("Going");
	
	var squarePos : Vector2;
	
	squarePos.x = (Random.value*19)-9.5;
	squarePos.y = (Random.value*19)-9.5;
	
	Target = faceScript.realWorldPosition(squarePos);
	
	var dir = Target - transform.position;
	
	var newVec = dir/dir.magnitude;
	
	align(newVec);
	
	rigidbody.velocity = newVec;
	
}

function InvestigateEdge(Edge : int)
{
	giveTask("GoToEdge");
	
	var squarePos : Vector2;
	
	if(Edge == 0)
	{
		squarePos.x = 0;
		squarePos.y = 9;
	}
	else if(Edge == 1)
	{
		squarePos.x = 9;
		squarePos.y = 0;
	}
	else if(Edge == 2)
	{
		squarePos.x = 0;
		squarePos.y = -9;
	}
	else if(Edge == 3)
	{
		squarePos.x = -9;
		squarePos.y = 0;
	
	}
	
	Target = faceScript.realWorldPosition(squarePos);
	TargetEdge = Edge;
	var Dir = Target - transform.position;
	
	Debug.Log("Direct to edge: " + Dir);
	
	var newVec = Dir/Dir.magnitude;
	
	Debug.Log("NewVec: " + newVec);
	
	align(newVec);
	
	rigidbody.velocity = newVec;
	
	Debug.Log("Boat velocity = " + rigidbody.velocity);
	
}

function OverEdge()
{
	giveTask("OverEdge");
	
	var squarePos : Vector2;
	
	if(TargetEdge == 0)
	{
		squarePos.x = 0;
		squarePos.y = 11;
	}
	else if(TargetEdge == 1)
	{
		squarePos.x = 0;
		squarePos.y = 11;
	}
	else if(TargetEdge == 2)
	{
		squarePos.x = 0;
		squarePos.y = -11;
	}
	else if(TargetEdge == 3)
	{
		squarePos.x = -11;
		squarePos.y = 0;
	
	}
	
	Target = faceScript.realWorldPosition(squarePos);
	var Dir = Target - transform.position;
	
	var newVec = Dir/Dir.magnitude;
	
	
	align(newVec);
	
	rigidbody.velocity = newVec;
	
}

function Disembark()
{
	Debug.Log("Disembarking with stats:");
	for(var i : int = 0; i < 6; i ++)
	{
		Debug.Log("\nStat " + i + ": " + villagerStats[i]);
	}
	
	
	transform.parent.GetComponent(spawnScript).spawnBlip(villagerStats, transform.position, villagerAge);
	Destroy(gameObject);
}

function giveTask(newTask : String)
{
	Debug.Log("Giving boat at " + transform.position + " task: " + newTask);

	Task = newTask;
}

function EdgeChecks()
{
	Debug.Log("In edge checks!");
	
	
	
	if(TargetEdge != -1 && faceScript.bridges[TargetEdge] == true)
	{
		var DirCube = transform.parent.parent.parent.GetComponent(cubeIndex).cubeInDir(TargetEdge, transform.parent.parent.GetComponent(cubeInfo).Vectorify(transform.parent.parent.name), transform.parent.GetComponent(faceInfo).Normal);
		
		Debug.Log("DirCube: " + DirCube.name);
		Debug.Log("This Cube: " + transform.parent.parent.name);
		
		if(transform.parent.parent.name == DirCube.name)
		{
		
			Debug.Log("Over le edge!");
			faceScript.villagerCount --;
			OverEdge();
		}
		else
		{
			Disembark();
		}
		
	}
	else if(TargetEdge != -1 && faceScript.docks[TargetEdge] == false && faceScript.bridges[TargetEdge] == false)
	{
		transform.parent.GetComponent(spawnScript).spawnDock(TargetEdge);
	}
	else if(TargetEdge != -1 && faceScript.docks[TargetEdge] == true)
	{
		Disembark();
	}
	
	


}

function goToCentre()
{
	Target = faceScript.realWorldPosition(Vector2.zero);
	var Dir = Target - transform.position;
	
	var newVec = Dir/Dir.magnitude;
	
	
	align(newVec);
	
	rigidbody.velocity = newVec;
	
}

function snapToCentre()
{
	var target = faceScript.realWorldPosition(Vector2(0, 0));
	
	transform.position = target;
}

/*
function Awake()
{
	/*villagerStats = new float[6];
	for(var i : int = 0; i < 6; i ++)
	{
		villagerStats[i] = 0f;
	}*/
	/*RandomDestination();
}
*/
function FixedUpdate () 
{
	if(Task == "None")
	{
		var Roll : int = Mathf.RoundToInt(Random.value*10);
		
		if(Roll == 1)
		{
			
		
			RandomDestination();		
		}
		else if(Roll == 2)
		{
			Roll = Mathf.RoundToInt(Random.value*3);
			
			InvestigateEdge(Roll);
			
		}
	}
	else if(Task == "Going")
	{
		if(nearTarget(1) == true)
		{
			giveTask("None");
		
			rigidbody.velocity = Vector3.zero;
			
			
			
		}	
	}
	else if(Task == "GoToEdge")
	{
		if(nearTarget(0.5) == true)
		{
			//giveTask("None");
			
			rigidbody.velocity = Vector3.zero;
			Debug.Log("Stopping at edge...");
			EdgeChecks();
			
		}
	}
	else if(Task == "OverEdge")
	{
		if(nearTarget(0.5))
		{	
			var Face = transform.parent.GetComponent(faceInfo);
			rigidbody.velocity = Vector3.zero;
			transform.parent = transform.parent.parent.GetComponent(cubeInfo).faceWithNormal(transform.parent.parent.GetComponent(cubeInfo).normalInDir(TargetEdge, Face.Normal));
			faceScript = transform.parent.GetComponent(faceInfo);
			faceScript.villagerCount ++;
			
			
			Debug.Log("Up: " + transform.up);
			Debug.Log("New Normal: "+ faceScript.Normal);
			Debug.Log("Cross Product: " + Vector3.Cross(transform.up, faceScript.Normal));
				
			transform.Rotate(Vector3.Cross(transform.up, faceScript.Normal ), 90, Space.World);
					
			giveTask("GoToCentre");
			goToCentre();	
							
						
			}
		}
		else if(Task == "GoToCentre")
		{
			if(nearTarget(0.5))
			{
				
				snapToCentre();
				giveTask("Going");
				RandomDestination();		
			}
		}
}