#pragma strict

var rightPointer : Texture;
var upPointer : Texture;
var leftPointer : Texture;
var downPointer : Texture;

function isBehind()
{
	var behind = false;
	
	var camToPlayer : Vector3 = transform.position - Camera.main.transform.position;
	
	
	var angle = Mathf.Acos(Vector3.Dot(camToPlayer, Camera.main.transform.forward)/(camToPlayer.magnitude*Camera.main.transform.forward.magnitude));
	 
	if(Mathf.Abs(angle) > Mathf.PI/2)
	{
		behind = true;
	}
	
	return behind;
}


function OnGUI ()
{
	var x_pos : float;
	var y_pos : float;
	
	var boundedX = false;
	var boundedY = false;
	
	
	if(GetComponent.<Renderer>().isVisible == false)
	{
		x_pos = Camera.main.WorldToScreenPoint(transform.position).x;
		y_pos = Camera.main.WorldToScreenPoint(transform.position).y;
		
		
		if(isBehind() == false)
		{
			
			if(x_pos > Screen.width)
			{
				GUI.DrawTexture(Rect(Screen.width-32, Screen.height/2-16, 32, 32), rightPointer);
				boundedX = true;
			}
			else if(x_pos < 0)
			{
				GUI.DrawTexture(Rect(0, Screen.height/2-16, 32, 32), leftPointer);
				boundedX = true;
			}
		}
		else
		{
			if(x_pos > Screen.width)
			{
				GUI.DrawTexture(Rect(0, Screen.height/2-16, 32, 32), leftPointer);
				boundedX = true;
			}
			else if(x_pos < 0)
			{
				GUI.DrawTexture(Rect(Screen.width-32, Screen.height/2-16, 32, 32), rightPointer);
				boundedX = true;
			}	
		}
		
		
		if(y_pos > Screen.height)
		{
			GUI.DrawTexture(Rect(Screen.width/2-16, 0, 32, 32), upPointer);
			boundedY = true;
		}
		else if(y_pos < 0)
		{
			GUI.DrawTexture(Rect(Screen.width/2-16, Screen.height-32, 32, 32), downPointer);
			boundedY = true;
		}
		
		if(boundedX == false && boundedY == false)
		{
			GUI.DrawTexture(Rect(Screen.width-32, Screen.height/2-16, 32, 32), rightPointer);
			GUI.DrawTexture(Rect(0, Screen.height/2-16, 32, 32), leftPointer);
			GUI.DrawTexture(Rect(Screen.width/2-16, 0, 32, 32), upPointer);
			GUI.DrawTexture(Rect(Screen.width/2-16, Screen.height-32, 32, 32), downPointer);
		}
	/*	
		if(boundedY == false)
		{
			GUI.DrawTexture(Rect(Screen.width/2-16, 0, 32, 32), upPointer);
			GUI.DrawTexture(Rect(Screen.width/2-16, Screen.height-32, 32, 32), downPointer);
		}*/
		
	}
}

