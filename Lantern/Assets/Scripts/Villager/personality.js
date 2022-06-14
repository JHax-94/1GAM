#pragma strict

var lockedFace : String;
var lockedCube : Vector3;

var faceScript : faceInfo;// = transform.parent.GetComponent(faceInfo);
var cubeScript : cubeInfo;// = transform.parent.parent.GetComponent(cubeInfo);
var Index : cubeIndex; // = transform.parent.parent.parent.GetComponent(cubeIndex);

var idleTimer : float = 0;

var lifeExpectancy : int = 100;
var Age : float = 0;

var timeSinceBreed : float = 0;
var wantToBreed : boolean = false;

var Aggression : float;
var Amorousness : float;
var Charisma : float;
var Curiosity  : float;
var Industriousness : float;
var Organisation : float;

var Task : String = "None";
var Target : Vector3;
var TargetEdge : int;

var Partner : Transform;

var faceEdge : int = -1;

function Initialise()
{
	faceScript = transform.parent.GetComponent(faceInfo);
	faceEdge = faceScript.nearEdge(transform.position);
	cubeScript = transform.parent.parent.GetComponent(cubeInfo);
	Index = transform.parent.parent.parent.GetComponent(cubeIndex);
}

function statsArray() : float[]
{
	var StatsArray = new float[6];
	
	StatsArray[0] = Aggression; 
	StatsArray[1] = Amorousness;
	StatsArray[2] = Charisma;
	StatsArray[3] = Curiosity;
	StatsArray[4] = Industriousness;
	StatsArray[5] = Organisation;
	
	return StatsArray;
}

function cancelTask()
{
	var success : boolean = false;

	if(Task == "Going" || Task == "None" || Task == "SearchForPartner")
	{
		//Debug.Log("Cancelling task for Villager at: " + transform.position);
		rigidbody.velocity = Vector3.zero;
		giveTask("None");
		
		success = true;
	}
	
	return success;
}

function giveTask(newTask : String)
{
	//Debug.Log("Giving villager at " + transform.position + " task: " + newTask);

	Task = newTask;
	
	if(Task == "None")
	{
		transform.rigidbody.velocity = Vector3.zero;
	}
	else if(Task == "Wait")
	{
		idleTimer = 20;
	}
	
	
}

function giveTask(newTask : String, target : Vector3)
{
	Task = newTask;
	Target = target;
	rigidbody.velocity = (target-transform.position)/(target-transform.position).magnitude;
}

function lockToCube(cubeVec : Vector3)
{
	lockedCube = cubeVec;
}


function setAge(newAge : float)
{
	Age = newAge;
}

function setPersonality (newPersonality : float[]) 
{
	Aggression = newPersonality[0];
	Amorousness = newPersonality[1];
	Charisma = newPersonality[2];
	Curiosity = newPersonality[3];
	Industriousness = newPersonality[4];
	Organisation = newPersonality[5];
}

function Sort(partners : Transform[])
{
	//var partnerArray : Transform[] = partners.ToBuiltin(Transform) as Transform[];
	
	var Distances = new float[partners.length];
	var returnTransform : Transform;
		
				
	for(var cycle = 0; cycle < partners.length; cycle ++)
	{
		Distances[cycle] = (transform.position - partners[cycle].position).magnitude;
	}
		
	var sortableDist = new Array(Distances);
	sortableDist.Sort();
	
	for(var comp : int = 0; comp < partners.length; comp ++)
	{
		if(Distances[comp] == sortableDist[0])
		{
			returnTransform = partners[comp];
		}
	}
		
	
		
	return returnTransform;
}


