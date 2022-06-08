#pragma strict

function Update () 
{
	var playerBody : control;
	var shiftScript : totalShift;
	var rotScript : totalRot;
	
	playerBody = GetComponent(control);
	shiftScript = GetComponent(totalShift);
	rotScript = GetComponent(totalRot);
	
	var shiftVec : Vector3 = shiftScript.GetShift();
	var rotVec : Vector3 = rotScript.GetRot();
	
	var totalVec = shiftVec+rotVec;
	
	playerBody.setVelocity(totalVec);
}