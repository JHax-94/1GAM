#pragma strict

var mainCam : Camera;

var presenceOn : boolean = false;

var ray_x : float = 0;
var ray_y : float = 0;

var lockedCube : Transform;
var lockedFace : Transform;
var spawner : spawnScript;

var spellScript : spellOn;

var nSpell : int;

var EDGE : int = 0;

//var Stats;// = GameObject.FindGameObjectWithTag("Lantern").GetComponent(worldStats);


function nearEdge(face : Transform) : int
{
	var edge : int = -1;
	
	//Debug.Log("Face normal: " + face.GetComponent(faceInfo).Normal);
	//Debug.Log("Transform Parent UP: " + transform.parent.up 
	
		
	if(face.GetComponent(faceInfo).Normal == transform.parent.up && face.parent.name == lockedCube.name)
	{		
		if(presenceOn == true)
		{
			var squarePos = getPosition();
			
			
			if(squarePos.x > -8 && squarePos.x < 8 && squarePos.y < 9 && squarePos.y > 8)
			{
				edge = 0;
			}
			else if(squarePos.x > 8 && squarePos.x < 9 && squarePos.y > -8 && squarePos.y < 8)
			{
				edge = 1;
			}
			else if(squarePos.x > -8 && squarePos.x < 8 && squarePos.y < -8 && squarePos.y > -9)
			{
				edge = 2;
			}
			else if(squarePos.x < -8 && squarePos.x > -9 && squarePos.y > -8 && squarePos.y < 8)
			{
				edge = 3;
			}
			
			EDGE = edge;
		}
	}
	
	return edge;
}

function presenceSwitch()
{
	var renderHand = GetComponentInChildren(MeshRenderer);
		
	if(presenceOn == true)
	{
		presenceOn = false;
		renderHand.enabled = false;	
		
	}
	else
	{
		presenceOn = true;
		renderHand.enabled = true;
	}
}

function getPosition()
{
	var squarePos : Vector2;
	var orientation : String;
	
	orientation = transform.parent.GetComponent(cameraPosition).getOrient();
	
	//Debug.Log(orientation);
	
	if(orientation == "North")
	{
		squarePos.x = transform.localPosition.x;
		squarePos.y = transform.localPosition.z-10;
	}
	else if(orientation == "East")
	{
		squarePos.x = transform.localPosition.z-10;
		squarePos.y = -transform.localPosition.x;
	}
	else if(orientation == "South")
	{
		squarePos.x = -transform.localPosition.x;
		squarePos.y = 10-transform.localPosition.z;
	}
	else if(orientation == "West")
	{
		squarePos.x = 10-transform.localPosition.z;
		squarePos.y = transform.localPosition.x;
	}
	
	//Debug.Log("Hand position: " + squarePos);
	
	return squarePos;
}

function Start()
{
	presenceOn = false;
	var renderHand = GetComponentInChildren(MeshRenderer);
	renderHand.enabled = false;
	spellScript = transform.GetComponentInChildren(spellOn);
	//Stats = GameObject.FindGameObjectWithTag("Lantern").GetComponent(worldStats);
}

function Update () 
{
	if(Input.GetKeyDown(KeyCode.LeftShift) || Input.GetMouseButtonDown(2))
	{
		presenceSwitch();
	}
	
	if(presenceOn != false)
	{
		var Stats = GameObject.FindGameObjectWithTag("Lantern").GetComponent(worldStats);
	 	//transform.parent.GetComponent(cameraPosition).lockedCube;
	 	
	 	
		var ray : Ray = mainCam.ScreenPointToRay(Input.mousePosition);		
		var hit : RaycastHit;
		
	 	ray_x = ray.origin.x;
	 	ray_y = ray.origin.y;
	 		 	
	 	Debug.DrawRay(ray.origin, ray.direction*10, Color.red);
	 	
	 	
	 	
	 	if(Physics.Raycast(ray, hit) && hit.collider.tag == "Cube")
	 	{
	 		var renderHand = GetComponentInChildren(MeshRenderer);
	 			
	 		//Debug.Log("Hit: " + hit.collider.name);	
	 			
		 	if(hit.distance < 25)
		 	{
		 		renderHand.enabled = true;
		 		transform.position = hit.point;
		 		lockedCube = hit.transform;
		 		lockedFace = lockedCube.GetComponent(cubeInfo).faceWithNormal(transform.up);
		 		spawner = lockedFace.GetComponent(spawnScript);
		 						
		 		nearEdge(lockedFace);
		 	}
		 	else
		 	{
		 		renderHand.enabled = false;
		 	}
		 			
		 	//transform.position = hit.point;
		 	
		 	if(transform.parent.GetComponent(cameraPosition).locked == true)
		 	{
			 	if(Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1))
			 	{
			 		Debug.Log("Trying to create spirit...");
			 		
			 		if(Stats.coolDown == 0 && renderHand.sharedMaterial != transform.GetComponentInChildren(spellOn).nullMaterial)
			 		{
			 			Debug.Log("Creating spirit...");
			 		 	nSpell = 0;
			 			spawner.spawnObject("Spirit", transform.position);
			 		}
			 	}
			 		
			 	if(Input.GetKeyDown(KeyCode.C))
			 	{		
			 		Debug.Log("Trying to create book...");
			 		if(Stats.isBookSpawnable())
			 		{
			 			Debug.Log("Creating book..."+ hit.collider.name);
			 			spawner.spawnObject("tome", transform.position);
					
		 			}
		 			else
		 			{
		 				Debug.Log("Cannot create book...");
		 			}
			 			
		 		}
		 		else if(Input.GetKeyDown(KeyCode.V))
		 		{	
					Debug.Log("Trying to create artifact...");
					if(Stats.isArtSpawnable())
					{
						Debug.Log("Creating artifact on " + hit.collider.name);
						spawner.spawnObject("artifact", transform.position);
	 				
		 			}
		 			else
		 			{
		 				Debug.Log("Cannot create artifact..." );
		 			}
			 			
		 		}
		 		else if(Input.GetKeyDown(KeyCode.Alpha1))
		 		{
		 		
		 			nSpell = 1;
		 			spellScript.magicOn(1);
		 			
		 		}
		 		else if(Input.GetKeyDown(KeyCode.Alpha2))
		 		{
		 			nSpell = 2;
		 			spellScript.magicOn(2);
	 			}
	 			else if(Input.GetKeyDown(KeyCode.Alpha3))
	 			{
	 				nSpell = 3;
	 				spellScript.magicOn(3);
	 			}
	 			else if(Input.GetKeyDown(KeyCode.Alpha4) || Input.GetKeyDown(KeyCode.Escape))
	 			{
	 				nSpell = 0;
	 				spellScript.magicOff(false);
	 			}
	 			else if(Input.GetAxis("Mouse ScrollWheel") > 0)
	 			{
	 				nSpell ++;
	 				nSpell = nSpell%4;
	 				
					if(nSpell == 0)
					{
						spellScript.magicOff(false);
						
					}
					else 
					{
						spellScript.magicOn(nSpell);
					}
	 			}
	 			else if(Input.GetAxis("Mouse ScrollWheel") < 0)
	 			{
	 				nSpell --;
	 				nSpell+=4;
	 				nSpell = nSpell%4;
	 				
	 				if(nSpell == 0)
	 				{
	 					spellScript.magicOff(false);
	 				}
	 				else
	 				{
	 					spellScript.magicOn(nSpell);	
	 				}
	 			}
 			
 			}
 		}
	 	/*
	 	transform.position.x = ray_x;	
	 	transform.position.z = ray_y-30;
	 	transform.position.y = 40;
	 	*/	
	}
}