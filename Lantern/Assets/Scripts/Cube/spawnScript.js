#pragma strict

var infoScript : faceInfo;
var statScript : worldStats;
var cubeScript : cubeInfo;

function Initialise()
{
	infoScript = GetComponent(faceInfo);
	Debug.Log("Face Normal: " + infoScript.Normal);
	
	cubeScript = transform.parent.GetComponent(cubeInfo);
	Debug.Log("Cube Type: " + cubeScript.cubeType);
	
	statScript = transform.parent.parent.GetComponent(worldStats);
	Debug.Log("Enlightenment: " + statScript.enlightenment);
	
}

function randomStats()
{
	var statsArray : float[] = [0f, 0f, 0f, 0f, 0f, 0f];

	for(var i : int = 0; i < 6; i ++)
	{
		statsArray[i] = Mathf.Ceil(Random.value*10);
	}
	
	return statsArray;
}

function spawnObject(Name : String, handPosition : Vector3)
{

	var position = handPosition;
	var rotation : Quaternion = spawnRotation();
	
	var newObject = Instantiate(Resources.Load(Name, GameObject), position, rotation);
	
	Debug.Log(Name);
	
	newObject.transform.parent = transform;
	if(Name == "tome")
	{
		newObject.transform.GetComponent(gatherBookWorms).Initialise();
	}
	else if(Name == "artifact")
	{
		newObject.transform.GetComponent(gatherArchaeologists).Initialise();
	}
	
}


function boatPosition(Edge : int)
{
	var squarePos : Vector2;

	if(Edge == 0)
	{
		squarePos.x = 0;
		squarePos.y = 6.5;
	}
	else if(Edge == 1)
	{
		squarePos.x = 6.5;
		squarePos.y = 0;
	}
	else if(Edge == 2)
	{
		squarePos.x = 0;
		squarePos.y = -6.5;
	}
	else if(Edge == 3)
	{
		squarePos.x = -6.5;
		squarePos.y = 0;
	}
	
	return convertPosition(squarePos);
}

function spawnBoat(Edge : int, villagerStats : float[], villagerAge : float)
{
	
	var position = boatPosition(Edge);
	var rotation : Quaternion = spawnRotation();
//	var FaceInfo = transform.GetComponent(faceInfo);
//	var cubeScript = transform.parent.GetComponent(cubeInfo);
	
	var newBoat : GameObject = Instantiate(Resources.Load("boat", GameObject), position, rotation);
	
	newBoat.transform.parent = transform;
	Debug.Log("Villager: " + villagerStats);
	var boatScript = newBoat.GetComponent(boatAI);
	boatScript.Initialise();
	
	boatScript.Embark(villagerStats, villagerAge);
	boatScript.RandomDestination();
}

function dockRotation(newBuilding : GameObject, Edge : int)
{
	var FaceInfo = transform.GetComponent(faceInfo);
	Debug.Log("Edge: " + Edge);
	FaceInfo.docks[Edge] = true;
	
	
	if(FaceInfo.Normal.x != 0)
	{
		if(Edge == 0)
		{
			if(FaceInfo.Normal.x < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 180, Space.World);				
			}
		}
		else if(Edge == 1)
		{
			if(FaceInfo.Normal.x < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 270, Space.World);
			}
			else if(FaceInfo.Normal.x > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
		}
		else if(Edge == 2)
		{
			if(FaceInfo.Normal.x > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 180, Space.World);
			}
		}
		else if(Edge == 3)
		{
			if(FaceInfo.Normal.x < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
			else if(FaceInfo.Normal.x > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 270, Space.World);
			}
		}
	}
	else if(FaceInfo.Normal.y != 0)
	{
		if(Edge == 0)
		{
			if(FaceInfo.Normal.y > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
			else if(FaceInfo.Normal.y < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
		}
		else if(Edge == 1)
		{
			if(FaceInfo.Normal.y > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 180, Space.World);
			}
			else if(FaceInfo.Normal.y < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 180, Space.World);
			}
			
			
		}
		else if(Edge == 2)
		{
			if(FaceInfo.Normal.y > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 270, Space.World);
			}
			else if(FaceInfo.Normal.y < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 270, Space.World);
			}
		}
		else if(Edge == 3)
		{
			if(FaceInfo.Normal.y < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 0, Space.World);
			}
			else if(FaceInfo.Normal.y > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 0, Space.World);
			}
		}
			
			
	}
	else if(FaceInfo.Normal.z != 0)
	{
		if(Edge == 0)
		{
			if(FaceInfo.Normal.z > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 270, Space.World);
			}
			else
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
		}
		else if(Edge == 1)
		{
			if(FaceInfo.Normal.z < 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 180, Space.World);
			}
			//newBuilding.transform.Rotate(FaceInfo.Normal, 180*FaceInfo.Normal.z, Space.World);
		}
		else if(Edge == 2)
		{
			if(FaceInfo.Normal.z > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
			else
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 270, Space.World);
			}
		}
		else if(Edge == 3)
		{
			if(FaceInfo.Normal.z > 0)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 180, Space.World);
			}
		}
	}
}