function closestPartner(potentialMates : Transform[])
{
	var partners = new Array();
	var returnTransform : Transform;
	
	//Debug.Log("Array length: " + potentialMates.Length);

	if(potentialMates.Length > 1)
	{
		for(var cycle : int = 0; cycle < potentialMates.Length; cycle ++)
		{
			//Debug.Log(potentialMates[cycle].name);
			
			if(potentialMates[cycle].GetComponent(personality).wantToBreed == true && potentialMates[cycle].transform.position != transform.position)
			{
				partners.Add(potentialMates[cycle]);
				
			}
		}
		if(partners.length > 0)
		{
			returnTransform = Sort(partners.ToBuiltin(Transform) as Transform[]);	
		}
		else 
		{
		//	Debug.Log("Setting self to partner");
		
			returnTransform = transform;			
		}
		
		
		//Debug.Log("Closest partner at: " + returnTransform.position);
	}
	else
	{
		returnTransform = transform;
	}
	return returnTransform;
	
}


function GoToPartner(partner_pos : Vector3)
{
	var Dir = partner_pos - transform.position;
	Dir = Dir/Dir.magnitude;
	
	rigidbody.velocity = Dir;
	Target = partner_pos;

}

function findPartner()
{
	//var faceInfo = transform.parent.GetComponent(faceInfo);
	var	potentialMates = new Transform[faceScript.villagerCount];
	potentialMates = faceScript.getVillagers(lockedCube);
	
	//Debug.Log("Array size: " + potentialMates.length);
	if(potentialMates.Length > 0)
	{
		Partner = closestPartner(potentialMates);
		if(Partner != null)
		{
			if(Partner.tag == "Villager" && Partner.transform.position != transform.position)
			{
				var PartnerScript = Partner.GetComponent(personality);
				
				
				if(PartnerScript.cancelTask() == true || PartnerScript.Task == "SearchForPartner")
				{
					PartnerScript.giveTask("Wait");
					PartnerScript.Partner = transform;
					giveTask("GoToPartner");
					
					GoToPartner(Partner.position);
				}
				else
				{
					//Debug.Log("Other blips too busy!");
				
					giveTask("None");	
				}
			}
		}
	}
	else 
	{
		//Debug.Log("No other blips want to breed!");
		giveTask("None");
	}
	
}

function constructBuilding(building : String)
{
	transform.parent.GetComponent(spawnScript).spawnBuilding(building);
}

function constructBuilding(building : String, edge : int)
{
	transform.parent.GetComponent(spawnScript).spawnBuilding(building, edge);
}

function Die()
{
	Debug.Log("Villager dying");

	Debug.Log("I'm dying!\nVillager Count = " + faceScript.villagerCount);
	faceScript.villagerCount --;
	Debug.Log("I'm dead!\nVillager Count = " + faceScript.villagerCount);
//	transform.parent.parent.parent.GetComponent(worldStats).totalPop --;
	transform.parent.parent.parent.GetComponent(worldStats).villagerDeath(statsArray());		
		
	if(Partner != null)
	{
		var unbind : Transform;
		
		//Debug.Log("Has partner...");
		
		if(Partner.GetComponent(personality).Task == "Wait")
		{
			Partner.GetComponent(personality).giveTask("None");
		}
			
	}
	
	Debug.Log("Dying with Task: " + Task);
	
	if(Task == "GoToArtifact")
	{
		
		unbind = faceScript.ComponentWithName("artifact");
		unbind.GetComponent(gatherArchaeologists).archaeologistInbound = false;
	}	
	else if(Task == "GoToBook")
	{
		unbind = faceScript.ComponentWithName("tome");
		unbind.GetComponent(gatherBookWorms).readerInbound = false;
	}
	else if(Task == "GoToSite")
	{
		unbind = faceScript.ComponentWithName("constructionsite");
		unbind.GetComponent(constructionSite).buildersCalled --;
	}
	else if(Task == "GoToSpirit")
	{
		unbind = faceScript.ComponentWithName("Spirit");
		unbind.GetComponent(spiritScript).villagerCalled = false;
	}
			
	Debug.Log("Villager died aged " + Mathf.RoundToInt(Age));
		
	Destroy(gameObject);
}

