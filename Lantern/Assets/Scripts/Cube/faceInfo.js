#pragma strict

var Normal : Vector3;

var villagerCount : int;
var siteCount : int;
var hutCount : int;
var towers : boolean[];
var bridges : boolean[];
var docks : boolean[];
var townHall : boolean;
var temple : boolean;
var fort : boolean;

var houseLocations : Array;

function Start()
{
	docks = new boolean[4];
	houseLocations = new Array();
	
}

function towerCount()
{
	var count : int = 0;
	for(var i : int = 0; i < 4; i ++)
	{
		if(towers[i] == true)
		{
			count ++;
		}
	}
	return count;
}

function populationUnsupported() : boolean
{
	var overPop : boolean = false;

	if(villagerCount > 2+2*hutCount)
	{
		overPop = true;
	}
		
	return overPop;
}

function overPop()
{
	var overflow : int = villagerCount - (2+2*hutCount);
	
	if(overflow < 0)
	{
		overflow = 0;
	}
	
	return overflow;
}

function populationSupport() : int
{
	var lifeMod : int;

	// 2 VILLAGERS CAN SURVIVE WITH NO HOUSE
	// EACH HOUSE SUPPORTS 4 VILLAGERS (?) 
	
	lifeMod += 50*hutCount;
	
	if(villagerCount > (2+2*hutCount))
	{
		lifeMod -= 20*(villagerCount- (2+2*hutCount));
	}
	
	Debug.Log("Cube Type: " + transform.parent.GetComponent(cubeInfo).cubeType);
	
	Debug.Log("New life expectancy: " +(100+lifeMod));
	
	if(transform.parent.GetComponent(cubeInfo).cubeType == "Water")
	{
	
		
		lifeMod = 100;
		
		Debug.Log("Disembark with lifemod: " + lifeMod);
	}
	
	return 100+lifeMod;	
}

function ComponentWithName(NAME : String)
{
	var transforms = transform.GetComponentsInChildren(Transform);
	var returnTransform = transform;
	
	for(var C : Component in transforms)
	{
		if(C.name == NAME+"(Clone)")
		{
			returnTransform = C.transform;
		}	
	} 
	
	return returnTransform;
	
}

function topAggression() : Transform
{
	var transforms = transform.GetComponentsInChildren(Transform);
	var villagers = new Transform[villagerCount];
	var returnTransform : Transform;
	
	
	var count : int = 0;
	if(transforms.Length > 0)
	{
		for(var C : Component in transforms)
		{
			if(C.tag == "Villager")
			{
				if(count < villagerCount)
				{
					villagers[count] = C.transform;
					count ++;
				}
			}	
		}
	}
	
	if(villagers.Length > 0)
	{
		returnTransform = villagers[0];
		
		for(var i : int = 0; i < count; i ++)
		{
			if(villagers[i].GetComponent(personality).Aggression > returnTransform.GetComponent(personality).Aggression)
			{
				returnTransform = villagers[i];
			}
		}
	}
	

	return returnTransform;
}

function nTopAggression() : float
{
	return topAggression().GetComponent(personality).Aggression;
}

function topCharisma() : float
{
	var transforms = GetComponentsInChildren(Transform) as Transform[];
	var charis = new Array();
	
	var returnCharis = 0;
	
	if(transforms.Length > 0)
	{
		for(var T : Transform in transforms)
		{
			if(T.tag == "Villager")
			{
				charis.Add(T.GetComponent(personality).Charisma);
				
			}
		}
		
		var charismas = charis.ToBuiltin(float) as float[];
		
		returnCharis = charismas[0];
		
		for(var i : int = 0;  i < charis.length; i ++)
		{
			if(charismas[i] > returnCharis)
			{
				returnCharis = charismas[i];
			}
		}
	}
	return returnCharis;
}

function topCuriosity() : float
{
	var transforms = transform.GetComponentsInChildren(Transform);
	var villagers = new Transform[villagerCount];
	
	var count : int = 0;
	for(var C : Component in transforms)
	{
		if(C.tag == "Villager")
		{
			if(count < villagerCount)
			{
				villagers[count] = C.transform;
				count ++;
			}
		}	
	}
	
	var returnTransform : Transform = villagers[0];
	
	for(var i : int = 0; i < count; i ++)
	{
		if(villagers[i].GetComponent(personality).Curiosity > returnTransform.GetComponent(personality).Curiosity)
		{
			returnTransform = villagers[i];
		}
	}

	return returnTransform.GetComponent(personality).Curiosity;
}

function getVillagers(cubeVec : Vector3)
{
	//Debug.Log("Get Villagers Function\nTransform Name: " + transform.name);

	var transforms = GetComponentsInChildren(Transform);
	var villagers = new Transform[villagerCount];
	var Count : int = 0;
	for(var T : Component in transforms)
	{
	//	Debug.Log("T tag: " + T.transform.tag);
	
		if(T.transform.tag == "Villager" /*&& cubeVec == transform.parent.GetComponent(cubeInfo).Vectorify(transform.parent.name)*/)
		{
			if(Count < villagerCount)
			{
				villagers[Count] = T.transform;
				//Debug.Log("Villager " + Count + ": " + villagers[Count].name); 
				
				Count ++;
			}
		}
	}
	
	//Debug.Log("Villagers array" + villagers[0].name + " " + villagers[1].name);
	
	return villagers;
}