function dockTower(Edge : int)
{
	var squarePos : Vector2;

	if(Edge == 0)
	{
		squarePos.x = 2;
		squarePos.y = 9;
	}
	else if(Edge == 1)
	{
		squarePos.x = 9;
		squarePos.y = -2;
	}
	else if(Edge == 2)
	{
		squarePos.x = -2;
		squarePos.y = -9;
	}
	else if(Edge == 3)
	{
		squarePos.x = -9;
		squarePos.y = 2;
	}
	
	return convertPosition(squarePos);	
}

function spawnDock(Edge : int)
{
	var position = dockPosition(Edge);
	var rotation : Quaternion = spawnRotation();
	
	var newBuilding : GameObject = Instantiate(Resources.Load("dock", GameObject), position, rotation);
	
	dockRotation(newBuilding, Edge);
	
	var dockTower = dockTower(Edge);
	
	var newTower : GameObject = Instantiate(Resources.Load("tower", GameObject), dockTower, rotation); 
	
	infoScript.towers[Edge] = true;
	var DirCube = transform.parent.parent.GetComponent(cubeIndex).cubeInDir(Edge, cubeScript.Vectorify(transform.parent.name), infoScript.Normal);
	if(DirCube.name != transform.name)
	{
		DirCube.transform.GetComponent(cubeInfo).defog();
	}
	
	newBuilding.transform.parent = transform;
	newTower.transform.parent = transform;
	
}

function transmogrify(site : Transform, Building : String, Edge : int)
{
	
	
	
	var position = site.position;
	var rotation : Quaternion = spawnRotation();
	var FaceInfo = transform.GetComponent(faceInfo);
	var cubeScript = transform.parent.GetComponent(cubeInfo);
	
	Destroy(site.gameObject);
	
	Debug.Log(transform.parent);

	Debug.Log("Patilloing...");
	
	if(Building == "bridge")
	{
		var newPos : Vector2;
			
		if(Edge == 0)
		{
			newPos = Vector2(0, 15);
		}
		else if(Edge == 1)
		{
			newPos = Vector2(15, 0);
		}
		else if(Edge == 2)
		{
			newPos = Vector2(0, -15);
			
		}
		else if(Edge == 3)
		{
			newPos = Vector2(-15, 0);
			
		}
		//rotation.eulerAngles = rotation.eulerAngles + addRotation.eulerAngles;
		position = convertPosition(newPos);
	}
	
	var newBuilding : GameObject = Instantiate(Resources.Load(Building, GameObject), position, rotation);
	
	
	if(Building == "hut")
	{
		FaceInfo.hutCount ++;
	}
	else if(Building == "tower")
	{
		FaceInfo.towers[Edge] = true;
		var DirCube = transform.parent.parent.GetComponent(cubeIndex).cubeInDir(Edge, cubeScript.Vectorify(transform.parent.name), FaceInfo.Normal);
		if(DirCube.name != transform.name)
		{
			DirCube.transform.GetComponent(cubeInfo).defog();
		}
		
	}
	else if(Building == "townHall")
	{
		FaceInfo.townHall = true;
	}
	else if(Building == "temple")
	{
		statScript.boostThreshold();
		FaceInfo.temple = true;
	}
	else if(Building == "fort")
	{
		statScript.dropThreshold();
	
		FaceInfo.fort = true;
	}
	else if(Building == "bridge")
	{
		
		DirCube = transform.parent.parent.GetComponent(cubeIndex).cubeInDir(Edge, cubeScript.Vectorify(transform.parent.name), FaceInfo.Normal);
		var faceRoot : Transform = DirCube.GetComponent(cubeInfo).faceWithNormal(FaceInfo.Normal);
		var newFace = faceRoot.GetComponent(faceInfo);
		newFace.bridges[(Edge+2)%4] = true;
		
		if(FaceInfo.Normal.x != 0)
		{
			if(Edge == 0 || Edge == 2)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
		}
		else
		{
			if(Edge == 1 || Edge == 3)
			{
				newBuilding.transform.Rotate(FaceInfo.Normal, 90, Space.World);
			}
		}
		
		FaceInfo.bridges[Edge] = true;
		/*
		if(newFace.siteCount > 0)
		{
			var Transforms = faceRoot.GetComponentsInChildren(Transform) as Transform[];
				
			for(var T : Transform in Transforms)
			{
				if(T.tag == "site")
				{
					var constructScript = T.GetComponent(constructionSite);
					
					if(constructScript.siteType == "bridge" && constructScript.siteEdge == (Edge+2)%4)
					{
						constructScript.Dismantle();
					}
				}
			}
			
			
			
		}
		*/	
		if(DirCube.GetComponent(cubeInfo).cubeType == "Land")
		{
			transform.parent.parent.GetComponent(events).contactEvent(transform, faceRoot);
		}
	}
	else if(Building == "dock")
	{
		dockRotation(newBuilding, Edge);
	}
	FaceInfo.siteCount --;
	
	newBuilding.transform.parent = transform;
}



