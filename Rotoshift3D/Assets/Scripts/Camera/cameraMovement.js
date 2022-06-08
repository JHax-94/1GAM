#pragma strict

var moveSpeed = 0.0000001f;

var x_move : float = 0;
var y_move : float = 0;
var z_move : float = 0;




function Update () 
{
	var forwardMove : float = 0;
	var rightMove : float = 0;
	var up_move : float = 0;	

	if(Input.GetKey(KeyCode.W))
	{
		forwardMove += moveSpeed;
	}
	else if(Input.GetKey(KeyCode.S))
	{
		forwardMove -= moveSpeed;
	}
	else 
	{
		forwardMove = 0;
	}
	
	if(Input.GetKey(KeyCode.D))
	{
		rightMove += moveSpeed;
	}
	else if(Input.GetKey(KeyCode.A))
	{
		rightMove -= moveSpeed;
	}
	else 
	{
		rightMove = 0;
	}
	
	if(Input.GetKey(KeyCode.E))
	{
		up_move += moveSpeed;
	}
	else if(Input.GetKey(KeyCode.Q))
	{
		up_move -= moveSpeed;
	}
	else
	{
		up_move = 0;
	}
	
	
	
	
	x_move = ( forwardMove*Mathf.Sin(2*Mathf.PI*(transform.eulerAngles.y/360)) + rightMove*Mathf.Cos(2*Mathf.PI*transform.eulerAngles.y/360) );
	y_move = ( -forwardMove*Mathf.Sin(2*Mathf.PI*(transform.eulerAngles.x/360)) + up_move);
	z_move = ( forwardMove*Mathf.Cos(2*Mathf.PI*(transform.eulerAngles.y/360)) - rightMove*Mathf.Sin(2*Mathf.PI*transform.eulerAngles.y/360) );
	
	GetComponent.<Rigidbody>().velocity.x = x_move;
	GetComponent.<Rigidbody>().velocity.y = y_move;
	GetComponent.<Rigidbody>().velocity.z = z_move;
	
	

	
	
}

