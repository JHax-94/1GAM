#pragma strict

var Index : cubeIndex;

var eventNumber : int;
var eventType : String;

var Roll : int;

var worldScript : worldStats;
var personalityScript : personality;
var cubeScript : cubeInfo;


var Face_A : Transform;
var Script_A : faceInfo;

var Face_B : Transform;
var Script_B : faceInfo;



var overrideButton : boolean = false;


function Start()
{
	Index = GetComponent(cubeIndex);
	worldScript = GetComponent(worldStats);
	overrideButton = false;
}

function randomCubeOfType(typeName : String)
{
	var cubeArray : Transform[] = Index.cubesOfType(typeName);
				
	Roll = Mathf.Floor(Random.value*(cubeArray.Length-1));
			
	//transforms = cubeArray[Roll].GetComponentsInChildren(Transform) as Transform[];
	
	return cubeArray[Roll];
}


function OnGUI()
{
	
	var transforms : Transform[];
	var Flip : int;
	var Faces : Transform[];
	
	if(eventType == "Seasonal")
	{
		
		var randomCube : Transform;
		
	
		GUI.Box(Rect(Screen.width/2 - 300, Screen.height/2-200, 600, 300), "Seasonal event!");
		
		overrideButton = false;
		
		switch(eventNumber)
		{
			case 0:
			
				//GUI.Box(Rect(Screen.width/2 - 300, Screen.height/2-200, 600, 300), "Boom! Seasonal event!");
				
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Storm!");
				// DESTROY BOATS
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Major storms at sea pose a threat to all seafaring folk!");
				/*cubeArray = Index.cubesOfType("Sea");
				
				Roll = Mathf.RoundToInt(Random.value*(cubeArray.Length-1));*/
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Water");
					
					transforms = randomCube.GetComponentsInChildren.<Transform>();// as Transform[];
					
					
					
					for( var T : Transform in transforms)
					{
						if(T.name == "boat(Clone)")
						{
							Flip = Mathf.RoundToInt(Random.value*2);
							
							if(Flip == 2)
							{
								worldScript.villagerDeath(T.GetComponent(boatAI).villagerStats);
								Destroy(T.gameObject);
							}
						}
					}
					eventType = "None";
					Time.timeScale = 1;
				}
				
			break;
			
			case 1:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Famine!");
				
				// KILL ALL EXCESS VILLAGERS (AT LEAST)
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Somewhere in the world, great hunger has lead to death!");
				
				/*cubeArray = Index.cubesOfType("Land");
				
				Roll = Mathf.RoundToInt(Random.value*(cubeArray.Length-1));*/
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					
					Debug.Log("Cube: " + randomCube.name);
					
					transforms = randomCube.GetComponentsInChildren.<Transform>();
					

					
					
					Faces = randomCube.GetComponent(cubeInfo).getFaces();
						
					Debug.Log("Faces: " + Faces);
						
					var L : int = Faces.Length;
						
					var Kill : int = 0;
						
					for( var i : int = 0; i < L; i ++)
					{
						Kill += Mathf.Ceil(Faces[i].GetComponent(faceInfo).populationSupport()/2);
					}
						
						
					for( var T : Transform in transforms)
					{
						if(T.name == "blip(Clone)" && Kill > 0)
						{
							
							Flip = Mathf.RoundToInt(Random.value);
							
							if(Flip == 0)
							{
								T.GetComponent(personality).Die();
								Kill --;
							}
						}
					}
					
					eventType = "None";
					Time.timeScale = 1;
				
				}
				
				
				
			
			break;
			
			case 2:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Good harvest!");
				
				// EVERYONE WANTS TO BREED
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Somewhere in the world, villagers are enjoying the benefits of being exceptionally well fed!");
				/*cubeArray = Index.cubesOfType("Land");
				
				Roll = Mathf.RoundToInt(Random.value*(cubeArray.Length-1));*/
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					
					transforms = randomCube.GetComponentsInChildren.<Transform>();// as Transform[];
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							T.GetComponent(personality).wantToBreed = true;
						}
					}
					
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
				
			
			break;
			
			case 3:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Riots!");
				
				// HIGHEST AGGRESSION DEATHS + RANDOM OTHERS
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Parts of the world have been affected by rioting villagers!");
			/*	cubeArray = Index.cubesOfType("Land");
				
				Roll = Mathf.RoundToInt(Random.value*(cubeArray.Length-1));*/
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					
					Faces = randomCube.GetComponent(cubeInfo).getFaces();
					
					Roll = Mathf.RoundToInt(Random.value*(Faces.Length-1));
					
					Flip = Mathf.RoundToInt(Random.value*2);
					
					var maxDeaths : int = Faces[Roll].GetComponent(faceInfo).villagerCount - 2;
					
					var LoopOn : boolean = true;
					var Killed : int = 0;
					var villager : Transform;
					
					while(LoopOn != false)
					{
						Flip = Mathf.RoundToInt(Random.value*2);
					
						if(Flip != 2 && Killed < maxDeaths)
						{
							villager = Faces[Roll].GetComponent(faceInfo).topAggression();
							
							if(villager != null)
							{
								villager.GetComponent(personality).Die();
							}
						}
						else
						{
							LoopOn = false;
						}
					}
					
					eventType = "None";
					Time.timeScale = 1;
				}
			
			break;
			
			case 4:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Religious zeal!");
				
				// NOBODY WANTS TO BREED
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Certain villagers have been overcome with a sudden urge to be bizarrely puritanical!");
				
				/*cubeArray = Index.cubesOfType("Land");
				
				Roll = Mathf.RoundToInt(Random.value*(cubeArray.Length-1));*/
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					
					transforms = randomCube.GetComponentsInChildren.<Transform>();// as Transform[];
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							T.GetComponent(personality).wantToBreed = false;
						}
					}
					eventType = "None";
					Time.timeScale = 1;
				}
			break;
			
			case 5:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Earthquake");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Structural integrity critical!");
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					// DESTROY BUILDINGS
					
					
					
					//Faces = randomCube.GetComponent(cubeInfo).getFaces();
					
					
					transforms = randomCube.GetComponentsInChildren.<Transform>();// as Transform[];
					
					for( var T : Transform in transforms)
					{
						if(T.name == "hut(Clone)")
						{
							Flip = Mathf.RoundToInt(Random.value*2);
							
							if(Flip == 2)
							{
								T.parent.GetComponent(faceInfo).hutCount --;
								Destroy(T.gameObject);
							}
							
						} 
					}
					
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
				
			
			break;
			
			case 6:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Festival!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Beasts everywhere fear a roasting!");
				
				// DOUBLES CURRENT BOOK & ARTIFACT POINTS
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					Debug.Log("Pre-art: " + worldScript.artPoints + "Pre-book: " + worldScript.bookPoints);
				
					worldScript.artPoints *= 2;
					worldScript.bookPoints *= 2;
					
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
			break;
			
			case 7:
				
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Political Tension!");
				
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Social stability is getting a little wobbly, and the people aren't happy about it!");
				// DECREASES ORGANISATION, INCREASES AGGRESSION
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					
					Debug.Log("Cube: " + randomCube.name);
					
					
					Faces = randomCube.GetComponent(cubeInfo).getFaces();
					
					Roll = Mathf.RoundToInt(Random.value*(Faces.Length-1));
					
					Debug.Log("Roll value: " + Roll);
					Debug.Log("Face: " + Faces[Roll].name);
					
					
					transforms = Faces[Roll].GetComponentsInChildren.<Transform>();// as Transform[];
					
					Debug.Log(transforms);
					
					var totalAgg = 0;
					var totalOrg = 0;  
					
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							var personScript = T.GetComponent(personality);
							var AggChange : float = 5;
							var OrgChange : float = -5;
							
							if(personScript.Organisation < 5)
							{
								OrgChange = personScript.Organisation;
							}
							
							personScript.Aggression += AggChange;
							personScript.Organisation += OrgChange;
							totalAgg += AggChange;
							totalOrg += OrgChange;
							
						}
					}
					
					var changeArray : float[] = [AggChange, 0, 0, 0, 0, OrgChange];
					
					worldScript.updateStats(changeArray);
					
					eventType = "None";
					Time.timeScale = 1;
					
				}
				
			break;
			
			case 8:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Plague!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Bring out your dead!");
				
				// DEATH AND CRUD - DECREASE IN AMOROUSNESS
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					
					transforms = randomCube.GetComponentsInChildren.<Transform>();// as Transform[];
					var AmChange : float = 5;	
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							Flip = Mathf.RoundToInt(Random.value*2);
							
							var villagerScript = T.GetComponent(personality);
							
							if(Flip == 2)
							{
								T.GetComponent(personality).Die();
							}
							else
							{
								if(villagerScript.Amorousness < 5)
								{
									AmChange = villagerScript.Amorousness;
								}
								
								villagerScript.Amorousness += AmChange;
								
								var change : float[] = [0, AmChange, 0, 0, 0, 0];
								
								worldScript.updateStats(change);
							}
						}
						
					}
					
					eventType = "None";
					Time.timeScale = 1;
				
				}
				
			break;
			
			case 9:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Faithlessness!");
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "It's disturbing really...");
				// SETS BOOK & ARTIFACT POINTS TO ZERO
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					worldScript.bookPoints = 0;
					worldScript.artPoints = 0;
					
					eventType = "None";
					Time.timeScale = 1;
				}
			break;
			
			case 10:
				
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Mass Exodus!");
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Somewhere in the world people have completely uprooted and gone in search of a new home!");
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					randomCube = randomCubeOfType("Land");
					
					Debug.Log("Cube: " + randomCube.name);
					
					Faces = randomCube.GetComponent(cubeInfo).getFaces();
					
					Roll = Mathf.RoundToInt(Random.value*(Faces.Length-1));
					
					Debug.Log("Roll: " + Roll);
					
					Debug.Log("Face: " + Faces[Roll]);
					
					
					transforms = Faces[Roll].GetComponentsInChildren.<Transform>();// as Transform[];
					
					
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							T.GetComponent(personality).Wanderlust();
						}
					}
					eventType = "None";
					Time.timeScale = 1;
					
				}
			break;
			
			case 11:
				
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Baby Boom!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Suddenly: babies.");
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
				// SPAWN A RANDOM AMOUNT OF NEW VILLAGERS WITH RANDOM STATS
					randomCube = randomCubeOfType("Land");
					
					cubeScript = randomCube.GetComponent(cubeInfo);
					
					Debug.Log("Random Cube: " + randomCube.name);
					Debug.Log("Material: " + randomCube.renderer.sharedMaterial);
					
					if(randomCube.renderer.sharedMaterial.name == "blackCube")
					{
						cubeScript.defog();
					}
					
					Faces = cubeScript.getFaces();
					
					Roll = Mathf.RoundToInt(Random.value*(Faces.Length-1));
					
					var spawner = Faces[Roll].GetComponent(spawnScript);
					
					var nSpawn : int = Mathf.Ceil(Random.value*4);
					
					var newStats : float[] = [0f, 0f, 0f, 0f, 0f, 0f];
					
					for( var k : int = 0; k < nSpawn; k ++)
					{
						for( var j : int = 0; j < 6; j ++)
						{
							newStats[j] = Mathf.Ceil(Random.value*10);
						}
						
						spawner.spawnBlip(newStats);
					}
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
				
			
			break;
			
			case 12:
			
				GUI.Label(Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 50), "Business as usual!");
				// NOTHING PARTICULARLY INTERESTING HAPPENING
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					eventType = "None";
					Time.timeScale = 1;
				}
			break;
			
		}
		/*if(overrideButton == false)
		{
			if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
			{
				eventType = "None";
				Time.timeScale = 1;
			}
		}*/
	}
	else if(eventType == "Contact")
	{
		Debug.Log("Face A: " + Face_A.name + "\nFace B: " + Face_B.name);	
	
	
		GUI.Box(Rect(Screen.width/2 - 300, Screen.height/2-200, 600, 300), "Contact event!");
		overrideButton = false;
		switch(eventNumber)
		{
			case 0:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Savages!");
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "There appear to already be people on your fancy new bit of land and they aren't at all pleased you're here and rather unkindly try to kill you!");
				Script_A = Face_A.GetComponent(faceInfo);
				var spawner_b = Face_B.GetComponent(spawnScript);
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{		
					var maxKills : int = Script_A.villagerCount-2;
					var killCount : int = 0;
					var personalityScript : personality;
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
						
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager" && killCount <= maxKills)
						{
						 	Roll = Mathf.RoundToInt(Random.value*20);
						 	personalityScript = T.GetComponent(personality);
						 	
						 	if(Roll > personalityScript.Aggression)
						 	{
						 		personalityScript.Die();
						 		killCount ++;
						 	}
						 	else
						 	{
						 		break;
						 	}
						}
				
					}
					eventType = "None";
					Time.timeScale = 1;
				}
				/*
				if(GUI.Button(Rect(Screen.width/2 + 200, Screen.height/2 + 100, 100, 25), "Negotiate"))
				{
					Roll = Mathf.RoundToInt(Random.value*50);
						
					if(Script_A.topCharisma() > Roll)
					{
						spawner_b.spawnBlip();
						spawner_b.spawnBlip();
					}
					
					eventType = "None";
					Time.timeScale = 1;
				
				}
				*/
				// ENCOUNTER AGGRESSIVE SAVAGES
				//		- EITHER TRY TO ACCEPT THEM INTO THE FOLD (MORE LIKELY WITH 
				//		- OR TRY TO FIGHT THEM (MORE LIKELY TO BE SUCCESSFUL GENERALLY, BUT REQUIRES HIGH AGGRESSION
					
			break;
			
			case 1: 
			
				GUI.Label(Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 25), "Mysterious Ruins!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "The new land appears to be home to some strange ruins. Why not take a closer look? What could possibly go wrong?");
				
				
				// CHOOSE WHETHER OR NOT TO INVESTIGATE
				
				// 		- INVESTIGATING CAN LEAD TO BOOST IN CURIOSITY/ENLIGHTENMENT/ENLIGHTENMENT RATE
				//		- OR UNLEASHING A MONSTER CAUSING DEATHS BASED ON AGGRESSION
				
				if(GUI.Button(Rect(Screen.width/2 -300, Screen.height/2 + 100, 100, 25), "Investigate"))
				{
					Roll = Mathf.RoundToInt(Random.value*12);
					
					if(Roll < 4)
					{
						transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
						
						for( var T : Transform in transforms)
						{
							if(T.tag == "Villager")
							{
								T.GetComponent(personality).Curiosity += 5;
								worldScript.updateStats([0f, 0f, 0f, 5f, 0f, 0f]);
							}
						}	
						
						
					}
					else if(Roll < 8)
					{
						worldScript.enlightenmentRate ++;
					}
					else
					{
						var deathCount : int = 0;
						var maximumDeaths : int = Face_A.GetComponent(faceInfo).villagerCount;
						
						transforms = Face_A.GetComponentsInChildren.<Transform>();
						
						
						for( var T : Transform in transforms)
						{
							if(T.tag == "Villager" && deathCount <= maximumDeaths)
							{
							 	Roll = Mathf.RoundToInt(Random.value*25);
							 	personalityScript = T.GetComponent(personality);
							 	
							 	if(Roll > personalityScript.Aggression)
							 	{
							 		personalityScript.Die();
							 		deathCount ++;
							 	}
							 	else
							 	{
							 		break;
							 	}
							}
						}
					}

				
					eventType = "None";
					Time.timeScale = 1;
				}
				
				if(GUI.Button(Rect(Screen.width/2 + 200, Screen.height/2 + 100, 100, 25), "Ignore"))
				{
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
				
				
							
			break;				
			
			case 2:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Foreign disease!");
				
				// CHOOSE TO QUARANTINE INITIAL VICTIMS
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Early looks at the new land have revealed some nasty new disease!");
				// 		- QUARANTINE LEADS TO LESS DEATHS BUT MOST STATS TAKE A SIGNIFICANT HIT
				if(GUI.Button(Rect(Screen.width/2 -300, Screen.height/2 + 100, 100, 25), "Quarantine"))
				{
				
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
					var AmorChange : float = 5;	
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							Flip = Mathf.RoundToInt(Random.value*2);
							
							villagerScript = T.GetComponent(personality);
							
							if(Flip == 2)
							{
								T.GetComponent(personality).Die();
							}
							else
							{
								if(villagerScript.Amorousness < 5)
								{
									AmorChange = villagerScript.Amorousness;
								}
								
								villagerScript.Amorousness += AmorChange;
								
								var setChange : float[] = [0, AmorChange, 0, 0, 0, 0];
								
								worldScript.updateStats(setChange);
							}
						}
					}
				
					eventType = "None";
					Time.timeScale = 1;
				}
				
				if(GUI.Button(Rect(Screen.width/2 + 200, Screen.height/2 + 100, 100, 25), "Ignore"))
				{
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
							
			break;
			
			case 3:
				
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Friendly Natives!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Some friendly folk are waiting for you on this new land. Do you welcome them into the fold or cruelly cast them aside?");
				
				// CHOOSE TO ACCEPT THEM OR REJECT
				
				// NO INHERENT RISK, BUT RANDOM STATS CAN MESS WITH EXISTING SOCIETY/LEAD TO OVERPOP
				
				if(GUI.Button(Rect(Screen.width/2 -300, Screen.height/2 + 100, 100, 25), "Accept"))
				{
					var spawnFace = Face_B.GetComponent(spawnScript);
					
					
					
					Roll = Mathf.RoundToInt(Random.value*4)+2;
				
					for( i = 0; i < Roll; i ++)
					{
						spawnFace.spawnBlip();
					}
				
					eventType = "None";
					Time.timeScale = 1;
				}
				
				if(GUI.Button(Rect(Screen.width/2 + 200, Screen.height/2 + 100, 100, 25), "Reject"))
				{
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
			break;
			
			
			case 4:
				
				GUI.Label(Rect(Screen.width/2 - 150, Screen.height/2 - 100, 300, 25), "Mysterious being of Great Wisdom!");
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Some greater being wants to impart its wisdom to the villagers!");
				// CHOOSE STAT
				
				// COIN FLIP ON INCREASE/DECREASE OF SAID STAT
				
				if(GUI.Button(Rect(Screen.width/2 -300, Screen.height/2 + 100, 100, 25), "Listen"))
				{
					Roll = Mathf.RoundToInt(Random.value*5);
					
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
					
					var ChosenOne : Transform;
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							ChosenOne = T;
						}
					}
					
					switch(Roll)
					{
						case 0: 
						
							ChosenOne.GetComponent(personality).Aggression += 10;
						
						break;
						
						case 1:
							
							ChosenOne.GetComponent(personality).Amorousness += 10;
						
						break;
						
						case 2:
						
							ChosenOne.GetComponent(personality).Charisma += 10;
									
						break;
					
						case 3:
							
							ChosenOne.GetComponent(personality).Curiosity += 10;
							
						break;
						
						case 4:
						
							ChosenOne.GetComponent(personality).Industriousness += 10;
						
						break;
						
						case 5:
						
							ChosenOne.GetComponent(personality).Organisation += 10;
						
						break;
					
					}
					
					var ArrayOfChange : float[] = [0f, 0f, 0f, 0f, 0f, 0f];
					
					ArrayOfChange[Roll] += 10;
					
					worldScript.updateStats(ArrayOfChange);
					
					eventType = "None";
					Time.timeScale = 1;
				}
				
				if(GUI.Button(Rect(Screen.width/2 + 200, Screen.height/2 + 100, 100, 25), "Ignore"))
				{
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
			
			break;
			
			
			case 5:
				
				GUI.Label(Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 25), "Fountain of Youth!");
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Your villagers regain their youthfulness!");
				// MAKES RANDOM VILLAGERS YOUNGER
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
				
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							T.GetComponent(personality).Age = 0f;
						}
					}
					eventType = "None";
					Time.timeScale = 1;
					
				}
				// REMEMBER TO CHECK AGE STILL >= 0
				
			break;
			
			case 6: 
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Pests!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "The crops are all being eaten! This is what happens when you introduce a new species to an ecosystem that can't handle them!");
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
				// STARVATION -> FAMINE
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
					
					var Kills = Face_A.GetComponent(faceInfo).villagerCount;
					
					
					for( var T : Transform in transforms)
					{
						if(T.name == "blip(Clone)" && Kills > 0)
						{
						
							Flip = Mathf.RoundToInt(Random.value);
						
							if(Flip == 0)
							{
								T.GetComponent(personality).Die();
								Kills --;
							}
						}
					}
					
					eventType = "None";
					Time.timeScale = 1;
				}
				
				
			break;
			
			case 7:
			
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Natural Wonder!");
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "Some glorious lump of rock has increased the villagers' fascination with the universe!");
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
				// INCREASES CURIOUSNESS
				// INCREASES LIFE EXPECTANCY
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
					
					var CurChange : float = 0f;
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							personalityScript = T.GetComponent(personality);
							
							personalityScript.Curiosity += 6; 
							personalityScript.lifeExpectancy *= 2;
							
							CurChange += 6;
						}
					}
					
					worldScript.updateStats([0f, 0f, 0f, CurChange, 0f, 0f]);
					
					eventType = "None";
					Time.timeScale = 1;
				}
			break;
			
			case 8:
				
				GUI.Label(Rect(Screen.width/2 - 120, Screen.height/2 - 100, 240, 25), "Picturesque Location!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "The villagers are quite happy where they are thank you very much.");
				
				// Villagers become satisfied with their current location and become significantly less curious about the world.
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
				
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
					
					var CurDrop : float = 0f;
					
					for(var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							personalityScript = T.GetComponent(personality);
							if(personalityScript.Curiosity < 5)
							{
								CurDrop -= personalityScript.Curiosity;
								personalityScript.Curiosity = 0;
							}
							else
							{
								T.GetComponent(personality).Curiosity -= 5;
								CurDrop -= 5;
							}	
						}
					}
					
					worldScript.updateStats([0f, 0f, 0f, CurDrop, 0f, 0f]);
					
					eventType = "None";
					Time.timeScale = 1;
				}
			break;
			
			case 9:
				
				GUI.Label(Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 25), "Romance of Exploration!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "The excitement of exploring the world has got everyone all lovey dovey!");
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
				
				
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
				
					var amorBoost : float = 0f;
				
					for(var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							T.GetComponent(personality).Amorousness += 5;
						
							amorBoost += 5;
						}
					}
				
					worldScript.updateStats([0f, amorBoost, 0f, 0f, 0f, 0f]);
					
					eventType = "None";
					Time.timeScale = 1;
				}
				
				// Discovery of new lands has filled everyone with amorousness (Increase in amorousness, everyone wants to breed)
				
			break;
			
			case 10:
				
				GUI.Label(Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 25), "Famous Explorer!");
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "One of your villagers has gained recognition for their exciting exploration exploits!");
				
				// One villager gainst significant charisma and amorousness
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
						
					transforms = Face_A.GetComponentsInChildren.<Transform>();// as Transform[];
					
					var explorer : Transform;
					
					for( var T : Transform in transforms)
					{
						if(T.tag == "Villager")
						{
							explorer = T;
						}
					}
					
					var explorerScript = explorer.GetComponent(personality);
					
					explorerScript.Charisma += 10;
					explorerScript.Amorousness += 5;
				
					worldScript.updateStats([0f, 5f, 10f, 0f, 0f, 0f]);
					
					eventType = "None";
					Time.timeScale = 1;
				}	
			
			break;
			
			
			case 11:
				
				GUI.Label(Rect(Screen.width/2 - 50, Screen.height/2 - 100, 100, 25), "Renewed Faith!");
				
				
				GUI.Label(Rect(Screen.width/2 - 250, Screen.height/2 -50, 500, 250), "The discovery of new land has restored the faith of your villagers!");
				// DOUBLES BOOK & ARTIFACT POINTS
				
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					
				
					worldScript.bookPoints *= 2;
					worldScript.artPoints *= 2;
					
					eventType = "None";
					Time.timeScale = 1;
				}
			break;
			
			case 12:
			
				GUI.Label(Rect(Screen.width/2 - 150, Screen.height/2 - 100, 300, 25), "Same old, same old");
				
				// Nothing hugely interesting, but at least nobody gets hurt
				if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
				{
					eventType = "None";
					Time.timeScale = 1;
				}
				
			break;
	
		}
	/*	if(overrideButton == false)
		{
		
			if(GUI.Button(Rect(Screen.width/2 -50, Screen.height/2 + 100, 100, 25), "Done"))
			{
				eventType = "None";
				Time.timeScale = 1;
			}
		}*/
	}
	
	
					
}


function seasonalEvent()
{
	var Roll : int = Mathf.RoundToInt(Random.value*12);
	
	Time.timeScale = 0;
	
	overrideButton = false;
	
	eventType = "Seasonal";
	eventNumber = Roll;
	
}

function contactEvent(builderFace : Transform, newFace : Transform)
{
	var Roll : int = Mathf.RoundToInt(Random.value*12);
	
	Time.timeScale = 0;
	
	overrideButton = false;
	
	eventType = "Contact";
	eventNumber = Roll;
	
	Debug.Log("Builder Face: " + builderFace + "\nNew Face: " + newFace);
				
	Face_A = builderFace;
	Face_B = newFace;
	
}