#pragma strict
/*
enum Face { Top, Bottom, Right, Left, Front, Back };
enum Cube { TL, TC, TR, ML, MC, MR, BL, BC, BR };
enum Orientation { North, East, South, West };
*/
//var cameraControl : GameObject;

var landMat : Material;
var seaMat : Material;
var fogMat : Material;

function loadBlip(index : int)
{	
	var statArray = new float[6];
	
	var statString = new Array("Aggression", "Amorousness", "Charisma", "Curiosity", "Industriousness", "Organisation");

	for(var stat : int = 0; stat < 6; stat ++)
	{
	//	Debug.Log(stat);
	//	Debug.Log(statArray[stat]);
	
		statArray[stat] = PlayerPrefs.GetFloat("Villager"+(index+1).ToString()+statString[stat]);
	}
	
	return statArray;
	
}

function getLandMat()
{

//	Debug.Log("Defogging...");
	return landMat;
	
	
}

function getSeaMat()
{
//	Debug.Log("Defogging...");

	return seaMat;
}

function getFogMat()
{
//	Debug.Log("Defogging...");
	
	return fogMat;
}



function fixStartCube(cubeCo_ords : Vector3)
{
	var cameraScript = GameObject.FindGameObjectWithTag("Camera Control").GetComponent(cameraPosition);
	
	cameraScript.setStartingCamera(cubeCo_ords);
}

function getCubeCoords(cubeName : String)
{	
	var cubeVec : Vector3;
//	Debug.Log("Getting Co-oridinates for: " + cubeName);
	
//	Debug.Log("x = " +cubeName[4] + "\ny = " + cubeName[5] + "\nz = " + cubeName[6]);
	
	for(var stringPos : int = 4; stringPos < 7; stringPos ++)
	{
		var co_ord : int;
		
		
		
		if(cubeName[stringPos] == "0")
		{
			co_ord = 0;
		}
		else if(cubeName[stringPos] == "1")
		{
			co_ord = 1;
		}
		else if(cubeName[stringPos] == "2")
		{
			co_ord = 2;
		}
	
		if(stringPos == 4)
		{
			cubeVec.x = co_ord;
		}
		else if(stringPos == 5)
		{
			cubeVec.y = co_ord;
		}
		else if(stringPos == 6)
		{
			cubeVec.z  = co_ord;
		}
	}
	
//	Debug.Log("Cube Vec: " + cubeVec);
	
	return cubeVec;
}




function Start () 
{
	var waterCoverage : float = PlayerPrefs.GetFloat("Water Perc");
	var fixedCube : Transform;
	
	
	waterCoverage = 0.01*waterCoverage;
	
	var waterCubes : int = Mathf.RoundToInt(26*waterCoverage);
	var landCubes : int = 26 - waterCubes;
	
	var transformArray = GetComponentsInChildren(Transform);
	var cubeArray = new Component[26]; 	
	
	// ASSIGN CUBES TO CUBEARRAY
	
	var cubePos = 0;	
	for(var iter : int = 0; iter < transformArray.length; iter ++ )
	{		
		if(transformArray[iter].tag == "Cube")
		{
			cubeArray[cubePos] = transformArray[iter];
		//	Debug.Log(cubeArray[cubePos].GetType());
			cubePos ++;
			
		}
		
	}
	
	// SET WATER/LAND CUBES
	
	
	var startCube : Vector3 = Vector3.zero;
	var startCubeSet : boolean = false;
	
	for(var cycle : int = 0; cycle < 26; cycle ++)
	{
		var cubesRemaining = waterCubes + landCubes;
		var Roll = cubesRemaining*Random.value;
		
		cubeArray[cycle].renderer.sharedMaterial = fogMat;
		
		var infoScript : cubeInfo;
		
		infoScript = cubeArray[cycle].GetComponent(cubeInfo);
//		

		//infoScript.Test();
		
		infoScript.InitialiseSpawner();
		
//		Debug.Log("Cylce: " + cycle);
//		Debug.Log(cubeArray[cycle].name);
		
		if(Roll >= 0 && Roll <= waterCubes)
		{
			// make Cube a water cube
			
		//	cubeArray[cycle].renderer.sharedMaterial = seaMat;
			
			infoScript.setCubeType("Water");
			waterCubes --;
			
			
		}
		else if(Roll > waterCubes && Roll <= (waterCubes + landCubes))
		{
			// make cube a land cube
			
			
		//	cubeArray[cycle].renderer.sharedMaterial = landMat;
				
			infoScript.setCubeType("Land");
			landCubes --;
			
			
			if(startCubeSet == false)
			{			
				var cubeVec : Vector3 = getCubeCoords(cubeArray[cycle].name);
				fixedCube = cubeArray[cycle].transform;
				
				
				if(cubeVec == Vector3(0, 1, 1) || cubeVec == Vector3(1, 1, 0) || cubeVec == Vector3(1, 1, 2) 
			    	|| cubeVec == Vector3(1, 0, 1) || cubeVec == Vector3(1, 2, 1) || cubeVec == Vector3(2, 1, 1))
				{
					startCube = cubeVec;
					startCubeSet = true;
					
					//cubeArray[cycle].renderer.sharedMaterial = landMat;
					infoScript.defog();
					
//					Debug.Log("Fixed to centre cube");
				}
			}
		}
		
		
	}
	
	if(startCubeSet == false)
	{
		for(cycle = 0; cycle < 26; cycle ++)
		{
			if(cubeArray[cycle].GetComponent(cubeInfo).getCubeType() == "Land")
			{
				startCube = getCubeCoords(cubeArray[cycle].name);
				startCubeSet = true;				
				
				//cubeArray[cycle].renderer.sharedMaterial = landMat;
				cubeArray[cycle].GetComponent(cubeInfo).defog();
				fixedCube = cubeArray[cycle].transform;
				
				
//				Debug.Log("Fixed to outer cube");
				cycle = 30;
			}
		}
	}

	// SET START CUBE

//	Debug.Log("Water Cubes: " + waterCubes);
//	Debug.Log("Land Cubes: " + landCubes);
	fixStartCube(startCube);
	
	// SPAWN INITIAL BLIPS
	//Debug.Log("Starting cube: " + fixedCube.name);
	
	fixedCube.GetComponent(cubeInfo).faces[0].GetComponent(spawnScript).spawnBlip(loadBlip(0));
	fixedCube.GetComponent(cubeInfo).faces[0].GetComponent(spawnScript).spawnBlip(loadBlip(1));
	
	
	
	
}

function Update () {

}