function spawnBuilding(Building : String)
{
	spawnBuilding(Building, 0);
}

function spawnBuilding(Building : String, edge : int)
{
	
	Debug.Log("Building " + Building);
	
	var position : Vector3;
	var rotation : Quaternion = spawnRotation();
	
	var scaleBy : Vector3;
	var offset : float;
	
	var builderReq : int;
	
	var Hand = GameObject.FindGameObjectWithTag("Hand");
	
	if(Building == "hut" || Building == "tower" || Building == "dock")
	{
		scaleBy = Vector3(0.25, 0.25, 0.25);
		offset = 0;
		
		builderReq = 1;
		if(Building == "tower")
		{
			edge = Hand.GetComponent(playerHand).nearEdge(transform);
		}
		
	}
	else if(Building == "townHall" || Building == "bridge")
	{
		scaleBy = Vector3(0.5, 0.5, 0.5);
		offset = 0.25;
				
		builderReq = 2;
	}
	else
	{
		scaleBy = Vector3.one;
		offset = 0.75;
		
		builderReq = 3;
	}
/*
	if(Hand.GetComponent(playerHand).presenceOn == false)
	{
		position = randomPosition();
	}
	else
	{*/
	if(Building == "tower")
	{
		position = convertPosition(Hand.GetComponent(playerHand).getPosition());
	}
	else if(Building == "hut")
	{
		position = hutPosition();
	}
	else if(Building == "townHall")
	{
		position = townHallPosition();
	}
	else if(Building == "temple" || Building == "fort")
	{
		position = bonusPosition();
	}
	else if(Building == "bridge")
	{
		position = bridgePosition(edge);
	}
	else if(Building == "dock")
	{
		position = dockPosition(edge);
	}
	
	
	
	
	//Debug.Log("Patilloing...");
	
			
	var newBuilding : GameObject = Instantiate(Resources.Load("constructionsite", GameObject), position+offset*transform.GetComponent(faceInfo).Normal, rotation);
	newBuilding.transform.localScale = scaleBy;
	var siteScript = newBuilding.GetComponent(constructionSite);
	
	siteScript.siteType = Building;
	siteScript.maxBuilders = builderReq;
	siteScript.siteEdge = edge;
	
	newBuilding.transform.parent = transform;
	siteScript.Initialise();
}

function convertPosition(spawn : Vector2)
{	
	//var cubeVec : Vector3;
	
	//cubeVec = transform.parent.GetComponent(cubeInfo).Vectorify(transform.name);
	var outwardVec = transform.GetComponent(faceInfo).Normal;
	var spawnPosition : Vector3 = transform.GetComponent(faceInfo).getSurface() + 0.3*outwardVec;
	
	if(outwardVec.y != 0)
	{
		spawnPosition.x += outwardVec.y*spawn.x;
		spawnPosition.z += spawn.y;
	}
	else if(outwardVec.x != 0)
	{
		spawnPosition.z += outwardVec.x*spawn.x;
		spawnPosition.y += spawn.y;
	}
	else if(outwardVec.z != 0)
	{
		spawnPosition.x -= outwardVec.z*spawn.x;
		spawnPosition.y += spawn.y;
	}

	return spawnPosition;
}

