#pragma strict

//var playerPosition : Transform;
var speedLevel : float;

function GetVector(ballPosition : Vector3)
{
	//Debug.Log("Ball position: " + ballPosition);
	var controlScript : control;
	//var Name = transform.name;
	//Debug.Log("GetVector Parent: " + Name);
	
	
	controlScript = transform.GetComponent(control);
	var playerPosition : Vector3 = controlScript.getPosition();
	
	var dirVec : Vector3 = playerPosition - ballPosition;
	if(dirVec.magnitude != 0)
	{
		var normalDir = dirVec / dirVec.magnitude;
	}
	
	//var normalDir = Vector3(0, 0, 0);
	
	return normalDir;
}

function GetState(ballRenderer : Renderer)
{
	var nState = 0;
	
	if(ballRenderer.sharedMaterial.name == "pushMat")
	{
		nState = 1;
	}
	else if(ballRenderer.sharedMaterial.name == "pullMat")
	{
		nState = -1;
	}
	
	return nState;
}

public function GetShift () : Vector3 
{
	var nBalls = transform.childCount;
	var balls : Component[];
	var ballRenderers : Component[];
	
	var totalVec : Vector3;
	totalVec = Vector3(0, 0, 0);
	
	balls = transform.GetComponentsInChildren(Transform);
	ballRenderers = transform.GetComponentsInChildren(Renderer);
	
	for(var i = 0; i < nBalls; i ++)
	{
		var ballState = GetState(ballRenderers[i].GetComponent.<Renderer>());	
		//Debug.Log("Ball " + i + " State: " + ballState);
		var ballVec = GetVector(balls[i+1].transform.position);
		//Debug.Log("Ball " + i + " Norm: " + ballVec);
		
		totalVec += ballVec*ballState*speedLevel;
		//Debug.Log(totalVec);	
	}
	
	//Debug.Log(totalVec);
	
	return totalVec;			
	
}