#pragma strict

//var playerPosition : Transform;
var speedLevel : int;

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

function GetVector(ballTransform : Transform)
{
	//Debug.Log("Ball position: " + ballPosition);

	
	var controlScript : control;
	
	controlScript = GetComponent(control);
	
	
	var dirVec : Vector3 = controlScript.getPosition() - ballTransform.position;

	var axisVec : Vector3 = ballTransform.up;
	
	var crossProduct = Vector3.Cross(axisVec, dirVec);
	
	if(crossProduct.magnitude != 0)
	{
		var normalDir = crossProduct / crossProduct.magnitude;
		//var normalDir = vecCentered / vecCentered.magnitude;
	}
	
	return normalDir;
}

public function GetRot () : Vector3 
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
		var ballVector = GetVector(balls[i+1].transform);
		
		//Debug.Log("Ball State: " + ballState);
		//Debug.Log("Ball Vector: " + ballVector);
		
		totalVec += speedLevel*ballState*ballVector;
	}
			
	return totalVec;
	
}