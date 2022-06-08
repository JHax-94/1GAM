#pragma strict


function GetState(ballRenderer : Renderer)
{
	var nState = 0;
	
	if(ballRenderer.sharedMaterial.name == "clockMat")
	{
		nState = 1;
	}
	else if(ballRenderer.sharedMaterial.name == "antiMat")
	{
		nState = -1;
	}
	
	return nState;
}

function Update () 
{
	var State = GetState(GetComponent.<Renderer>());
	
	transform.Rotate(Vector3.up, State*120*Time.deltaTime);
}