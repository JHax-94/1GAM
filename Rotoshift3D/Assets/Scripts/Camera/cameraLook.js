#pragma strict
/*
var maxTheta = 90;
var minTheta = -90;

var maxPhi = 360;
var minPhi = 0;
*/


var xRot : float = 0;
var yRot : float = 0;

var Post_x : float = 0;
var Post_y : float = 0;

var cos_yRot : float = 0;
var sin_yRot : float = 0;

function Update () 
{
	Screen.lockCursor = true;
	
	var moveSpeed = Time.timeScale;
				
	if(Input.GetAxis("Mouse X"))
	{
		yRot += moveSpeed * Input.GetAxis("Mouse X");
	}
	if(Input.GetAxis("Mouse Y"))
	{
		xRot -= moveSpeed * Input.GetAxis("Mouse Y");
	}
		
	cos_yRot = Mathf.Cos(2*Mathf.PI*transform.eulerAngles.y/360);
	sin_yRot = Mathf.Sin(2*Mathf.PI*transform.eulerAngles.y/360);
		
	
	transform.rotation = Quaternion.Euler(xRot, yRot, 0);
	
	
	Post_x = transform.eulerAngles.x;
	Post_y = transform.eulerAngles.y;
		
		
	/*
	else
	{
		Screen.lockCursor = false;
	}*/
	
}

