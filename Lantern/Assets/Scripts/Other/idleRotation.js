#pragma strict

/*var UpVec : Vector3;

function Start()
{
	//UpVec = transform.parent.GetComponent(cubeInfo).getOutwardVector();
	
}*/

function Update () 
{	
	transform.Rotate(Vector3(0, 1, 0), Time.deltaTime*30);
}