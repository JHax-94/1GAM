#pragma strict

//var playerPos : Rigidbody;

var State : int;

var plusMat : Material;
var negMat : Material;

function flipBall()
{
	State = -1*State;
		
	if(State == 1)
	{
		GetComponent.<Renderer>().material = plusMat;
	}
	else if(State == -1)
	{
		GetComponent.<Renderer>().material = negMat;
	}
}

function Start () 
{
	//Debug.Log(renderer.material.name);
	
	//Debug.Log("Parent name: " + transform.parent.name);
	//Debug.Log("Rigidbody: " + transform.parent.GetComponent(Rigidbody).name);
	
	
	
	if(GetComponent.<Renderer>().sharedMaterial == plusMat)
	{
		State = 1;
	}
	else if(GetComponent.<Renderer>().sharedMaterial == negMat) 
	{
		State = -1;
	}
	
}
/*
function GetVector()
{
	var dirVec : Vector3 = playerPos.position - transform.position;
	var normalDir = dirVec / dirVec.magnitude;
	
	return normalDir;
}
*/
function OnMouseDown ()
{

	var origin = Camera.main.transform.position;
	//var originPix = Camera.main.WorldToScreenPoint(Camera.main.transform.position);
	//var ray = Camera.main.ScreenPointToRay(originPix);
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	var dir = Camera.main.transform.forward;
	var hit : RaycastHit;
	
	Debug.DrawRay(origin, dir, Color.red, 100f);
	
	if(Physics.Raycast(ray, hit))
	{
		//Debug.Log("Ray hit " + hit.collider.name + " " + hit.distance + " units away!" );
		
		flipBall();
	}		
}