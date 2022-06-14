#pragma strict

var cubeType : String = "Land";

var faces : Transform[];
var nFaces : int = 0;

function InitialiseSpawner()
{
	for(var i : int = 0; i < nFaces; i ++)
	{
		faces[i].GetComponent(spawnScript).Initialise();
	}
}

function Awake()
{
	

	var comp = transform.GetComponentsInChildren(Transform);
	var array = new Array();
	
	for( var C : Component in comp)
	{
		if(C.tag == "Face")
		{
			array.Add(C.transform);
		}
	}
	
	nFaces = array.length;
	
	faces = new Transform[array.length];
	faces = array.ToBuiltin(Transform) as Transform[];	
	//Debug.Log(transform.name + " has " + faces.Length + " faces!");
}

function getFaces() : Transform[]
{
	return faces;
}

function getCentre()
{
	return transform.position;
}

function Vectorify(cubeName : String)
{
	var cubeVec : Vector3;
	//Debug.Log(cubeName);
	
	for(var stringPos : int = 4; stringPos < 7; stringPos ++)
	{
		var co_ord : int = 0;
		
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
			cubeVec.z = co_ord;
		}
		
	}
	
	//Debug.Log(cubeVec);
	
	return cubeVec;
}

function normalInDir(Dir : int, outwardVec : Vector3)
{
	var normals = new Vector3[4];
	
	if(outwardVec.x != 0)
	{
		normals[0] = Vector3(0, 1, 0);
		normals[1] = Vector3(0, 0, 1)*outwardVec.x;
		normals[2] = Vector3(0, -1, 0);
		normals[3] = Vector3(0, 0, -1)*outwardVec.x;
	}
	else if(outwardVec.y != 0)
	{
		normals[0] = Vector3(0, 0, 1);
		normals[1] = Vector3(1, 0, 0)*outwardVec.y;
		normals[2] = Vector3(0, 0, -1);
		normals[3] = Vector3(-1, 0, 0)*outwardVec.y;
	}
	else if(outwardVec.z != 0)
	{
		normals[0] = Vector3(0, 1, 0);
		normals[1] = Vector3(-1, 0, 0)*outwardVec.z;
		normals[2] = Vector3(0, -1, 0);
		normals[3] = Vector3(1, 0, 0)*outwardVec.z;
	}
	
	return normals[Dir];
}

function faceWithNormal(normal : Vector3) : Transform
{
	var newFace : Transform = faces[0];

	for(var i : int = 0; i < nFaces; i ++)
	{
		if(faces[i].GetComponent(faceInfo).Normal == normal)
		{
			newFace = faces[i];
		}		
	}
	
	return newFace;
}

function setCubeType(newType : String)
{
	cubeType = newType;
}

function getCubeType()
{
	return cubeType;
}


function defog()
{
	var worldScript : generateWorld;
	var Stats : worldStats;
	
	Stats = transform.parent.GetComponent(worldStats);		
	worldScript = transform.parent.GetComponent(generateWorld);
	
	Stats.boostThreshold();
	
	if(cubeType == "Land")
	{
		renderer.sharedMaterial = worldScript.getLandMat();
	}
	else if(cubeType == "Water")
	{
		renderer.sharedMaterial = worldScript.getSeaMat();
	}
}