function checkDeath()
{
	//lifeExpectancy = transform.parent.GetComponent(cubeInfo).populationSupport();

	/* ROLL AGAINST LIFE EXPECTANCY */
	// VERY LOW CHANCE OF DYING WELL BELOW LIFE EXPECTANCY 0-25%
	// LOW CHANCE OF DYING APPROACHING LIFE EXPECTANCY 25%-50%
	// HIGH CHANCE OF DYING AT OR SLIGHTLY ABOVE 50%-75%
	// VERY HIGH CHANCE WELL ABOVE 75%-100%
	
	var Roll = Random.value*1000;
	var Threshold : int;
	
	if(Age < lifeExpectancy-10)
	{
		// V. LOW
		Threshold = Mathf.RoundToInt(lifeExpectancy/1000);
		
		
	}
	else if(Age >= lifeExpectancy-10 && Age < lifeExpectancy)
	{
		// LOW
		
		Threshold = Mathf.RoundToInt(5000/lifeExpectancy);
		
	}
	else if(Age >= lifeExpectancy && Age < lifeExpectancy+10)
	{
		//HIGH
		
		Threshold = 750;
		
	}
	else if(Age >= lifeExpectancy+10)
	{
		Threshold = 1000;
	}	
	
	if(Roll < Threshold)
	{
		//var faceInfo = transform.parent.GetComponent(faceInfo);
		/*
		faceScript.villagerCount --;
		transform.parent.parent.parent.GetComponent(worldStats).villagerDeath(statsArray());		
		
		
		if(Partner != null)
		{
			var unbind : Transform;
		
			if(Partner.GetComponent(personality).Task == "Wait")
			{
				Partner.GetComponent(personality).giveTask("None");
			}
			
		}
		
		if(Task == "GoToArtifact")
		{
			unbind = faceScript.ComponentWithName("artifact");
			unbind.GetComponent(gatherArchaeologists).archaeologistInbound = false;
		}	
		else if(Task == "GoToBook")
		{
			unbind = faceScript.ComponentWithName("tome");
			unbind.GetComponent(gatherBookWorms).readerInbound = false;
		}
		else if(Task == "GoToSite")
		{
			unbind = faceScript.ComponentWithName("constructionsite");
			unbind.GetComponent(constructionSite).buildersCalled --;
		}
		else if(Task == "GoToSpirit")
		{
			unbind = faceScript.ComponentWithName("Spirit");
			unbind.GetComponent(spiritScript).villagerCalled = false;
		}
		
		
		Debug.Log("Villager died aged " + Mathf.RoundToInt(Age));
		
		Destroy(gameObject);
		*/
		
		Die();
		
	}
}

function GetOlder()
{
	Age += Time.deltaTime;	
	timeSinceBreed += Time.deltaTime;
	if(Age >= 0.7*lifeExpectancy)
	{
		wantToBreed = false;
	}
}

function nearTarget(radius : float)
{
	var Near : boolean = false;
	
	var Dir = (Target - transform.position);
	var Dist = Dir.magnitude;
	
	
	if(Dist < radius)
	{
		Near = true;
	}
	
	return Near;
}

function nearTarget()
{
	return nearTarget(1);
}
/*
function nearPoint(point : Vector2, radius : float)
{
	var Near : boolean = false;
	
	Debug.Log("Point: " + point);
	Debug.Log("Villager: " + transform.parent.GetComponent(faceInfo).squarePosition(transform.position));
	
	
	var Dir = (point - transform.parent.GetComponent(faceInfo).squarePosition(transform.position));
	var Dist = Dir.magnitude;
	
	if(Dist < radius)
	{
		Near = true;
	}
	
	return Near;
}
*/
function snapToCentre()
{
	var target = faceScript.realWorldPosition(faceScript.squarePosition(transform.position));
	
	transform.position = target;
}