function Sort(villagers : Transform[], point : Vector3)
{
	//var partnerArray : Transform[] = partners.ToBuiltin(Transform) as Transform[];
	
	var Distances = new float[villagers.length];
	var returnTransform : Transform;
		
				
	for(var cycle = 0; cycle < villagers.length; cycle ++)
	{
		Distances[cycle] = (point - villagers[cycle].position).magnitude;
	}
		
	var sortableDist = new Array(Distances);
	sortableDist.Sort();
	
	for(var comp : int = 0; comp < villagers.length; comp ++)
	{
		if(Distances[comp] == sortableDist[0])
		{
			returnTransform = villagers[comp];
		}
	}
				
	return returnTransform;
}

function Dist(Pos_A : Vector3, Pos_B : Vector3)
{
	var dist = (Pos_A - Pos_B).magnitude;
	return dist;
}

function closestVillager(/*potentialVillagers : Transform[],*/ point : Vector3) : Transform
{
	Debug.Log("Villagers: " + villagerCount);

	var potentialVillagers = new Transform[villagerCount];
	potentialVillagers = getVillagers(transform.parent.GetComponent(cubeInfo).Vectorify(transform.parent.name));
	var villagers = new Array();
	var returnTransform : Transform;
	
	//Debug.Log("Array length: " + potentialMates.Length);

	if(potentialVillagers.Length > 1)
	{
		for(var cycle : int = 0; cycle < potentialVillagers.Length; cycle ++)
		{
		
			//Debug.Log(potentialMates[cycle].name);
			if(potentialVillagers[cycle] != null && potentialVillagers[cycle].tag == "Villager")
			{
				if(potentialVillagers[cycle].GetComponent(personality).Task == "None" || potentialVillagers[cycle].GetComponent(personality).Task == "Going")
				{
					villagers.Add(potentialVillagers[cycle]);
				}
			}
		}
		
		var villagerTransforms : Transform[] = villagers.ToBuiltin(Transform) as Transform[];
		
		if(villagers.length > 0)
		{
			returnTransform = villagerTransforms[0];
		
			for(var i = 0; i < villagers.length; i ++)
			{
				if(Dist(returnTransform.position, point) > Dist(villagerTransforms[i].transform.position, point))
				{
					returnTransform = villagerTransforms[i];
				}
			} 
		
			//returnTransform = Sort(villagers.ToBuiltin(Transform) as Transform[], point);	
		}
		//Debug.Log("Closest partner at: " + returnTransform.position);
	}
	if(returnTransform == null)
	{
		returnTransform = transform;
	}
	
	
	return returnTransform;
}

function squarePosition(truePosition : Vector3)
{
	var squarePos : Vector2;
	
	Debug.Log("True position: " + truePosition);
	
	
	var cubeCentre = transform.parent.transform.position;

	Debug.Log("Cube Centre: " + cubeCentre);

	if(Normal.x != 0)
	{
		squarePos.x = (truePosition.z - cubeCentre.z)*Normal.x;
		squarePos.y = truePosition.y - cubeCentre.y;
	}
	else if(Normal.y != 0)
	{
		squarePos.x = (truePosition.x - cubeCentre.x)*Normal.y;
		squarePos.y = truePosition.z - cubeCentre.z;
	}
	else if(Normal.z != 0)
	{
		squarePos.x = (truePosition.x - cubeCentre.x)*(-Normal.z);
		squarePos.y = truePosition.y - cubeCentre.y;
	}
	return squarePos;
}

function nearEdge(truePosition : Vector3)
{
	var Edge : int = -1;
	
	var squarePos = squarePosition(truePosition);
	
	Debug.Log("Square Position: " + squarePos);
	
	if(squarePos.x > 8 && squarePos.x < 10)
	{
		Edge = 1;
	}
	else if(squarePos.x < -8 && squarePos.x > -10)
	{
		Edge = 3;
	}
	else if(squarePos.y < 10 && squarePos.y > 8)
	{
		Edge = 0;
	}
	else if(squarePos.y < -8 && squarePos.y > -10)
	{
		Edge = 2;
	}
	
	Debug.Log("Edge: " + Edge);
	
	return Edge;
}

function realWorldPosition(vecInCube : Vector2)
{

	var worldVec : Vector3 = transform.position;

	if(Normal.y != 0)
	{
		worldVec.x += vecInCube.x*Normal.y;
		worldVec.z += vecInCube.y;
		
		worldVec.y = 40.3*Normal.y;
	}
	else if(Normal.x != 0)
	{
		worldVec.z += Normal.x*vecInCube.x;
		worldVec.y += vecInCube.y;
		
		worldVec.x = 40.3*Normal.x;
	}
	else if(Normal.z != 0)
	{
		worldVec.x -= Normal.z*vecInCube.x;
		worldVec.y += vecInCube.y;		
		
		worldVec.z = 40.3*Normal.z;
	}
	
	
	//Debug.Log("Target position on Lantern: " + worldVec);
	
	return worldVec;
}

function getSurface()
{
	return (transform.position)+10*Normal;
}