function bonusPosition()
{
	var spawn : Vector2;
	
	spawn.x = 5;
	spawn.y = 5;
	
	return convertPosition(spawn);
}

function townHallPosition()
{
	var spawn : Vector2;
	
	spawn.x = -5;
	spawn.y = 5;
	
	return convertPosition(spawn);
}


function hutPosition()
{
	var spawn : Vector2;
	
	var faceScript : faceInfo;
	
	//var loopOn : boolean = true;
	faceScript = GetComponent(faceInfo);
	var houseNum : int = faceScript.hutCount;
	spawn.x = Mathf.Round(Random.value*6)-9 + 6*houseNum;
	spawn.y = Mathf.Round(Random.value*9)-9;
	
	
	/*
	if(faceScript.houseLocations != null)
	{
		var positions : Vector2[] = faceScript.houseLocations.ToBuiltin(Vector2) as Vector2[];
	
		for(var i : int = 0; i < 0; i ++)
		{
			loopOn = true;
			while(loopOn == true)
			{
				if(positions[i].x == spawn.x && positions[i].y == spawn.y)
				{
					spawn.x += 2;
					
					if( spawn.x > 9)
					{
						spawn.x -= 18;
					}
					
				}
				else
				{
					loopOn = false;
				}
			}
			
			Debug.Log("Spawn" + spawn);	
		}
	}
	faceScript.houseLocations.Add(spawn);
	*/
	return convertPosition(spawn);
}

function bridgePosition(bridgeDir : int)
{			
	var spawn : Vector2;
	
	if(bridgeDir == 0)
	{
		spawn.x = 0;
		spawn.y	= 9;
	}
	else if(bridgeDir == 1)
	{
		spawn.x = 9;
		spawn.y = 0;
	}
	else if(bridgeDir == 2)
	{
		spawn.x = 0;
		spawn.y = -9;
	}
	else if(bridgeDir == 3)
	{
		spawn.x = -9;
		spawn.y = 0;
	}
	
	var spawnPosition = convertPosition(spawn);
	return spawnPosition;
	
}	

function dockPosition(bridgeDir : int)
{			
	var spawn : Vector2;
	
	if(bridgeDir == 0)
	{
		spawn.x = -2;
		spawn.y	= 6.5;
	}
	else if(bridgeDir == 1)
	{
		spawn.x = 6.5;
		spawn.y = 2;
	}
	else if(bridgeDir == 2)
	{
		spawn.x = 2;
		spawn.y = -6.5;
	}
	else if(bridgeDir == 3)
	{
		spawn.x = -6.5;
		spawn.y = -2;
	}
	
	var spawnPosition = convertPosition(spawn);
	return spawnPosition;
	
}	


function nearHand(handPosition : Vector3)
{
	var spawn : Vector2;
	spawn.x = (Random.value*0.25-0.5)+handPosition.x;
	spawn.y = (Random.value*0.25-0.5)+handPosition.y;

	var spawnPosition = convertPosition(spawn);
	
	//Debug.Log("Near hand spawn" + spawnPosition);
	
	return spawnPosition;
	
}

function randomPosition()
{
	
	//var cubeVec : Vector3;
	var spawn : Vector2;
	spawn.x = Random.value*18-9;
	spawn.y = Random.value*18-9;
/*
	cubeVec = transform.GetComponent(cubeInfo).Vectorify(transform.name);
	var outwardVec = transform.GetComponent(cubeInfo).getOutwardVector();
	var spawnPosition : Vector3 = transform.GetComponent(cubeInfo).getSurface() + 0.3*outwardVec;
	
	if(outwardVec.y != 0)
	{
		spawnPosition.x += spawn_x;
		spawnPosition.z += spawn_y;
	}
	else if(outwardVec.x != 0)
	{
		spawnPosition.z += outwardVec.x*spawn_x;
		spawnPosition.y += spawn_y;
	}
	else if(outwardVec.z != 0)
	{
		spawnPosition.x -= outwardVec.z*spawn_x;
		spawnPosition.y += spawn_y;
	}
*/	
	var spawnPosition = convertPosition(spawn);

	//Debug.Log("Random spawn: " + spawnPosition);

	return spawnPosition;
}