function goToCentre()
{
	var target = faceScript.realWorldPosition(Vector2(0, 0));
	
	var dir : Vector3 = (target - transform.position);
	
	transform.rigidbody.velocity = dir/dir.magnitude;
	Target = target;
}

function goToBridge(edge : int)
{
	var target : Vector2;
	
//Debug.Log("Target on " + transform.parent.parent.name);
	
	if(edge == 0)
	{
		target = Vector2(0, 9);
	}
	else if(edge == 1)
	{
		target = Vector2(9, 0);
	}
	else if(edge == 2)
	{
		target = Vector2(0, -9);
	}
	else if(edge == 3)
	{
		target = Vector2(-9, 0);
	}
	
	var worldTarget = faceScript.realWorldPosition(target);
	
	
	
	
	transform.rigidbody.velocity = (worldTarget - transform.position)/(worldTarget - transform.position).magnitude;
	
	Target = worldTarget;
	TargetEdge = edge;
}

function goToEdge(edge : int)
{
	var target : Vector2;
	if(edge == 0)
	{
		target = Vector2(0, 11);
	}
	else if(edge == 1)
	{
		target = Vector2(11, 0);
	}
	else if(edge == 2)
	{
		target = Vector2(0, -11);
	}
	else if(edge )
	{
		target = Vector2(-11, 0);
	}

	var worldTarget = faceScript.realWorldPosition(target);
	
	transform.rigidbody.velocity = (worldTarget - transform.position)/(worldTarget - transform.position).magnitude;
	Target = worldTarget;
	TargetEdge = edge;
}

function Wanderlust()
{
	var dirRoll = Mathf.RoundToInt(Random.value*3);
	//var Face = transform.parent.GetComponent(faceInfo);
	//var Cube = transform.parent.parent.GetComponent(cubeInfo);
	var loopCount : int = 3;
	var LoopOn : boolean = true;
	
	//Debug.Log("Pre-loop wanderlust...");
	
	var miniTask : String = "None";
	
	while(LoopOn == true)
	{																																					
		if(faceScript.bridges[dirRoll] == true)
		{
			//Debug.Log("Wanderlust");
					
			goToBridge(dirRoll);
			//Debug.Log("Villager Leaving Cube!");
			
						
			var DirCube = Index.cubeInDir(dirRoll, cubeScript.Vectorify(transform.parent.parent.name), faceScript.Normal);
							
			if(transform.parent.parent.name == DirCube.name)
			{
				/*faceScript.villagerCount --;
			
				giveTask("GoToEdge");
				goToEdge(dirRoll);		*/
				miniTask = "GoToEdge";
				
			}
			else
			{
				/*faceScript.villagerCount --;
			
				giveTask("GoToBridge");	
				goToBridge(dirRoll);*/
				
				miniTask = "GoToBridge";
				
			}
			LoopOn = false;
			
		}
		else
		{
			if(loopCount > 0)
			{
				loopCount --;
				dirRoll ++;
				dirRoll = dirRoll%4;
			}
			else 
			{
				giveTask("None");
				LoopOn = false;
			}
		}
		
	}
	
	if(miniTask == "GoToEdge")
	{
	//	faceScript.villagerCount --;
		
		giveTask("GoToEdge");
		goToEdge(dirRoll);
	}
	else if(miniTask == "GoToBridge")
	{
	//	faceScript.villagerCount --;
		
		giveTask("GoToBridge");
		goToBridge(dirRoll);
	}
	
}

function RandomDestination()
{

	var target : Vector2;

	target.x = Random.value*18-9;
	target.y = Random.value*18-9;
/*	
	var World = transform.parent.parent.parent;
	
	//Debug.Log(World.name);
	
	var cube = World.GetComponent(cubeIndex).GetCube(lockedCube);
	
	var worldTarget = cube.GetComponent(cubeInfo).faces[0].GetComponent(faceInfo).realWorldPosition(target);
	
*/
	var worldTarget = faceScript.realWorldPosition(target);
		
	var dir : Vector3 = (worldTarget - transform.position);
	
	//Debug.Log("Position: " + transform.position + "\nTarget: " + worldTarget + "\nDir: " + dir);
	
	transform.rigidbody.velocity = dir/dir.magnitude;
	Target = worldTarget;
}

