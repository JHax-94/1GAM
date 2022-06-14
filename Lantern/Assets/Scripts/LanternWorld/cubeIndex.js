#pragma strict
/*
function Start () {

}

function Update () {

}
*/
function VectorToName(vector : Vector3)
{
	var Name : String = "Cube" + vector.x.ToString() + vector.y.ToString() + vector.z.ToString();
	
	return Name;
}

function cubesOfType(typeName : String) : Transform[]
{
	var objects : GameObject[];
	objects = GameObject.FindGameObjectsWithTag("Cube");
	var transforms = new Array();
	
	
	for(var obj : GameObject in objects)
	{
		if(obj.GetComponent(cubeInfo).cubeType == typeName)
		{
			transforms.Add(obj.transform);
		}
	}
	
	var CubeArray = transforms.ToBuiltin(Transform) as Transform[];
	
	return CubeArray;	
}




function cubeInDir(Dir : int, vector : Vector3, outwardVec : Vector3)
{
	var dirs = new Vector3[4];
	var wantCube : Transform;

	if(outwardVec.y != 0)
	{
		dirs[0] = Vector3(0, 0, -1);
		dirs[1] = Vector3(0, 1, 0)*outwardVec.y;
	}
	else if(outwardVec.x != 0)
	{
		dirs[0] = Vector3(-1, 0, 0);
		dirs[1] = Vector3(0, 0, -1)*outwardVec.x;
	}
	else if(outwardVec.z != 0)
	{
		dirs[0] = Vector3(-1, 0, 0);
		dirs[1] = Vector3(0, -1, 0)*outwardVec.z;
	}	
	
	dirs[2] = -dirs[0];
	dirs[3] = -dirs[1];
	
	var newVector = vector + dirs[Dir];
	
	if(newVector.x > 2 || newVector.x < 0 || newVector.y > 2 || newVector.y < 0 || newVector.z < 0 || newVector.z > 2)
	{
		Debug.Log("EdgeCube");
		wantCube = GetCube(vector);
	}
	else
	{
		Debug.Log("NormalCube");
		
		wantCube = GetCube(vector+dirs[Dir]);
	}
	
	return wantCube;
}

function GetCube(vector : Vector3)
{
	var transforms  = GetComponentsInChildren(Transform);
	var cubeName = VectorToName(vector);
	
	var wantCube : Transform;
	
	for(var t : Component in transforms)
	{
		if(t.name == cubeName)
		{
			wantCube = t.transform;
		}
	}
	
	//Debug.Log("Returning Cube: " + wantCube.name);
	
	return wantCube;
}