function spawnRotation()
{
	//Debug.Log("Getting spawn rotation for " + transform.name);
	var outwardVec = transform.GetComponent(faceInfo).Normal;
	var rotation : Quaternion = Quaternion.identity;

	if(outwardVec.y == -1)
	{
		rotation.eulerAngles.z = 180;
	}
	else if(outwardVec.x == 1)
	{
		rotation.eulerAngles.z = 270;
	}
	else if(outwardVec.x == -1)
	{
		rotation.eulerAngles.z = 90;
	}		
	if(outwardVec.z == 1)
	{
		rotation.eulerAngles.x = 90;
	}
	else if(outwardVec.z == -1)
	{
		rotation.eulerAngles.x = 270;
	}
	
	return rotation;
}


function breedBlip(fatherStats : float[], motherStats : float[], face : int, position : Vector3)
{
	var babyStats = new float[6];
	
	for(var ind : int = 0; ind < 6; ind ++)
	{
		babyStats[ind] = Mathf.Ceil((motherStats[ind] + fatherStats[ind])/2);	
	}
	
	var mutateStat : int = Mathf.Round(Random.value*5);
	var mutation : int = Mathf.Ceil(Random.value*2);
	
	babyStats[mutateStat] += mutation;

	spawnBlip(babyStats, position);
	
}

function spawnBlip (villagerStats : float[], position : Vector3, Age : float) 
{
	
	var cubeVec : Vector3;

	var spawn_x = Random.value*18-9;
	var spawn_y = Random.value*18-9;
	
	//Debug.Log("transform: " + transform.name);
	//Debug.Log("Parent: " + transform.parent.name);
	//Debug.Log("Parent parent: " + transform.parent.parent.name);
	
	cubeVec = cubeScript.Vectorify(transform.parent.name);
	
	//Debug.Log("CubeVec: " + cubeVec);
	
	var outwardVec = infoScript.Normal;
	var spawnPosition : Vector3;
	var spawnRotation : Quaternion = Quaternion.identity;
	
	if(position == Vector3.zero)
	{
		spawnPosition = infoScript.getSurface() + 0.3*outwardVec; //+ 0.25*transform.GetComponent(cubeInfo).getOutwardVector();
		
		
		
		if(outwardVec.y != 0)
		{
			spawnPosition.x += spawn_x;
			spawnPosition.z += spawn_y;
		}
		else if(outwardVec.x != 0)
		{
			spawnPosition.z += outwardVec.x*spawn_x;
			spawnPosition.y += spawn_y;
		}
		else if(outwardVec.z != 0)
		{
			spawnPosition.x -= outwardVec.z*spawn_x;
			spawnPosition.y += spawn_y;
		}
	}
	else
	{
		spawnPosition = position;
		
	}
	
	if(outwardVec.y == -1)
	{
		spawnRotation.eulerAngles.z = 180;
	}
	else if(outwardVec.x == 1)
	{
		spawnRotation.eulerAngles.z = 270;
	}
	else if(outwardVec.x == -1)
	{
		spawnRotation.eulerAngles.z = 90;
	}		
	if(outwardVec.z == 1)
	{
		spawnRotation.eulerAngles.x = 90;
	}
	else if(outwardVec.z == -1)
	{
		spawnRotation.eulerAngles.x = 270;
	}
			
	var newBlip : GameObject = Instantiate(Resources.Load("blip", GameObject), spawnPosition, spawnRotation);
	
	var newPersonality = newBlip.GetComponent(personality);
	
	newBlip.rigidbody.detectCollisions = false;

	if(cubeScript.cubeType == "Land")
	{
		transform.GetComponent(faceInfo).villagerCount ++;
		transform.parent.parent.GetComponent(worldStats).totalPop ++;
		transform.parent.parent.GetComponent(worldStats).updateStats(villagerStats);
	}
	newPersonality.setPersonality(villagerStats);
	newPersonality.lockToCube(cubeVec);
	newPersonality.lifeExpectancy = infoScript.populationSupport();
	newPersonality.Age = Age;
	//transform.parent.parent.GetComponent(worldStats).totalCuriosity += villagerStats[3];
	
	newBlip.transform.parent = transform;
	newPersonality.Initialise();
	
}

function spawnBlip(villagerStats : float[], position : Vector3)
{	
	spawnBlip(villagerStats, position, 0);
}

function spawnBlip(villagerStats : float[])
{
	spawnBlip(villagerStats, Vector3.zero, 0);
}

function spawnBlip()
{
	spawnBlip(randomStats());
}