function Embark()
{
	var Stats = statsArray();
	//Debug.Log("Stats: " + Stats[5]);
	transform.parent.GetComponent(spawnScript).spawnBoat(faceScript.nearEdge(transform.position), Stats, Age);
}




function Start()
{
	wantToBreed = false;
}

function Update()
{
	if(idleTimer != 0 && Task == "Wait")
	{
		idleTimer -= Time.deltaTime;
		
		if(idleTimer <= 0)
		{
			idleTimer = 0;
			giveTask("Going");
			RandomDestination();
		}
	}
	
}

function FixedUpdate()
{
	GetOlder();
	var FaceRoot = transform.parent;
	//var Face = FaceRoot.GetComponent(faceInfo);
	//var Cube = transform.parent.parent.GetComponent(cubeInfo);
	var hand = GameObject.FindGameObjectWithTag("Hand").GetComponent(playerHand);
	//var World = transform.parent.parent.parent.GetComponent(worldStats);
/*	if(hand.presenceOn == true)
	{
		if(hand.lockedCube != null && hand.lockedCube.name == transform.parent.parent.name)
		{
			if(hand.lockedFace.name == transform.parent.name)
			{
			
				Debug.Log("FAAAAACE!");
				if(nearPoint(hand.getPosition(), 1) == true)
				{
					Debug.Log("Nearby!");
				}
			}
			
		}
	}
*/
	var act : int = Mathf.RoundToInt(Random.value*6);
	
	if(cubeScript.cubeType == "Land" && act == 1)
	{
		if(Task == "None")
		{
		
		//	transform.rigidbody.velocity = 0;
			// CHOOSE SOMETHING TO DO
			var Roll = Mathf.RoundToInt(Random.value*100);
			
			if(Roll == 1)
			{
				// GO FOR A WALK
				//Debug.Log("Going for a walk!");
				giveTask("Going");
				
				
				RandomDestination();	
			}
			if(timeSinceBreed > 20 && (Age > 20 && Age < 0.7*lifeExpectancy)) // PHYSICALLY ABLE TO BREED
			{	
				Roll = Mathf.RoundToInt(Random.value*200);
			
				if(wantToBreed == true && Roll < 20)
				{
					findPartner();
				}
				else if(Roll*faceScript.overPop() < Amorousness)
				{
					wantToBreed = true;
				
					//Debug.Log("I want yo babies!");
					// SEARCH FOR ANOTHER VILLAGER THAT WANTS TO BREED
					rigidbody.velocity = Vector3.zero;
					giveTask("SearchForPartner");
					
					findPartner();
				}
			}
			if(faceScript.siteCount == 0)
			{
				if(faceScript.villagerCount >= 2+faceScript.hutCount*2 && Industriousness >= faceScript.hutCount*10+10 && faceScript.hutCount < 3)
				{
					//Debug.Log("I am Jack Patillo");
					faceScript.siteCount ++;
					constructBuilding("hut");
				}
				
				if(faceScript.hutCount > 0 && Industriousness >= 10 + 2*faceScript.towerCount() && Curiosity >= 10 + 2*faceScript.towerCount())
				{
				//	var hand = GameObject.FindGameObjectWithTag("Hand").GetComponent(playerHand);
					
					//Debug.Log("Conditions fulfilled!");
					
					if(hand.nearEdge(FaceRoot) != -1)
					{	
						//Debug.Log("Hand by edge!");
						
						
						if(faceScript.towers[hand.nearEdge(FaceRoot)] == false)
						{
							faceScript.siteCount ++;
							constructBuilding("tower", hand.nearEdge(FaceRoot));
							var dirString : String;
							var tempEdge : int = hand.nearEdge(FaceRoot);
							
							if(tempEdge == 0)
							{
								dirString = "North";
							}
							else if(tempEdge == 1)
							{
								dirString = "East";
							}
							else if(tempEdge == 2)
							{
								dirString = "South";
							}
							else if(tempEdge == 3)
							{
								dirString = "West";
							}
							
							//Debug.Log("Building on " + dirString + " side.");
							
							
																
						}
					}
				}
				
				if(/*Curiosity >= 15 && Industriousness >= 15 && Organisation >= 15*/Industriousness >= 12 && Curiosity >= 12)
				{
				
					var bridgeDir : int = -1;
					for(var dir : int = 0; dir < 4; dir ++)
					{
						if(faceScript.towers[dir] == true && faceScript.bridges[dir] == false)
						{
							bridgeDir = dir;
						}
					}
					
					if(bridgeDir >= 0 && bridgeDir < 4)
					{
						faceScript.siteCount ++;
						constructBuilding("bridge", bridgeDir);
					}
				}
				
				
				if(faceScript.hutCount > 2 && Industriousness >= 15 && Organisation >= 20 && Charisma >= 25 && faceScript.townHall == false)
				{
					faceScript.siteCount ++;
					constructBuilding("townHall");
				}
				
				if(faceScript.townHall == true && Aggression >= 20 && faceScript.fort == false && faceScript.temple != true)
				{
					faceScript.siteCount ++;
					constructBuilding("fort");
				}
				
				if(faceScript.townHall == true && faceScript.temple == false && faceScript.fort != true && Curiosity >= 20)
				{
					faceScript.siteCount ++;
					constructBuilding("temple");
				}
				
			
			}
			
			if(faceScript.populationUnsupported() == true)
			{
				if(Curiosity > Industriousness && Curiosity == faceScript.topCuriosity())
				{
					/*var dirRoll = Mathf.RoundToInt(Random.value*3);
					
					if(Face.bridges[dirRoll] == true)
					{
						Debug.Log("Wanderlust");
						
						goToBridge(dirRoll);
						transform.parent.GetComponent(faceInfo).villagerCount --;
						
						var DirCube = transform.parent.parent.parent.GetComponent(cubeIndex).cubeInDir(dirRoll, Cube.Vectorify(transform.parent.parent.name), Face.Normal);
						
					
						
						if(transform.parent.parent.name == DirCube.name)
						{
							giveTask("GoToEdge");
							goToEdge(dirRoll);
						
						}
						else
						{
							giveTask("GoToBridge");	
							goToBridge(dirRoll);
						}
					}*/
					Wanderlust();
				}
				else if (Industriousness >= faceScript.hutCount*5+10 && faceScript.hutCount < 3 && faceScript.siteCount == 0)
				{
					faceScript.siteCount ++;
					constructBuilding("hut");
				}
				else 
				{
					giveTask("Going");
					RandomDestination();
				}
			}

			  // ELSE CONTINUE TO LAZE ABOUT		
		}
		else
		{
			// CONTINUE EXISTING TASK
		
			if(Task == "Going")
			{
				if(nearTarget())
				{
					transform.rigidbody.velocity = Vector3.zero;
					giveTask("None");
				}
			}
			else if(Task == "GoToPartner")
			{
				if(nearTarget(2))
				{
					// MAKIN' BABY TIME
					
					//
				//	Debug.Log("Near Target");
					if(Partner != null)
					{
						var partnerScript = Partner.GetComponent(personality);
						var spawnVector : Vector3;
						
						
						spawnVector.x = (transform.position.x + Partner.position.x)/2;	
						spawnVector.y = (transform.position.y + Partner.position.y)/2;
						spawnVector.z = (transform.position.z + Partner.position.z)/2;
						
						
						
						FaceRoot.GetComponent(spawnScript).breedBlip(statsArray(), partnerScript.statsArray(), 0, spawnVector);
						
						transform.rigidbody.velocity = Vector3.zero;
						partnerScript.giveTask("None");
						partnerScript.timeSinceBreed = 0;
						partnerScript.wantToBreed = false;
						wantToBreed = false;
						timeSinceBreed = 0;
						giveTask("None");
						
						Partner = transform;
					}
					else 
					{
						giveTask("None");
					}
					//Task = "None";
				}
			}
			else if(Task == "SearchForPartner")
			{
				
				if(wantToBreed == false)
				{
					giveTask("None");
				}
				else 
				{
					findPartner();	
				}
				
			}
			else if(Task == "Wait")
			{
				//Debug.Log("I am waiting...");
				partnerScript = Partner.GetComponent(personality);
				
				
				if(partnerScript.Task != "GoToPartner")
				{
					//Debug.Log("Wrangling absent minded fucktards...");
					
					partnerScript.giveTask("GoToPartner");
				}
			}
			else if(Task == "GoToSite")
			{
				if(nearTarget(2))
				{
					FaceRoot.GetComponentInChildren(constructionSite).addBuilder();
					rigidbody.velocity = Vector3.zero;
					giveTask("None");
				}
			}
			else if(Task == "GoToBook")
			{
				if(nearTarget(1))
				{
					FaceRoot.GetComponentInChildren(gatherBookWorms).readBook();
					rigidbody.velocity = Vector3.zero;
					Target = Vector3.zero;
					giveTask("None");
				}
			}
			else if(Task == "GoToArtifact")
			{
				if(nearTarget(1))
				{
					FaceRoot.GetComponentInChildren(gatherArchaeologists).studyArtifact();
					rigidbody.velocity = Vector3.zero;
					Target = Vector3.zero;
					giveTask("None");
				}
			}
			else if(Task == "GoToBridge")
			{	
				if(nearTarget(0.5))
				{	
					Debug.Log("I'm leaving!\nVillager Count = " + faceScript.villagerCount);
					faceScript.villagerCount --;
					Debug.Log("I've left!\nVillagerCount = " + faceScript.villagerCount);
					
					var DirCube = Index.cubeInDir(TargetEdge, cubeScript.Vectorify(transform.parent.parent.name), faceScript.Normal);
									
					transform.parent = DirCube.GetComponent(cubeInfo).faceWithNormal(faceScript.Normal);
					
					faceScript = transform.parent.GetComponent(faceInfo);
					cubeScript = transform.parent.parent.GetComponent(cubeInfo);
					faceScript.villagerCount ++;
					
					goToBridge((TargetEdge+2)%4);
					giveTask("CrossBridge");
				}
			}
			else if(Task == "CrossBridge")
			{
				if(nearTarget(0.5))
				{
					
				
					giveTask("Going");
					RandomDestination();
				}
			}
			else if(Task == "GoToEdge")
			{
				if(nearTarget(0.5))
				{
					Debug.Log("I'm leaving!\nVillager Count = " + faceScript.villagerCount);
					faceScript.villagerCount --;
					Debug.Log("I've left!\nVillagerCount = " + faceScript.villagerCount);
					
					rigidbody.velocity = Vector3.zero;
					
					transform.parent = cubeScript.faceWithNormal(cubeScript.normalInDir(TargetEdge, faceScript.Normal));
					faceScript = transform.parent.GetComponent(faceInfo);
					cubeScript = transform.parent.parent.GetComponent(cubeInfo);
					
					faceScript.villagerCount ++;
			//		Debug.Log("Up: " + transform.up);
			//		Debug.Log("New Normal: "+ faceScript.Normal);
			//		Debug.Log("Cross Product: " + Vector3.Cross(transform.up, faceScript.Normal));
					
					transform.Rotate(Vector3.Cross(transform.up, faceScript.Normal ), 90, Space.World);
					
					giveTask("GoToCentre");
					goToCentre();	
							
						
				}
			}
			else if(Task == "GoToCentre")
			{
				if(nearTarget(1))
				{
					snapToCentre();
					giveTask("Going");
					RandomDestination();
					
				}
			}
			else if(Task == "GoToSpirit")
			{
				if(nearTarget(1))
				{			
					FaceRoot.GetComponentInChildren(spiritScript).imbueSpirit();
				}
			}
			
			
		}
	}
	else
	{
		if(Task == "GoToSite")
		{
			if(nearTarget(2))
			{
				FaceRoot.GetComponentInChildren(constructionSite).addBuilder();
				rigidbody.velocity = Vector3.zero;
				giveTask("None");
			}
		}
		
		else if(Task == "CrossBridge")
		{
			if(nearTarget(0.5))
			{
				rigidbody.velocity = Vector3.zero;
				faceEdge = faceScript.nearEdge(transform.position);
			
				if(faceScript.docks[faceEdge] == false)
				{
					//rigidbody.transform.localPosition.y += 0.3;
					Target = Vector3.zero;					
					giveTask("None");
				}
				else
				{
					Embark();
					Destroy(gameObject);
				}
			}
		}
		else if(Task == "GoToBridge")
		{	
			if(nearTarget(0.5))
			{	
				//faceSCript = transform.parent.GetComponent(faceInfo);
				Debug.Log("I'm leaving a sea square!\nVillager Count = " + faceScript.villagerCount);
				faceScript.villagerCount --;
				Debug.Log("I'm leaving a sea square!\nVillager Count = " + faceScript.villagerCount);
				
				var CubeInDir = Index.cubeInDir(TargetEdge, cubeScript.Vectorify(transform.parent.parent.name), faceScript.Normal);
					
					
					
				transform.parent = CubeInDir.GetComponent(cubeInfo).faceWithNormal(faceScript.Normal);
				faceScript = transform.parent.GetComponent(faceInfo);
				cubeScript = transform.parent.parent.GetComponent(cubeInfo);
				
				
				faceScript.villagerCount ++;
				goToBridge((TargetEdge+2)%4);
				giveTask("CrossBridge");
			}
		}
		else if(Task == "None" && act == 1)
		{
			
		
			if(faceEdge != -1)
			{
			//	Debug.Log("No sites on face!");
				
			//	Debug.Log("Villager at side " + faceEdge);
				
				if(faceScript.siteCount == 0)
				{
					if(faceScript.docks[faceEdge] == false)
					{
						faceScript.siteCount ++;
						constructBuilding("dock", faceEdge);
					}
				}
			
				
				
				if(faceScript.bridges[faceEdge] == false && faceScript.siteCount == 0)
				{
					faceScript.siteCount ++;
					constructBuilding("bridge", faceEdge);
				}
				else if(faceScript.docks[faceEdge]== true)
				{
					Roll = Mathf.FloorToInt(Random.value*9);
				
					/*if(Roll == 0)
					{
						//Debug.Log("Build a boat!");
					
						Embark();
						Destroy(gameObject);
					}*/
					if(Roll > 6 && faceScript.bridges[faceEdge] == true)
					{
						goToBridge(faceEdge);
						giveTask("GoToBridge");
					}	
				}
			}	
		}
			/*else if(faceScript.nearEdge(transform.position) != -1 && faceScript.docks[faceScript.nearEdge(transform.position)] == true)
			{
				if(faceScript.siteCount == 0 && faceScript.bridges[faceScript.nearEdge(transform.position)] == false)
				{
					faceScript.siteCount ++;
					constructBuilding("bridge", faceScript.nearEdge(transform.position));
				}
				else
				{
					Roll = Mathf.RoundToInt(Random.value*3);
					
					if(Roll != 3)
					{
						Debug.Log("Build a boat!");
						
						Embark();
						Destroy(gameObject);
					}
					else
					{
						goToBridge(faceScript.nearEdge(transform.position));
						giveTask("GoToBridge");
					}	
					
					
				}
			}	*/			
	}
}